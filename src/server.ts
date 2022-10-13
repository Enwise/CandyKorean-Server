import App from './app'
import UsersRoute from "./routes/users.route";
import TutorsRoute from "./routes/tutors.route";

const app = new App([new UsersRoute(), new TutorsRoute()]);

app.listen()