import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Course } from "../interfaces/courses.interface";
import { TutorEntity } from "./tutors.entity";
import { LevelEntity } from "./levels.entity";
import { ClassesEntity } from "./classes.entity";
import { PurchasedCoursesEntity } from "./purchasedCourses.entity";
import {WishListEntity} from "./wishlist.entity";

@Entity("course")
export class CourseEntity extends BaseEntity implements Course {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column()
  name: string;

  @Column("double")
  price: number;

  @Column()
  info: string;

  @Column()
  category: string;

  @Column()
  view_count: number;

  @CreateDateColumn()
  date_created: Date;

  @UpdateDateColumn()
  date_updated: Date;

  @Column()
  tutor_id: number;

  @Column()
  level_id: number;

  @Column()
  thumbnail: string;

  @Column()
  is_premium: boolean;

  @JoinColumn({ name: "tutor_id" })
  @ManyToOne(() => TutorEntity)
  tutor: TutorEntity;

  @JoinColumn({ name: "level_id" })
  @ManyToOne(() => LevelEntity)
  level: LevelEntity;

  @OneToMany(() => ClassesEntity, (classes) => classes.course)
  classes: ClassesEntity[];

  @OneToMany(
    () => PurchasedCoursesEntity,
    (purchasedCourse) => purchasedCourse.course
  )
  purchasedCourses: PurchasedCoursesEntity[];

  @OneToMany(() => WishListEntity, (wishlist) => wishlist.course)
  wishlists: WishListEntity[]
}
