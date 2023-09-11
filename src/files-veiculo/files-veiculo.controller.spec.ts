import { Test, TestingModule } from '@nestjs/testing';
import { FilesVeiculoController } from './files-veiculo.controller';
import { FilesVeiculoService } from './files-veiculo.service';

describe('FilesVeiculoController', () => {
  let controller: FilesVeiculoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesVeiculoController],
      providers: [FilesVeiculoService],
    }).compile();

    controller = module.get<FilesVeiculoController>(FilesVeiculoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
