import { cleanupTestDate, cleanupIntervalAndSurvey } from "./utils";

export const testIntervalAndSurveyRule = function () {
  const rule = {
    name: "testCleanupIntervalAndSurvey",
    rules: [cleanupIntervalAndSurvey()],
  };

  return rule;
};

export const testCleanupTestDate = function () {
  const rule = {
    name: "testCleanupTestDate",
    rules: [cleanupTestDate()],
  };

  return rule;
};
