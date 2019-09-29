import {Observable} from "rxjs";

import User from "../data/entities/EUser";

export default interface SignUpUseCase {
    signUp(
        email: string,
        firstName: string,
        lastName: string,
        password: string
    ): Observable<User>;
}
