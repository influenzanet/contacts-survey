import {
  DateDisplayComponentProp,
  Item,
  StyledTextComponentProp,
  SurveyDefinition,
} from "case-editor-tools/surveys/types";
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../constants";
import {
  Expression,
  SurveySingleItem,
  Validation,
} from "survey-engine/data_types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";

import { Language, LanguageMap, LanguageHelpers } from "../languages/languageHelpers";

const dropdownOptions = [
  {
    key: "0",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.0",
      ],
      ["en", "0"],
      ["nl", "0"],
    ]),
  },
  {
    key: "1",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.1",
      ],
      ["en", "1"],
      ["nl", "1"],
    ]),
  },
  {
    key: "2",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.2",
      ],
      ["en", "2"],
      ["nl", "2"],
    ]),
  },
  {
    key: "3",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.3",
      ],
      ["en", "3"],
      ["nl", "3"],
    ]),
  },
  {
    key: "4",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.4",
      ],
      ["en", "4"],
      ["nl", "4"],
    ]),
  },
  {
    key: "5",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.5",
      ],
      ["en", "5"],
      ["nl", "5"],
    ]),
  },
  {
    key: "6",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.6",
      ],
      ["en", "6"],
      ["nl", "6"],
    ]),
  },
  {
    key: "8",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.7",
      ],
      ["en", "7-9"],
      ["nl", "7-9"],
    ]),
  },
  {
    key: "12",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.8",
      ],
      ["en", "10-14"],
      ["nl", "10-14"],
    ]),
  },
  {
    key: "17",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.9",
      ],
      ["en", "15-19"],
      ["nl", "15-19"],
    ]),
  },
  {
    key: "25",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.10",
      ],
      ["en", "20-30"],
      ["nl", "20-30"],
    ]),
  },
  {
    key: "40",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.option.11",
      ],
      ["en", "31-49"],
      ["nl", "31-49"],
    ]),
  },
  {
    key: "50+",
    label: new LanguageMap([
      [
        "id",
        "Contacts.ContactsHome.rg.rm.do.50+.responsiveMatrix.dropdownOptions.option.12",
      ],
      ["en", "50+"],
      ["nl", "50+"],
    ]),
  },
];

export class ContactsDef extends SurveyDefinition {
  Infos: Infos;
  Q1: Q1;
  Q2: Q2;
  ContactMatrixForHome: ContactMatrix;
  ContactMatrixForWork: ContactMatrix;
  ContactMatrixForSchool: ContactMatrix;
  ContactMatrixForLeisure: ContactMatrix;
  ContactMatrixForOther: ContactMatrix;
  QFragile: QFragile;
  languages: Language[];

  constructor(languages: Language[]) {
    super({
      surveyKey: surveyKeys.Contacts,
      name: new LanguageMap([
        ["id", "Contacts.name.0"],
        ["en", "Survey about your everyday social contacts"],
      ]),
      description: new LanguageMap([
        ["id", "Contacts.description.0"],
        ["en", ""],
      ]),
      durationText: new LanguageMap([
        ["id", "Contacts.typicalDuration.0"],
        ["en", "1 minute"],
      ]),
    });

    this.languages = languages;

    this.editor.setAvailableFor("public");
    this.editor.setRequireLoginBeforeSubmission(false);

    const isRequired = false;

    // Initialize/Configure questions here:
    this.Infos = new Infos(this.key);

    this.Q1 = new Q1(this.key, isRequired);
    this.Q2 = new Q2(
      this.key,
      SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.yes),
      isRequired
    );

