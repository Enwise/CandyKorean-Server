import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
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

    @Column()
    enabled: boolean;

    @Column()
    img_url: string;

    @Column()
    view_count: number;

    @CreateDateColumn()
    date_created: Date;

    @UpdateDateColumn()
    date_updated: Date;

    @ManyToOne(()=>ContentsEntity, (content)=>content.slides)
    content: ContentsEntity;
}