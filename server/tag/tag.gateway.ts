import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { Tag } from "../../shared/interfaces";

@WebSocketGateway(3001, {
  serveClient: false,
  origin: "http:localhost:3000",
  path: "/websockets",
  namespace: "/tag"
})
export class TagGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private _logger: Logger = new Logger("TagGateway");

  afterInit(server: any) {
    this._logger.log("Initialized!");
  }

  @SubscribeMessage("tagToServer")
  handleMessage(client: Socket, tag: Tag) {
    this.wss.emit("tagToClient", tag);
  }
}
