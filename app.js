let express = require("express");
let app = express();
let mongoose = require("mongoose");
let multer = require("multer");
let postsRouter = require("./routes/posts.route");
let CallbackRequestRouter = require("./routes/callback-requests.route");
let emailsRouter = require("./routes/emails.route");
let Post = require("./models/post.model").Post;

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/travels");
app.use(express.json());
let imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

app.use(multer({ storage: imageStorage }).single("imageFile"));

app.use(express.static("public"));
app.use("/posts", postsRouter);
app.use("/callback-requests", CallbackRequestRouter);
app.use("/emails", emailsRouter);

app.get("/landmark", async (req, resp) => {
  let id = req.query.id;
  let post = await Post.findOne({ id: id });
  resp.render("landmark", {
    title: post.title,
    imageURL: post.imageURL,
    date: post.date,
    text: post.text,
  });
});

app.listen(3000, () => console.log("Listening 3000..."));
