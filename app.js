const express = require("express");
const {
  getColor,
  getProduct,
  getProductInfo,
} = require("./Controller/Clawdata");

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get("/getproduct", getProduct);
app.get("/getcolor", getColor);

const server = app.listen(8006, () => {
  console.log("app chay thanh cong tren port 8006");
});
