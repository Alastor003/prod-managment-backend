import { User } from "src/entities/user.entity";



export interface LoginResponse {

    user: User;
    token: string;
}