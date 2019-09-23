import { Observable } from "rxjs";
import { User } from "../data/entities/EUser";

interface LoginUseCase {
    login(email: string, password: string): Observable<User>;
}

export default LoginUseCase;