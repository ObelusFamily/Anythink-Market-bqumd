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
    const item = {"title":"title","description":"description","image":"asdasd","tagList":[],"favorited":false,"favoritesCount":0,"seller":user._id,"slug":randomString()}
    dbo.collection("items").insertOne(item, function(err, res) {
      if (err) throw err;
      console.log(`1 document inserted; ${item.title}; ${item.slug}`);
      db.close();
    });
  });
});

