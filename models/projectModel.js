const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter Project Name'],
  },
  projectID: {
    type: String,
    required: [true, 'Please enter Project ID'],
    unique: [true, 'Please enter Unique Project ID'],
  },
  address: {
    type: String,
    required: [true, 'Please enter Project ID'],
  },
  projectManager: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'ProjectManager',
      required: [true, 'Project Must Have Project Manager'],
    },
  ],
  siteManager: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'SiteManager',
      required: [true, 'Project Must Have Site Manager'],
    },
  ],
  inventory: [
    {
      inventoryItemId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Inventory',
        required: [true, 'Project Must Have Inventory Id'],
      },
      inventoryquantity: {
        type: Number,
        requried: [true, 'Inventory must have Quantity'],
        min: [1, 'Quantity cannot be 0'],
      },
    },
  ],
  client: {
    clientName: {
      type: String,
      required: [true, 'Please Enter Client Name'],
    },
    clientNumber: {
      type: Number,
      required: [true, 'Please Enter Client Number'],
    },
    clientType: {
      type: String,
      required: [true, 'Please Enter Client Type'],
    },
  },
});

projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'projectManager',
    select: 'name employeeID',
  })
    .populate({
      path: 'siteManager',
      select: 'name employeeID',
    })
    .populate({
      path: 'inventory.inventoryItemId',
      select: 'name inventoryID material',
    });
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
