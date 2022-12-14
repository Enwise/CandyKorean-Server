import {Request, Response} from "express";
import morgan, {StreamOptions} from "morgan"
import logger from "../modules/winston.module";

morgan.token("status", function (req, res) {
    let color;

    if (res.statusCode < 300) color = "\x1B[32m"; //green
    else if (res.statusCode < 400) color = "\x1B[36m"; //cyan
    else if (res.statusCode < 500) color = "\x1B[33m"; //yellow
    else if (res.statusCode < 600) color = "\x1B[31m"; //red
    else color = "\x1B[0m"; /*글자색 초기화*/

    return color + res.statusCode + "\x1B[0m";
});

morgan.token("request", (req: Request, res: Response) => {
    return "body" + JSON.stringify(req.body);
});

const combined =
    '\x1b[0m :remote-addr - :remote-user :method :url :request HTTP/:http-version :status :res[content-length] :referrer :user-agent'; // 기존 combined 포멧에서 timestamp만 제거
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : combined; // NOTE: morgan 출력 형태 server.env에서 NODE_ENV 설정 production : 배포 dev : 개발

const stream: StreamOptions = {
    write: (message) => {
        logger.info(message.substring(0, message.lastIndexOf("\n")));
    },
};

const myMorgan = morgan(morganFormat, {stream: stream});

export default myMorgan;
