export class User {
    private firstName: string;
    private lastName: string;
    private email: string;

	constructor(firstName: string, lastName: string, email: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
	}
    
    // get email(): string {
    //     return this.email;
    // }
}