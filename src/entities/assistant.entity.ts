import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
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

    @ManyToMany(() => CourseEntity, (course) => course.assistants)
    @JoinTable()
    courses: CourseEntity[];
}

export default AssistantEntity;