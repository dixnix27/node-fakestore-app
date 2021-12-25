const server = require("./api/server");



server.listen(process.env.PORT, (req, res) => {
  console.log(`\n*** Server is running on http://localhost:${process.env.PORT} *** \n`);
});
