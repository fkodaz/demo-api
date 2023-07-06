import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://iceandfire:iceandfire@test.ykfixml.mongodb.net/?retryWrites=true&w=majority'),
  },
];
