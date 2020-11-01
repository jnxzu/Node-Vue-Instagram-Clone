const mongoose = require('mongoose');

const { Schema } = mongoose;
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    likes: [{ type: String }],
    reposts: [{ type: String }],
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

delete mongoose.connection.models.Post;
PostSchema.plugin(aggregatePaginate);
const Post = mongoose.model('Post', PostSchema);

Post.processErrors = (err) => {
  const msg = {};
  for (const key in err.errors) {
    msg[key] = err.errors[key].message;
  }
  return msg;
};

global.PostSchema = global.PostSchema || Post;
module.exports = global.PostSchema;
