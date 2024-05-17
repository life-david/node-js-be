const app = require("./src/app");

const PORT = 3001;

const server = app.listen(3001,()=>{
    console.log('Server was run port 3001')
});

process.on('SIGINT',()=>{
    server.close(()=>console.log('Exit server express'))
});