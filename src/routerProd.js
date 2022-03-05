const { Router } = require("express");
const router = Router();
const validateUser = require("./middleware");
const contenedor = new Contenedor("./productos.json");

router.get("/", async (req, res) => {
	const todos = await contenedor.getAll();

	res.send(todos);
});
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const byId = await contenedor.getById(id);
	console.log("id", id);
	console.log("byId", byId);
	res.send(byId);
});

router.post("/", validateUser, async (req, res) => {
	const { body } = req;
	if (await contenedor.save(body)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(500);
	}
});
router.delete("/:id", validateUser, async (req, res) => {
	const { id } = req.params;

	const borrado = await contenedor.deleteById(id);

	if (borrado) {
		res.sendStatus(200);
	} else {
		res.send("El producto que se intenta borrar no existe.");
	}
});

router.put("/:id", validateUser, async (req, res) => {
	const {
		body,
		params: { id },
	} = req;

	const nuevo = await contenedor.updateById(id, body);

	if (anterior) {
		res.send({ nuevo });
	} else {
		res.send("El producto que se intenta actualizar no existe.");
	}
});

module.exports = router;
