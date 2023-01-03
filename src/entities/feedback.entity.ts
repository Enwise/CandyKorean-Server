import {BaseEntity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Feedback} from "../interfaces/feedback.interface";
import {UserEntity} from "./users.entity";

export class FeedbackEntity extends BaseEntity implements Feedback {
    @PrimaryGeneratedColumn()
    feedback_id: number

    @Column()
    category: string

    @Column()
    text: string

    @Column()
    user_id: number

    @JoinColumn({name: "user_id"})
    @ManyToOne(()=>UserEntity)
    user: UserEntity
}