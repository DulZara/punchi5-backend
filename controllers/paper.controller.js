// controllers/paper.controller.js
const Paper  = require('../models/paper.model');

// Create a new paper under a bundle
exports.createPaper = async (req, res) => {
  try {
    const { bundleId } = req.params;
    const data = { bundleId, ...req.body };
    const exists = await Paper.findOne({ paperId: data.paperId });
    if (exists) {
      return res.status(400).json({ message: 'Paper ID already exists' });
    }
    const paper = new Paper(data);
    await paper.save();
    res.status(201).json(paper);
  } catch (err) {
    console.error('Error creating paper:', err);
    res.status(500).json({ message: 'Server error creating paper' });
  }
};

// Get all papers for a bundle
exports.getPapersByBundle = async (req, res) => {
  try {
    const { bundleId } = req.params;
    const papers = await Paper.find({ bundleId });
    res.json(papers);
  } catch (err) {
    console.error('Error fetching papers:', err);
    res.status(500).json({ message: 'Server error fetching papers' });
  }
};

// Get a single paper
exports.getPaperById = async (req, res) => {
  try {
    const { paperId } = req.params;
    const paper = await Paper.findOne({ paperId });
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    res.json(paper);
  } catch (err) {
    console.error('Error fetching paper:', err);
    res.status(500).json({ message: 'Server error fetching paper' });
  }
};

// Update a paper
exports.updatePaper = async (req, res) => {
  try {
    const { paperId } = req.params;
    const updated = await Paper.findOneAndUpdate(
      { paperId }, req.body, { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating paper:', err);
    res.status(500).json({ message: 'Server error updating paper' });
  }
};

// Delete a paper
exports.deletePaper = async (req, res) => {
  try {
    const { paperId } = req.params;
    const deleted = await Paper.findOneAndDelete({ paperId });
    if (!deleted) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    res.json({ message: 'Paper deleted' });
  } catch (err) {
    console.error('Error deleting paper:', err);
    res.status(500).json({ message: 'Server error deleting paper' });
  }
};
