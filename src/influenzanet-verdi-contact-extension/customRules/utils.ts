import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Duration } from "case-editor-tools/types/duration";
import { Expression } from "survey-engine/data_types";
import { ParticipantFlags } from "../studyRules";
import { ContactsDef } from "../surveys/Contacts";

const Contacts = new ContactsDef();

type CustomRule = {
  name: string;
  rules: Expression[];
};

/*
 * Monkey patch date functions to use testDate as reference then build the test
 * rule evaluating the function passed in the ruleFn argument.
 */
export const patchTimestamps =
  (ruleFn: () => CustomRule, referenceTime: Expression) => () => {
    const _timestampWithOffset = StudyEngine.timestampWithOffset;
    StudyEngine.timestampWithOffset = function (
      delta: Duration,
      reference?: number | Expression | undefined,
    ) {
      if (reference) return _timestampWithOffset(delta, reference);
      return _timestampWithOffset(delta, referenceTime);
    };

    const _getTsForNextISOWeek = StudyEngine.getTsForNextISOWeek;
    StudyEngine.getTsForNextISOWeek = function (
      ISOWeek: number | Expression,
      reference?: number | Expression | undefined,
    ) {
      if (reference) return _getTsForNextISOWeek(ISOWeek, reference);
      return _getTsForNextISOWeek(ISOWeek, referenceTime);
    };

    const rule = ruleFn();

    StudyEngine.timestampWithOffset = _timestampWithOffset;
    StudyEngine.getTsForNextISOWeek = _getTsForNextISOWeek;

    return rule;
  };

/*
 * NOTE: we have to store start / end dates somewhere in order to use them after
 * the survey has been removed from th list
 */
export const storeSurveyDates = () =>
  StudyEngine.do(
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.intervalTestStartDate.key,
      StudyEngine.participantState.getSurveyKeyAssignedFrom(Contacts.key),
    ),
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.intervalTestEndDate.key,
      StudyEngine.participantState.getSurveyKeyAssignedUntil(Contacts.key),
    ),
  );

export const createReport = (reportKey: string) =>
  StudyEngine.do(
    StudyEngine.participantActions.reports.init(reportKey),
    StudyEngine.participantActions.reports.updateData(
      reportKey,
      "startDate",
      StudyEngine.participantState.getSurveyKeyAssignedFrom(Contacts.key),
    ),
    StudyEngine.participantActions.reports.updateData(
      reportKey,
      "endDate",
      StudyEngine.participantState.getSurveyKeyAssignedUntil(Contacts.key),
    ),
    StudyEngine.participantActions.reports.updateData(
      reportKey,
      "referenceDate",
      StudyEngine.participantState.getParticipantFlagValue(
        ParticipantFlags.intervalTestDate.key,
      ),
    ),
  );

export const cleanupIntervalAndSurvey = () =>
  StudyEngine.do(
    StudyEngine.participantActions.removeFlag(
      ParticipantFlags.intervalGroup.key,
    ),
    StudyEngine.participantActions.assignedSurveys.remove(Contacts.key, "all"),
  );

export const cleanupTestDate = () =>
  StudyEngine.do(
    StudyEngine.participantActions.removeFlag(
      ParticipantFlags.intervalTestDate.key,
    ),
  );

export const getTestDate = StudyEngine.parseValueAsNum(
  StudyEngine.participantState.getParticipantFlagValue(
    ParticipantFlags.intervalTestDate.key,
  ),
);

export const getStartTestDate =
  StudyEngine.participantState.getParticipantFlagValueAsNum(
    ParticipantFlags.intervalTestStartDate.key,
  );

export const getEndTestDate =
  StudyEngine.participantState.getParticipantFlagValueAsNum(
    ParticipantFlags.intervalTestEndDate.key,
  );
