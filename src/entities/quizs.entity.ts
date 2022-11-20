import {BaseEntity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Quiz} from "../interfaces/quizs.interface";
import {ContentsEntity} from "./contents.entity";

export class QuizsEntity extends BaseEntity implements Quiz {
    @PrimaryGeneratedColumn()
    quiz_id: number;

    @Column()
    question: string;

    @Column()
    answer: string;

    @JoinColumn({name:"content_id"})
    @ManyToOne(()=>ContentsEntity, (content) => content.quizs)
    content: ContentsEntity;


}