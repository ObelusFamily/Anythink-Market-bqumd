#!/bin/sh


mongo mongodb://127.0.0.1:27017/admin <<EOF
user = db.users.findOne()

function randomString() {
  return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
}
db.items.insert({"title":"title","description":"description","image":"asdasd","tagList":[],"favorited":false,"favoritesCount":0,"seller":user._id,"slug":randomString()})
EOF