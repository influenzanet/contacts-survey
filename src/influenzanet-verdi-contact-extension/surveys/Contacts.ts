import { DateDisplayComponentProp, Item, StyledTextComponentProp, SurveyDefinition } from "case-editor-tools/surveys/types";
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../constants";
import { Expression, SurveySingleItem, Validation } from "survey-engine/data_types";
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';

const dropdownOptions = [
  { key: '0', label: new Map([["en", "0"],]), },
  { key: '1', label: new Map([["en", "1"],]), },
  { key: '2', label: new Map([["en", "2"],]), },
  { key: '3', label: new Map([["en", "3"],]), },
  { key: '4', label: new Map([["en", "4"],]), },
  { key: '5', label: new Map([["en", "5"],]), },
  { key: '6', label: new Map([["en", "6"],]), },
  { key: '7', label: new Map([["en", "7"],]), },
  { key: '8', label: new Map([["en", "8"],]), },
  { key: '9', label: new Map([["en", "9"],]), },
  { key: '10', label: new Map([["en", "10"],]), },
  { key: '10+', label: new Map([["en", "10+"],]), },
];


class ContactsDef extends SurveyDefinition {
  Infos: Infos;
  Q1: Q1;
  Q2: Q2;
  ContactMatrixForHome: ContactMatrix;
  ContactMatrixForWork: ContactMatrix;
  ContactMatrixForSchool: ContactMatrix;
  ContactMatrixForLeisure: ContactMatrix;
  ContactMatrixForOther: ContactMatrix;
  QFragile: QFragile;

  constructor() {
    super({
      surveyKey: surveyKeys.Contacts,
      name: new Map([
        ["en", "Survey about your everyday social contacts"],
      ]),
      description: new Map([
        ["en", ""],
      ]),
      durationText: new Map([
        ["en", "1 minute"],
      ])
    });

    this.editor.setAvailableFor('public');
    this.editor.setRequireLoginBeforeSubmission(false);

    const isRequired = false;

    // Initialize/Configure questions here:
    this.Infos = new Infos(this.key);

    this.Q1 = new Q1(this.key, isRequired);
    this.Q2 = new Q2(this.key, SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.yes), isRequired);

    const conditionForHome = SurveyEngine.multipleChoice.any(this.Q2.key, this.Q2.optionKeys.home);
    this.ContactMatrixForHome = new ContactMatrix(
      this.key,
      'ContactsHome',
      new Map([['en', 'Indicate the number of contacts at home (per age category and gender)']]),
      conditionForHome,
      isRequired
    );

    /// WORK
    const conditionForWork = SurveyEngine.multipleChoice.any(this.Q2.key, this.Q2.optionKeys.work);
    this.ContactMatrixForWork = new ContactMatrix(
      this.key,
      'ContactsWork',
      new Map([['en', 'Indicate the number of contacts at work (per age category and gender)']]),
      conditionForWork,
      isRequired
    );

    /// SCHOOL
    const conditionForSchool = SurveyEngine.multipleChoice.any(this.Q2.key, this.Q2.optionKeys.school);
    this.ContactMatrixForSchool = new ContactMatrix(
      this.key,
      'ContactsSchool',
      new Map([['en', 'Indicate the number of contacts at school (per age category and gender)']]),
      conditionForSchool,
      isRequired
    );

    /// LEISURE
    const conditionForLeisure = SurveyEngine.multipleChoice.any(this.Q2.key, this.Q2.optionKeys.leisure);
    this.ContactMatrixForLeisure = new ContactMatrix(
      this.key,
      'ContactsLeisure',
      new Map([['en', 'Indicate the number of contacts during leisure (per age category and gender)']]),
      conditionForLeisure,
      isRequired
    );

    /// OTHER
    const conditionForOther = SurveyEngine.multipleChoice.any(this.Q2.key, this.Q2.optionKeys.other);
    this.ContactMatrixForOther = new ContactMatrix(
      this.key,
      'ContactsOther',
      new Map([['en', 'Indicate the number of contacts during other activities (per age category and gender)']]),
      conditionForOther,
      isRequired
    );

    this.QFragile = new QFragile(this.key, isRequired)


    /// Prefill rules:

