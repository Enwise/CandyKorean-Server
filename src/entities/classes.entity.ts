import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Class} from "../interfaces/classes.interface";
import {CourseEntity} from "./courses.entity";
import {ContentsEntity} from "./contents.entity";

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

    @OneToMany(()=>ContentsEntity, (contents)=>contents.class_id)
    contents: ContentsEntity[];
}