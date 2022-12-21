import {Level} from "./levels.interfaces";
import {Tutor} from './tutors.interface';

export interface Course {
    course_id: number,
    name: string,
    price: number,
    info: string,
    category: string,
    view_count: number,
    date_created: Date,
    date_updated: Date,
    level: Level,
    tutor: Tutor,
}