import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TagGateway } from "./tag/tag.gateway";
import { Lowdb } from "./lowdb";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TagGateway, Lowdb]
})
export class AppModule {}
