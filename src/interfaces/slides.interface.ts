import {Content} from "./contents.interface";

export interface Slide {
    slide_id: number,
    display_time: number,
    img_url: string,
    enabled: boolean,
    view_count: number,
    date_created: Date,
    date_updated: Date,
    content: Content
}