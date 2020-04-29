import { Test, TestingModule } from "@nestjs/testing";
import { Lowdb } from "./lowdb";

describe("lowdb", () => {
  let provider: Lowdb;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Lowdb]
    }).compile();

    provider = module.get<Lowdb>(Lowdb);
  });

  it("should be defined", () => {
    expect(provider).toBeDefined();
  });
});
