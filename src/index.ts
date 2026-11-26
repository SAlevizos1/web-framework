import { User } from './models/User';

const user = new User({ name: 'Stav alev', age: 36, id: 4321 });

async function main() {
   user.on('save', () => {
      console.log('User was saved');
   });

   await user.save();
}

main();
