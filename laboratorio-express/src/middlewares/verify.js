const methodVerify = (req, res, next) => {

    const metodos = ['GET', 'POST', 'PUT', 'DELETE']

    if (!metodos.includes(req.method)) {
        return res.status(405).send({ message: "Metodo no permitido" })
    }

    next()
}

module.exports = methodVerify;