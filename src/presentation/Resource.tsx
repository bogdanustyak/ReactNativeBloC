export enum ResourceState {
    INITIAL,
    LOADING,
    SUCCESS,
    FAILURE
}

export class Resource<T> {
    data?: T;
    message?: string;
    state: ResourceState;

    constructor(state: ResourceState, message?: string, data?: T) {
        this.state = state;
        this.data = data;
        this.message = message;
    }

    static initial<T>(): Resource<T> {
        return new Resource<T>(ResourceState.INITIAL)
    }

    static loading<T>(message: string): Resource<T> {
        return new Resource<T>(ResourceState.LOADING, message);
    }

    static sucess<T>(data: T): Resource<T> {
        return new Resource<T>(ResourceState.SUCCESS, "success", data);
    }

    static failure<T>(message: string): Resource<T> {
        return new Resource<T>(ResourceState.FAILURE, message);
    }

    isLoading(): boolean {
        return this.state == ResourceState.LOADING;
    }
}