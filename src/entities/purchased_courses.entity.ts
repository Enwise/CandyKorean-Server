import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {PurchasedCourse} from "../interfaces/purchased_courses.interface";
import {UserEntity} from "./users.entity";
import {CourseEntity} from "./courses.entity";

@Entity('purchased_course')
export class PurchasedCoursesEntity extends BaseEntity implements PurchasedCourse {
    @Column()
    is_completed: boolean

    @Column()
    is_started: boolean

    @CreateDateColumn()
    date_created: Date

    @PrimaryColumn()
    user_id:number

    @PrimaryColumn()
    course_id:number

    @JoinColumn({name: "user_id"})
    @ManyToOne(() => UserEntity, (user) => user.purchasedCourses)
    user: UserEntity

    @JoinColumn({name: "course_id"})
    @ManyToOne(() => CourseEntity)
    course: CourseEntity
}