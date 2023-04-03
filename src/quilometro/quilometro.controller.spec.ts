import { Test, TestingModule } from '@nestjs/testing';
import { QuilometroController } from './quilometro.controller';
import { QuilometroService } from './quilometro.service';

describe('QuilometroController', () => {
  let controller: QuilometroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuilometroController],
      providers: [QuilometroService],
    }).compile();

    controller = module.get<QuilometroController>(QuilometroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
