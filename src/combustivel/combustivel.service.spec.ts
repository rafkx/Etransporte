import { Test, TestingModule } from '@nestjs/testing';
import { CombustivelService } from './combustivel.service';

describe('CombustivelService', () => {
  let service: CombustivelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombustivelService],
    }).compile();

    service = module.get<CombustivelService>(CombustivelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
