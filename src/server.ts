import App from './app'
import UsersRoute from "./routes/users.route";
import TutorsRoute from "./routes/tutors.route";
import LevelsRoute from "./routes/levels.route";

const app = new App([new UsersRoute(), new TutorsRoute(), new LevelsRoute()]);

app.listen()