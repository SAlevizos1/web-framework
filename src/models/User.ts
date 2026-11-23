interface UserProps {
    name: string;
    age: number;
}


export class User {
    constructor(private data: UserProps) {}

    get(propName: keyof UserProps): (number | string) {
        return this.data[propName];
    }

    set(update: Partial<UserProps>): void {
        Object.assign(this.data, update);
    }
}
