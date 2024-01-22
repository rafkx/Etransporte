import { IsDate, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ItemManutencao } from 'src/manutencao/entities/item.manutencao';
import { Quilometro } from 'src/quilometro/entities/quilometro.entity';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';
import { ItemManutencaoPeca } from '../entities/item.manutencao.peca.entity';
import { ItemManutencaoServico } from '../entities/item.manutencao.servico.entity';

export class CreateManutencaoDto {
  @IsString()
  descricao: string;

  @IsNotEmpty()
  data: Date;

  @IsString()
  tipo: string;

  @IsNotEmpty()
  km: Quilometro;

  @IsNotEmpty()
  veiculo: Veiculo;

  @ValidateIf(
    (o) =>
      (o.itemManutencaoPeca && o.itemManutencaoPeca.length > 0) ||
      (o.itemManutencaoServico && o.ItemManutencaoServico.length > 0),
  )
  itensPeca: ItemManutencaoPeca[];

  @ValidateIf(
    (o) =>
      (o.itemManutencaoServico && o.ItemManutencaoServico.length > 0) ||
      (o.itemManutencaoPeca && o.itemManutencaoPeca.length > 0),
  )
  itensServico: ItemManutencaoServico[];
}
