import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import moment from "moment-timezone";
const {combine, printf, colorize} = winston.format;

const logDir = "logs";

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
};

winston.addColors(colors);
moment.tz.setDefault("Asia/Seoul");
const timeStamp = () => moment().format("YYYY-MM-DD HH:mm:ss");

const logFormat = printf((info) => {
    return `${timeStamp()} [${info.level}] ${info.message}`;
});

const logger = winston.createLogger({
    format: combine(logFormat, colorize({ all: true })),
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: "info",
            dirname: logDir,
            filename: `%DATE%.log`, // file 이름 날짜로 저장
            maxFiles: 30, // 30일치 로그 파일 저장
        }),
        new winstonDaily({
            level: "error",
            dirname: logDir,
            filename: `%DATE%.error.log`,
            maxFiles: 30,
        }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: logFormat,
            handleExceptions: true,
        })
    );
}

export default logger;
