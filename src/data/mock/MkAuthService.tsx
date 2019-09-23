import AuthService from "../AuthService";
import { Observable, of } from "rxjs";
import { User } from "../entities/EUser";
import { throwError } from 'rxjs';

class MkAuthService implements AuthService {

    login(email: string, password: string): Observable<User> {
        if (email == "email@gmail.com" && password == "password") {
            return of(new User("fName", "lName", "email@gmail.com"));
        }
        return throwError("Invalid credentials!");
    }
}

export default MkAuthService;