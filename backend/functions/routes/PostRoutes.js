const router = require('express').Router();
const { Storage } = require('@google-cloud/storage');
const Post = require('../models/Post');

// const postservices = require('../services/PostServices');

// const isAuth = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.status(403).json({
//     message: 'Not authenticated',
//   });
// };

// const rejectMethod = (_req, res) => {
//   res.sendStatus(405);
// };

// router.route('/startpost').patch(isAuth, postservices.startPost).all(rejectMethod);

// router
//   .route('/post')
//   .post(isAuth, postservices.newPost)
//   .patch(isAuth, postservices.patchPost)
//   .delete(isAuth, postservices.deletePost)
//   .all(rejectMethod);

// router.route('/page/:page').get(postservices.postsPage).all(rejectMethod);

// router.route('/my-posts/page/:page').get(isAuth, postservices.mypostsPage).all(rejectMethod);

// router.route('/my-likes/page/:page').get(isAuth, postservices.mybidsPage).all(rejectMethod);

// router.route('/my-history/page/:page').get(isAuth, postservices.myhistoryPage).all(rejectMethod);

// router
//   .route('/')
//   .get(isAuth, postservices.list)
//   .put(isAuth, postservices.update)
//   .post(isAuth, postservices.create)
//   .all(rejectMethod);

// router
//   .route('/post/:id')
//   .delete(isAuth, postservices.delete)
//   .get(postservices.read)
//   .all(rejectMethod);

// NEW POST
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

router.post('/newpost', (req, res) => {
  const { poster, desc } = req.body;
  const { originalname, mimetype, buffer } = req.files[0];

  const blob = bucket.file(originalname);

  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: mimetype,
    },
  });

  blobWriter.on('finish', () => {
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(
      blob.name
    )}?alt=media`;
    const newPost = new Post();
    newPost.poster = poster;
    newPost.description = desc;
    newPost.imageUrl = publicUrl;
    newPost.isReported = false;
    newPost.likes = [];
    newPost.comments = [];
    newPost.date = new Date();

    newPost.save().then(() => {
      res.status(200).json({ msg: 'Success!' });
    });
  });

  blobWriter.end(buffer);
});
module.exports = router;
