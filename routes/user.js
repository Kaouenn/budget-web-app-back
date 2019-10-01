const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/user/create", async (req, res) => {
  try {
    const existingUser = await User.findOne({ name: req.body.name });
    if (existingUser !== null) {
      return res.status(400).json({
        error: {
          message: "User already exist"
        }
      });
    }
    const newUser = new User({
      name: req.body.name
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/user", async (req, res) => {
  try {
    const user = await User.find().populate("expense");
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/user/remove", async (req, res) => {
  try {
    const userToDelete = await User.find().populate("expense");

    // Vérifier que l'objet a bien été trouvé
    // if (department !== null && department !== undefined && department !== false && department !== 0 && department !== "" ) {

    // Enregistrer les modifications
    await userToDelete.remove();

    return res.json("user deleted");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
