import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { reassignContactsSurvey } from "../studyRules";
import {
  createReport,
  getStartTestDate,
  patchTimestamps,
  storeSurveyDates,
} from "./utils";

/*
 * Evaluate `reassignContactsSurvey` using `intervalTestStartDate` + 1 week as
 * reference
 */
export const testReassignRule = patchTimestamps(
  () => ({
    name: "testReassignRule",
    rules: [
      createReport("testReassignRule.before"),
      reassignContactsSurvey(),
      storeSurveyDates(),
      createReport("testReassignRule.after"),
    ],
  }),
  StudyEngine.timestampWithOffset({ days: 7 }, getStartTestDate),
);
