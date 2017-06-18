import {inject, injectable} from 'inversify';
import TYPES from '../constants/types';
import {MessageService} from './MessageService';
import {User} from '../models/User';


@injectable()
export class UserRegistry {

    @inject(TYPES.MessageService) private messageService: MessageService;

    private userStorage: User[] = [];

    public subscribe(user: User) {
        if (!this.isUserPresent(user)) {
            this.userStorage.push(user);
            this.messageService.sendMessage(user.email, 'Welcome ' + user.username);
        } else {
            throw new Error('user already subscribed');
        }
    }

    public getUsers(): User[] {
        return this.userStorage;
    }

    public getUser(email: string): User {
        let result: User;
        this.userStorage.map(user => {
            if (user.email === email) {
                result = user;
            }
        });
        return result;
    }

    public updateUser(user: User): User {
        if (!this.isUserPresent(user)) {
            throw new Error('User not found')
        }
        this.userStorage.map((aUser, i) => {
            if (aUser.email === user.email) {
                this.userStorage[i] = user;
            }
        });
        return user;
    }

    public isUserPresent(user: User) {
        return this.getUser(user.email) != null;
    }

}