    this.editor.setPrefillRules([
      /// HOME:
      ...this.ContactMatrixForHome.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForHome.key, `rg.rm.${key}-${this.ContactMatrixForHome.columnInfos[0].key}`, '0')
      ),
      ...this.ContactMatrixForHome.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForHome.key, `rg.rm.${key}-${this.ContactMatrixForHome.columnInfos[1].key}`, '0')
      ),
      /// WORK:
      ...this.ContactMatrixForWork.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForWork.key, `rg.rm.${key}-${this.ContactMatrixForWork.columnInfos[0].key}`, '0')
      ),
      ...this.ContactMatrixForWork.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForWork.key, `rg.rm.${key}-${this.ContactMatrixForWork.columnInfos[1].key}`, '0')
      ),
      /// SCHOOL:
      ...this.ContactMatrixForSchool.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForSchool.key, `rg.rm.${key}-${this.ContactMatrixForSchool.columnInfos[0].key}`, '0')
      ),
      ...this.ContactMatrixForSchool.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForSchool.key, `rg.rm.${key}-${this.ContactMatrixForSchool.columnInfos[1].key}`, '0')
      ),
      /// LEISURE:
      ...this.ContactMatrixForLeisure.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForLeisure.key, `rg.rm.${key}-${this.ContactMatrixForLeisure.columnInfos[0].key}`, '0')
      ),
      ...this.ContactMatrixForLeisure.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForLeisure.key, `rg.rm.${key}-${this.ContactMatrixForLeisure.columnInfos[1].key}`, '0')
      ),
      /// OTHER:
      ...this.ContactMatrixForOther.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForOther.key, `rg.rm.${key}-${this.ContactMatrixForOther.columnInfos[0].key}`, '0')
      ),
      ...this.ContactMatrixForOther.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForOther.key, `rg.rm.${key}-${this.ContactMatrixForOther.columnInfos[1].key}`, '0')
      ),
    ]);
  }

  buildSurvey() {
    // Define order of the questions here:
    this.addItem(this.Infos.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addPageBreak();
    this.addItem(this.ContactMatrixForHome.get());
    this.addPageBreak();
    this.addItem(this.ContactMatrixForWork.get());
    this.addPageBreak();
    this.addItem(this.ContactMatrixForSchool.get());
    this.addPageBreak();
    this.addItem(this.ContactMatrixForLeisure.get());
    this.addPageBreak();
    this.addItem(this.ContactMatrixForOther.get());
    this.addPageBreak();
    this.addItem(this.QFragile.get());
  }
}


class Infos extends Item {


  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'Info');
    this.condition = condition;
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["en", `
The onward transmission of respiratory infections depends on with whom
you talked, could have talked or whom you touched, actions we refer to
as a *contact*.

### What is a contact?

A contact is defined as the co-presence and interaction with another
individual at a distance of less than three metres. Examples could be
people you have talked to or people that you had a physical contact
with, even without exchanging words (for example shaking hands, etc). We
are not interested in contacts by phone or over the internet.

### Why is this important?

Because a lot of transmission happens when the symptoms are very mild,
the contact you have every day (thus also when you are healthy) are very
informative in predicting whom you might infect when you have
influenza-like illness. For this reason, we ask you to answer a few
questions about whom you contacted between yesterday (since when you
woke up) and until the same hour the next day.

We also ask about the (possible) age-range of your contacts, the setting
(household, work, school etc.) and the gender of the people you were in
contact with.

### How is the setting of a contact defined?

To help the analysis we also categorised contacts according categories/
locations:

-   Home: your house (example of contact: your household members, people
    visiting **your** house,\...).

-   Work: your working location (example of contact: customer,
    co-workers, ...). If you have multiple jobs, please include them
    all.

-   School: your school or university or higher education location
    (example of contacts: teacher, ...

-   Leisure: Every activity you planned to do with other people (example
    of contacts: person met at a bar or at the gym or in a house
    **different from yours**).

-   Other: everything not listed before (example of contacts: person met
    during commuting,\...).

Household members are defined as all people you live with on a daily
basis with whom you sleep under the same roof (for example also
co-residents).`
            ],
          ]),
          className: ''
        })
      ]
    })
  }
}


class ContactMatrix extends Item {
  qText: Map<string, string> | (StyledTextComponentProp | DateDisplayComponentProp)[];

  rowInfos: Array<{ key: string, label: Map<string, string> }> = [
    {
      key: 'r1', label: new Map([
        ["en", "0 - 3"],
      ]),
    },
    {
      key: 'r2', label: new Map([
        ["en", "3 - 6"],
      ]),
    },
    {
      key: 'r3', label: new Map([
        ["en", "7 - 12"],
      ]),
    },
    {
      key: 'r4', label: new Map([
        ["en", "13 - 18"],
      ]),
    },
    {
      key: 'r5', label: new Map([
        ["en", "19 - 29"],
      ]),
    },
    {
      key: 'r6', label: new Map([
        ["en", "30 - 39"],
      ]),
    },
    {
      key: 'r7', label: new Map([
        ["en", "40 - 49"],
      ]),
    },
    {
      key: 'r8', label: new Map([
        ["en", "50 - 59"],

      ]),
    },
    {
      key: 'r9', label: new Map([
        ["en", "60 - 69"],
      ]),
    },
    {
      key: 'r10', label: new Map([
        ["en", "70 - 79"],
      ]),
    },
    {
      key: 'r11', label: new Map([
        ["en", "80 - 89"],
      ]),
    },
    {
      key: 'r12', label: new Map([
        ["en", "90+"],
      ]),
    },
  ];

