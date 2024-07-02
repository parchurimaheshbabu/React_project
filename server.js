const express = require("express");
const dotEnv = require("dotenv");
dotEnv.config();

const app = express();

const bodyparer = require("body-parser");
const PORT = process.env.PORT || 1400;

const register = require("./registermodel");
const posts = require("./postmodel");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const sam = require("./sample");
const middleware = require("./middleware");
const multer = require("multer");
const path = require("path");

const profilerouter = require("./routes/registerrouter");
const postrouter = require("./routes/postsrouter");

app.use(express.json()); // Add this line to parse JSON requests
app.use(cors({ origin: "*" }));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Data Base Connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.get("/", (req, res) => {
  return res.send("hello world");
});

// app.post("/register", async (req, res) => {
//   try {
//     const { fullname, email, phone, location, password, confirmpassword } =
//       req.body;
//     const exist = await register.findOne({ email });
//     if (exist) {
//       return res.status(400).send("user already exist");
//     }
//     if (password != confirmpassword) {
//       return res.status(403).send("password not match");
//     }
//     let newuser = new register({
//       fullname,
//       email,
//       phone,
//       location,
//       password,
//       confirmpassword,
//     });
//     await newuser.save(); // Make sure to await the save operation
//     return res.status(200).send("user registered successfully");
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("Server Error");
//   }
// });

// // login
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const exist = await register.findOne({ email });
//     if (!exist) {
//       return res.status(400).send("user not exist");
//     }
//     if (exist.password != password) {
//       return res.status(400).send("password invalid");
//     }
//     let payload = {
//       user: {
//         id: exist._id,
//       },
//     };
//     jwt.sign(payload, "jwtPassword", { expiresIn: 36000000 }, (err, token) => {
//       if (err) throw err;
//       return res.json({ token, id: exist._id }); // Corrected this line
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("Server Error");
//   }
// });

// //update
// app.put("/update/:id", async (req, res) => {
//   try {
//     const { fullname, email, phone, location, password, confirmpassword } =
//       req.body;
//     const myEmployee = await register.findByIdAndUpdate(
//       req.params.id,
//       { fullname, email, phone, location, password, confirmpassword },
//       { new: true }
//     );
//     if (!myEmployee) {
//       return res.status(404).json({ message: "profile not found" });
//     }
//     res.status(200).json(myEmployee);
//   } catch (error) {
//     console.error("There Is An Error", error);

//     res.status(500).json({ message: "Server Error" });
//   }
// });

// app.get("/allprofiles", middleware, async (req, res) => {
//   try {
//     let allprofiles = await register.find();
//     return res.json(allprofiles);
//   } catch {
//     console.log(err);
//     return res.status(500).send("Server Error");
//   }
// });

// //

// app.post("/knowmore", async (req, res) => {
//   try {
//     const { post_no } = req.body;
//     let user = await posts.find({ post_no });
//     return res.json(user);
//   } catch {}
// });
// app.get("/myprofile", middleware, async (req, res) => {
//   try {
//     let user = await register.findById(req.user.id);
//     return res.json(user);
//   } catch {}
// });

// app.delete("/delete/:id", middleware, async (req, res) => {
//   try {
//     const deleteemployee = await register.findByIdAndDelete(req.user.id);
//     if (!deleteemployee) {
//       return res.status(404).json({ message: "user not found" });
//     } else {
//       res.status(204).json({ message: "Deleted Success fully" });
//     }
//   } catch (error) {
//     console.error("There Is An Error", error);

//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // posts

