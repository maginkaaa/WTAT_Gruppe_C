const router = require("express").Router(),
userController = require("../controllers/userController");

router.delete("/user/:id/delete", userController.deleteUser);


router.get("/signup", userController.getSignUp);
router.get("/user", userController.getAllUser);
router.get("/login", userController.getLogIn);
router.get("/signup", userController.addUser);
router.get("/:username", userController.sendReqParam);

router.put("/user/:id/update", userController.updateUser);

router.post("/signup", userController.saveUser);
router.post("/login", userController.authenticate, userController.redirectAfterLogin);

module.exports = router;
