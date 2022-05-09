import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Message } from '../entities/Messages';

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> {}

export function getMessagesRepository() {
  return getCustomRepository(MessagesRepository);
}
