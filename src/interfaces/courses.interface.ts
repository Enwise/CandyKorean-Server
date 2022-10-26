import {Level} from "./levels.interfaces";

export interface Course {
    course_id: number,
    name: string,
    price: number,
    info: string,
    category: string,
    view_count: number,
    date_created: Date,
    date_updated: Date,
    level: Level
}