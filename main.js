const userSignUpProcessor = require("./controllers/userSignUpProcessor");
const port = 3000,
 express = require("express"),
 app = express();
 app.get("/login/:username", userSignUpProcessor.sendReqParam);
app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});


