const Company = require("../models/companyModel");
const User = require("../models/userModel");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../utils/cloudinary");

// register company
const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
   
    if (!companyName) {
      return res.status(401).json({
        message: "Company name is required1",
        success: false,
      });
    }

    // 3️⃣ Only recruiter can create a company
    const user = await User.findById(req.id);
    if (user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can register a company",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(401).json({
        message: "You can't register a company with the same name",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company register successfully..",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//get company
const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }
    return res.status(201).json({
      companies,

      success: true,
    });
  } catch (error) {
    console.log( error);
  }
};

// company by id
const getCopmanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(201).json({
      company,
      message: "Company Found",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// update company information
const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //idhar cloudnary
    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "profiles", // optional folder name in Cloudinary
      });
    }
    const logo = cloudResponse?.secure_url;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Company name is required2",
      });
    }

    const updateData = { name, description, website, location, file: logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        company,
        success: false,
      });
    }

    return res.status(200).json({
      message: "company information updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete company
const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Find company
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // Optional: only the same user (recruiter) who created it can delete
    if (company.userId.toString() !== req.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this company",
        success: false,
      });
    }

    // Optional: delete logo from Cloudinary (if uploaded)
    if (company.file) {
      try {
        const publicId = company.file.split("/").pop().split(".")[0]; // extract ID from URL
        await cloudinary.uploader.destroy(`profiles/${publicId}`);
      } catch (err) {
        console.log(err);
      }
    }

    // Delete company from database
    await Company.findByIdAndDelete(companyId);

    return res.status(200).json({
      message: "Company deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong while deleting the company",
      success: false,
    });
  }
};

module.exports = {
  registerCompany,
  getCompany,
  getCopmanyById,
  updateCompany,
  deleteCompany, 
};
