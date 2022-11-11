import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Course} from "../interfaces/courses.interface";
import {LevelEntity} from "./levels.entity";
import {ClassesEntity} from "./classes.entity";

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

    @JoinColumn({name:"level_id"})
    @ManyToOne(() => LevelEntity, (level) => level.courses)
    level: LevelEntity

    @OneToMany(()=>ClassesEntity,(classes)=>classes.course)
    classes: ClassesEntity[]
}