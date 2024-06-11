const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  removed: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
  name: { type: String, required: true },
  description: String,
  color: { type: String, lowercase: true, trim: true, required: true },
  parentCategory: {
    type: mongoose.Schema.ObjectId,
    ref: 'ParentCategory',
    required: true,
    autopopulate: true,
  },
  parentCategoryName: String,

  title: String,
  tags: [String],
  icon: String,
  headerImage: String,
  photo: String,
  images: [
    {
      id: String,
      name: String,
      path: String,
      description: String,
      isPublic: { type: Boolean, default: false },
    },
  ],
  files: [
    {
      id: String,
      name: String,
      path: String,
      description: String,
      isPublic: { type: Boolean, default: false },
    },
  ],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  isPublic: { type: Boolean, default: true },
});

productCategorySchema.pre('save', async function (next) {
  if (this.parentCategory) {
    const parentCategoryDoc = await mongoose.model('ParentCategory').findById(this.parentCategory);
    if (parentCategoryDoc) {
      this.parentCategoryName = parentCategoryDoc.name;
    }
  }
  next();
});

productCategorySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('ProductCategory', productCategorySchema);
