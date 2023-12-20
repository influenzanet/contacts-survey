import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../constants";
import { assignContactsSurvey } from "../studyRules";

export const assignContactsQuestionnaire_rules = {
  name: "assignContactsQuestionnaire",
  rules: [
    StudyEngine.if(
      StudyEngine.and(
        StudyEngine.participantState.hasStudyStatus("active"),
        StudyEngine.not(
          StudyEngine.participantState.hasSurveyKeyAssigned(surveyKeys.Contacts)
        )
      ),
      StudyEngine.do(
        // remove old instances of interval survey:
        StudyEngine.participantActions.assignedSurveys.remove(
          surveyKeys.Contacts,
          "all"
        ),

        assignContactsSurvey(StudyEngine.getTsForNextISOWeek(40, 1693559081))
      )
    ),
  ],
};
