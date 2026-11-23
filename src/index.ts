import { User } from './models/User';

const user = new User({ name: 'John Doe', age: 30 });

user.on('change', () => {
    console.log('User data changed');
});

user.on('change', () => {
    console.log('Another change handler');
});

user.set({ name: 'Jane Doe' });

user.trigger('change'); // Output: User data changed
console.log(user.get('name')); // Output: Jane Doe