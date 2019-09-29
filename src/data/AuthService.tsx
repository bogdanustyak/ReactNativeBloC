import { Observable } from 'rxjs';
import { User } from './entities/EUser';

export default interface AuthService {
    login(email: string, password: string): Observable<User>;
    signUp(
        email: string,
        firstName: string,
        lastName: string,
        password: string
    ): Observable<User>;
}
