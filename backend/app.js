const express       = require("express");
const helmet        = require("helmet");
const bodyParser    = require("body-parser");
const userRoutes    = require("./routes/user");
const postRoutes    = require("./routes/posting");
const commentRoutes = require("./routes/comment");
const likeRoutes    = require("./routes/like");
const reportRoutes  = require("./routes/report")
const path          = require("path");
const rateLimit     = require("express-rate-limit");
const dotenv        = require('dotenv').config();
const app           = express();
const limiter       = rateLimit({windowMs: 60 * 60 *1000, max: 1000})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // configuration de cors
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use("/", limiter)
app.use(helmet());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/users", userRoutes);
app.use("/postings", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/reports", reportRoutes);

module.exports = app;
