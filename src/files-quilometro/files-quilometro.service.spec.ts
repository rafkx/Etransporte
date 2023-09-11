import { Test, TestingModule } from '@nestjs/testing';
import { FilesQuilometroService } from './files-quilometro.service';

describe('FilesQuilometroService', () => {
  let service: FilesQuilometroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesQuilometroService],
    }).compile();

    service = module.get<FilesQuilometroService>(FilesQuilometroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
