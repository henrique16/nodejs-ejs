const url = require("url");

function getA(req, res) {
    //FAKE RETORNO
    const A = [];
    const quantidade = Number.parseInt(req.query.quantidade);
    for (var index = 0; index < quantidade; index++) {
        A.push({ "id": "A", "descricao": "Item A", "index": index + 1 })
    };
    return res.json(200, { data: A });
};

function getB(req, res) {
    //FAKE RETORNO
    const B = [];
    const quantidade = Number.parseInt(req.query.quantidade);
    for (var index = 0; index < quantidade; index++) {
        B.push({ "id": "B", "descricao": "Item B", "index": index + 1 })
    };
    return res.json(200, { data: B });
};

module.exports = { getA, getB };