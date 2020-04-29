import { Injectable } from "@nestjs/common";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Tag } from "shared/interfaces";

@Injectable()
export class Lowdb {
  private readonly dbpath = "tags";
  private readonly jsondb = new FileSync("db.json");

  private readonly socketdb = low(this.jsondb);

  add(tag: Tag): void {
    const db = this.socketdb;
    db.get(this.dbpath)
      .unshift(tag)
      .write();
  }

  remove(name: string): void {
    const db = this.socketdb;
    return db
      .get(this.dbpath)
      .remove({ name })
      .write();
  }

  edit(prevName: string, newName: string): void {
    const db = this.socketdb;
    return db
      .get(this.dbpath)
      .find({ name: prevName })
      .assign({ name: newName })
      .write();
  }

  showAll(): Tag[] {
    const db = this.socketdb;
    return db.get(this.dbpath).value();
  }
}
