import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { Tag, EditTags } from "../../shared/interfaces";
import { Lowdb } from "../lowdb";

@WebSocketGateway(3001, {
  serveClient: false,
  origin: "http:localhost:3000",
  path: "/websockets",
  namespace: "/tag"
})
export class TagGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private lowdb: Lowdb) {}

  @WebSocketServer() wss: Server;

  private _logger: Logger = new Logger("TagGateway");

  private getTagList() {
    this.wss.emit("tagsToClient", this.lowdb.showAll());
  }

  @SubscribeMessage("tagToServer")
  handleTag(client: Socket, tag: Tag) {
    this.lowdb.add(tag);
    this.getTagList();
  }

  @SubscribeMessage("getTags")
  showTags(client: Socket) {
    this.getTagList();
  }

  @SubscribeMessage("deleteTag")
  deleteTag(client: Socket, tagName: string) {
    this.lowdb.remove(tagName);
    this.getTagList();
  }

  @SubscribeMessage("editTag")
  editTag(client: Socket, { prevTag, newTag }: EditTags) {
    this.lowdb.edit(prevTag, newTag);
    this.getTagList();
  }

  afterInit(server: Server) {
    this._logger.log("Initialized!");
  }

  handleDisconnect(client: Socket) {
    this._logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this._logger.log(`Client connected: ${client.id}`);
  }
}
