// tslint:disable:max-classes-per-file

'use strict';

import * as Ajv from 'ajv';
import * as util from 'util';

interface IPacket { }

class Validated<T extends IPacket> {
  public constructor(
    public readonly data: T,
    public readonly packet: Packet<T, {}>,
  ) { }
}

abstract class Packet<Request extends IPacket, Reply extends IPacket> {

  public static fromBuffer<T extends IPacket>(buffer: Buffer): T | undefined {

    if (!buffer) {
      return undefined;
    }

    const stringified: string = buffer.toString('utf8');
    const data: T = JSON.parse(stringified);

    return data;
  }

  public static toBuffer<T extends IPacket>(data: T): Buffer {

    const stringified: string = JSON.stringify(data);
    const buffer: Buffer = new Buffer(stringified);

    return buffer;
  }

  private static readonly ajv: Ajv.Ajv = new Ajv();
  private readonly validator: Ajv.ValidateFunction;

  public constructor(
    private readonly schema: {
      $id: string;
      properties?: {};
      [others: string]: {} | undefined;
    },
  ) {

    schema.properties = schema.properties || {};
    this.validator = Packet.ajv.compile(schema);
  }

  public get Id(): string {

    return this.schema.$id;
  }

  public abstract get Reply(): Packet<Reply, Request> | void

  public validate(data: Request): Validated<Request> {

    const validated: boolean = this.validator(data) as boolean;

    if (!validated) {
      throw new Error(util.inspect(this.validator.errors));
    }

    return new Validated(data, this);
  }

  public dummy(dummy: Reply): void { /* https://github.com/Microsoft/TypeScript/issues/16835 */ }
}

export { Packet, IPacket, Validated };
