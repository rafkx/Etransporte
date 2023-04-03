import { Test, TestingModule } from '@nestjs/testing';
import { PecasService } from './pecas.service';

describe('PecasService', () => {
  let service: PecasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PecasService],
    }).compile();

    service = module.get<PecasService>(PecasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
