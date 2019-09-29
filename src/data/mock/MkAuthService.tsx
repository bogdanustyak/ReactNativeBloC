import { Observable, of, throwError } from 'rxjs';
import { User } from '../entities/EUser';
import AuthService from '../AuthService';

class MkAuthService implements AuthService {
    login(email: string, password: string): Observable<User> {
        if (email === 'email@gmail.com' && password === 'password') {
            return of(new User('fName', 'lName', 'email@gmail.com'));
        }
        return throwError('Invalid credentials!');
    }
    
    signUp(email: string, firstName: string, lastName: string, password: string): Observable<User> {
        throw new Error("Method not implemented.");
    }
}

export default MkAuthService;
