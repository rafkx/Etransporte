import { Test, TestingModule } from '@nestjs/testing';
import { FilesVeiculoService } from './files-veiculo.service';

describe('FilesVeiculoService', () => {
  let service: FilesVeiculoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesVeiculoService],
    }).compile();

    service = module.get<FilesVeiculoService>(FilesVeiculoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
