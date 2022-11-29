import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { User } from "../interfaces/users.interface";
import { TutorEntity } from "./tutors.entity";
import { PurchasedCoursesEntity } from "./purchasedCourses.entity";

@Entity("user")
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  login_id: string;

  @Column()
  password: string;

  @Column()
  enabled: boolean;

  @Column()
  nickname: string;

  @Column()
  nationality: string;

  @Column()
  korean_level: string;

  @Column()
  job: string;

  @Column()
  gender: string;

  @Column()
  date_of_birth: string;

  @Column()
  survey_answers: string;

  @Column()
  @CreateDateColumn()
  date_created: Date;

  @Column()
  @UpdateDateColumn()
  date_updated: Date;

  @OneToOne(() => TutorEntity)
  tutors: TutorEntity[];

  @OneToMany(
    () => PurchasedCoursesEntity,
    (purchasedCourse) => purchasedCourse.user
  )
  purchasedCourses: PurchasedCoursesEntity[];
}