    const conditionForHome = SurveyEngine.multipleChoice.any(
      this.Q2.key,
      this.Q2.optionKeys.home
    );
    this.ContactMatrixForHome = new ContactMatrix(
      this.key,
      "ContactsHome",
      new LanguageMap([
        ["id", "Contacts.ContactsHome.title.0"],
        [
          "en",
          "Indicate the number of contacts at home (per age category and gender)",
        ],
        [
          "nl",
          "Geef alsjeblieft het aantal personen aan (per leeftijdscategorie en geslacht) waarmee je gisteren THUIS hebt gesproken, of waarbij dichtbij bent geweest in dezelfde kamer (binnen 3 meter). Thuis = je woning (bijv. gezinsleden, bezoekers)",
        ],
      ]),
      conditionForHome,
      isRequired
    );

    /// WORK
    const conditionForWork = SurveyEngine.multipleChoice.any(
      this.Q2.key,
      this.Q2.optionKeys.work
    );
    this.ContactMatrixForWork = new ContactMatrix(
      this.key,
      "ContactsWork",
      new LanguageMap([
        ["id", "Contacts.ContactsWork.title.0"],
        [
          "en",
          "Indicate the number of contacts at work (per age category and gender)",
        ],
        [
          "nl",
          "Geef alsjeblieft het aantal personen aan (per leeftijdscategorie en geslacht) waarmee je gisteren op je WERK hebt gesproken, of waarbij dichtbij bent geweest in dezelfde kamer (binnen 3 meter). Werk = je werk (bijv. klanten, collegas)",
        ],
      ]),
      conditionForWork,
      isRequired
    );

    /// SCHOOL
    const conditionForSchool = SurveyEngine.multipleChoice.any(
      this.Q2.key,
      this.Q2.optionKeys.school
    );
    this.ContactMatrixForSchool = new ContactMatrix(
      this.key,
      "ContactsSchool",
      new LanguageMap([
        ["id", "Contacts.ContactsSchool.title.0"],
        [
          "en",
          "Indicate the number of contacts at school (per age category and gender)",
        ],
        [
          "nl",
          "Geef alsjeblieft het aantal personen aan (per leeftijdscategorie en geslacht) waarmee je gisteren op SCHOOL hebt gesproken, of waarbij dichtbij bent geweest in dezelfde kamer (binnen 3 meter). School = onderwijsinstellingen (bijv. docenten, klasgenoten)",
        ],
      ]),
      conditionForSchool,
      isRequired
    );

    /// LEISURE
    const conditionForLeisure = SurveyEngine.multipleChoice.any(
      this.Q2.key,
      this.Q2.optionKeys.leisure
    );
    this.ContactMatrixForLeisure = new ContactMatrix(
      this.key,
      "ContactsLeisure",
      new LanguageMap([
        ["id", "Contacts.ContactsLeisure.title.0"],
        [
          "en",
          "Indicate the number of contacts during leisure (per age category and gender)",
        ],
        [
          "nl",
          "Geef alsjeblieft het aantal personen aan (per leeftijdscategorie en geslacht) waarmee je gisteren tijdens VRIJE TIJD hebt gesproken en/of aangeraakt, of waarbij dichtbij bent geweest in dezelfde kamer (binnen 3 meter). Vrije tijd = geplande activiteiten met anderen (bijv. mensen die je ontmoet in een café, sportschool of bij iemand anders thuis).",
        ],
      ]),
      conditionForLeisure,
      isRequired
    );

    /// OTHER
    const conditionForOther = SurveyEngine.multipleChoice.any(
      this.Q2.key,
      this.Q2.optionKeys.other
    );
    this.ContactMatrixForOther = new ContactMatrix(
      this.key,
      "ContactsOther",
      new LanguageMap([
        ["id", "Contacts.ContactsOther.title.0"],
        [
          "en",
          "Indicate the number of contacts during other activities (per age category and gender)",
        ],
        [
          "nl",
          "Geef alsjeblieft het aantal personen aan (per leeftijdscategorie en geslacht) waarmee je gisteren tijdens OVERIGE ACTIVITEITEN hebt gesproken en/of aangeraakt, of waarbij dichtbij bent geweest in dezelfde kamer (binnen 3 meter). Overige activiteiten = alle locaties die niet worden genoemd in de andere groepen (bijv. mensen die u ontmoet in het openbaar vervoer).",
        ],
      ]),
      conditionForOther,
      isRequired
    );

