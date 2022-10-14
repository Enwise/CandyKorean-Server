import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm"
import {Tutor} from "../interfaces/tutors.interface";
import {UserEntity} from "./users.entity";

@Entity('tutor')
export class TutorEntity extends BaseEntity implements Tutor {
    @PrimaryGeneratedColumn()
    tutor_id: number

    @Column()
    name: string

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user_id: UserEntity
}
