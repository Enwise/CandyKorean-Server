import {User} from "./users.interface";
import {Course} from "./courses.interface";

export interface Wishlist {
    user: User;
    course: Course;
    checked: boolean;
}