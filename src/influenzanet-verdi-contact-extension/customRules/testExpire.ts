import { reassignContactsSurvey } from "../studyRules";
import {
  createReport,
  getEndTestDate,
  patchTimestamps,
  storeSurveyDates,
} from "./utils";

/*
 * Evaluate `reassignContactsSurvey` using `intervalTestEndDate` as reference
 */
export const testExpireRule = patchTimestamps(
  () => ({
    name: "testExpireRule",
    rules: [
      createReport("testExpireRule.before"),
      reassignContactsSurvey(),
      storeSurveyDates(),
      createReport("testExpireRule.after"),
    ],
  }),
  getEndTestDate,
);
