import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Content} from "../interfaces/contents.interface";
import {ClassesEntity} from "./classes.entity";

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

    @Column()
    enabled: boolean

    @Column()
    length: number

    @CreateDateColumn()
    date_created: Date

    @UpdateDateColumn()
    date_updated: Date

    @ManyToOne(()=>ClassesEntity, (class_entity) => class_entity.contents)
    class_entity: ClassesEntity;
}