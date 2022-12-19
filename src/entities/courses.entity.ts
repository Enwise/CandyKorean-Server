import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Course} from "../interfaces/courses.interface";
import { TutorEntity } from './tutors.entity';
import {LevelEntity} from "./levels.entity";
import {ClassesEntity} from "./classes.entity";
import {PurchasedCoursesEntity} from "./purchasedCourses.entity";

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

    @Column({default: false})
    is_wishlist: boolean

    @CreateDateColumn()
    date_created: Date

    @UpdateDateColumn()
    date_updated: Date

    @JoinColumn({name: "level_id"})
    @ManyToOne(() => LevelEntity, (level) => level.courses)
    level: LevelEntity
    
    @JoinColumn({name:"tutor_id"})
    @OneToOne(() => TutorEntity)
    tutor: TutorEntity

    @OneToMany(() => ClassesEntity, (classes) => classes.course)
    classes: ClassesEntity[] 

    @OneToMany(() => PurchasedCoursesEntity, (purchasedCourse) => purchasedCourse.course)
    purchasedCourses: PurchasedCoursesEntity[]


}