const Job = require("../models/jobModel");
const User = require("../models/userModel");

// job
const postJob = async(req,res)=>{
    try {
        const {title,description,requirements,salary,location, experienceLevel,jobType,position,companyId} = req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !location || !experienceLevel || !jobType || !position || !companyId){
            return res.status(401).json({
                message:"Somthing is missing",
                success:true
            })
        };
        let parsedRequirements = requirements;
        if (typeof requirements === "string") {
            parsedRequirements = requirements.split(",");
          }
 
            // 3️⃣ Only recruiter can create a company
        const user = await User.findById(req.id);
        if (user.role !== "recruiter") {
            return res.status(403).json({
              message: "Only recruiters can create  jobs",
              success: false,
            });
          }

       const job = await Job.create({
        title,
        description,
        requirements : parsedRequirements,
        salary,
        location, 
        experienceLevel,
        jobType,
        position,
        companyId,
        created_by:userId,
       })
       return res.status(201).json({
        message:"New Job Created Successfully.",
        job,
        success:true
       });

    } catch (error) {
        console.log(error)
    }
}

//get all job student k liye
const getAllJobs = async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        };
        const job = await Job.find(query).populate({
            path:"companyId"
        }).sort({createdAt:-1})
        if(!job){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
      return res.status(200).json({
        job,
        success:true
      })
    } catch (error) {
        console.log(error)
    }
}

// get job by id student k liye
const getJobById = async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        }).sort({createdAt:-1})
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            success : true,
            job
        })
    } catch (error) {
        console.log(error)
    }
}
// admin kitna job create kiya hai
 const getAdminJob = async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:"companyId",
            createdAt:-1
        })
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        return res.status(201).json({
           jobs,
           success:true
        })
    } catch (error) {
        console.log(error)
    }
 }




module.exports = {
    getJobById,
    postJob,
    getAllJobs,
    getAdminJob 
}