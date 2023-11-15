import { faker } from "@faker-js/faker";
import moment from "moment";
import { MongoDb } from "../../../../bootstrap/database/mongoDb";
import { DigitalProductPersistanceModel } from "../../infra/db/models/digitalProductPersistanceModel";
import { FieldPersistanceModel } from "../../infra/db/models/fieldPersistanceModel";
import { PagePersistanceModel } from "../../infra/db/models/pagePersistanceModel";
import {
  DataValue,
  DigitalProductDataValues,
  IDataValuesRepo,
} from "../dataValuesRepo";

export class DataValuesRepo implements IDataValuesRepo {
  private mongoDb: MongoDb;
  private collection = "digital_products";

  constructor() {
    this.mongoDb = new MongoDb();
  }

  public async getDigitalProductDataValues(
    digitalProductId: string
  ): Promise<DigitalProductDataValues> {
    const digitalProductRaw = await this.getDigitalProductById(
      digitalProductId
    );

    return {
      id: digitalProductRaw._id,
      pages: digitalProductRaw.pages.map((p) => {
        return { id: p._id, dataValues: this.getDataValuesFromPage(p) };
      }),
    };
  }

  public async getDigitalProductById(
    id: string
  ): Promise<DigitalProductPersistanceModel> {
    const raw = await this.mongoDb.findOne({ _id: id }, this.collection);

    if (raw) {
      return raw;
    }

    return null;
  }

  private getDataValuesFromPage(page: PagePersistanceModel): DataValue[] {
    const dataValues: DataValue[] = [];
    for (const section of page.sections) {
      for (const field of section.fields) {
        dataValues.push(...this.getDataValuesFromField(field, field.isList));
      }
    }
    return dataValues;
  }

  private getDataValuesFromField(
    field: FieldPersistanceModel,
    isList: boolean
  ): DataValue[] {
    if (!isList) {
      const dataValues: DataValue[] = [];
      if (!field.fields) {
        for (const model of field.models) {
          const value = this.generateSimpleFieldValue(
            model.type,
            model.format,
            model.maxLenght
          );
          const dataValue: DataValue = { dataModelId: model.id, value: value };
          dataValues.push(dataValue);
        }
      }

      if (field.fields) {
        for (const f of field.fields) {
          dataValues.push(...this.getDataValuesFromField(f, f.isList));
        }
      }
      return dataValues;
    }

    if (isList) {
      const fakeList: DataValue[] = [];

      const dataValuesList: DataValue[][] = [];
      const listLength = faker.datatype.number({ min: 2, max: 10 });

      for (let i = 0; i < listLength; i++) {
        dataValuesList.push(this.getDataValuesFromField(field, false));
      }

      fakeList.push({ dataModelId: field._id, value: dataValuesList });

      return fakeList;
    }
  }

  private generateSimpleFieldValue(
    type: string,
    format?: "email" | "dateFormat" | "imageUrl" | "phone",
    maxLenght?: number
  ): string | number {
    if (type == "string") {
      if (!format) {
        if (maxLenght) {
          return faker.lorem.sentence(maxLenght);
        }
      }
      if (format == "email") {
        return faker.internet.email();
      }

      if (format == "dateFormat") {
        return "DD/MM/YYYY";
      }

      if (format == "imageUrl") {
        return faker.image.imageUrl();
      }

      if (format == "phone") {
        return faker.phone.number("+## ### #######");
      }
    }

    if (type == "number") {
      return parseInt(faker.random.numeric());
    }

    if (type == "date") {
      return moment(faker.date.soon()).format("DD/MM/YYYY");
    }
    // if (type == "price") {
    //   return faker.finance.amount(0, 100, 2, "$");
    // }
  }
}
