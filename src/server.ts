import App from './app'
import UsersRoute from "./routes/users.route";
import TutorsRoute from "./routes/tutors.route";
import LevelsRoute from "./routes/levels.route";
import CoursesRoute from "./routes/courses.route";
import ClassesRoute from "./routes/classes.route";

const app = new App([
    new UsersRoute(),
    new TutorsRoute(),
    new LevelsRoute(),
    new CoursesRoute(),
    new ClassesRoute()
]);

app.listen()