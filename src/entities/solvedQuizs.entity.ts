import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {SolvedQuiz} from "../interfaces/solvedQuiz.interface";
import {QuizsEntity} from "./quizs.entity";
import {UserEntity} from "./users.entity";

@Entity('solved_quiz')
export class SolvedQuizsEntity extends BaseEntity implements SolvedQuiz {
    @Column()
    is_correct: boolean

    @PrimaryColumn()
    user_id: number

    @PrimaryColumn()
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