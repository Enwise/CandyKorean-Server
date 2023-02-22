import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import {Assistant} from "../interfaces/assistant.interface";
import {CourseEntity} from "./courses.entity";

@Entity('assistant')
class AssistantEntity extends BaseEntity implements Assistant {
    @PrimaryGeneratedColumn()
    assistant_id: number;

    @Column()
    profile_url: string;

    @Column()
    name: string;

    @Column()
    metaverse_url: string;

    @Column()
    course_id: number;

    @JoinColumn({ name: "course_id" })
    @ManyToMany(() => CourseEntity)
    course: CourseEntity;
}

export default AssistantEntity;