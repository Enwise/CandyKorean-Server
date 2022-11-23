import {Content} from "./contents.interface";

export interface Quiz {
    quiz_id: number,
    content: Content,
    style: string,
    json: string
}