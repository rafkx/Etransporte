import { Test, TestingModule } from '@nestjs/testing';
import { PecasController } from './pecas.controller';
import { PecasService } from './pecas.service';

describe('PecasController', () => {
  let controller: PecasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PecasController],
      providers: [PecasService],
    }).compile();

    controller = module.get<PecasController>(PecasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
