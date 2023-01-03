import {User} from "./users.interface";

export interface Feedback {
    feedback_id: number,
    category: string,
    text: string,
    user: User
}