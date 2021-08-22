const express = require("express");
const { getColor, getProduct } = require("./Controller/Clawdata");
const PORT = process.env.PORT || 8006;

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get("/getproduct", getProduct);
app.get("/getcolor", getColor);

const server = app.listen(PORT, () => {
  console.log("app chay thanh cong tren port ", PORT);
});
