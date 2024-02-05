import { assignContactsQuestionnaire_rules } from "./assignContactsQuestionnaire";
import {
  createReport,
  getTestDate,
  patchTimestamps,
  storeSurveyDates,
} from "./utils";

/*
 * Evaluate the manual assignation rule using `intervalTestDate` as reference
 */
export const testAssignRule = patchTimestamps(
  () => ({
    name: "testAssignRule",
    rules: [
      ...assignContactsQuestionnaire_rules.rules,
      storeSurveyDates(),
      createReport("testAssignRule"),
    ],
  }),
  getTestDate,
);
