import App from './app'
import UsersRoute from "./routes/users.route";
import TutorsRoute from "./routes/tutors.route";
import LevelsRoute from "./routes/levels.route";
import CoursesRoute from "./routes/courses.route";
import ClassesRoute from "./routes/classes.route";
import ContentsRoute from "./routes/contents.route";
import AuthRoute from "./routes/auth.route";
import SlidesRoute from "./routes/slides.route";
import QuizsRoute from "./routes/quizs.route";
import PurchasedCoursesRoute from "./routes/purchasedCourses.route";
import LearnedClassesRoute from "./routes/learnedClasses.route";
import SolvedQuizsRoute from "./routes/solvedQuizs.route";
import FileInfosRoute from "./routes/fileInfos.route";

const app = new App([
    new UsersRoute(),
    new TutorsRoute(),
    new LevelsRoute(),
    new CoursesRoute(),
    new ClassesRoute(),
    new ContentsRoute(),
    new AuthRoute(),
    new SlidesRoute(),
    new QuizsRoute(),
    new PurchasedCoursesRoute(),
    new LearnedClassesRoute(),
    new SolvedQuizsRoute(),
    new FileInfosRoute()
]);

app.listen()