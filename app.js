import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";

const app = express();

// 함수
const handleHome = (req, res) => res.send("Hello from home");
const handleProfile = (req, res) => res.send("You are on my profile");

// 미들웨어
app.use(helmet()); // 앱 보안
app.use(bodyParser.json()); // html form 정보 파싱
app.use(bodyParser.urlencoded({ extended: true })); // html url qeuryString 파싱
app.use(cookieParser()); // 사용자정보(로그인정보) 쿠키 저장
app.use(morgan("dev")); // HTTP req(요청) 로깅

// 라우터
app.get("/", handleHome);
app.get("/profile", handleProfile);
app.use("/user", userRouter);

export default app;
