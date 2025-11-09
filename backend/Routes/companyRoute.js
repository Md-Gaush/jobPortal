const {
  registerCompany,
  getCompany,
  getCopmanyById,
  updateCompany,
  deleteCompany,
} = require("../controller/companyController");
const isAuthenticate = require("../middleware/isAuthenticate");
const { singleUploads } = require("../middleware/multer");

const router = require("express").Router();

router.post("/register", isAuthenticate, registerCompany);
router.get("/get", isAuthenticate, getCompany);
router.get("/get/:id", isAuthenticate, getCopmanyById);
router.put("/update/:id", isAuthenticate,singleUploads, updateCompany);
router.delete("/delete/:id", isAuthenticate, deleteCompany);

module.exports = router;
