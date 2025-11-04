const express = require("express");
const { body, validationResult } = require("express-validator");
const Record = require("../models/Record");

const router = express.Router();

// GET /api/records - Fetch records with pagination, search, and date filtering
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", startDate, endDate } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const records = await Record.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await Record.countDocuments(query);

    res.json({
      records,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/records - Create a new record
router.post(
  "/",
  [
    body("title").isLength({ min: 1 }).withMessage("Title is required"),
    body("description")
      .isLength({ min: 1 })
      .withMessage("Description is required"),
    body("date").isISO8601().withMessage("Valid date is required"),
    body("status")
      .isIn(["active", "inactive"])
      .withMessage("Status must be active or inactive"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const record = new Record(req.body);
      await record.save();
      res.status(201).json(record);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// PUT /api/records/:id - Update a record
router.put(
  "/:id",
  [
    body("title")
      .optional()
      .isLength({ min: 1 })
      .withMessage("Title is required"),
    body("description")
      .optional()
      .isLength({ min: 1 })
      .withMessage("Description is required"),
    body("date").optional().isISO8601().withMessage("Valid date is required"),
    body("status")
      .optional()
      .isIn(["active", "inactive"])
      .withMessage("Status must be active or inactive"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!record) return res.status(404).json({ error: "Record not found" });
      res.json(record);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// DELETE /api/records/:id - Delete a record
router.delete("/:id", async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
