interface HasId {
    id: number;
}

export class Sync<T extends HasId> {

    constructor(public rootUrl: string) {}

    async fetch(id: number): Promise<T> {
        const response = await globalThis.fetch(`${this.rootUrl}/${id}`);
        return response.json();
    }

    async save(data: T): Promise<T> {
        const id = data.id;
        const url = id ? `${this.rootUrl}/${id}` : `${this.rootUrl}`;

        const response = await globalThis.fetch(url, {
            method: id ? 'PUT' : 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });
        return response.json();
    }
}