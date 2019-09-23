import { Observable } from 'rxjs';
import { User } from './entities/EUser';

interface AuthService {
    login(email: string, password: string): Observable<User>
}

export default AuthService;