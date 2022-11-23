const User = require('../models/user');
const bcrypt = require('bcrypt')

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find({}, "-__v -password -refresh_token");
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id, "-__v -password -refresh_token");
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  addUser: async (req, res) => {
    let data = req.body
    const saltRounds = 10;
    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash;
    const user = new User(data);
    try {
      const inserteduser = await user.save();
      res.status(201).json(inserteduser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateUser: async (req, res) => {
    let data = req.body
    console.log(data);
    const saltRounds = 10;
    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash;
    try {
      const updateduser = await User.updateOne(
        { _id: req.params.id },
        { $set: data }
      );
      res.status(200).json(updateduser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const deleteduser = await User.deleteOne({ _id: req.params.id });
      res.status(200).json(deleteduser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
