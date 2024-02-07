const express = require("express");
const cors = require("cors");
require("./db/conn");
const User = require("./models/User");
const ShowList = require("./models/ShowList");

const Jwt = require("jsonwebtoken");
const multer = require("multer");
const jwtKey = "movieList";
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = User(req.body);
  let result = await user.save();

  result = result.toObject();
  delete result.password;
  resp.send(result);
});

// *********************** for saving image in mongodb***************************************
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // callback(null, "../client/public/uploads");
    callback(null, "../client/src/images/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const uploading = multer({ storage: storage });

app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong, Please try after sometime",
          });
        }
        resp.send({ user, auth: token });
      });
      // resp.send(user);
    } else {
      resp.send({ result: "No User Found" });
    }
  } else {
    resp.send({ result: "No User Found" });
  }
});

//get user
app.get("/get-user/:userId", verifyToken, async (req, resp) => {
  // let result = await User.find({ _id: req.params.userId }).select("-password");
  let result = await User.find({ _id: req.params.userId });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No user found" });
  }
});

//update user
// app.put("/update-user/:userId", async (req, resp) => {
//   let result = await User.updateOne(
//     { _id: req.params.userId },
//     { $set: req.body }
//   );
//   resp.send(result);
// });
app.put("/update-user/:userId", uploading.single("image"), async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    // Update user fields based on the form data
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;

    if (req.file) {
      // If a new image is provided, update it
      user.image = req.file.filename;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(422).json(error);
  }
});

//Delete User
app.delete("/delete-user/:userId", async (req, resp) => {
  let result = await User.deleteOne({ _id: req.params.userId });
  resp.send(result);
});

//create userId base movie list
app.post("/add-movieList", async (req, resp) => {
  let show = new ShowList(req.body);
  let result = await show.save();
  resp.send(result);
});

//show userId base movie list
app.get("/get-movieList/:userId", verifyToken, async (req, resp) => {
  let result = await ShowList.find({ userId: req.params.userId });
  if (result.length > 0) {
    resp.send(result);
  } else {
    resp.send({ result: "No Show found" });
  }
});

//update user movie list
app.put("/update-movieList/:prodId", async (req, resp) => {
  let result = await ShowList.updateOne(
    { _id: req.params.prodId },
    { $set: req.body }
  );
  resp.send(result);
});

//delete user movie list
app.delete("/delete-movieList/:prodId", async (req, resp) => {
  let result = await ShowList.deleteOne({ _id: req.params.prodId });
  resp.send(result);
});

//delete user movie list based on userid
app.delete("/delete-movieUserMovieList/:userId", async (req, resp) => {
  let result = await ShowList.deleteMany({ userId: req.params.userId });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    // sometime developers use keyword like 'bearer' before the token.There is a space between bearer and token on which we are spitting it. Here we are spitting it to gust get the token
    token = token.split(" ")[1]; // 1 is to get 2nd value that is token
    //Now verify the token
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token " }); //if token is wrong
      } else {
        next(); // it help us to move to next process
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with header" }); //if token is not given
  }
  // console.log("middleware caled", token);
}

app.listen(5000);
