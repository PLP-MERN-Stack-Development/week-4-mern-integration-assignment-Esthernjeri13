const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate("user", "username");
  res.json(comments);
};

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    post: req.params.postId,
    user: req.user.id,
    content: req.body.content
  });
  res.status(201).json(comment);
};