// app.get("/posts/count", async (req, res) => {
//   try {
//     const count = await posts.countDocuments();
//     console.log(count);
//     res.json({ count });
//   } catch (error) {
//     console.error("Error counting documents:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // post property
// app.post("/postaprop", async (req, res) => {
//   try {
//     const {
//       ownername,
//       email,
//       phone,
//       owner_id,
//       town_or_city_name,
//       landmark,
//       address_with_doorno,
//       rent_or_sale,
//       rent_or_sale_amount,
//       area,
//       no_of_bedrooms,
//       bathrooms,
//       non_veg_allowed,
//       Furnishing,
//       property_type,
//       possession,
//       gated_security,
//       parking,
//       posted_on,
//       floor,
//       preferred_tenant,
//       Balcony,
//       Age_of_building,
//       power_backup,
//       facing,
//       water_supply,
//       Maintanence,
//       gmaps,
//       pic1,
//       pic2,
//       pic3,
//       pic4,
//     } = req.body;
//     let count = await posts.countDocuments(); // Fetch the count of documents
//     // localStorage.setItem("count", count);
//     let property = new posts({
//       ownername,
//       email,
//       phone,
//       owner_id,
//       post_no: count + 1,
//       town_or_city_name,
//       landmark,
//       address_with_doorno,
//       rent_or_sale,
//       rent_or_sale_amount,
//       area,
//       no_of_bedrooms,
//       bathrooms,
//       non_veg_allowed,
//       Furnishing,
//       property_type,
//       possession,
//       gated_security,
//       parking,
//       posted_on,
//       floor,
//       preferred_tenant,
//       Balcony,
//       Age_of_building,
//       power_backup,
//       facing,
//       water_supply,
//       Maintanence,
//       gmaps,
//       pic1,
//       pic2,
//       pic3,
//       pic4,
//     });
//     await property.save(); // Make sure to await the save operation
//     return res.status(200).send("property posted successfully");
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("Server Error");
//   }
// });

// app.get("/allhouses", middleware, async (req, res) => {
//   try {
//     let allprofiles = await posts.find();
//     return res.json(allprofiles);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("server Error");
//   }
// });
// // Import the posts model

// // Define a route to get the total number of documents in the posts collection

// app.get("/myproperties", middleware, async (req, res) => {
//   try {
//     let allreviews = await posts.find();
//     let myreviews = allreviews.filter(
//       (review) => review.owner_id.toString() === req.user.id.toString()
//     );

//     return res.status(200).json(myreviews);
//   } catch {
//     console.log(err);
//     return res.status(500).send("Server Error");
//   }
// });

// //update property

// app.put("/updateproperty/:post_no", async (req, res) => {
//   try {
//     const {
//       ownername,
//       email,
//       phone,
//       town_or_city_name,
//       landmark,
//       address_with_doorno,
//       rent_or_sale,
//       rent_or_sale_amount,
//       area,
//       no_of_bedrooms,
//       bathrooms,
//       non_veg_allowed,
//       Furnishing,
//       property_type,
//       possession,
//       gated_security,
//       parking,
//       posted_on,
//       floor,
//       preferred_tenant,
//       Balcony,
//       Age_of_building,
//       power_backup,
//       facing,
//       water_supply,
//       Maintanence,
//       gmaps,
//       pic1,
//       pic2,
//       pic3,
//       pic4,
//     } = req.body;

//     const updatedProperty = await posts.findOneAndUpdate(
//       { post_no: req.params.post_no },
//       {
//         ownername,
//         email,
//         phone,
//         town_or_city_name,
//         landmark,
//         address_with_doorno,
//         rent_or_sale,
//         rent_or_sale_amount,
//         area,
//         no_of_bedrooms,
//         bathrooms,
//         non_veg_allowed,
//         Furnishing,
//         property_type,
//         possession,
//         gated_security,
//         parking,
//         posted_on,
//         floor,
//         preferred_tenant,
//         Balcony,
//         Age_of_building,
//         power_backup,
//         facing,
//         water_supply,
//         Maintanence,
//         gmaps,
//         pic1,
//         pic2,
//         pic3,
//         pic4,
//       },
//       { new: true }
//     );

//     if (!updatedProperty) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     res.status(200).json(updatedProperty);
//   } catch (error) {
//     console.error("There Is An Error", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // app.delete("/deletepost/:post_no", async (req, res) => {
// //   try {
// //     const deleteemployee = await posts.findOneAndDelete(req.params.post_no);
// //     if (!deleteemployee) {

