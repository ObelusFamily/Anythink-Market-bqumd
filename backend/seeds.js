function randomString() {
  return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
}

const MongoClient = require('mongodb').MongoClient;
const dbName = process.env.NODE_ENV === 'development' && 'anythink-market' || 'anythink-market';
console.log('Connecting to mongo', process.env.NODE_ENV, dbName);
const NUM_USERS = process.env.NODE_ENV === 'development' && 100 || 1;
const NUM_ITEMS = process.env.NODE_ENV === 'development' && 100 || 1;
const NUM_COMMENTS = process.env.NODE_ENV === 'development' && 100 || 1;
const url = process.env.NODE_ENV === 'development' && process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/anythink-market';


MongoClient.connect(url, async (err, db) => {
  if (err) throw err;
  console.log('Mongo Connection:', url);
  const dbo = db.db(dbName);
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const dummyUser = { "role": "user", "username": "iamdror" + randomString(), "email": `iamdror+${randomString()}@gmail.com`, }
    users.push(dummyUser);
  }
  await dbo.collection("users").insertMany(users, async (err, res) => {
    if (err) throw err;

    console.log(`${res.insertedCount} users inserted; \n`, res.acknowledged, res.insertedCount);
    
    await dbo.collection("users").find({}).toArray(async (err, result) => {
      if (err || !result) throw err;
      console.log(`there are ${result.length} users in the database`);
      const user = result[0];
      
      console.log('user is: ', JSON.stringify(user));
      const items = [];
      for (let i = 0; i < NUM_ITEMS; i++) {
        const item = {"title":"title" + randomString(),"description":"description" + randomString(),"image":"https://picsum.photos/id/0/5616/3744","tagList":[],"favorited":false,"favoritesCount":0,"seller":user && user._id || randomString(),"slug":randomString()}
        items.push(item);
      }
      await dbo.collection("items").insertMany(items, async (err, res) => {
        if (err) throw err;
        console.log(`${items.length} items inserted; \n`, res.acknowledged, res.insertedCount);
        
        const comments = [];
        for (let i = 0; i < NUM_COMMENTS; i++) {
          const comment = {body: "comment!!!! " + randomString()};
          comments.push(comment);
        }

        await dbo.collection("comments").insertMany(comments, async (err, res) => {
          
          console.log(`${comments.length} comments inserted; \n`, res.acknowledged, res.insertedCount);
          
          console.log('Closing connectio; that was fun;');
          db.close();
        });
  
  
      });
  })

    
  });
  
});

