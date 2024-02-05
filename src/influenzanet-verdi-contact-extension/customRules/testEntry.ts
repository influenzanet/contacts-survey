import { entryRules } from "../studyRules";
import {
  createReport,
  getTestDate,
  patchTimestamps,
  storeSurveyDates,
} from "./utils";

/*
 * Evaluate `entryRules` using `intervalTestDate` as reference
 */
export const testEntryRule = patchTimestamps(
  () => ({
    name: "testEntryRule",
    rules: [...entryRules(), storeSurveyDates(), createReport("testEntryRule")],
  }),
  getTestDate,
);
