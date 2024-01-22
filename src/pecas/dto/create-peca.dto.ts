import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  isString,
  IsString,
  Min,
  Validator,
} from 'class-validator';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';
import { Peca } from '../entities/peca.entity';
import { Unique } from 'typeorm';

export class CreatePecaDto {
  @IsString()
  @IsNotEmpty()
  nomePeca: string;

  @IsString()
  @IsNotEmpty()
  codPeca: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  marcaFabricante: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsOptional()
  pequenaPeca?: Peca[];

  @IsNotEmpty()
  fornecedorP: Fornecedor[];

  @IsNotEmpty()
  veiculo: Veiculo[];
}
