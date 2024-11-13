const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const supplierSchema = new mongoose.Schema(
  {
    supplierID: {
      type: String,
      required: true,
      unique: true,
    },
    supplierName: {
      type: String,
      required: [true, 'Please enter name of supplier'],
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowerCase: true,
      validate: [validator.isEmail, 'Please provide valid email'],
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    representative: {
      type: String,
      required: true,
    },
    slug: String,
    addedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Must have who added the inventory.'],
      },
    ],
    addedOn: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

supplierSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'addedBy',
    select: 'name',
  });
  next();
});

supplierSchema.virtual('inventoriesSupplied', {
  ref: 'Inventory',
  foreignField: 'supplier',
  localField: '_id',
});

supplierSchema.virtual('supplierHistory', {
  ref: 'ActionHistory',
  foreignField: 'modifiedID',
  localField: '_id',
});

supplierSchema.pre('save', function (next) {
  this.slug = slugify(this.supplierName, { lower: true });
  next();
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
