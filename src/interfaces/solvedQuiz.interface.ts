import {Quiz} from "./quizs.interface";
import {User} from "./users.interface";

export interface SolvedQuiz {
    quiz: Quiz,
    date_created: Date,
    user: User,
    is_correct: boolean
}