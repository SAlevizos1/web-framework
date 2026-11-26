interface ModelAttributes<T> {
    get<K extends keyof T>(key: K): T[K];
    set(update: Partial<T>): void;
    getAll(): T;
}

interface SyncProps<T> {
    fetch(id: number): Promise<T>;
    save(data: T): Promise<T>;
}

interface EventingProps {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number;
}

export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: EventingProps,
        private sync: SyncProps<T>
    ) {}

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    get get() {
        return this.attributes.get;
    }

    set(update: Partial<T>): void {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    fetch(): Promise<void> {
        const id = this.attributes.get('id');
        if (typeof id !== 'number') {
            throw new Error('Cannot fetch without an id');
        }
        return this.sync.fetch(id).then((response: T) => {
            this.set(response);
        });
    }

    save(): Promise<void> {
        return this.sync.save(this.attributes.getAll()).then((response: T) => {
            this.trigger('save');
        })
        .catch((error: Error) => {
            this.trigger('error');
        });
    }
}