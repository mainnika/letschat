'use strict';

// tslint:disable:max-classes-per-file

import { IMessage } from '../../models';
import { IPacket, Packet } from '../packet';

interface IChatMessage extends IPacket {
  message: IMessage;
}

class ChatMessage extends Packet<IChatMessage, never> {

  public constructor() {

    super({
      $id: 'server-chat-message',
      $schema: 'http://json-schema.org/draft-06/schema',
      properties: {
        message: {
          type: 'object',
        },
      },
      required: ['message'],
      type: 'object',
    });
  }

  public get Reply(): void {

    return;
  }
}

export { ChatMessage, IChatMessage };
