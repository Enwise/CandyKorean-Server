import { Course } from "./courses.interface";

export interface Class {
  class_id: number;
  name: string;
  date_created: Date;
  date_updated: Date;
  course: Course;
  thumbnail: string;
}
