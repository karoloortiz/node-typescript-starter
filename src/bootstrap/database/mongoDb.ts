import { mongoClient } from ".";

export class MongoDb {
  public async save(document: any, collectionName: string): Promise<void> {
    await mongoClient.db().collection(collectionName).insertOne(document);
  }

  public async find(filter: any, collectionName: string): Promise<any[]> {
    return await mongoClient
      .db()
      .collection(collectionName)
      .find(filter)
      .toArray();
  }

  public async findOne(filter: any, collectionName: string): Promise<any> {
    return await mongoClient.db().collection(collectionName).findOne(filter);
  }

  public async update(filter: any, updates: any, collectionName: string) {
    await mongoClient
      .db()
      .collection(collectionName)
      .findOneAndUpdate(filter, { $set: updates });
  }

  public async deleteOne(filter: any, collectionName: string): Promise<void> {
    await mongoClient.db().collection(collectionName).findOneAndDelete(filter);
  }

  public async deleteMany(filter: any, collectionName: string): Promise<void> {
    await mongoClient.db().collection(collectionName).deleteMany(filter);
  }
}