  columnInfos: Array<{ key: string, label: Map<string, string> }> = [
    {
      key: 'f', label: new Map([
        ["en", "Female"],
      ]),
    },
    {
      key: 'm', label: new Map([
        ["en", "Male"],
      ]),
    }
  ];

  constructor(parentKey: string,
    itemKey: string,
    qText: Map<string, string> | (StyledTextComponentProp | DateDisplayComponentProp)[],
    condition: Expression,
    isRequired?: boolean) {
    super(parentKey, itemKey);
    this.isRequired = isRequired;
    this.condition = condition;
    this.qText = qText;
  }

  generateRows() {
    const rowCategories = this.rowInfos.map(row => {
      return {
        key: row.key, role: 'row', label: row.label,
      }
    });

    const rows: any[] = [];
    rowCategories.forEach(row => {
      rows.push(row);
    })

    return rows;
  }

  validationRules(): Validation[] {
    return [
      {
        key: 'v1',
        type: 'hard',
        // at least one value is not 0
        rule: SurveyEngine.logic.or(
          ...this.rowInfos.map(row => {
            return SurveyEngine.logic.not(
              SurveyEngine.compare.eq(
                SurveyEngine.getResponseValueAsStr(this.key, `rg.rm.${row.key}-${this.columnInfos[0].key}`),
                '0'
              )
            )
          }),
          ...this.rowInfos.map(row => {
            return SurveyEngine.logic.not(
              SurveyEngine.compare.eq(
                SurveyEngine.getResponseValueAsStr(this.key, `rg.rm.${row.key}-${this.columnInfos[1].key}`),
                '0'
              )
            )
          })
        )
      }
    ];
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.responsiveMatrix({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.qText,
      responseType: 'dropdown',
      breakpoint: 'sm',
      columns: this.columnInfos,
      rows: this.generateRows(),
      dropdownConfig: {
        unselectedLabeL: new Map([
          ["en", "Select an option"],
        ]),
        options: dropdownOptions
      },
      customValidations: this.validationRules(),
    })
  }
}


class ProtectionUsage extends Item {
  qText: Map<string, string> | (StyledTextComponentProp | DateDisplayComponentProp)[];

  constructor(parentKey: string,
    itemKey: string,
    qText: Map<string, string> | (StyledTextComponentProp | DateDisplayComponentProp)[],
    condition: Expression,
    isRequired?: boolean) {
    super(parentKey, itemKey);
    this.isRequired = isRequired;
    this.condition = condition;
    this.qText = qText;
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.qText,
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["en", "No"],
          ])
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["en", "Yes"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["en", "I don't remember"],
          ])
        },
      ]
    })
  }
}


class Q1 extends Item {
  optionKeys = {
    yes: '1',
    no: '0',
    other: '3',
  };

  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'Q1');
    this.isRequired = isRequired;
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["en", "Did you have any social contact between yesterday 5am and 5 am today?"],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["en", "Yes"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["en", "No"],
          ])
        },
        {
          key: this.optionKeys.other, role: 'option',
          content: new Map([
            ["en", "I don't want to say"],
          ])
        }
      ]
    })
  }
}

class Q2 extends Item {
  optionKeys = {
    home: '1',
    work: '2',
    school: '3',
    leisure: '4',
    other: '5',
  };

  constructor(parentKey: string, condition: Expression, isRequired?: boolean) {
    super(parentKey, 'Q2');
    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["en", "Please select all the settings that apply"],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.home, role: 'option',
          content: new Map([
            ["en", "Home"],
          ])
        },
        {
          key: this.optionKeys.work, role: 'option',
          content: new Map([
            ["en", "Work"],
          ])
        },
        {
          key: this.optionKeys.school, role: 'option',
          content: new Map([
            ["en", "School"],
          ])
        },
        {
          key: this.optionKeys.leisure, role: 'option',
          content: new Map([
            ["en", "Leisure"],
          ])
        },
        {
          key: this.optionKeys.other, role: 'option',
          content: new Map([
            ["en", "Other"],
          ])
        }
      ]
    })
  }
}


class QFragile extends Item {
  optionKeys = {
    no: '0',
  };

  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'QFragile');
    this.isRequired = isRequired;
    // this.condition = condition;
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["en", "Did you visit an institute with (many) fragile people between yesterday 5am and 5 am today?"],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["en", "No"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.key, '1', '2', 'other')
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["en", "Yes, a care home"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.key, this.optionKeys.no)
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["en", "Yes, a hospital"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.key, this.optionKeys.no)
        },
        {
          key: 'other', role: 'input',
          content: new Map([
            ["en", "Other: "],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.key, this.optionKeys.no)
        },
      ]
    })
  }
}



export const Contacts = new ContactsDef();
