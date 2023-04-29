export type uuidType = `${string}-${string}-${string}-${string}-${string}`;

export interface connectedUserData {
  [key: uuidType]: {
    socketID?: string;
    connectedTime: number;
    connected: boolean;
  };
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  connectedUsers: (connectedUsers: connectedUserData) => void;
}

export interface ClientToServerEvents {
  initialize: (clientID: uuidType, callback: (e: number) => void) => void;
  getConnectedUsers: (callback: (e: number) => void) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
  id: uuidType;
}
