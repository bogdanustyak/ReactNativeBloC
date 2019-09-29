import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../../../data/entities/EUser';
import { Resource } from '../../Resource';
import LoginUseCase from '../../../domain/LoginUseCase';

export class LoginBloc {
    initialState: Resource<User> = Resource.initial();

    subject = new BehaviorSubject<Resource<User>>(this.initialState);

    private loginUseCase: LoginUseCase;
    private subscription?: Subscription;

    constructor(loginUseCase: LoginUseCase) {
        this.loginUseCase = loginUseCase;
    }

    login(email: string, password: string) {
        this.subject.next(Resource.loading('Loading'));
        this.subscription = this.loginUseCase.login(email, password).subscribe({
            next: (user: User) => this.subject.next(Resource.sucess(user)),
            error: (error: String) =>
                this.subject.next(Resource.failure(`Error: ${error}`))
        });
    }

    dispose() {
        this.subject.unsubscribe();
        if (!!this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

export default LoginBloc;
