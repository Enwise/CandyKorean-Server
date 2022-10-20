import {Tutor} from "./tutors.interface";

export interface Level {
    level_id: number,
    name: string,
    info: string,
    tutor: Tutor
}