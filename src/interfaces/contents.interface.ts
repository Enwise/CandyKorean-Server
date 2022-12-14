import {Class} from "./classes.interface";

export interface Content {
    content_id: number,
    name: string,
    video_url: string,
    thumbnail: string,
    view_count: number,
    enabled: boolean,
    length: number,
    date_created: Date,
    date_updated: Date,
    class_entity: Class,
    is_portrait: boolean,
}