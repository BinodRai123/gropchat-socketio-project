const path = require("path");
const express = require("express");
const app = express();

app.use(
  express.static(
    path.join(__dirname, "node_modules/@socket.io/admin-ui/ui/dist")
  )
);

app.listen(3030, () => {
  console.log("Admin UI running at http://localhost:3030/");
});
