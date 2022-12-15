import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Content} from "../interfaces/contents.interface";
import {ClassesEntity} from "./classes.entity";
import {SlidesEntity} from "./slides.entity";
import {QuizsEntity} from "./quizs.entity";

@Entity('content')
export class ContentsEntity extends BaseEntity implements Content{
    @PrimaryGeneratedColumn()
    content_id: number

    @Column()
    name: string

    @Column()
    video_url: string

    @Column()
    thumbnail: string

    @Column()
    view_count: number

    @Column({default: true})
    enabled: boolean

    @Column({default: true})
    is_portrait: boolean

    @Column()
    length: number

    @CreateDateColumn()
    date_created: Date

    @UpdateDateColumn()
    date_updated: Date

    @JoinColumn({name: "class_id"})
    @ManyToOne(()=>ClassesEntity, (class_entity) => class_entity.contents)
    class_entity: ClassesEntity;

    @OneToMany(()=>SlidesEntity,(slide)=>slide.content)
    slides: SlidesEntity[]

    @OneToMany(()=>QuizsEntity, (quiz)=>quiz.content)
    quizs: QuizsEntity[]
}