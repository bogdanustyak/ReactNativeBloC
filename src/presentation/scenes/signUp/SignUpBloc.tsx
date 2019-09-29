import { Resource } from '../../Resource';
import { User } from '../../../data/entities/EUser';
import { BehaviorSubject, Subscription } from 'rxjs';
import SignUpUseCase from '../../../domain/SignUpUseCase';

export default class SignUpBloc {
    initialState: Resource<User> = Resource.initial();
    subject = new BehaviorSubject<Resource<User>>(this.initialState);

    private singUpUseCase: SignUpUseCase;
    private subscription?: Subscription;

    constructor(singUpUseCase: SignUpUseCase) {
        this.singUpUseCase = singUpUseCase;
    }

    singUp(
        email: string,
        firstName: string,
        lastName: string,
        password: string
    ) {
        this.subject.next(Resource.loading('Loading'));
        this.subscription = this.singUpUseCase
            .signUp(email, firstName, lastName, password)
            .subscribe({
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
