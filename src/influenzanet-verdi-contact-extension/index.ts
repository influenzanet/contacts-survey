import { Study } from "case-editor-tools/types/study";
import { studyRules } from "./studyRules";
import { Contacts } from "./surveys/Contacts";


export const VERDIContactStudy: Study = {
  studyKey: 'verdi',
  surveys: [
    Contacts
  ],
  studyRules: studyRules,
  messageConfigs: [],
  customStudyRules: []
}
