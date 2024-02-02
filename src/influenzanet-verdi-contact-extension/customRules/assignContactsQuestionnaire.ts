import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import moment from "moment";
import { surveyKeys } from "../constants";
import { assignContactsSurvey } from "../studyRules";
import { generateExpression } from "case-editor-tools/expression-utils/expressionGen"

/*
 * NOTE: always take the start of the quarter as reference, surveys assigned in
 * the past will be shifted one quarter in the future by the timer rule
 */
const quarter = moment(new Date()).quarter()
const launchDate = moment().quarter(quarter).startOf('quarter').toDate();

const hasStudyStatus = (status: string) => generateExpression('hasStudyStatus', undefined, status);

export const assignContactsQuestionnaire_rules = {
  name: "assignContactsQuestionnaire",
  rules: [
    StudyEngine.if(
      StudyEngine.and(
        hasStudyStatus("active"),
        StudyEngine.not(
          StudyEngine.participantState.hasSurveyKeyAssigned(
            surveyKeys.Contacts,
          ),
        ),
      ),
      StudyEngine.do(
        // remove old instances of interval survey:
        StudyEngine.participantActions.assignedSurveys.remove(
          surveyKeys.Contacts,
          "all",
        ),
        // this effectively takes the first Monday of the quarter as reference
        assignContactsSurvey(
          StudyEngine.getTsForNextISOWeek(
            moment(launchDate).week(),
            Math.floor(launchDate.getTime() / 1000) - 1,
          ),
        ),
      ),
    ),
  ],
};