    this.QFragile = new QFragile(this.key, isRequired);

    /// Prefill rules:

    this.editor.setPrefillRules([
      /// HOME:
      ...this.ContactMatrixForHome.rowInfos
        .map((rowInfo) => {
          return rowInfo.key;
        })
        .map((key) =>
          StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(
            this.ContactMatrixForHome.key,
            `rg.rm.${key}-${this.ContactMatrixForHome.columnInfos[0].key}`,
            "0"
          )
        ),
      ...this.ContactMatrixForHome.rowInfos
        .map((rowInfo) => {
          return rowInfo.key;
        })
        .map((key) =>
          StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(
            this.ContactMatrixForHome.key,
            `rg.rm.${key}-${this.ContactMatrixForHome.columnInfos[1].key}`,
            "0"
          )
        ),
      /// WORK:
      ...this.ContactMatrixForWork.rowInfos
        .map((rowInfo) => {
          return rowInfo.key;
        })
        .map((key) =>
          StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(
            this.ContactMatrixForWork.key,
            `rg.rm.${key}-${this.ContactMatrixForWork.columnInfos[0].key}`,
            "0"
          )
        ),
      ...this.ContactMatrixForWork.rowInfos
        .map((rowInfo) => {
          return rowInfo.key;
        })
        .map((key) =>
          StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(
            this.ContactMatrixForWork.key,
            `rg.rm.${key}-${this.ContactMatrixForWork.columnInfos[1].key}`,
            "0"
          )
        ),
      /// SCHOOL:
      ...this.ContactMatrixForSchool.rowInfos
        .map((rowInfo) => {
          return rowInfo.key;
        })
        .map((key) =>
          StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(
            this.ContactMatrixForSchool.key,
            `rg.rm.${key}-${this.ContactMatrixForSchool.columnInfos[0].key}`,
            "0"
          )
        ),
      ...this.ContactMatrixForSchool.rowInfos
        .map((rowInfo) => {
          return rowInfo.key;
        })
        .map((key) =>
          StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(
            this.ContactMatrixForSchool.key,
            `rg.rm.${key}-${this.ContactMatrixForSchool.columnInfos[1].key}`,
            "0"
          )
        ),
      /// LEISURE:
      ...this.ContactMatrixForLeisure.rowInfos
        .map((rowInfo) => {
          return rowInfo.key;
        })
        .map((key) =>
          StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(
            this.ContactMatrixForLeisure.key,
            `rg.rm.${key}-${this.ContactMatrixForLeisure.columnInfos[0].key}`,
            "0"
          )
        ),
      ...this.ContactMatrixForLeisure.rowInfos
        .map((rowInfo) => {
          return rowInfo.key;
        })
        .map((key) =>
          StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(
            this.ContactMatrixForLeisure.key,
            `rg.rm.${key}-${this.ContactMatrixForLeisure.columnInfos[1].key}`,
            "0"
          )
        ),
      /// OTHER:
      ...this.ContactMatrixForOther.rowInfos
        .map((rowInfo) => {
          return rowInfo.key;
        })
        .map((key) =>
          StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(
            this.ContactMatrixForOther.key,
            `rg.rm.${key}-${this.ContactMatrixForOther.columnInfos[0].key}`,
            "0"
          )
        ),
      ...this.ContactMatrixForOther.rowInfos
        .map((rowInfo) => {
          return rowInfo.key;
        })
        .map((key) =>
          StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(
            this.ContactMatrixForOther.key,
            `rg.rm.${key}-${this.ContactMatrixForOther.columnInfos[1].key}`,
            "0"
          )
        ),
    ]);
  }

  buildSurvey() {

    LanguageHelpers.languages = new Map();
    for (const language of this.languages)
            LanguageHelpers.addLanguage(language.languageId, language.translations);

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
    super(parentKey, "Info");
    this.condition = condition;
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new LanguageMap([
            ["id", "Contacts.Info.x46.markdown.0"],
            [
              "en",
              `
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
co-residents).`,
            ],
          ]),
          className: "",
        }),
      ],
    });
  }
}

