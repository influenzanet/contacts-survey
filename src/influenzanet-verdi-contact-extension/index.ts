import { Study } from "case-editor-tools/types/study";
import { ContactsDef } from "./surveys/Contacts";
import { studyRules } from "./studyRules";
import { assignContactsQuestionnaire_rules } from "./customRules/assignContactsQuestionnaire";

import { nl_NL } from "./languages/nl";

export const VERDIContactStudy: Study = {
  studyKey: "verdi",
  surveys: [new ContactsDef([nl_NL])],
  studyRules: studyRules,
  messageConfigs: [],
  customStudyRules: [assignContactsQuestionnaire_rules],
};
