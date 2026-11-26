import { User } from './models/User';

const user = new User({ name: 'Alev Stav', age: 36, id: 1234 });

async function main() {
    const data = await user.sync.save(user.attributes.getAll());
    console.log(user.attributes.getAll());
}

main();
