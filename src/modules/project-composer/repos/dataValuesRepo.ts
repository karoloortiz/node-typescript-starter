export interface IDataValuesRepo {
  getDigitalProductDataValues(
    digitalProductId: string
  ): Promise<DigitalProductDataValues>;
}

export interface DigitalProductDataValues {
  id: string;
  pages: {
    id: string;
    dataValues: DataValue[];
  }[];
}

export interface DataValue {
  dataModelId: string;
  value: string | number | DataValue[][];
}
