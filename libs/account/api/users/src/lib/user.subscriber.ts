import * as crypto from 'crypto';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent
} from 'typeorm';
import { ConfirmationDto } from './dtos/confirmation.dto';
import { User } from './entities/user';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
    const { password, confirmation } = event.entity;
    event.entity.password = this.hashPassword(password);
    event.entity.confirmation = {
      code: this.confirmCode(confirmation),
      time: null
    };
  }

  hashPassword(password: string) {
    return crypto.createHmac('sha256', password).digest('hex');
  }
  confirmCode({ code }: ConfirmationDto = {}) {
    if (!code) {
      return ('' + Math.random()).substring(2, 7);
    }
  }
}
