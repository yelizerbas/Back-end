require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gymbuddy.ejaie.mongodb.net/gymbuddy?retryWrites=true&w=majority`; 

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const connectDb = async () => {
  try {
    await client.connect();

    console.log('DB connected');
  } catch (error) {
    console.log('idk error');
    throw error;
  }
}

module.exports = { 
  connectDb
};

  
