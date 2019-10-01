const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Expense = require("../models/expense");

router.post("/expense/create", async (req, res) => {
  try {
    if (req.body.description.length > 25) {
      res.status(400).json({
        error: {
          message: "Description is too long"
        }
      });
    }
    const newExpense = new Expense({
      user: req.body.user,
      description: req.body.description,
      amount: req.body.amount
    });

    await newExpense.save();
    res.json(newExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/expense", async (req, res) => {
  try {
    const expense = await Expense.find().populate("user");
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/expense/remove", async (req, res) => {
  try {
    const userToDelete = await Expense.find().populate("user");

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
