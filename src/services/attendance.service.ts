import {Attendance} from "../interfaces/attendance.interface";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {User} from "../interfaces/users.interface";
import {UserEntity} from "../entities/users.entity";
import {AttendanceEntity} from "../entities/attendance.entity";
import {CreateAttendanceDto} from "../dtos/attendance.dto";

class AttendanceService {
    public async findAllAttendanceByUserId(userId: number): Promise<Attendance[]> {
        if (isEmpty(userId)) throw new HttpException(400, "userId is empty");

        const findUser: User = await UserEntity.findOne({where: {user_id: userId}});
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        const attendances: Attendance[] = await AttendanceEntity.find({where: {user_id: userId}});

        return attendances;
    }

    public async createAttendance(attendanceData: CreateAttendanceDto): Promise<Attendance> {
        const findUser: User = await UserEntity.findOne({where: {user_id: attendanceData.user_id}});
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        const createAttendanceData: Attendance = await AttendanceEntity.create({...attendanceData}).save();

        return createAttendanceData;
    }

    public async deleteAttendance(attendanceId: number): Promise<Attendance> {
        const findAttendance: Attendance = await AttendanceEntity.findOne({where: {attendance_id: attendanceId}});
        if (!findAttendance) throw new HttpException(409, "Attendance doesn't exist");

        await AttendanceEntity.delete(attendanceId);

        return findAttendance;
    }
}

export default AttendanceService;