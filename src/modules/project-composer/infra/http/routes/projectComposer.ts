import express from "express";
import { GenerateFEProjectController } from "../../../useCases/generateFEProject/generateFEProjectController";
import { generateFEProject } from "../../../useCases/generateFEProject";

const projectComposerRouter = express.Router();

projectComposerRouter.post("/feProject", (req, res) =>
  new GenerateFEProjectController(
    generateFEProject
  ).execute(req, res)
);

export { projectComposerRouter };