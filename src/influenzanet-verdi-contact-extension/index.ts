import { Study } from "case-editor-tools/types/study";
import { assignContactsQuestionnaire_rules } from "./customRules/assignContactsQuestionnaire";
import { testAssignRule } from "./customRules/testAssign";
import {
  testCleanupTestDate,
  testIntervalAndSurveyRule,
} from "./customRules/testCleanup";
import { testEntryRule } from "./customRules/testEntry";
import { testExpireRule } from "./customRules/testExpire";
import { testReassignRule } from "./customRules/testReassign";
import { it_IT } from "./languages/it";
import { nl_NL } from "./languages/nl";
import { studyRules } from "./studyRules";
import { ContactsDef } from "./surveys/Contacts";

export const VERDIContactStudy: Study = {
  studyKey: "verdi",
  surveys: [new ContactsDef([nl_NL])],
  studyRules: studyRules,
  messageConfigs: [],
  customStudyRules: [
    assignContactsQuestionnaire_rules,
    testIntervalAndSurveyRule(),
    testCleanupTestDate(),
    testAssignRule(),
    testEntryRule(),
    testReassignRule(),
    testExpireRule(),
  ],
};
