import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Slide} from "../interfaces/slides.interface";
import {ContentsEntity} from "./contents.entity";

@Entity('slide')
export class SlidesEntity extends BaseEntity implements Slide{
    @PrimaryGeneratedColumn()
    slide_id: number;

    @Column()
    display_time: number;

    @Column({default: true})
    enabled: boolean;

    @Column()
    img_url: string;

    @Column()
    view_count: number;

    @CreateDateColumn()
    date_created: Date;

    @UpdateDateColumn()
    date_updated: Date;

    @JoinColumn({name:"content_id"})
    @ManyToOne(()=>ContentsEntity, (content)=>content.slides)
    content: ContentsEntity;
}