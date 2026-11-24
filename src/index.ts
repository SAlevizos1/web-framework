import { User } from './models/User';

const user = new User({ name: 'John Doe', age: 30, id: 111 });
user.events.on('change', () => {
    console.log('User data changed');
});

user.events.on('save', () => {
    console.log('User data saved');
});

async function main() {
    const data = await user.fetch();
    console.log(data);
}

main();
