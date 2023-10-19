const express = require("express");
const edit = require("./list-edit-router");
const router = require("./list-view-router");
const login = require("./middlewares/login");
const app = express();
const methodVerify = require("./middlewares/verify");
const port = 3000;
app.use(express.json());

app.use("/newtask", edit);
app.use("/task", router);
app.use(methodVerify);
app.use("/login", login);

app.listen(port, () => {
  console.log(`el servidor esta corriendo en :${port}`);
});
