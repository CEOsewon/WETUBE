import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

// 미들웨어
app.use(helmet()); // 앱 보안
app.set("view engine", "pug"); // 뷰 엔진 설정
app.use(bodyParser.json()); // html form 정보 파싱
app.use(bodyParser.urlencoded({ extended: true })); // html url qeuryString 파싱
app.use(cookieParser()); // 사용자정보(로그인정보) 쿠키 저장
app.use(morgan("dev")); // HTTP req(요청) 로깅

app.use(localsMiddleware); // 전역변수 선언

// 라우터
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
