import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Duration } from "case-editor-tools/types/duration";
import { StudyRules } from "case-editor-tools/types/studyRules";
import { Expression } from "survey-engine/data_types";
import { surveyKeys } from "./constants";

/*
 * CONSTANTS
 */

const quarterSwithOffset = 2; // weeks

export const ParticipantFlags = {
  intervalGroup: {
    key: "intervalGroup",
  },
};

/*
 * UTILS
 */

const hasSurveyKeyValidUntilSoonerThan = (
  surveyKey: string,
  delta: Duration,
  reference?: number | Expression
) => {
  return StudyEngine.gt(
    StudyEngine.timestampWithOffset(delta, reference),
    StudyEngine.participantState.getSurveyKeyAssignedUntil(surveyKey)
  );
};

export const isSurveyExpired = (surveyKey: string) =>
  StudyEngine.and(
    StudyEngine.participantState.hasSurveyKeyAssigned(surveyKey),
    hasSurveyKeyValidUntilSoonerThan(surveyKey, { seconds: 0 })
  );

/**
 * Interval survey methods:
 */
const addIntervalSurveyWithOffset = (
  reference: Expression,
  offsetWeeks: number
) =>
  StudyEngine.participantActions.assignedSurveys.add(
    surveyKeys.Contacts,
    "normal",
    StudyEngine.timestampWithOffset({ days: offsetWeeks * 7 }, reference),
    StudyEngine.timestampWithOffset({ days: (offsetWeeks + 4) * 7 }, reference)
  );

const isIntervalFlagEq = (value: number) =>
  StudyEngine.eq(
    StudyEngine.participantState.getParticipantFlagValueAsNum(
      ParticipantFlags.intervalGroup.key
    ),
    value
  );

const ensureIntervalSurveyGroup = () =>
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKey(
        ParticipantFlags.intervalGroup.key
      )
    ),
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.intervalGroup.key,
      StudyEngine.generateRandomNumber(1, 13)
    )
  );

export const assignIntervalSurvey = (reference: Expression) =>
  StudyEngine.do(
    ensureIntervalSurveyGroup(),
    StudyEngine.if(
      isIntervalFlagEq(1),
      addIntervalSurveyWithOffset(reference, 0),
      StudyEngine.if(
        isIntervalFlagEq(2),
        addIntervalSurveyWithOffset(reference, 1),
        StudyEngine.if(
          isIntervalFlagEq(3),
          addIntervalSurveyWithOffset(reference, 2),
          StudyEngine.if(
            isIntervalFlagEq(4),
            addIntervalSurveyWithOffset(reference, 3),
            StudyEngine.if(
              isIntervalFlagEq(5),
              addIntervalSurveyWithOffset(reference, 4),
              StudyEngine.if(
                isIntervalFlagEq(6),
                addIntervalSurveyWithOffset(reference, 5),
                StudyEngine.if(
                  isIntervalFlagEq(7),
                  addIntervalSurveyWithOffset(reference, 6),
                  StudyEngine.if(
                    isIntervalFlagEq(8),
                    addIntervalSurveyWithOffset(reference, 7),
                    StudyEngine.if(
                      isIntervalFlagEq(9),
                      addIntervalSurveyWithOffset(reference, 8),
                      StudyEngine.if(
                        isIntervalFlagEq(10),
                        addIntervalSurveyWithOffset(reference, 9),
                        StudyEngine.if(
                          isIntervalFlagEq(11),
                          addIntervalSurveyWithOffset(reference, 10),
                          StudyEngine.if(
                            isIntervalFlagEq(12),
                            addIntervalSurveyWithOffset(reference, 11),
                            addIntervalSurveyWithOffset(reference, 12)
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );

export const isCurrentISOWeekSmallerThan = (
  week: number,
  offsetWeeks: number
) => {
  return StudyEngine.lt(
    StudyEngine.getISOWeekForTs(
      StudyEngine.timestampWithOffset({ days: offsetWeeks * 7 })
    ),
    week
  );
};

const isCurrentIntervalStartISOWeekSmallerThan = (week: number) => {
  return StudyEngine.lt(
    StudyEngine.getISOWeekForTs(
      StudyEngine.participantState.getSurveyKeyAssignedFrom(surveyKeys.Contacts)
    ),
    week
  );
};

export const reassignIntervalSurvey = () =>
  StudyEngine.do(
    StudyEngine.if(
      isCurrentIntervalStartISOWeekSmallerThan(14),
      assignIntervalSurveyForQ2(),
      // else:
      StudyEngine.if(
        isCurrentIntervalStartISOWeekSmallerThan(27),
        assignIntervalSurveyForQ3(),
        // else:
        StudyEngine.if(
          isCurrentIntervalStartISOWeekSmallerThan(40),
          assignIntervalSurveyForQ4(),
          // else:
          assignIntervalSurveyForQ1()
        )
      )
    )
  );

export const assignIntervalSurveyForQ1 = () =>
  StudyEngine.do(
    // remove old instances of interval survey:
    StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.Contacts, "all"),

    assignIntervalSurvey(StudyEngine.getTsForNextISOWeek(1))
  );

export const assignIntervalSurveyForQ2 = () =>
  StudyEngine.do(
    // remove old instances of interval survey:
    StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.Contacts, "all"),

    assignIntervalSurvey(StudyEngine.getTsForNextISOWeek(14))
  );

export const assignIntervalSurveyForQ3 = () =>
  StudyEngine.do(
    // remove old instances of interval survey:
    StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.Contacts, "all"),

    assignIntervalSurvey(StudyEngine.getTsForNextISOWeek(27))
  );

export const assignIntervalSurveyForQ4 = () =>
  StudyEngine.do(
    // remove old instances of interval survey:
    StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.Contacts, "all"),

    assignIntervalSurvey(StudyEngine.getTsForNextISOWeek(40))
  );

/*
 * HANDLERS
 */

const entryRules: Expression[] = [
  StudyEngine.if(
    isCurrentISOWeekSmallerThan(14, quarterSwithOffset),
    assignIntervalSurveyForQ2(),
    // else:
    StudyEngine.if(
      isCurrentISOWeekSmallerThan(27, quarterSwithOffset),
      assignIntervalSurveyForQ3(),
      // else:
      StudyEngine.if(
        isCurrentISOWeekSmallerThan(40, quarterSwithOffset),
        assignIntervalSurveyForQ4(),
        // else:
        assignIntervalSurveyForQ1()
      )
    )
  ),
];

const handleIntervalQuestionnaireSubmission = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(surveyKeys.Contacts),
  // THEN:
  reassignIntervalSurvey()
);

const submitRules: Expression[] = [handleIntervalQuestionnaireSubmission];

export const handleIntervalQuestionnaireExpired = () =>
  StudyEngine.ifThen(
    isSurveyExpired(surveyKeys.Contacts),
    // Then:
    reassignIntervalSurvey()
  );

const timerRules: Expression[] = [handleIntervalQuestionnaireExpired()];

/**
 * STUDY RULES
 */
export const studyRules = new StudyRules(entryRules, submitRules, timerRules);
