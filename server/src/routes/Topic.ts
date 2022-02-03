import { TopicInterface } from "../interface/TopicInterface";
import { TopicModel } from "../models/Topic";
import { ErrorInterface } from "../interface/AuthInterface";
import { Router, Request, Response } from "express";
import { protect } from "../middleware/Auth";
import { audit } from "../middleware/Audit";
export const Topic = Router();

/**
 * @protected Admin
 * @description Creates Topic based on TopicInterface
 * @method POST
 */
Topic.post("/topic/create", protect, audit, async (req: Request, res: Response) => {
  const errorMap: ErrorInterface = {};
  const isUserAdmin = req.user.authLevel.match("Admin");
  if (!isUserAdmin) {
    errorMap.err =
      "Not enough privileges! U are a student or you are not authorized for this action.";
    return res.status(403).json({
      success: false,
      errorMap,
    });
  }
  try {
    const topic = req.body.topic || {};
    await TopicModel.validate(topic);
    const createdTopic = await TopicModel.create(topic);
    return res.status(200).json({
      success: true,
      errorMap,
      topic: createdTopic,
    });
  } catch (error) {
    errorMap.err = "Topic is not correclty filled in or is Missing!";
    return res.status(400).json({
      success: false,
      errorMap,
    });
  }
});

/**
 * @protected Admin
 * @description Deletes topic based on TopicInterface
 * @method POST
 */
Topic.post("/topic/delete", protect, audit, async (req: Request, res: Response) => {
  const errorMap: ErrorInterface = {};
  const isUserAdmin = req.user.authLevel.match("Admin");
  if (!isUserAdmin) {
    errorMap.err =
      "Not enough privileges! U are a student or you are not authorized for this action.";
    return res.status(403).json({
      success: false,
      errorMap,
    });
  }
  try {
    const topic: TopicInterface = req.body.topic || {};
    await TopicModel.validate(topic);
    const deletedTopic = await TopicModel.findOneAndDelete({ _id: topic._id });
    return res.status(200).json({
      success: true,
      errorMap,
      topic: deletedTopic,
    });
  } catch (error) {
    errorMap.err =
      "Topic is not correclty filled in or is missing! Or Id of the topic can not be found!";
    return res.status(400).json({
      success: false,
      errorMap,
    });
  }
});

/**
 * @protected Admin
 * @description Returns all topics based on TopicInterface
 * @method GET
 */
Topic.get("/topic/list", protect, audit, async (req: Request, res: Response) => {
  const errorMap: ErrorInterface = {};
  const isUserAdmin = req.user.authLevel.match("Admin");
  if (!isUserAdmin) {
    errorMap.err =
      "Not enough privileges! U are a student or you are not authorized for this action.";
    return res.status(403).json({
      success: false,
      errorMap,
    });
  }
  try {
    const allTopics = await TopicModel.find({});
    return res.status(200).json({
      success: true,
      errorMap,
      topic: allTopics,
    });
  } catch (error) {
    errorMap.err =
      "Topic is not correclty filled in or is missing! Or Id of the topic can not be found!";
    return res.status(400).json({
      success: false,
      errorMap,
    });
  }
});
/**
 * @protected Admin
 * @description Updates topics based on TopicInterface
 * @method POST
 */
Topic.post("/topic/update", protect, audit, async (req: Request, res: Response) => {
  const errorMap: ErrorInterface = {};
  const isUserAdmin = req.user.authLevel.match("Admin");
  if (!isUserAdmin) {
    errorMap.err =
      "Not enough privileges! U are a student or you are not authorized for this action.";
    return res.status(403).json({
      success: false,
      errorMap,
    });
  }
  try {
    const topic: TopicInterface = req.body.topic || {};
    if (!topic._id) {
      throw new Error("Topic ID is missing");
    }
    await TopicModel.validate(topic);
    const updatedTopic = await TopicModel.findOneAndUpdate(
      { _id: topic._id },
      { ...topic }
    );
    return res.status(200).json({
      success: true,
      errorMap,
      topic: updatedTopic,
    });
  } catch (error) {
    errorMap.err = error.message;
    return res.status(400).json({
      success: false,
      errorMap,
    });
  }
});
