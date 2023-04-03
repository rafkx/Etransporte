import { Test, TestingModule } from '@nestjs/testing';
import { QuilometroService } from './quilometro.service';

describe('QuilometroService', () => {
  let service: QuilometroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuilometroService],
    }).compile();

    service = module.get<QuilometroService>(QuilometroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
