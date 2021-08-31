require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db=require('./conection/conectDb');
const routes = require('./routes/routes');
const failtRoutes = require('./routes/failtRoutes');
const user=require('./crud/users');
const moongoose =require('mongoose');
const utils=require('./utils/utils');


var corsOptions = {
    origin: process.env.URL_ALLOW,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
const port = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); //Usar el bodyparser que enta 

db.connect(process.env.DB_URI,(error,dbmoongose)=>{
    if (error)
        {// se responde a cualquier ruta valida con un mensaje de servidor fuera de servicio
            console.log(error);
            app.use(failtRoutes({}));
        }
        else
        {
            //routes Public
            app.use(routes({})) ;
            //routes Protected
            app.use(utils.authMiddleware);

          

        }
     
})



app.listen(port, function() {
    console.log(`Listening on port ${port}`);
  });