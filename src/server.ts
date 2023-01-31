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
import WishlistRoute from "./routes/wishlist.route";
import NoticeRoute from "./routes/notice.route";
import FeedbackRoute from "./routes/feedback.route";
import AttendanceRoute from "./routes/attendance.route";
import TeacherRoute from "./routes/teacher.route";

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
    new FileInfosRoute(),
    new WishlistRoute(),
    new NoticeRoute(),
    new FeedbackRoute(),
    new AttendanceRoute(),
    new TeacherRoute()
]);

app.listen()