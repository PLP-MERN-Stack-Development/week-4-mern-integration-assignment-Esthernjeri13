const Post = require("../models/Post");

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username").populate("category");
  res.json(posts);
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "username").populate("category");
  res.json(post);
};

exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file ? req.file.filename : "";
  const post = await Post.create({
    title,
    content,
    image,
    category,
    author: req.user.id
  });
  res.status(201).json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.author.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  if (req.file) post.image = req.file.filename;
  post.category = req.body.category || post.category;
  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.author.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};
