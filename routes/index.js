const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/create").post(controllers.create);
router
 .route("/user/:id")
 .get(controllers.get)
 .put(controllers.update)
.delete(controllers.delete);
module.exports = router;