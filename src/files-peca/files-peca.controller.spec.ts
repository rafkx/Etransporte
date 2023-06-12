import { Test, TestingModule } from '@nestjs/testing';
import { FilesPecaController } from './files-peca.controller';
import { FilesPecaService } from './files-peca.service';

describe('FilesPecaController', () => {
  let controller: FilesPecaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesPecaController],
      providers: [FilesPecaService],
    }).compile();

    controller = module.get<FilesPecaController>(FilesPecaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
