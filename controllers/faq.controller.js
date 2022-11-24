const Faq = require('../models/faq');

module.exports = {
  getFaqs: async (req, res) => {
    try {
      const faqs = await Faq.find({}, '-__v');
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addFaq: async (req, res) => {
    let data = req.body;
    const faq = new Faq(data);
    try {
      const insertedFaq = await faq.save();
      res.status(201).json(insertedFaq);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateFaq: async (req, res) => {
    let data = req.body;
    try {
      const updatedFaq = await Faq.updateOne(
        { _id: req.params.id },
        { $set: data },
        { runValidators: true }
      );
      res.status(200).json(updatedFaq);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteFaq: async (req, res) => {
    // delete user in db
    try {
      const deleteFaq = await Faq.deleteOne({ _id: req.params.id });
      res.status(200).json({
        message: 'User Deleted Successfully',
        data: deleteFaq,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
