
const mon =require('mongoose');
const uri = "mongodb://localhost:27017/notebookDB"
// const conToMongo =async ()=>{
//     console.log("connecting to mongodb");
//     await mon.connect(uri);
// }

const conToMongo = ()=>{
     mon.connect(uri);
     console.log("connected to mongodb");
}

module.exports=conToMongo;