/* jshint esversion: 6 */
const express = require("express");

const router = express.Router();

const userDb = require("./userDb.js");

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
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
router.get("/:id", (req, res) => {
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

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
