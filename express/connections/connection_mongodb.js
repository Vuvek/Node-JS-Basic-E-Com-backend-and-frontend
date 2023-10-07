import { MongoClient } from "mongodb";

console.log(
  "****************************************** DB Connection Running ********************************************"
);

class MongoQueries {
  constructor(dbName, collectionName) {
    this.url = "mongodb+srv://vuvek:test@cluster0.1wiww.mongodb.net/";
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.client = new MongoClient(this.url);
  }
  async connect() {
    this.con = await this.client.connect();
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection(this.collectionName);
  }
  async insertOneRecord(document) {
    try {
      const result = await this.collection.insertOne(document);
      return result;
    } catch (error) {
      console.error("Error inserting document:", error);
    }
  }
  async insertManyRecord(documents) {
    try {
      const result = await this.collection.insertMany(documents);
      return result;
    } catch (error) {
      console.error("Error inserting document:", error);
    }
  }
  async findAllData() {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      console.error("Error inserting document:", error);
    }
  }
  async findAllDataByQuery(query) {
    try {
      return await this.collection.find(query).toArray();
    } catch (error) {
      console.error("Error inserting document:", error);
    }
  }

  async updateDocument(filter, update) {
    try {
      return await this.collection.updateOne(filter, update);
    } catch (error) {
      console.error("Error inserting document:", error);
    }
  }
  async deleteDocument(filter) {
    try {
      return await this.collection.deleteOne(filter);
    } catch (error) {
      console.error("Error inserting document:", error);
    }
  }

  async closeConnection() {
    await this.client.close();
    console.log("MongoDB connection closed");
  }
}

const db = new MongoQueries("e-comm", "products");
export default db;

// db.connect().then(async () => {
//   const inserted = await db.insertOneRecord({
//     name: "note 5",
//     brand: "vivo",
//     price: 320,
//     category: "mobile",
//   });
//   const insertedMany = await db.insertManyRecord([
//     { name: "note 6", brand: "vivo", price: 320, category: "mobile" },
//     { name: "note 7", brand: "vivo", price: 320, category: "mobile" },
//   ]);
//   const allData = await db.findAllData();
//   const updated = await db.updateDocument(
//     { name: "note 5" },
//     { $set: { name: "note77" } }
//   );
//   const deleted = await db.deleteDocument({ name: "node 5" });
//   console.log(allData, updated, deleted);
//   await db.closeConnection();
// });
