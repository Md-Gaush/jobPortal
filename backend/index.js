const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./utils/db");
const userRoute = require("./Routes/userRoutes");
const companyRoute = require("./Routes/companyRoute");
const jobRoute = require("./Routes/jobRoute");
const applicationRoute = require("./Routes/applicationRoute");
const path = require("path")

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173", // ✅ correct
  credentials: true,
};

const _dirname = path.resolve()


app.use(cors(corsOptions));
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

const port = process.env.PORT;

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get(/.*/,(req,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.listen(port, () => {
  console.log("server is ruuning on", port);
  connectDB();
});
