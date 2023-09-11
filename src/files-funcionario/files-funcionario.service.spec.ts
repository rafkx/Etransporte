import { Test, TestingModule } from '@nestjs/testing';
import { FilesFuncionarioService } from './files-funcionario.service';

describe('FilesFuncionarioService', () => {
  let service: FilesFuncionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesFuncionarioService],
    }).compile();

    service = module.get<FilesFuncionarioService>(FilesFuncionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
