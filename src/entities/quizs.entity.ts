import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Quiz} from "../interfaces/quizs.interface";
import {ContentsEntity} from "./contents.entity";

@Entity('quiz')
export class QuizsEntity extends BaseEntity implements Quiz {
    @PrimaryGeneratedColumn()
    quiz_id: number;

    @Column()
    style: string;

    @Column({length: 511})
    json: string;

    @JoinColumn({name:"content_id"})
    @ManyToOne(()=>ContentsEntity, (content) => content.quizs)
    content: ContentsEntity;
}