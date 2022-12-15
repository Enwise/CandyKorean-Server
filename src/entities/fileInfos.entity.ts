import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {FileInfo} from "../interfaces/fileInfos.interface";

@Entity("file")
export class FileInfosEntity extends BaseEntity implements FileInfo {
    @PrimaryGeneratedColumn()
    file_id: number

    @Column()
    link: string

    @Column({name: "file_name"})
    fileName: string
}