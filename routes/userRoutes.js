const router = require("express").Router(),
userController = require("../controllers/userController");

router.delete("/user/:id/delete", userController.deleteUser);

router.get("/signup", userController.getSignUp);
router.get("/login", userController.getLogIn);
//router.use(userController.verifyToken); soll nicht mehr ausgeführt werden, da jetzt JWT
router.use(userController.verifyJWT);
router.get("/user", userController.getAllUser);
router.get("/signup", userController.addUser);
router.get("/:username", userController.sendReqParam);

router.put("/user/:id/update", userController.updateUser);

router.post("/signup", userController.saveUser);
router.post("/login", userController.authenticate, userController.redirectAfterLogin);
router.post("/login", userController.apiAuthenticate);

module.exports = router;
