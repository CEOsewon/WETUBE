import express from "express";
import routes from "../routes";
import { getRegisterView } from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.get(routes.registerView, getRegisterView);

export default apiRouter;
