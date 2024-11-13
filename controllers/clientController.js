const Client = require('../models/clientModel');
const factory = require('./handleFactory');

exports.createClient = factory.createOne(Client);

exports.getAllClient = factory.getAll(Client);
