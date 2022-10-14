import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm"
import {Tutor} from "../interfaces/tutors.interface";
import {UserEntity} from "./users.entity";

@Entity('tutor')
export class TutorEntity extends BaseEntity implements Tutor {
    @PrimaryGeneratedColumn()
    tutor_id: number

    @Column()
    enabled: boolean

    @Column()
    name: string

    @OneToOne(() => UserEntity)
    @JoinColumn({name:"user_id"})
    user: UserEntity
}
