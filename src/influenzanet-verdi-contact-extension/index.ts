import { Study } from "case-editor-tools/types/study";
import { studyRules } from "./studyRules";
import { ContactsDef } from "./surveys/Contacts";

import { it_IT } from "./languages/it";

export const VERDIContactStudy: Study = {
  studyKey: "verdi",
  surveys: [new ContactsDef([it_IT])],
  studyRules: studyRules,
  messageConfigs: [],
  customStudyRules: [],
};
