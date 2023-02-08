import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TutorEntity} from "./tutors.entity";
import {Assistant} from "../interfaces/assistant.interface";

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
    tutor_id: number;

    @JoinColumn({ name: "tutor_id" })
    @ManyToOne(() => TutorEntity)
    tutor: TutorEntity;
}

export default AssistantEntity;