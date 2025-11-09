const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require("../controller/applicationController");
const isAuthenticate = require("../middleware/isAuthenticate");

const router = require ("express").Router();

router.post('/apply/:id',isAuthenticate,applyJob)
router.get('/get',isAuthenticate,getAppliedJobs);
router.get('/:id/applicants',isAuthenticate, getApplicants);
router.post('/status/:id/update',isAuthenticate,updateStatus);

module.exports = router