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
 * Contacts survey methods:
 */
const addContactsSurveyWithOffset = (
  reference: Expression,
  offsetWeeks: number
) =>
  StudyEngine.participantActions.assignedSurveys.add(
    surveyKeys.Contacts,
    "normal",
    StudyEngine.timestampWithOffset({ days: offsetWeeks * 7 }, reference),
    StudyEngine.timestampWithOffset({ days: (offsetWeeks + 4) * 7 }, reference)
  );

const isContactsFlagEq = (value: number) =>
  StudyEngine.eq(
    StudyEngine.participantState.getParticipantFlagValueAsNum(
      ParticipantFlags.intervalGroup.key
    ),
    value
  );

const ensureContactsSurveyGroup = () =>
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

export const assignContactsSurvey = (reference: Expression) =>
  StudyEngine.do(
    ensureContactsSurveyGroup(),
    StudyEngine.if(
      isContactsFlagEq(1),
      addContactsSurveyWithOffset(reference, 0),
      StudyEngine.if(
        isContactsFlagEq(2),
        addContactsSurveyWithOffset(reference, 1),
        StudyEngine.if(
          isContactsFlagEq(3),
          addContactsSurveyWithOffset(reference, 2),
          StudyEngine.if(
            isContactsFlagEq(4),
            addContactsSurveyWithOffset(reference, 3),
            StudyEngine.if(
              isContactsFlagEq(5),
              addContactsSurveyWithOffset(reference, 4),
              StudyEngine.if(
                isContactsFlagEq(6),
                addContactsSurveyWithOffset(reference, 5),
                StudyEngine.if(
                  isContactsFlagEq(7),
                  addContactsSurveyWithOffset(reference, 6),
                  StudyEngine.if(
                    isContactsFlagEq(8),
                    addContactsSurveyWithOffset(reference, 7),
                    StudyEngine.if(
                      isContactsFlagEq(9),
                      addContactsSurveyWithOffset(reference, 8),
                      StudyEngine.if(
                        isContactsFlagEq(10),
                        addContactsSurveyWithOffset(reference, 9),
                        StudyEngine.if(
                          isContactsFlagEq(11),
                          addContactsSurveyWithOffset(reference, 10),
                          StudyEngine.if(
                            isContactsFlagEq(12),
                            addContactsSurveyWithOffset(reference, 11),
                            addContactsSurveyWithOffset(reference, 12)
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

const isCurrentContactsStartISOWeekSmallerThan = (week: number) => {
  return StudyEngine.lt(
    StudyEngine.getISOWeekForTs(
      StudyEngine.participantState.getSurveyKeyAssignedFrom(surveyKeys.Contacts)
    ),
    week
  );
};

export const reassignContactsSurvey = () =>
  StudyEngine.do(
    StudyEngine.if(
      isCurrentContactsStartISOWeekSmallerThan(14),
      assignContactsSurveyForQ2(),
      // else:
      StudyEngine.if(
        isCurrentContactsStartISOWeekSmallerThan(27),
        assignContactsSurveyForQ3(),
        // else:
        StudyEngine.if(
          isCurrentContactsStartISOWeekSmallerThan(40),
          assignContactsSurveyForQ4(),
          // else:
          assignContactsSurveyForQ1()
        )
      )
    )
  );

const temporaryFlagKeyForContactsSurveyStart = 'lastContactsSurveyStart';

const saveLastContactsSurveyStartAsFlag = () => StudyEngine.if(
  StudyEngine.participantState.hasSurveyKeyAssigned(surveyKeys.Contacts),
  StudyEngine.participantActions.updateFlag(
    temporaryFlagKeyForContactsSurveyStart,
    StudyEngine.participantState.getSurveyKeyAssignedFrom(surveyKeys.Contacts),
  ),
  // handle if interval survey is not assigned yet
  // Assume it was 4 weeks ago:
  StudyEngine.participantActions.updateFlag(
    temporaryFlagKeyForContactsSurveyStart,
    StudyEngine.timestampWithOffset({ days: 0 }),
  )
)

const getLastContactsSurveyStartFromFlags = () => StudyEngine.participantState.getParticipantFlagValueAsNum(temporaryFlagKeyForContactsSurveyStart)

const deleteLastContactsSurveyStartFlag = () => StudyEngine.participantActions.removeFlag(temporaryFlagKeyForContactsSurveyStart)

const reassignContactsSurveyFromWeek = (week: number) => StudyEngine.do(
  saveLastContactsSurveyStartAsFlag(),

  // remove old instances of interval survey:
  StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.Contacts, 'all'),

  assignContactsSurvey(
    StudyEngine.getTsForNextISOWeek(week, getLastContactsSurveyStartFromFlags())
  ),

  deleteLastContactsSurveyStartFlag()
)

export const assignContactsSurveyForQ1 = () =>
  StudyEngine.do(
    reassignContactsSurveyFromWeek(1),
  );

export const assignContactsSurveyForQ2 = () =>
  StudyEngine.do(
    reassignContactsSurveyFromWeek(14),
  );

export const assignContactsSurveyForQ3 = () =>
  StudyEngine.do(
    reassignContactsSurveyFromWeek(27),
  );

export const assignContactsSurveyForQ4 = () =>
  StudyEngine.do(
    reassignContactsSurveyFromWeek(40)
  );

/*
 * HANDLERS
 */

export const entryRules = (): Expression[] => [
  StudyEngine.if(
    isCurrentISOWeekSmallerThan(14, quarterSwithOffset),
    assignContactsSurveyForQ2(),
    // else:
    StudyEngine.if(
      isCurrentISOWeekSmallerThan(27, quarterSwithOffset),
      assignContactsSurveyForQ3(),
      // else:
      StudyEngine.if(
        isCurrentISOWeekSmallerThan(40, quarterSwithOffset),
        assignContactsSurveyForQ4(),
        // else:
        assignContactsSurveyForQ1()
      )
    )
  ),
];

export const handleContactsQuestionnaireSubmission = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(surveyKeys.Contacts),
  // THEN:
  reassignContactsSurvey()
);

const submitRules: Expression[] = [handleContactsQuestionnaireSubmission];

export const handleContactsQuestionnaireExpired = () =>
  StudyEngine.ifThen(
    isSurveyExpired(surveyKeys.Contacts),
    // Then:
    reassignContactsSurvey()
  );

const timerRules: Expression[] = [handleContactsQuestionnaireExpired()];

/**
 * STUDY RULES
 */
export const studyRules = new StudyRules(entryRules(), submitRules, timerRules);
