import { Item, SurveyDefinition } from "case-editor-tools/surveys/types";
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { surveyKeys } from "../constants";


class ContactsDef extends SurveyDefinition {
  // TODO:
  ContactMatrix: ContaxtMatrixWithGender;

  constructor() {
    super({
      surveyKey: surveyKeys.Contacts,
      name: new Map([
        ["en", "Contacts survey"],
      ]),
      description: new Map([
        ["en", "Survey about contacts."],
      ]),
      durationText: new Map([
        ["en", "1 minute"],
      ])
    });

    const isRequired = true;

    // Initialize/Configure questions here:
    this.ContactMatrix = new ContaxtMatrixWithGender(this.key, isRequired);
  }

  buildSurvey() {
    // Define order of the questions here:
    this.addItem(this.ContactMatrix.get());
  }
}


class ContaxtMatrixWithGender extends Item {

  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'ContactMatrix');
    this.isRequired = isRequired;
  }

  generateRows() {
    const rowCategories = [
      {
        key: 'r1', role: 'category', label: new Map([
          ["en", "0 - 3"],
        ]),
      },
      {
        key: 'r2', role: 'category', label: new Map([
          ["en", "3 - 6"],
        ]),
      },
      {
        key: 'r3', role: 'category', label: new Map([
          ["en", "7 - 12"],
        ]),
      },
      {
        key: 'r4', role: 'category', label: new Map([
          ["en", "13 - 18"],
        ]),
      },
      {
        key: 'r5', role: 'category', label: new Map([
          ["en", "19 - 29"],
        ]),
      },
      {
        key: 'r6', role: 'category', label: new Map([
          ["en", "30 - 39"],
        ]),
      },
      {
        key: 'r7', role: 'category', label: new Map([
          ["en", "40 - 49"],
        ]),
      },
      {
        key: 'r8', role: 'category', label: new Map([
          ["en", "50 - 59"],
        ]),
      },
      {
        key: 'r9', role: 'category', label: new Map([
          ["en", "60 - 69"],
        ]),
      },
      {
        key: 'r10', role: 'category', label: new Map([
          ["en", "70 - 79"],
        ]),
      },
      {
        key: 'r11', role: 'category', label: new Map([
          ["en", "80 - 89"],
        ]),
      },
      {
        key: 'r12', role: 'category', label: new Map([
          ["en", "90+"],
        ]),
      },
    ];

    const rows: any[] = [];
    rowCategories.forEach(row => {
      rows.push(row);
      rows.push({
        key: `${row.key}m`, role: 'row', label: new Map([
          ["en", "Male"],
        ]),
      });
      rows.push({
        key: `${row.key}f`, role: 'row', label: new Map([
          ["en", "Female"],
        ]),
      });
    })

    return rows;
  }

  buildItem() {
    return SurveyItems.responsiveMatrix({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["en", "TODO: question text"],
      ]),
      questionSubText: new Map([
        ["en", "TODO: explanation"],
      ]),
      responseType: 'dropdown',
      breakpoint: 'sm',
      columns: [
        {
          key: 'i', label: new Map([
            ["en", "Indoor"],
          ]),
        },
        {
          key: 'o', label: new Map([
            ["en", "Outdoor"],
          ]),
        }
      ],
      rows: this.generateRows(),
      dropdownConfig: {
        unselectedLabeL: new Map([
          ["en", "Select an option"],
        ]),
        options: [
          { key: '0', label: new Map([["en", "0"],]), },
          { key: '1', label: new Map([["en", "1"],]), },
          { key: '2', label: new Map([["en", "2"],]), },
          { key: '3', label: new Map([["en", "3 - 4"],]), },
          { key: '4', label: new Map([["en", "5 - 9"],]), },
          { key: '5', label: new Map([["en", "9+"],]), },
        ]
      }
    })
  }
}


export const Contacts = new ContactsDef();
