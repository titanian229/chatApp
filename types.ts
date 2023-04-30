export type uuidType = string;
// export type uuidType = `${string}-${string}-${string}-${string}-${string}`;

export interface newUser {
  id: uuidType;
  icon: string;
}

export interface connectedUserData {
  [key: uuidType]: {
    socketID?: string;
    connectedTime: number;
    connected: boolean;
    icon: string;
  };
}

export interface user {
  id: uuidType;
}

export interface messageEvent {
  message: string;
  sender: user;
  sendTime: number;
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  connectedUsers: (connectedUsers: connectedUserData) => void;
  systemMessage: (message: string, callback: () => void) => void;
  message: (message: messageEvent) => void;
  newUser: (newUser: newUser) => void;
  disconnectedUser: (disconnectedUserID: uuidType) => void;
}

export interface initializationResponse {
  connectedUserNumber: number;
  connectedUsers: newUser[];
  myIcon: string;
}

export interface ClientToServerEvents {
  initialize: (clientID: uuidType, callback: (initializationResponse: initializationResponse) => void) => void;
  getConnectedUsers: (callback: (e: number) => void) => void;
  message: (message: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
  id: uuidType;
}
