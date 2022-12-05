import {BaseEntity, Column, CreateDateColumn, JoinColumn, ManyToOne} from "typeorm";
import {SolvedQuiz} from "../interfaces/solvedQuiz.interface";
import {QuizsEntity} from "./quizs.entity";
import {UserEntity} from "./users.entity";

export class SolvedQuizsEntity extends BaseEntity implements SolvedQuiz {
    @Column()
    is_correct: boolean

    @Column()
    user_id: number

    @Column()
    quiz_id: number

    @CreateDateColumn()
    date_created: Date

    @JoinColumn({name: "user_id"})
    @ManyToOne(() => UserEntity)
    user: UserEntity

    @JoinColumn({name: "quiz_id"})
    @ManyToOne(() => QuizsEntity)
    quiz: QuizsEntity
}