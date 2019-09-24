import { Observable } from 'rxjs';
import AuthService from '../data/AuthService';
import { User } from '../data/entities/EUser';
import LoginUseCase from './LoginUseCase';

class SimpleLoginUseCase implements LoginUseCase {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    login(email: string, password: string): Observable<User> {
        return this.authService.login(email, password);
    }
}

export default SimpleLoginUseCase;
