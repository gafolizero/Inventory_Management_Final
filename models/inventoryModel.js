const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    inventoryID: {
      type: String,
      unique: true,
    },
    material: {
      type: String,
      required: [true, 'A inventory must have a material.'],
      trim: true,
    },
    supplier: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Supplier',
        required: [true, 'Inventory must have a supplier.'],
      },
    ],
    addedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Must have who added the inventory.'],
      },
    ],
    thickness: {
      type: Number,
      required: [true, 'A inventory must have a thickness'],
    },
    quantity: {
      type: Number,
      required: [true, 'A inventory must have quantity'],
    },
    length: {
      type: Number,
      required: [true, 'A inventory must have length'],
    },
    width: {
      type: Number,
      required: [true, 'A inventory must have width'],
    },
    finish: {
      type: String,
      required: [true, 'A inventory must have finish'],
    },
    grain: {
      type: String,
    },
    inventoryType: {
      type: String,
      required: [true, 'A inventory must have type'],
    },
    itemType: {
      type: String,
      required: [true, 'A inventory must have item type'],
    },
    referenceCode: {
      type: String,
      required: [true, 'A inventory must have reference code'],
    },
    leadTime: {
      type: String,
      required: [true, 'A inventory must have lead time'],
    },
    note: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

inventorySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'supplier',
    select: 'supplierName supplierID',
  }).populate({
    path: 'addedBy',
    select: 'name',
  });
  next();
});

inventorySchema.pre(/^save/, function (next) {
  this.populate({
    path: 'addedBy',
    select: 'name',
  });
  next();
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;

// GET /supplier/suppID/inventory
