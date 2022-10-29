import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Course} from "../interfaces/courses.interface";
import {LevelEntity} from "./levels.entity";

@Entity('course')
export class CourseEntity extends BaseEntity implements Course {
    @PrimaryGeneratedColumn()
    course_id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    info: string

    @Column()
    category: string

    @Column()
    view_count: number

    @CreateDateColumn()
    date_created: Date

    @UpdateDateColumn()
    date_updated: Date

    @ManyToOne(() => LevelEntity, (level) => level.courses)
    level: LevelEntity
}