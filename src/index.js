const express = require('express');
const bodyParser = require('body-parser');


const { PORT, DB_SYNC } = require('./config/serverConfig');
const db = require('./models');
const apiRoutes = require('./routes/index');

const setupAndStartServer = async ()=>{
    const app = express();
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,()=>{
        console.log('Server started at port '+ PORT)
    })

    if(DB_SYNC){
        db.sequelize.sync({alter: true})
    }
}

setupAndStartServer();