const { coutConnect } = require('../helpers/check.connect');
const  {db: {host, port, name}} = require('../configs/config.mongodb');

const mongoose = require('mongoose');

const connectString = `mongodb://${host}:${port}/${name}`;
console.log(connectString);


class DataBase {
    constructor(){
        this._connect();
    }

    _connect(type = 'mongodb'){
        if(type === 'mongodb'){
            mongoose.connect(connectString)
                .then(()=>{
                    console.log('Database connection successful');
                    coutConnect();
                })
                .catch(err =>{
                    console.error('Database connection error');
                });
        }
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new DataBase();
        }
        return this.instance;
    }

}

module.exports = DataBase.getInstance();