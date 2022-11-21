import {Content} from "./contents.interface";

export interface Quiz {
    quiz_id: number,
    content: Content,
    question: string,
    answer: string
}