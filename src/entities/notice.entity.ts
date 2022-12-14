import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Notice} from "../interfaces/notice.interface";

@Entity('Notice')
export class NoticeEntity extends BaseEntity implements Notice {
    @PrimaryGeneratedColumn()
    notice_id: number

    @Column({unique: true})
    title: string

    @Column()
    text: string

    @CreateDateColumn()
    date_created: Date

    @UpdateDateColumn()
    date_updated: Date
}