class ContactMatrix extends Item {
  qText:
    | Map<string, string>
    | (StyledTextComponentProp | DateDisplayComponentProp)[];

  rowInfos: Array<{ key: string; label: Map<string, string> }> = [
    {
      key: "r1",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r1.responsiveMatrix.rows.row.0",
        ],
        ["en", "0 - 3"],
        ["nl", "0-3 jaar"],
      ]),
    },
    {
      key: "r2",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r2.responsiveMatrix.rows.row.1",
        ],
        ["en", "3 - 6"],
        ["nl", "4-6 jaar"],
      ]),
    },
    {
      key: "r3",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r3.responsiveMatrix.rows.row.2",
        ],
        ["en", "7 - 12"],
        ["nl", "7-12 jaar"],
      ]),
    },
    {
      key: "r4",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r4.responsiveMatrix.rows.row.3",
        ],
        ["en", "13 - 18"],
        ["nl", "13-18 jaar"],
      ]),
    },
    {
      key: "r5",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r5.responsiveMatrix.rows.row.4",
        ],
        ["en", "19 - 29"],
        ["nl", "19-29 jaar"],
      ]),
    },
    {
      key: "r6",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r6.responsiveMatrix.rows.row.5",
        ],
        ["en", "30 - 39"],
        ["nl", "30-39 jaar"],
      ]),
    },
    {
      key: "r7",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r7.responsiveMatrix.rows.row.6",
        ],
        ["en", "40 - 49"],
        ["nl", "40-49 jaar"],
      ]),
    },
    {
      key: "r8",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r8.responsiveMatrix.rows.row.7",
        ],
        ["en", "50 - 59"],
        ["nl", "50-59 jaar"],
      ]),
    },
    {
      key: "r9",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r9.responsiveMatrix.rows.row.8",
        ],
        ["en", "60 - 69"],
        ["nl", "60-69 jaar"],
      ]),
    },
    {
      key: "r10",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r10.responsiveMatrix.rows.row.9",
        ],
        ["en", "70 - 79"],
        ["nl", "70-79 jaar"],
      ]),
    },
    {
      key: "r11",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r11.responsiveMatrix.rows.row.10",
        ],
        ["en", "80 - 89"],
        ["nl", "80-89 jaar"],
      ]),
    },
    {
      key: "r12",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.rows.r12.responsiveMatrix.rows.row.11",
        ],
        ["en", "90+"],
        ["nl", "90+ jaar"],
      ]),
    },
  ];

  columnInfos: Array<{ key: string; label: Map<string, string> }> = [
    {
      key: "f",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.cols.f.responsiveMatrix.columns.category.0",
        ],
        ["en", "Female"],
        ["nl", "Vrouw"],
      ]),
    },
    {
      key: "m",
      label: new LanguageMap([
        [
          "id",
          "Contacts.ContactsHome.rg.rm.cols.m.responsiveMatrix.columns.category.1",
        ],
        ["en", "Male"],
        ["nl", "Man"],
      ]),
    },
  ];

  constructor(
    parentKey: string,
    itemKey: string,
    qText:
      | Map<string, string>
      | (StyledTextComponentProp | DateDisplayComponentProp)[],
    condition: Expression,
    isRequired?: boolean
  ) {
    super(parentKey, itemKey);
    this.isRequired = isRequired;
    this.condition = condition;
    this.qText = qText;
  }

  generateRows() {
    const rowCategories = this.rowInfos.map((row) => {
      return {
        key: row.key,
        role: "row",
        label: row.label,
      };
    });

    const rows: any[] = [];
    rowCategories.forEach((row) => {
      rows.push(row);
    });

    return rows;
  }

  validationRules(): Validation[] {
    return [
      {
        key: "v1",
        type: "hard",
        // at least one value is not 0
        rule: SurveyEngine.logic.or(
          ...this.rowInfos.map((row) => {
            return SurveyEngine.logic.not(
              SurveyEngine.compare.eq(
                SurveyEngine.getResponseValueAsStr(
                  this.key,
                  `rg.rm.${row.key}-${this.columnInfos[0].key}`
                ),
                "0"
              )
            );
          }),
          ...this.rowInfos.map((row) => {
            return SurveyEngine.logic.not(
              SurveyEngine.compare.eq(
                SurveyEngine.getResponseValueAsStr(
                  this.key,
                  `rg.rm.${row.key}-${this.columnInfos[1].key}`
                ),
                "0"
              )
            );
          })
        ),
      },
    ];
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.responsiveMatrix({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.qText,
      responseType: "dropdown",
      breakpoint: "sm",
      columns: this.columnInfos,
      rows: this.generateRows(),
      dropdownConfig: {
        unselectedLabeL: new LanguageMap([
          [
            "id",
            "Contacts.ContactsHome.rg.rm.do.responsiveMatrix.dropdownOptions.1",
          ],
          ["en", "Select an option"],
          ["nl", "Selecteer een optie"],
        ]),
        options: dropdownOptions,
      },
      customValidations: this.validationRules(),
    });
  }
}