// //       return res.status(404).json({ message: "user not found" });
// //     } else {
// //       res.status(204).json({ message: "Deleted Success fully" });
// //     }
// //   } catch (error) {
// //     console.error("There Is An Error", error);

// //     res.status(500).json({ message: "Server Error" });
// //   }
// // });
// // app.delete("/deletepost/:post_no", async (req, res) => {
// //   try {
// //     // Get the post_no of the document to be deleted
// //     const postNoToDelete = req.params.post_no;

// //     // Delete the document from the collection
// //     const deletedPost = await posts.findOneAndDelete({
// //       post_no: postNoToDelete,
// //     });

// //     if (!deletedPost) {
// //       // If the document with the given post_no is not found
// //       return res.status(404).json({ message: "Post not found" });
// //     }

// //     // Adjust the post_no values of remaining documents
// //     await posts.updateMany(
// //       { post_no: { $gt: postNoToDelete } },
// //       { $inc: { post_no: -1 } }
// //     );

// //     res.status(204).json({ message: "Post deleted successfully" });
// //   } catch (error) {
// //     console.error("Error deleting post:", error);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // });

// app.delete("/deletepost/:post_no", middleware, async (req, res) => {
//   try {
//     // Get the post_no of the document to be deleted
//     const postNoToDelete = req.params.post_no;

//     // Delete the document from the collection
//     const deletedPost = await posts
//       .findOneAndDelete({
//         post_no: postNoToDelete,
//       })
//       .then(console.log("Deleted Success"));

//     // if (!deletedPost) {
//     //   // If the document with the given post_no is not found
//     //   return res.status(404).json({ message: "Post not found" });
//     // }

//     // Adjust the post_no values of remaining documents
//     await posts.updateMany(
//       { post_no: { $gt: parseInt(postNoToDelete) } },
//       { $inc: { post_no: -1 } }
//     );

//     return res.status(204).json({ message: "Post deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // /sample
// const d = new Date();
// app.post("/createTodo", async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     let newuser = new sam({
//       title,
//       description,
//       date: d,
//     });
//     await newuser.save(); // Make sure to await the save operation
//     return res.status(200).send("user registered successfully");
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("Server Error");
//   }
// });

// app.post("/findPosts", async (req, res) => {
//   try {
//     const {
//       town_or_city_name,
//       rent_or_sale_amount,
//       no_of_bedrooms,
//       landmark,
//       rent_or_sale,
//       property_type,
//     } = req.body;
//     // Assuming 'posts' is your MongoDB collection
//     let aha = await posts.find({
//       town_or_city_name: { $regex: new RegExp(town_or_city_name, "i") },
//       rent_or_sale_amount: { $lt: rent_or_sale_amount },

//       no_of_bedrooms: { $regex: new RegExp(no_of_bedrooms) },
//       landmark: { $regex: new RegExp(landmark, "i") },
//       rent_or_sale: { $regex: new RegExp(rent_or_sale, "i") },
//       property_type: { $regex: new RegExp(property_type, "i") },
//     });
//     // .toArray();
//     // Convert cursor to array of documents
//     if (!aha || aha.length === 0) {
//       return res.status(404).json({ error: "Posts not found" });
//     }
//     return res.json(aha);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// //pics upload

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(
//       null,
//       path.join(
//         __dirname,
//         "..",
//         "searchhomes",
//         "homes",
//         "src",
//         "components",
//         "uploads"
//       )
//     );
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique filename
//     cb(null, file.originalname);
//   },
// });

// // Initialize multer middleware
// const upload = multer({ storage: storage });

// // POST endpoint to handle file upload
// app.post("/upload", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }
//   res.send("File uploaded successfully.");
// });

app.use("/user", profilerouter);
app.use("/property", postrouter);

app.listen(PORT, () => {
  console.log(`Server Is Running...... At ${PORT}`);
});
