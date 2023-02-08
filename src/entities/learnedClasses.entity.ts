import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {LearnedClasses} from "../interfaces/learnedClasses.interface";
import {UserEntity} from "./users.entity";
import {ClassesEntity} from "./classes.entity";

@Entity('learned_class')
export class LearnedClassesEntity extends BaseEntity implements LearnedClasses {
    @Column()
    is_completed: boolean

    @Column()
    learn_time: number

    @Column()
    is_purchased: boolean

    @CreateDateColumn()
    date_created: Date

    @UpdateDateColumn()
    date_updated: Date

    @PrimaryColumn()
    user_id: number

    @PrimaryColumn()
    class_id: number

    @JoinColumn({name: "user_id"})
    @ManyToOne(()=>UserEntity)
    user: UserEntity

    @JoinColumn({name:"class_id"})
    @ManyToOne(()=>ClassesEntity)
    class: ClassesEntity
}