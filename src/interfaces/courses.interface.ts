import { Tutor } from "./tutors.interface";
import { Level } from "./levels.interfaces";
import {Column} from "typeorm";

export interface Course {
  course_id: number;
  name: string;
  price: number;
  info: string;
  category: string;
  view_count: number;
  date_created: Date;
  date_updated: Date;
  tutor: Tutor;
  level: Level;
  thumbnail: string;
  is_premium: boolean;
  is_can_add_slide: boolean;
  is_for_sale: boolean;
}
