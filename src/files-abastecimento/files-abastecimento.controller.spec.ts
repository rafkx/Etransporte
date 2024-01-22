import { Test, TestingModule } from '@nestjs/testing';
import { FilesAbastecimentoController } from './files-abastecimento.controller';
import { FilesAbastecimentoService } from './files-abastecimento.service';

describe('FilesAbastecimentoController', () => {
  let controller: FilesAbastecimentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesAbastecimentoController],
      providers: [FilesAbastecimentoService],
    }).compile();

    controller = module.get<FilesAbastecimentoController>(
      FilesAbastecimentoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
