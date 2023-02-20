const app = require("../server");
const runDb = require("../src/config/db");
const content = require("../src/models/Content");

const PORT = 3000;

const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); 
