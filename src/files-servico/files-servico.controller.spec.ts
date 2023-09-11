import { Test, TestingModule } from '@nestjs/testing';
import { FilesServicoController } from './files-servico.controller';
import { FilesServicoService } from './files-servico.service';

describe('FilesServicoController', () => {
  let controller: FilesServicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesServicoController],
      providers: [FilesServicoService],
    }).compile();

    controller = module.get<FilesServicoController>(FilesServicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
