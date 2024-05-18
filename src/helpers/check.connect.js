const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND = 5000;

// count connect
const coutConnect = () => {
    const numConnect = mongoose.connections.length;
    console.log('numConnect:', numConnect);
};

//check over load
const checkOverLoad = () => {
    setInterval(() => {
        const numConnect = mongoose.connections.length;
        const numCores = os.cpus().length;
        const meoryUse = process.memoryUsage().rss;

        console.log('memoryUse:', meoryUse/1024/1024, 'MB');
        // Exmaple maximum 5 connection
        const maxConnect = numCores *5;
        if(numConnect > maxConnect){
            console.log('Connection over load detected');
        }
    }, _SECOND);

};

module.exports = { coutConnect, checkOverLoad};