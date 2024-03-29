
const express= require("express");
const res = require("express/lib/response");
const app= express();
const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
//arithmetic functions to handle request for addition, subtraction, multiplication, and division
const add= (n1,n2) => {
    return n1+n2;
}
const sub=(n1,n2) =>{
    return n1-n2;
}
const multiply=(n1,n2) =>{
    return n1*n2;
}
const div=(n1,n2) =>{
    return n1/n2;
}
const expo=(n1,n2) =>{
    let result = 1; // initialize a variable to assign result value after n2 times of self-multiplication of n1
    if(n2 == 0){
        return 1;
    }
    for(i=0;i < n2;i++){
        result *= n1;
    }
    return result;
}
const sqrt=(n1)=>{
    return Math.sqrt(n1);
}
const mod=(n1,n2)=>{
    return n1%n2;
}
//get methods for each function including request and response
app.get("/add", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    const n2= parseFloat(req.query.n2);
    //throuw expected failures manually
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    //through logging, keep a record of successful and failures cases.
    logger.info('Parameters '+n1+' and '+n2+' received for addition');
    const result = add(n1,n2);

    //status code corresponding to data result of different functions
    res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});
app.get("/sub", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    const n2= parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    
    logger.info('Parameters '+n1+' and '+n2+' received for subtraction');
    const result = sub(n1,n2);
    res.status(210).json({statuscocde:210, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(510).json({statuscocde:510, msg: error.toString() })
      }
});
app.get("/multiply", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    const n2= parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    
    logger.info('Parameters '+n1+' and '+n2+' received for mulptiplication');
    const result = multiply(n1,n2);
    res.status(220).json({statuscocde:220, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(520).json({statuscocde:520, msg: error.toString() })
      }
});
app.get("/divide", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    const n2= parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    if(n2 == 0)
    {
        logger.error("Result does not exist!");
        throw new Error("Result does not exist!")
    }
    logger.info('Parameters '+n1+' and '+n2+' received for division');
    const result = div(n1,n2);
    res.status(230).json({statuscocde:230, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(530).json({statuscocde:530, msg: error.toString() })
      }
});
app.get("/expo", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    const n2= parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    if(n2 < 0 || !(Number.isInteger(n2))){
        logger.error("n2 is invalid input!");
        throw new Error("n2 invalid!");
    }
    logger.info('Parameters '+n1+' and '+n2+' received for exponentiation');
    const result = expo(n1,n2);
    res.status(240).json({statuscocde:240, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(540).json({statuscocde:540, msg: error.toString() })
      }
});
app.get("/sqrt", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    logger.info('Parameters '+n1+' received for square root');
    const result = sqrt(n1);
    res.status(250).json({statuscocde:250, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(550).json({statuscocde:550, msg: error.toString() })
      }
});
app.get("/mod", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    const n2= parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    if(n2 == 0)
    {
        logger.error("Result does not exist!");
        throw new Error("Result does not exist!")
    }
    logger.info('Parameters '+n1+' and '+n2+' received for modulo operation');
    const result = mod(n1,n2);
    res.status(260).json({statuscocde:260, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(560).json({statuscocde:560, msg: error.toString() })
      }
});
const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port"+port);
})

