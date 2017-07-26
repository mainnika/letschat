'use strict';

// tslint:disable:max-classes-per-file

import { IUserDocument } from '../../models';
import { IPacket, Packet } from '../packet';

interface IUserAuth extends IPacket {
  sid: string;
}

interface IUserAuthReply extends IPacket {
  user?: IUserDocument;
}

class UserAuth extends Packet<IUserAuth, IUserAuthReply> {

  public constructor() {

    super({
      $id: 'client-user-auth',
      $schema: 'http://json-schema.org/draft-06/schema',
      properties: {
        sid: {
          type: 'string',
        },
      },
      required: ['sid'],
      type: 'object',
    });
  }

  public get Reply(): UserAuthReply {

    return new UserAuthReply();
  }
}

class UserAuthReply extends Packet<IUserAuthReply, never> {

  public constructor() {

    super({
      $id: 'client-user-auth-reply',
      $schema: 'http://json-schema.org/draft-06/schema',
      properties: {
        user: {
          type: 'object',
        },
      },
      type: 'object',
    });
  }

  public get Reply(): void {

    return;
  }
}

export { UserAuth, IUserAuth, UserAuthReply, IUserAuthReply };
