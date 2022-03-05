const { Router } = require("express");
const routerCart = Router();

const contenedorCarrito = new Contenedor("./carrito.json");

routerCart.post("/", async (req, res) => {
	console.log("ENTRAA");
	const { body } = req;

	if (await contenedorCarrito.saveCart(body)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(500);
	}
});
routerCart.delete("/:id", async (req, res) => {
	const { id } = req.params;

	const borrado = await contenedorCarrito.deleteById(id);

	if (borrado) {
		res.send({ borrado });
	} else {
		res.send("El carrito buscado no existe.");
	}
});

routerCart.post("/:id/productos", async (req, res) => {
	const {
		body,
		params: { id },
	} = req;

	let cart = await contenedorCarrito.getById(id);

	const newProduct = await contenedorCarrito.addProduct(id, body);

	if (cart) {
		res.sendStatus(200);
	} else {
		res.send("El producto no se puede agregar");
	}
});
routerCart.get("/:id/productos", async (req, res) => {
	const { id } = req.params;
	const byId = await contenedorCarrito.getById(id);

	res.send(byId);
});

routerCart.delete("/:id/productos/:id_prod", async (req, res) => {
	const {
		params: { id },
		params: { id_prod },
	} = req;

	const borrado = await contenedorCarrito.deleteById_prod(id_prod, id);

	if (borrado) {
		res.sendStatus(200);
	} else {
		res.send("no se pudo eliminar el producto");
	}
});
module.exports = routerCart;
