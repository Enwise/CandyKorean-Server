import AttendanceService from "../services/attendance.service";
import {NextFunction, Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {CreateAttendanceDto} from "../dtos/attendance.dto";

class AttendanceController {
    public attendanceService = new AttendanceService();

    public getAllAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId: number = Number(req.params.id);
            const getAllAttendanceData = await this.attendanceService.findAllAttendanceByUserId(userId);

            res.status(200).json({ data: getAllAttendanceData, message: 'findAllByUserId' });
        } catch (error) {
            next(error)
        }
    }

    public createAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const attendanceData = plainToInstance(CreateAttendanceDto, req.body);
            const createAttendanceData = await this.attendanceService.createAttendance(attendanceData);

            res.status(201).json({ data: createAttendanceData, message: 'crated' });
        } catch (error) {
            next(error)
        }
    }

    public deleteAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const attendanceId: number = Number(req.params.id);
            const deleteAttendanceData = await this.attendanceService.deleteAttendance(attendanceId);

            res.status(200).json({ data: deleteAttendanceData, message: 'deleted' });
        } catch (error) {
            next(error)
        }
    }
}

export default AttendanceController;