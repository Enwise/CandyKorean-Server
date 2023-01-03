import {User} from "./users.interface";

export interface Tutor {
    tutor_id: number;
    name: string;
    enabled: boolean;
    user: User;
    img_url: string;
    profile_url: string;
    introduction: string;
}
