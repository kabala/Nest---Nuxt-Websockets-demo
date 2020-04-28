import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TagGateway } from "./tag/tag.gateway";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TagGateway]
})
export class AppModule {}