class Q1 extends Item {
  optionKeys = {
    yes: "1",
    no: "0",
    other: "3",
  };

  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, "Q1");
    this.isRequired = isRequired;
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new LanguageMap([
        ["id", "Contacts.Q1.title.0"],
        [
          "en",
          "Did you have any social contact between yesterday 5am and 5 am today?",
        ],
        [
          "nl",
          "Heb je gisteren met tenminste één ander persoon gesproken en/of aangeraakt, of ben je dichtbij een ander geweest in dezelfde kamer (binnen 3 meter)?",
        ],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes,
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.Q1.rg.scg.option.0"],
            ["en", "Yes"],
            [
              "nl",
              "Ja, ik heb met tenminste één ander persoon gesproken en/of aangeraakt, of ben dichtbij een ander geweest in dezelfde kamer (binnen 3 meter).",
            ],
          ]),
        },
        {
          key: this.optionKeys.no,
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.Q1.rg.scg.option.1"],
            ["en", "No"],
            [
              "nl",
              "Nee, ik heb met niemand gesproken en/of aangeraakt, en ik ben NIET dichtbij iemand anders geweest in dezelfde kamer (binnen 3 meter).",
            ],
          ]),
        },
        {
          key: this.optionKeys.other,
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.Q1.rg.scg.option.2"],
            ["en", "I don't want to say"],
            ["nl", "Dat wil ik liever niet zeggen"],
          ]),
        },
      ],
    });
  }
}

class Q2 extends Item {
  optionKeys = {
    home: "1",
    work: "2",
    school: "3",
    leisure: "4",
    other: "5",
  };

