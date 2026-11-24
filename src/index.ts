import { User } from './models/User';

const user = new User({ name: 'John Doe', age: 30, id: 2 });

async function main() {
    const data = await user.fetch();
    console.log(data);
}

main();
