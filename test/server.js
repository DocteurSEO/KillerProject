const express = require('express')
const app = express()
var admin = require("firebase-admin");
const port = 3000
var serviceAccount = require("./firebaseIn.json");
const bodyParser = require('body-parser');


app.use(bodyParser.json());


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); 

async function setData (collection,obj ,id ){
    const usersDb = db.collection(collection); 
    const document = id ? usersDb.doc(id): usersDb.doc(Math.random().toString())
    await document.set(obj);
}

app.get('/', (req, res) => {
  setData("produit", "Id1 : Nike", {marque: "nike", basket: "AF1", prix: "110e"})
res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/create', (req, res) => {
    setData(req.body.collection, req.body)
    console.log(req.body.collection);
    res.json(req.body)
})


function yassine(collection, doc){
    console.log(collection, doc);
}
yassine("bonjour", "yassine")


app.get('/collection/:collection/:doc', async(req, res) => {
    const cityRef = db.collection(req.params.collection).doc(req.params.doc);
const doc = await cityRef.get();
if (!doc.exists) {
  res.json('No such document!');
} else {
  res.json(doc.data());
}

console.log(req.params.doc);
console.log(req.params.collection);
})



