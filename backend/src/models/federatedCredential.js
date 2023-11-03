const mongoose = require('mongoose');

const FederatedCredential = mongoose.model(
  'FederatedCredential',
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    provider: String,
    subject: String,
  }),
);

module.exports = FederatedCredential;
