import {injectable} from 'inversify';

export interface MessageService {
    sendMessage(email: string, msg: string): string;
}

@injectable()
export class EmailMessageService implements MessageService{
    sendMessage(email: string, msg: string): string {
       console.log(`Email sent to: ${email}`);
       console.log(`Body: ${msg}`);
       return "OK";
    }
}