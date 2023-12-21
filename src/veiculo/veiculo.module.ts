import { Module } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './entities/veiculo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AutorizacaoVeiculo } from 'src/autorizacao-veiculo/autorizacao-veiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo]), TypeOrmModule.forFeature([AutorizacaoVeiculo])],
  controllers: [VeiculoController],
  providers: [VeiculoService]
})
export class VeiculoModule {}
