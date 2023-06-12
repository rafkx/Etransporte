import { Test, TestingModule } from '@nestjs/testing';
import { FilesPecaService } from './files-peca.service';

describe('FilesPecaService', () => {
  let service: FilesPecaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesPecaService],
    }).compile();

    service = module.get<FilesPecaService>(FilesPecaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
