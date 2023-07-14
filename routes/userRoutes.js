const router = require("express").Router(),
userController = require("../controllers/userController");

router.delete("/user/:id/delete", userController.deleteUser);

router.get("/login", userController.getLogIn);
router.get("/user", userController.getAllUser);
router.get("/signup", userController.addUser);
router.get("/:username", userController.sendReqParam);
router.post("/signup", userController.saveUser);

router.use(userController.verifyJWT);


router.put("/user/:id/update", userController.updateUser);


router.post("/login", userController.apiAuthenticate, userController.redirectAfterLogin);

module.exports = router;
