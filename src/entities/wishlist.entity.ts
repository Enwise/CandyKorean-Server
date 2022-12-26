import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Wishlist} from "../interfaces/wishlist.interface";
import {UserEntity} from "./users.entity";
import {CourseEntity} from "./courses.entity";

@Entity('wishlist')
export class WishListEntity extends BaseEntity implements Wishlist {
    @Column()
    checked: boolean

    @PrimaryColumn()
    user_id: number

    @PrimaryColumn()
    course_id: number

    @JoinColumn({name: "user_id"})
    @ManyToOne(() => UserEntity)
    user: UserEntity

    @JoinColumn({name: "course_id"})
    @ManyToOne(() => CourseEntity)
    course: CourseEntity
}
