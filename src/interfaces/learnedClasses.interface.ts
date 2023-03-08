import {Class} from "./classes.interface";
import {User} from "./users.interface";

export interface LearnedClasses {
    user: User,
    class: Class,
    learn_time: number,
    date_created: Date,
    date_updated: Date,
    is_completed: boolean,
    is_purchased: boolean,
    assistant_id: number
}