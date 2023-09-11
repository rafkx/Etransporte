import { Test, TestingModule } from '@nestjs/testing';
import { FilesQuilometroController } from './files-quilometro.controller';
import { FilesQuilometroService } from './files-quilometro.service';

describe('FilesQuilometroController', () => {
  let controller: FilesQuilometroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesQuilometroController],
      providers: [FilesQuilometroService],
    }).compile();

    controller = module.get<FilesQuilometroController>(FilesQuilometroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
