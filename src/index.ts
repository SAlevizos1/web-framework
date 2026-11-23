import { User } from './models/User';

const user = new User({ name: 'John Doe', age: 30 });

console.log(user.get('name')); // Output: John Doe
console.log(user.get('age'));  // Output: 30