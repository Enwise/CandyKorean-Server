import {User} from "./users.interface";
import {Course} from "./courses.interface";

export interface PurchasedCourse {
    user: User,
    course: Course,
    is_started: boolean,
    date_created: Date,
    is_completed: boolean,
    enabled: boolean
}