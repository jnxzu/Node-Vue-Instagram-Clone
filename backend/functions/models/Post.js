const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const PostSchema = new Schema(
  {
    poster: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isReported: {
      type: Boolean,
      required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [CommentSchema],
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

PostSchema.plugin(aggregatePaginate);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
