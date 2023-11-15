import moment from "moment";
import { FakeData, FakeDataProps } from "./fakeData";

test("Should generate a fake string for a text_short field", () => {
  const props: FakeDataProps = {
    type: "text_short",
    dataStructure: [
      {
        name: "value",
        type: "string",
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isString(fakeData.value)).toBeTruthy();
});

test("Should generate a fake string for a text_medium field", () => {
  const props: FakeDataProps = {
    type: "text_medium",
    dataStructure: [
      {
        name: "value",
        type: "string",
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isString(fakeData.value)).toBeTruthy();
});

test("Should generate a fake string for a text_long field", () => {
  const props: FakeDataProps = {
    type: "text_long",
    dataStructure: [
      {
        name: "value",
        type: "string",
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isString(fakeData.value)).toBeTruthy();
});

test("Should generate a fake number for a number field", () => {
  const props: FakeDataProps = {
    type: "number",
    dataStructure: [
      {
        name: "value",
        type: "number",
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isNumber(fakeData.value)).toBeTruthy();
});

test("Should generate a fake string for a price field", () => {
  const props: FakeDataProps = {
    type: "price",
    dataStructure: [
      {
        name: "value",
        type: "string",
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isPrice(fakeData.value)).toBeTruthy();
});

test("Should generate a fake string for an image field", () => {
  const props: FakeDataProps = {
    type: "image",
    dataStructure: [
      {
        name: "value",
        type: "string",
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isImage(fakeData.value)).toBeTruthy();
});

test("Should generate a fake string for an email field", () => {
  const props: FakeDataProps = {
    type: "email",
    dataStructure: [
      {
        name: "value",
        type: "string",
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isEmail(fakeData.value)).toBeTruthy();
});

test("Should generate a fake string for a phone field", () => {
  const props: FakeDataProps = {
    type: "phone",
    dataStructure: [
      {
        name: "value",
        type: "string",
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isPhone(fakeData.value)).toBeTruthy();
});

test("Should generate a fake date object for a data field", () => {
  const props: FakeDataProps = {
    type: "date",
    dataStructure: [
      {
        name: "value",
        type: "string",
      },
      {
        name: "format",
        type: "string",
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isDate(fakeData.value)).toBeTruthy();
});

test("Should generate a fake data for a group field", () => {
  const props: FakeDataProps = {
    fields: [
      {
        name: "emailField",
        type: "email",
        dataStructure: [
          {
            name: "value",
            type: "string",
          },
        ],
      },
      {
        name: "phoneField",
        type: "phone",
        dataStructure: [
          {
            name: "value",
            type: "string",
          },
        ],
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isGroup(fakeData.value)).toBeTruthy();
  expect(isEmail(fakeData.value.emailField)).toBeTruthy();
  expect(isPhone(fakeData.value.phoneField)).toBeTruthy();
});

test("Should generate a fake data for a single field of type list", () => {
  const props: FakeDataProps = {
    isList: true,
    type: "phone",
    dataStructure: [
      {
        name: "value",
        type: "string",
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isList(fakeData.value, "phone")).toBeTruthy();
});

test("Should generate a fake data for field group of type list", () => {
  const props: FakeDataProps = {
    isList: true,
    fields: [
      {
        name: "emailField",
        type: "email",
        dataStructure: [
          {
            name: "value",
            type: "string",
          },
        ],
      },
      {
        name: "phoneField",
        type: "phone",
        dataStructure: [
          {
            name: "value",
            type: "string",
          },
        ],
      },
    ],
  };

  const fakeData = new FakeData(props);

  expect(isList(fakeData.value, "group")).toBeTruthy();
});

function isList(value: any[], type: string): boolean {
  let result = true;
  if (["text_short", "text_medium", "text_long"].includes(type)) {
    for (const element of value) {
      result = result && isString(element);
    }
  }

  if (type == "number") {
    for (const element of value) {
      result = result && isNumber(element);
    }
  }

  if (type == "price") {
    for (const element of value) {
      result = result && isPrice(element);
    }
  }

  if (type == "date") {
    for (const element of value) {
      result = result && isDate(element);
    }
  }

  if (type == "image") {
    for (const element of value) {
      result = result && isImage(element);
    }
  }

  if (type == "email") {
    for (const element of value) {
      result = result && isEmail(element);
    }
  }

  if (type == "phone") {
    for (const element of value) {
      result = result && isPhone(element);
    }
  }

  if (type == "group") {
    for (const element of value) {
      result = result && isGroup(element);
    }
  }

  return result;
}

function isGroup(value: any): boolean {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
}

function isString(value: any): boolean {
  return (
    value !== undefined &&
    value !== null &&
    (value instanceof String || typeof value === "string")
  );
}

function isNumber(value: any): boolean {
  return (
    value !== undefined &&
    value !== null &&
    (value instanceof Number || typeof value === "number")
  );
}

function isPrice(value: any): boolean {
  return isString(value) && value.at(0) == "$";
}

function isDate(value: any): boolean {
  return (
    value.value != undefined &&
    moment(value.value as string, "DD/MM/YYYY").isValid() &&
    value.format == "DD/MM/YYYY"
  );
}

function isImage(value: any): boolean {
  return isString(value) && (value as string).includes("https://");
}

function isEmail(value: any): boolean {
  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  return isString(value) && regex.test(value as string);
}

function isPhone(value: any): boolean {
  const regex = new RegExp(/^\+[0-9]{2} [0-9]{3} [0-9]{7}$/g);

  return isString(value) && regex.test(value as string);
}
