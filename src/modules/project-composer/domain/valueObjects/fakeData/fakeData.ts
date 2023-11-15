import moment from "moment";
import { ValueObject } from "../../../../../ddd-primitives";
import { faker } from "@faker-js/faker";

export interface FakeDataProps {
  name?: string;
  type?: string;
  isList?: boolean;
  fields?: FakeDataProps[];
  dataStructure?: {
    name: string;
    type: string;
  }[];
}

export class FakeData extends ValueObject<FakeDataProps> {
  private _value: any;

  constructor(props: FakeDataProps) {
    super(props);
    if (!props.isList) {
      this._value = this.generateValue(props);
    }
    if (props.isList) {
      const fakeList = [];
      const listLength = faker.datatype.number({ min: 3, max: 10 });

      for (let i = 0; i < listLength; i++) {
        fakeList.push(this.generateValue(props));
      }

      this._value = fakeList;
    }
  }

  private generateValue(props: FakeDataProps): any {
    if (!props.fields) {
      return this.generateSimpleFieldValue(props);
    }

    if (props.fields) {
      let value = {};
      for (const field of props.fields) {
        value[field.name] = this.generateValue(field);
      }
      return value;
    }
  }

  private generateSimpleFieldValue(props: FakeDataProps) {
    if (props.type == "text_short") {
      return faker.lorem.words(5);
    }

    if (props.type == "text_medium") {
      return faker.lorem.lines(2);
    }

    if (props.type == "text_long") {
      return faker.lorem.paragraph();
    }

    if (props.type == "number") {
      return parseInt(faker.random.numeric());
    }

    if (props.type == "price") {
      return faker.finance.amount(0, 100, 2, "$");
    }

    if (props.type == "date") {
      return {
        value: moment(faker.date.soon()).format("DD/MM/YYYY"),
        format: "DD/MM/YYYY",
      };
    }

    if (props.type == "image") {
      return faker.image.imageUrl();
    }

    if (props.type == "email") {
      return faker.internet.email();
    }

    if (props.type == "phone") {
      return faker.phone.number("+## ### #######");
    }
  }

  public get value(): any {
    return this._value;
  }

  public get valueAsString(): string {
    if (
      [
        "text_short",
        "text_medium",
        "text_long",
        "price",
        "image",
        "email",
        "phone",
      ].includes(this.props.type)
    ) {
      return "`" + this._value + "`";
    }

    if (this.props.type == "number") {
      return this._value;
    }

    if (this.props.type == "date") {
      const object = {
        value: "`" + this._value["value"] + "`",
        format: "`" + this._value["format"] + "`",
      };

      return JSON.stringify(object);
    }
  }
}
