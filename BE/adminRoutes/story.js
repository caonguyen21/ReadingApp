const express = require("express").Router();
const controller = require("../adminController/storyController");
const middlewarecontroller = require("../adminController/middlewareController");
express.get("/", middlewarecontroller.verifyTokenAndAdmin, controller.GetStory);
express.get("/create", middlewarecontroller.verifyTokenAndAdmin, controller.GetCreateStory);
express.get("/detail/:id", middlewarecontroller.verifyTokenAndAdmin, controller.GetDetailStory);
express.get("/chapter/detail/:id", middlewarecontroller.verifyTokenAndAdmin, controller.GetDetailChapter);
express.get("/chapter/update/:id", middlewarecontroller.verifyTokenAndAdmin, controller.GetUpdateChapter);
express.get("/chapter/create/:id", middlewarecontroller.verifyTokenAndAdmin, controller.GetCreateChapter);
express.post("/chapter/create/:id", middlewarecontroller.verifyTokenAndAdmin, controller.PostCreateChapter);
express.post("/chapter/update/:id", middlewarecontroller.verifyTokenAndAdmin, controller.PostUpdateChapter);
express.get("/update/:id", middlewarecontroller.verifyTokenAndAdmin, controller.GetUpdateStory);
express.post("/update/:id", middlewarecontroller.verifyTokenAndAdmin, controller.PostUpdateStory);
module.exports = express;
