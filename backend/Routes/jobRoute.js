const { postJob, getAllJobs, getJobById, getAdminJob } = require("../controller/jobController");
const isAuthenticate = require("../middleware/isAuthenticate");

const router = require("express").Router();

router.post("/post",isAuthenticate, postJob)
router.get("/get", getAllJobs)
router.get("/get/:id", getJobById)
router.get("/getadminjobs",isAuthenticate, getAdminJob)


module.exports = router