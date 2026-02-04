import app from "./app.js"
const PORT = process.env.PORT || 3000; //this line very imp.

app.listen(3000,(err,data)=>{
    console.log("server running");
})