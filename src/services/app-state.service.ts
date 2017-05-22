import { Birthday } from '../models/birthday';
import { User } from '../models/user';

export interface AppState {
  birthdays: Birthday[];
  currentUser: User;
}
