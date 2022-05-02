const e = require('express');

function randomString() {
  return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
}
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
MongoClient.connect(url, async (err, db) => {
  if (err) throw err;
  const dbo = db.db("admin");
  const users = [];
  for (let i = 0; i < 100; i++) {
    const dummyUser = { "role": "user", "username": "iamdror" + randomString(), "email": `iamdror+${randomString()}@gmail.com`, }
    users.push(dummyUser);
  }
  await dbo.collection("users").insertMany(users, async (err, res) => {
    if (err) throw err;

    console.log(`${res.insertedCount} users inserted; \n`, res);
  })

  await dbo.collection("users").find({}).toArray(async (err, result) => {
    if (err || !result) throw err;
    console.log(`there are ${result.length} users in the database`);
    const user = result[0];
    
    console.log('user is: ', JSON.stringify(user));
    const items = [];
    for (let i = 0; i < 100; i++) {
      const item = {"title":"title" + randomString(),"description":"description" + randomString(),"image":`https://i.picsum.photos/id/383/200/301.jpg?hmac=TGwwM8PMWk_qJx0gBlfMpy-jSI-Vswo8thS1eH1CEwg`,"tagList":[],"favorited":false,"favoritesCount":0,"seller":user && user._id || randomString(),"slug":randomString()}
      items.push(item);
    }
    await dbo.collection("items").insertMany(items, async (err, res) => {
      if (err) throw err;
      console.log(`${items.length} document inserted; \n`, res);
      
      console.log('Closing connectio; that was fun;');
      db.close();
    });
    
  });
  
});

