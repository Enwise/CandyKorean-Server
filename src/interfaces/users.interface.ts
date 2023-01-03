export interface User {
  user_id: number;
  name: string;
  login_id: string;
  password: string;
  enabled: boolean;
  nickname: string;
  nationality: string;
  korean_level: string;
  job: string;
  gender: string;
  date_of_birth: string;
  survey_answers: string;
  date_created: Date;
  date_updated: Date;
  date_last_login: Date;
  continuous_attendance: number;
  img_url: string;
}
