const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

// routes

var testAPIRouter = require("./routes/testAPI");
var ApplicantRouter = require("./routes/Applicant");
var AuthRouter = require('./routes/Auth');
var ProfileRouter = require('./routes/Profile');
var RecruiterRouter = require('./routes/Recruiter');
var EducationRouter = require('./routes/Education');
var JobRouter = require('./routes/Jobs');
var ApplicantJobsRouter = require('./routes/ApplicantJobs');


// var UserRouter = require("./routes/Users");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Connection to MongoDB

mongoose.connect(
  "mongodb+srv://trinadh:trinadh@cluster0.fx00n.mongodb.net/DB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully !");
});

// setup API endpoints

app.use("/testAPI", testAPIRouter);
app.use("/applicant", ApplicantRouter);
app.use("/auth", AuthRouter);
app.use("/profile", ProfileRouter);
app.use("/recruiter", RecruiterRouter);
app.use("/education", EducationRouter);
app.use("/jobs", JobRouter);
app.use("/appjobs", ApplicantJobsRouter);

// app.use("/user", UserRouter);
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});