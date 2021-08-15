const { application } = require("../config");
const app = require("./app");

const server = app.listen(application.port, () => {
  console.log(`Server running on port ${application.port}`);
});

module.exports = server;
