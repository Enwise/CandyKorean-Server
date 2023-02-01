import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TutorEntity} from "./tutors.entity";
import {Teacher} from "../interfaces/teacher.interface";

@Entity('teacher')
class TeacherEntity extends BaseEntity implements Teacher {
    @PrimaryGeneratedColumn()
    teacher_id: number;

    @Column()
    metaverse_url: string;

    @Column()
    tutor_id: number;

    @JoinColumn({ name: "tutor_id" })
    @ManyToOne(() => TutorEntity)
    tutor: TutorEntity;
}

export default TeacherEntity;