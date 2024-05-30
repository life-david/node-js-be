const app = require("./src/app");

const PORT = process.env.DEV_APP_PORT || process.env.DEV_APP_PRO || 3001;

const server = app.listen(PORT, () => {
    console.log("Server express running on port: " + PORT);
});

process.on("SIGINT", () => {
    server.close(() => console.log("Exit server express"));
});
