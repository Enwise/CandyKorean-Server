import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import TeacherController from "../controllers/teacher.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateTeacherDto} from "../dtos/teacher.dto";

class TeacherRoute implements Routes {
    public path = '/teacher';
    public router = Router();
    public teacherController = new TeacherController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.teacherController.getAllTeachers);
        this.router.get(`${this.path}/:id(\\d+)`, this.teacherController.getTeacherById);
        this.router.post(`${this.path}`, validationMiddleware(CreateTeacherDto, 'body'), this.teacherController.createTeacher);
        this.router.put(`${this.path}/:id(\\d+)`,validationMiddleware(CreateTeacherDto,'body'),this.teacherController.updateTeacher);
        this.router.delete(`${this.path}/:id(\\d+)`,this.teacherController.deleteTeacher);
    }
}

export default TeacherRoute;