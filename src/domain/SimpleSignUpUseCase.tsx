import SignUpUseCase from './SignUpUseCase';
import { Observable } from 'rxjs';
import User from '../data/entities/EUser';
import AuthService from '../data/AuthService';

export default class SimpleSignUpUseCase implements SignUpUseCase {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    signUp(
        email: string,
        firstName: string,
        lastName: string,
        password: string
    ): Observable<User> {
        throw new Error('Method not implemented.');
    }
}
