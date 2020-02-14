/* jshint esversion: 6 */
const express = require("express");

const router = express.Router();

const userDb = require("./userDb.js");
const postDb = require("../posts/postDb.js");

router.post("/", validateUser, (req, res) => {
  // do your magic!
  userDb.insert(req.body).then(user => {
    res.status(201).json(user);
  });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  postDb.insert(req.body).then(post => {
    res.status(201).json(post);
  });
});

//GET List of all users
router.get("/", (req, res) => {
  userDb
    .get(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The posts information could not be retrieved."
      });
    });
  res.status(200);
});

//GET specific user by ID
router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  userDb
    .getById(id)
    .then(item => {
      if (!id) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(item);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

//GET id post
router.get("/:id/posts", validateUserId, (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error getting the messages for the hub"
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  userDb
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been deleted" });
      } else {
        res.status(404).json({
          message: "The post with the specified ID could not be found"
        });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error the post could not be removed"
      });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const changes = req.body;
  userDb
    .update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the hub"
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  userDb.getById(req.params.id).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({
        message: "Invalid user ID"
      });
    }
  });
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: "Missing user data."
    });
  } else if (!req.body.name) {
    res.status(400).json({
      message: "Missing required name field."
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body && !req.body.text) {
    res.status(400).json({
      message: "Missing post Data."
    });
  } else if (!req.body.text) {
    res.status(400).json({
      message: "Missing required text field."
    });
  } else {
    next();
  }
}

module.exports = router;
