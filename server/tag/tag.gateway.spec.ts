import { Test, TestingModule } from "@nestjs/testing";
import { TagGateway } from "./tag.gateway";

describe("TagGateway", () => {
  let gateway: TagGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagGateway]
    }).compile();

    gateway = module.get<TagGateway>(TagGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
