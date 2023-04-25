const profileController = require("./controllers/profileController");
const port = 3000,
 express = require("express"),
 app = express();
 app.get("/profile/:username", profileController.sendReqParam);
app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});