interface UserProps {
    name: string;
    age: number;
    id?: number;
}

type Callback = () => void;


export class User {

    events: { [key: string]: Callback[] } = {};

    constructor(private data: UserProps) { }

    getAll(): UserProps {
        return { ...this.data };
    }

    get(propName: keyof UserProps): (number | string) {
        if (!this.data[propName]) {
            throw new Error(`Property ${propName} does not exist on User`);
        }
        return this.data[propName];
    }

    set(update: Partial<UserProps>): void {
        Object.assign(this.data, update);
    }

    on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0) {
            return;
        }
        handlers.forEach(callback => callback());
    }

    stringify(): string {
        return JSON.stringify(this.getAll());
    }

    async fetch(): Promise<UserProps> {
        const response = await globalThis.fetch(`http://localhost:3000/users/${this.get('id')}`);
        return response.json();
    }

    async save(): Promise<UserProps> {
        const id = this.data.id;
        const url = id ? `http://localhost:3000/users/${id}` : 'http://localhost:3000/users';

        const response = await globalThis.fetch(url, {
            method: id ? 'PUT' : 'POST',
            body: this.stringify(),
            headers: { 'Content-Type': 'application/json' },
        });
        return response.json();
    }
}