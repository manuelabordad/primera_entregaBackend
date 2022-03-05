const express = require("express");
const routerCart = require("./routerCart");
const router = require("./routerProd");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", router);
app.use("/api/carrito", routerCart);
app.listen(port, () => {
	console.log("server activo en http://localhost:" + port);
});
