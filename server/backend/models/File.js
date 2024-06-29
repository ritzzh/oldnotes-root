const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  isFolder: { type: Boolean, required: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'File', default: null },
  children: [{ type: Schema.Types.ObjectId, ref: 'File' }],
});

module.exports = mongoose.model('File', FileSchema);
