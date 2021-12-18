const server = require("./api/server");

const PORT = 4000;

server.listen(PORT, (req, res) => {
  console.log(`\n*** Server is running on http://localhost:${PORT} *** \n`);
});
