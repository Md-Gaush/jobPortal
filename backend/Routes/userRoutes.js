const { register, login, logout, updateProfile } = require("../controller/userController")
const isAuthenticate = require("../middleware/isAuthenticate")
const { singleUploads } = require("../middleware/multer")

const router = require("express").Router()


router.post("/register", singleUploads,register )
router.post("/login",login )
router.post("/logout",logout)
router.put("/profile/update",isAuthenticate,singleUploads, updateProfile )



module.exports = router