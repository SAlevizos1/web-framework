interface HasId {
    id: number;
}

export class ApiSync<T extends HasId> {

    constructor(public rootUrl: string) {}

    async fetch(id: number): Promise<T> {
        const response = await globalThis.fetch(`${this.rootUrl}/${id}`);
        return response.json();
    }

    async save(data: T): Promise<T> {
        const url = `${this.rootUrl}`;

        const response = await globalThis.fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });
        return response.json();
    }
}