  constructor(parentKey: string, condition: Expression, isRequired?: boolean) {
    super(parentKey, "Q2");
    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new LanguageMap([
        ["id", "Contacts.Q2.title.0"],
        ["en", "Please select all the settings that apply"],
        [
          "nl",
          "Selecteer alsjeblieft alle plekken waar je tenminste met één persoon hebt gesproken en/of aangeraakt, of dichtbij bent geweest in dezelfde kamer (binnen 3 meter)?",
        ],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.home,
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.Q2.rg.mcg.option.0"],
            ["en", "Home"],
            ["nl", "Thuis: je woning (bijv. gezinsleden, bezoekers)."],
          ]),
        },
        {
          key: this.optionKeys.work,
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.Q2.rg.mcg.option.1"],
            ["en", "Work"],
            ["nl", "Werk: je werk (bijv. klanten, collega's)"],
          ]),
        },
        {
          key: this.optionKeys.school,
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.Q2.rg.mcg.option.2"],
            ["en", "School"],
            [
              "nl",
              "School: onderwijsinstellingen (bijv. docenten, klasgenoten)",
            ],
          ]),
        },
        {
          key: this.optionKeys.leisure,
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.Q2.rg.mcg.option.3"],
            ["en", "Leisure"],
            [
              "nl",
              "Vrije tijd: geplande activiteiten met anderen (bijv. mensen die je ontmoet in een café, wandeling, sport(school) of bij iemand anders thuis).",
            ],
          ]),
        },
        {
          key: this.optionKeys.other,
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.Q2.rg.mcg.option.4"],
            ["en", "Other"],
            [
              "nl",
              "Overige activiteiten: alle locaties die hierboven niet worden genoemd (bijv. mensen die je ontmoet in het openbaar vervoer of winkel).",
            ],
          ]),
        },
      ],
    });
  }
}

class QFragile extends Item {
  optionKeys = {
    no: "0",
  };

  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, "QFragile");
    this.isRequired = isRequired;
    // this.condition = condition;
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new LanguageMap([
        ["id", "Contacts.QFragile.title.0"],
        [
          "en",
          "Did you visit an institute with (many) fragile people between yesterday 5am and 5 am today?",
        ],
        [
          "nl",
          "Heb je gisteren een instelling met (veel) kwetsbare mensen bezocht? (kwetsbare mensen zijn mensen met een extra hoog risico voor ernstige klachten bij een besmetting)",
        ],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.no,
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.QFragile.rg.mcg.option.0"],
            ["en", "No"],
            ["nl", "Nee"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(
            this.key,
            "1",
            "2",
            "3",
            "4",
            "5",
            "other"
          ),
        },
        {
          key: "1",
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.QFragile.rg.mcg.option.1"],
            ["en", "Yes, a care home"],
            ["nl", "Ja, een verpleeg- of verzorgingstehuis"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(
            this.key,
            this.optionKeys.no
          ),
        },
        {
          key: "3",
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.QFragile.rg.mcg.option.2"],
            ["en", "TODO"],
            ["nl", "Ja, een instelling voor begeleid wonen"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(
            this.key,
            this.optionKeys.no
          ),
        },
        {
          key: "2",
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.QFragile.rg.mcg.option.3"],
            ["en", "Yes, a hospital"],
            ["nl", "Ja, een ziekenhuis"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(
            this.key,
            this.optionKeys.no
          ),
        },
        {
          key: "4",
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.QFragile.rg.mcg.option.4"],
            ["en", "TODO"],
            [
              "nl",
              "Ja, een zorginstelling anders dan een ziekenhuis (bijvoorbeeld huisarts, fysiotherapeut, vaccinatiekliniek)",
            ],
          ]),
          disabled: SurveyEngine.multipleChoice.any(
            this.key,
            this.optionKeys.no
          ),
        },
        {
          key: "5",
          role: "option",
          content: new LanguageMap([
            ["id", "Contacts.QFragile.rg.mcg.option.5"],
            ["en", "TODO"],
            ["nl", "Ja, een hospice"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(
            this.key,
            this.optionKeys.no
          ),
        },
        {
          key: "other",
          role: "input",
          style: [{ key: "maxLength", value: "160" }],
          content: new LanguageMap([
            ["id", "Contacts.QFragile.rg.mcg.other.input.6"],
            ["en", "Other: "],
            ["nl", "Anders: "],
          ]),
          disabled: SurveyEngine.multipleChoice.any(
            this.key,
            this.optionKeys.no
          ),
        },
      ],
    });
  }
}
