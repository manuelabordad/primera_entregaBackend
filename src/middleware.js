async function validateUser(req, res, next) {
	const admin = true;

	if (admin) {
		next();
	} else {
		res.status(401).send({ error: "Usuario no autorizado" });
	}
}

module.exports = validateUser;
