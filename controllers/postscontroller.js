const { default: mongoose } = require("mongoose");
const posts = require("../models/postmodel");
const middleware = require("../models/middleware");
const multer = require("multer");


const count =(async (req, res) => {
  try {
    const count = await posts.countDocuments();
    console.log(count);
    res.json({ count });
  } catch (error) {
    console.error("Error counting documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//post a property of a user


// post property
const postproperty=( async (req, res) => {
  try {
    const {
      ownername,
      email,
      phone,
      owner_id,
      town_or_city_name,
      landmark,
      address_with_doorno,
      rent_or_sale,
      rent_or_sale_amount,
      area,
      no_of_bedrooms,
      bathrooms,
      non_veg_allowed,
      Furnishing,
      property_type,
      possession,
      gated_security,
      parking,
      posted_on,
      floor,
      preferred_tenant,
      Balcony,
      Age_of_building,
      power_backup,
      facing,
      water_supply,
      Maintanence,
      gmaps,
      pic1,
      pic2,
      pic3,
      pic4,
    } = req.body;
    let count = await posts.countDocuments(); // Fetch the count of documents
    // localStorage.setItem("count", count);
    let property = new posts({
      ownername,
      email,
      phone,
      owner_id,
      post_no: count + 1,
      town_or_city_name,
      landmark,
      address_with_doorno,
      rent_or_sale,
      rent_or_sale_amount,
      area,
      no_of_bedrooms,
      bathrooms,
      non_veg_allowed,
      Furnishing,
      property_type,
      possession,
      gated_security,
      parking,
      posted_on,
      floor,
      preferred_tenant,
      Balcony,
      Age_of_building,
      power_backup,
      facing,
      water_supply,
      Maintanence,
      gmaps,
      pic1,
      pic2,
      pic3,
      pic4,
    });
    await property.save(); // Make sure to await the save operation
    return res.status(200).send("property posted successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

//    all user's properties 


const allproperties=( async (req, res) => {
  try {
    let allprofiles = await posts.find();
    return res.json(allprofiles);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server Error");
  }
});


// particular user properties 

const myproperties=( async (req, res) => {
  try {
    let allreviews = await posts.find();
    let myreviews = allreviews.filter(
      (review) => review.owner_id.toString() === req.user.id.toString()
    );

    return res.status(200).json(myreviews);
  } catch {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});


//  update property


const updateproperty=(async (req, res) => {
  try {
    const {
      ownername,
      email,
      phone,
      town_or_city_name,
      landmark,
      address_with_doorno,
      rent_or_sale,
      rent_or_sale_amount,
      area,
      no_of_bedrooms,
      bathrooms,
      non_veg_allowed,
      Furnishing,
      property_type,
      possession,
      gated_security,
      parking,
      posted_on,
      floor,
      preferred_tenant,
      Balcony,
      Age_of_building,
      power_backup,
      facing,
      water_supply,
      Maintanence,
      gmaps,
      pic1,
      pic2,
      pic3,
      pic4,
    } = req.body;

    const updatedProperty = await posts.findOneAndUpdate(
      { post_no: req.params.post_no },
      {
        ownername,
        email,
        phone,
        town_or_city_name,
        landmark,
        address_with_doorno,
        rent_or_sale,
        rent_or_sale_amount,
        area,
        no_of_bedrooms,
        bathrooms,
        non_veg_allowed,
        Furnishing,
        property_type,
        possession,
        gated_security,
        parking,
        posted_on,
        floor,
        preferred_tenant,
        Balcony,
        Age_of_building,
        power_backup,
        facing,
        water_supply,
        Maintanence,
        gmaps,
        pic1,
        pic2,
        pic3,
        pic4,
      },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error("There Is An Error", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// delete a post 


const deleteproperty=( async (req, res) => {
  try {
    // Get the post_no of the document to be deleted
    const postNoToDelete = req.params.post_no;

    // Delete the document from the collection
    const deletedPost = await posts
      .findOneAndDelete({
        post_no: postNoToDelete,
      })
      .then(console.log("Deleted Success"));

    // if (!deletedPost) {
    //   // If the document with the given post_no is not found
    //   return res.status(404).json({ message: "Post not found" });
    // }

    // Adjust the post_no values of remaining documents
    await posts.updateMany(
      { post_no: { $gt: parseInt(postNoToDelete) } },
      { $inc: { post_no: -1 } }
    );

    return res.status(204).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// filter 

const findapost=(async (req, res) => {
  try {
    const {
      town_or_city_name,
      rent_or_sale_amount,
      no_of_bedrooms,
      landmark,
      rent_or_sale,
      property_type,
    } = req.body;
    // Assuming 'posts' is your MongoDB collection
    let aha = await posts.find({
      town_or_city_name: { $regex: new RegExp(town_or_city_name, "i") },
      rent_or_sale_amount: { $lt: rent_or_sale_amount },

      no_of_bedrooms: { $regex: new RegExp(no_of_bedrooms) },
      landmark: { $regex: new RegExp(landmark, "i") },
      rent_or_sale: { $regex: new RegExp(rent_or_sale, "i") },
      property_type: { $regex: new RegExp(property_type, "i") },
    });
    // .toArray();
    // Convert cursor to array of documents
    if (!aha || aha.length === 0) {
      return res.status(404).json({ error: "Posts not found" });
    }
    return res.json(aha);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//pics to upload 


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(
        __dirname,
        "..",
        "searchhomes",
        "homes",
        "src",
        "components",
        "uploads"
      )
    );
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    cb(null, file.originalname);
  },
});

// Initialize multer middleware
const upload = multer({ storage: storage });

// POST endpoint to handle file upload

 //-----------------------
// app.post("/upload", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }
//   res.send("File uploaded successfully.");
// });



//


const uploadFile = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).send("Error uploading file.");
    }
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    res.send("File uploaded successfully.");
  });
};

module.exports = {
  count,
  postproperty,
  allproperties,
  myproperties,
  updateproperty,
  deleteproperty,
  findapost,
  uploadFile
};