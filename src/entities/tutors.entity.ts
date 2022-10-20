import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany} from "typeorm"
import {Tutor} from "../interfaces/tutors.interface";
import {UserEntity} from "./users.entity";
import {LevelEntity} from "./level.entity";

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

    @OneToMany(()=>LevelEntity, (level) => level.tutor)
    levels: LevelEntity[]
}
