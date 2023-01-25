import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Attendance} from "../interfaces/attendance.interface";
import {UserEntity} from "./users.entity";

@Entity("attendance")
export class AttendanceEntity extends BaseEntity implements Attendance {
    @PrimaryGeneratedColumn()
    attendance_id: number;

    @Column()
    user_id: number;

    @CreateDateColumn({type:"date"})
    data_created: Date;

    @ManyToOne(() => UserEntity)
    user: UserEntity
}