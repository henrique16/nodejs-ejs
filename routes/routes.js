const controller = require("../controller/controller");
module.exports = function handleRoutes(pApp) {
    pApp.get("/A", controller.getA);
    pApp.get("/B", controller.getB);
};