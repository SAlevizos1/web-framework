export class Attributes<T extends object> {
    constructor(private data: T) { }

    getAll(): T {
        return { ...this.data };
    }

    get<K extends keyof T>(propName: K): T[K] {
        if (!this.data[propName]) {
            throw new Error(`Property ${String(propName)} does not exist on Attributes`);
        }
        return this.data[propName];
    }

    set(update: Partial<T>): void {
        Object.assign(this.data, update);
    }
}
