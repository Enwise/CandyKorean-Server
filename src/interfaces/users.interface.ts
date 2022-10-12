export interface User {
    user_id: number,
    name: string,
    login_id: string,
    password: string,
    enabled: boolean,
    nickname: string,
    date_created: Date,
    date_updated: Date
}