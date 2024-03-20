const express= require("express");
const app= express();
const addTwoNumber= (n1,n2) => {
    return n1+n2;
}
app.get("/addTwoNumber", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const result = addTwoNumber(n1,n2);
    res.json({statuscocde:200, data: result }); 
});
//get method that request n1 and n2 parameter that we can have a result as json file 
//will be executed when we pass value n1 and n2 parameter through this specific url http://localhost:3040/addTwoNumber?n1=___&n2=___

app.get("/", (req, res) => {
    const n1 = "<html><body><H1>HELLO THERE </H1></body></html>";
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(n1));     
})

console.log (addTwoNumber(19,12));
const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port "+port);
})