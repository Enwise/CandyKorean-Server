import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import AttendanceController from "../controllers/attendance.controller";
import {CreateAttendanceDto} from "../dtos/attendance.dto";

class AttendanceRoute implements Routes {
    public path = '/attendance';
    public router = Router();
    public attendanceController = new AttendanceController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id(\\d+)`, this.attendanceController.getAllAttendance);
        this.router.post(`${this.path}`, validationMiddleware(CreateAttendanceDto, 'body'), this.attendanceController.createAttendance);
        this.router.delete(`${this.path}/:id(\\d+)`, this.attendanceController.deleteAttendance);
    }
}

export default AttendanceRoute;