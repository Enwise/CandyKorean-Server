import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Class} from "../interfaces/classes.interface";
import {CourseEntity} from "./courses.entity";

@Entity('class')
export class ClassesEntity extends BaseEntity implements Class {
    @PrimaryGeneratedColumn()
    class_id: number

    @Column()
    name: string

    @CreateDateColumn()
    date_created: Date

    @UpdateDateColumn()
    date_updated: Date

    @ManyToOne(()=>CourseEntity, (course)=>course.classes)
    course: CourseEntity;
}