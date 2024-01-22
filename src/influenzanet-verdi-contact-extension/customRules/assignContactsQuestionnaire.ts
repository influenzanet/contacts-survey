import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import moment from "moment";
import { surveyKeys } from "../constants";
import { assignContactsSurvey } from "../studyRules";

const launchDate = new Date();

export const assignContactsQuestionnaire_rules = {
  name: "assignContactsQuestionnaire",
  rules: [
    StudyEngine.if(
      StudyEngine.and(
        StudyEngine.participantState.hasStudyStatus("active"),
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
        assignContactsSurvey(
          StudyEngine.getTsForNextISOWeek(
            moment(launchDate).week(),
            // floor and subtract to be sure this is antecedent to launchDate
            Math.floor(launchDate.getTime() / 1000) - 1,
          ),
        ),
      ),
    ),
  ],
};
