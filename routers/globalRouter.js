import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoControllers";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";

const globalRouter = express.Router();

// join
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

// login
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

export default globalRouter;
