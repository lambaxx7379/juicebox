const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');


tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); // THIS IS DIFFERENT
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
  
    res.send({
      tags
    });
  });

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  // read the tagname from the params
  const tagName = decodeURIComponent(req.params.tagName);
  try {
    // use our method to get posts by tag name from the db
    const getPosts = await getPostsByTagName(tagName);
    const posts = getPosts.filter( post => {
        return post.active || (req.user && post.author.id === req.user.id);
      });
    // send out an object to the client { posts: // the posts }
    res.send({
      posts: posts,
    });
  } catch ({ name, message }) {
    next({ name, message });
    // forward the name and message to the error handler
  }
});

module.exports = tagsRouter;