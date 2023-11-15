import { spy, when } from "ts-mockito";
import { DigitalProductPersistanceModel } from "../../infra/db/models/digitalProductPersistanceModel";
import { DataValue, DigitalProductDataValues } from "../dataValuesRepo";
import { DataValuesRepo } from "./dataValuesRepo";

const dataValuesRepo = new DataValuesRepo();
const spyDataValuesRepo = spy(dataValuesRepo);

describe("Should return fake data values for a digital product", () => {
  test("Should return fake data values for singleField", async () => {
    const digitalProductRaw: DigitalProductPersistanceModel = {
      _id: "digitalProductId",
      name: "",
      changesHistory: [],

      pages: [
        {
          _id: "pageId",
          role: "",
          isRepeatable: false,

          name: "Home",
          sections: [
            {
              _id: "",
              role: "",

              name: "Hero",
              fields: [
                {
                  _id: "",
                  isList: false,
                  isInput: false,

                  name: "title",
                  type: "text_short",
                  models: [
                    {
                      id: "id#1",
                      name: "value",
                      type: "string",
                      maxLenght: 30,
                    },
                  ],
                },
                {
                  _id: "",
                  isList: false,
                  isInput: false,

                  name: "birthday",
                  type: "date",
                  models: [
                    { id: "id#2.1", name: "value", type: "date" },
                    {
                      id: "id#2.2",
                      name: "format",
                      type: "string",
                      format: "dateFormat",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    when(
      spyDataValuesRepo.getDigitalProductById("digitalProductId")
    ).thenReturn(Promise.resolve(digitalProductRaw));

    when(
      spyDataValuesRepo["generateSimpleFieldValue"]("string", undefined, 30)
    ).thenReturn("Questo è il titolo");
    when(
      spyDataValuesRepo["generateSimpleFieldValue"](
        "date",
        undefined,
        undefined
      )
    ).thenReturn("10/01/2022");
    when(
      spyDataValuesRepo["generateSimpleFieldValue"](
        "string",
        "dateFormat",
        undefined
      )
    ).thenReturn("dd/MM/AAAA");

    const result = await dataValuesRepo.getDigitalProductDataValues(
      "digitalProductId"
    );
    const expectedDataValues: DigitalProductDataValues = {
      id: "digitalProductId",
      pages: [
        {
          id: "pageId",
          dataValues: [
            {
              dataModelId: "id#1",
              value: "Questo è il titolo",
            },
            {
              dataModelId: "id#2.1",
              value: "10/01/2022",
            },
            {
              dataModelId: "id#2.2",
              value: "dd/MM/AAAA",
            },
          ],
        },
      ],
    };

    expect(result).toEqual(expectedDataValues);
  });

  test("Should return fake data values for fieldGroup", async () => {
    const digitalProductRaw: DigitalProductPersistanceModel = {
      _id: "digitalProductId",
      name: "",
      changesHistory: [],

      pages: [
        {
          _id: "pageId",
          role: "",
          isRepeatable: false,

          name: "Home",
          sections: [
            {
              _id: "",
              role: "",

              name: "Hero",
              fields: [
                {
                  _id: "",
                  isList: false,
                  isInput: false,

                  name: "Borsa",
                  fields: [
                    {
                      _id: "",
                      isList: false,
                      isInput: false,

                      name: "title",
                      type: "text_short",
                      models: [
                        {
                          id: "id#1",
                          name: "value",
                          type: "string",
                          maxLenght: 30,
                        },
                      ],
                    },
                    {
                      _id: "",
                      isList: false,
                      isInput: false,

                      name: "quantity",
                      type: "number",
                      models: [
                        {
                          id: "id#2",
                          name: "value",
                          type: "number",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    when(
      spyDataValuesRepo.getDigitalProductById("digitalProductId")
    ).thenReturn(Promise.resolve(digitalProductRaw));

    when(
      spyDataValuesRepo["generateSimpleFieldValue"]("string", undefined, 30)
    ).thenReturn("Questo è il titolo");
    when(
      spyDataValuesRepo["generateSimpleFieldValue"](
        "number",
        undefined,
        undefined
      )
    ).thenReturn("44.5");

    const result = await dataValuesRepo.getDigitalProductDataValues(
      "digitalProductId"
    );
    const expectedDataValues: DigitalProductDataValues = {
      id: "digitalProductId",
      pages: [
        {
          id: "pageId",
          dataValues: [
            {
              dataModelId: "id#1",
              value: "Questo è il titolo",
            },
            {
              dataModelId: "id#2",
              value: "44.5",
            },
          ],
        },
      ],
    };

    expect(result).toEqual(expectedDataValues);
  });

  test("Should return fake data values for fieldGroup list", async () => {
    const digitalProductRaw: DigitalProductPersistanceModel = {
      _id: "digitalProductId",
      name: "",
      changesHistory: [],

      pages: [
        {
          _id: "pageId",
          role: "",
          isRepeatable: false,

          name: "Home",
          sections: [
            {
              _id: "",
              role: "",

              name: "Hero",
              fields: [
                {
                  _id: "id#2",
                  isList: true,
                  isInput: false,

                  name: "Borse",
                  fields: [
                    {
                      _id: "",
                      isList: false,
                      isInput: false,

                      name: "title",
                      type: "text_short",
                      models: [
                        {
                          id: "id#1",
                          name: "value",
                          type: "string",
                          maxLenght: 30,
                        },
                      ],
                    },
                    {
                      _id: "id#2.1",
                      isList: true,
                      isInput: false,

                      name: "description",
                      type: "text_medium",
                      models: [
                        {
                          id: "id#1.2",
                          name: "value",
                          type: "string",
                          maxLenght: 150,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    when(
      spyDataValuesRepo.getDigitalProductById("digitalProductId")
    ).thenReturn(Promise.resolve(digitalProductRaw));

    when(
      spyDataValuesRepo["generateSimpleFieldValue"]("string", undefined, 30)
    ).thenReturn("Questo è il titolo");
    when(
      spyDataValuesRepo["generateSimpleFieldValue"]("string", undefined, 150)
    ).thenReturn("Questo è il sottotitolo");

    const result = await dataValuesRepo.getDigitalProductDataValues(
      "digitalProductId"
    );

    expect(
      (result.pages[0].dataValues[0].value[0] as DataValue[]).length
    ).toBeGreaterThanOrEqual(2);
    expect(
      (result.pages[0].dataValues[0].value[0] as DataValue[]).length
    ).toBeLessThanOrEqual(10);

    expect(
      (result.pages[0].dataValues[0].value[0][1].value as DataValue[]).length
    ).toBeGreaterThanOrEqual(2);
    expect(
      (result.pages[0].dataValues[0].value[0][1].value as DataValue[]).length
    ).toBeLessThanOrEqual(10);
  });
});
