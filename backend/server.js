require('dotenv').config();
const http = require('http');
const app = require('./index'); // Import the app instance

const server = http.createServer(app);

const port = process.env.PORT || 3000; // Default to port 3000 if not specified

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
