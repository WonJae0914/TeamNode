const app = require("../server");
const runDb = require("../src/config/db");
const content = require("../src/models/Content");
const runMongo = require("../src/config/MongoclientDB");
const aa =require("../src/config/aaa");
const PORT = 3000;
runMongo.connect;
const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
