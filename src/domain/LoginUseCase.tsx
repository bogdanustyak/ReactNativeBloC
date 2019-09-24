import { Observable } from 'rxjs';
import { User } from '../data/entities/EUser';

export default interface LoginUseCase {
    login(email: string, password: string): Observable<User>;
}
