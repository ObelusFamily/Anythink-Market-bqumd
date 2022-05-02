function randomString() {
  return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
}
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  const dbo = db.db("admin");
  dbo.collection("users").find({}).toArray(function(err, result) {
    if (err || !result) throw err;
    console.log(result[0]);
    const user = result[0];
    const items = [];
    for (let i = 0; i < 5; i++) {
      const item = {"title":"title" + randomString(),"description":"description" + randomString(),"image":`https://i.picsum.photos/id/383/200/301.jpg?hmac=TGwwM8PMWk_qJx0gBlfMpy-jSI-Vswo8thS1eH1CEwg`,"tagList":[],"favorited":false,"favoritesCount":0,"seller":user && user._id || randomString(),"slug":randomString()}
      items.push(item);
    }
    dbo.collection("items").insertMany(items, function(err, res) {
      if (err) throw err;
      console.log(`${items.length} document inserted; \n ${items};`);
      db.close();
    });
  });
});

