import { Test, TestingModule } from '@nestjs/testing';
import { CombustivelController } from './combustivel.controller';
import { CombustivelService } from './combustivel.service';

describe('CombustivelController', () => {
  let controller: CombustivelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombustivelController],
      providers: [CombustivelService],
    }).compile();

    controller = module.get<CombustivelController>(CombustivelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
