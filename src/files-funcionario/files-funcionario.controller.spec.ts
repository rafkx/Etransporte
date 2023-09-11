import { Test, TestingModule } from '@nestjs/testing';
import { FilesFuncionarioController } from './files-funcionario.controller';
import { FilesFuncionarioService } from './files-funcionario.service';

describe('FilesFuncionarioController', () => {
  let controller: FilesFuncionarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesFuncionarioController],
      providers: [FilesFuncionarioService],
    }).compile();

    controller = module.get<FilesFuncionarioController>(FilesFuncionarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
