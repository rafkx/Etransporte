import { Test, TestingModule } from '@nestjs/testing';
import { FilesAbastecimentoService } from './files-abastecimento.service';

describe('FilesAbastecimentoService', () => {
  let service: FilesAbastecimentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesAbastecimentoService],
    }).compile();

    service = module.get<FilesAbastecimentoService>(FilesAbastecimentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
