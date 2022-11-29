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
  date_of_birth: Date;
  survey1_answer: string[];
  survey2_answer: string[];
  survey3_answer: string[];
  date_created: Date;
  date_updated: Date;
}
