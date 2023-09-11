import { Test, TestingModule } from '@nestjs/testing';
import { FilesServicoService } from './files-servico.service';

describe('FilesServicoService', () => {
  let service: FilesServicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesServicoService],
    }).compile();

    service = module.get<FilesServicoService>(FilesServicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
