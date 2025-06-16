// controllers/bundle.controller.js
const Bundle = require('../models/bundle.model');

// Create a new bundle
exports.createBundle = async (req, res) => {
  try {
    const { bundleId, title, subject, price, description, totalPapers } = req.body;
    if (await Bundle.findOne({ bundleId })) {
      return res.status(400).json({ message: 'Bundle ID already exists' });
    }
    const bundle = new Bundle({ bundleId, title, subject, price, description, totalPapers });
    await bundle.save();
    res.status(201).json(bundle);
  } catch (err) {
    console.error('Error creating bundle:', err);
    res.status(500).json({ message: 'Server error creating bundle' });
  }
};

// Get all bundles
exports.getAllBundles = async (_req, res) => {
  try {
    const bundles = await Bundle.find();
    res.json(bundles);
  } catch (err) {
    console.error('Error fetching bundles:', err);
    res.status(500).json({ message: 'Server error fetching bundles' });
  }
};

// Get one bundle by bundleId
exports.getBundleById = async (req, res) => {
  try {
    const { bundleId } = req.params;
    const bundle = await Bundle.findOne({ bundleId });
    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found' });
    }
    res.json(bundle);
  } catch (err) {
    console.error('Error fetching bundle:', err);
    res.status(500).json({ message: 'Server error fetching bundle' });
  }
};

// Update an existing bundle
exports.updateBundle = async (req, res) => {
  try {
    const { bundleId } = req.params;
    const updated = await Bundle.findOneAndUpdate(
      { bundleId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Bundle not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating bundle:', err);
    res.status(500).json({ message: 'Server error updating bundle' });
  }
};

// Delete a bundle
exports.deleteBundle = async (req, res) => {
  try {
    const { bundleId } = req.params;
    const deleted = await Bundle.findOneAndDelete({ bundleId });
    if (!deleted) {
      return res.status(404).json({ message: 'Bundle not found' });
    }
    res.json({ message: 'Bundle deleted' });
  } catch (err) {
    console.error('Error deleting bundle:', err);
    res.status(500).json({ message: 'Server error deleting bundle' });
  }
};
