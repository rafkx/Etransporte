import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { EstoqueModule } from './estoque/estoque.module';
import { CategoriaModule } from './categoria/categoria.module';
import { UnidadeModule } from './unidade/unidade.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { EntradaModule } from './entrada/entrada.module';
import { ContatoModule } from './contato/contato.module';
import { SaidaModule } from './saida/saida.module';
import { PecasModule } from './pecas/pecas.module';
import { ServicoModule } from './servico/servico.module';
import { AbastecimentoModule } from './abastecimento/abastecimento.module';
import { QuilometroModule } from './quilometro/quilometro.module';
import { CombustivelModule } from './combustivel/combustivel.module';
import { FilesPecaModule } from './files-peca/files-peca.module';
import { FilesAbastecimentoModule } from './files-abastecimento/files-abastecimento.module';
import { FilesFuncionarioModule } from './files-funcionario/files-funcionario.module';
import { FilesQuilometroModule } from './files-quilometro/files-quilometro.module';
import { FilesServicoModule } from './files-servico/files-servico.module';
import { FilesVeiculoModule } from './files-veiculo/files-veiculo.module';
import { ManutencaoModule } from './manutencao/manutencao.module';
import { FilterModule } from './filter/filter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: (process.env.DB_SYNCHRONIZE === 'true'),
    }),
    FilterModule,
    FuncionarioModule,
    UserModule,
    AuthModule,
    VeiculoModule,
    EstoqueModule,
    CategoriaModule,
    UnidadeModule,
    FornecedorModule,
    EntradaModule,
    ContatoModule,
    SaidaModule,
    PecasModule,
    ServicoModule,
    AbastecimentoModule,
    QuilometroModule,
    CombustivelModule,
    FilesPecaModule,
    FilesAbastecimentoModule,
    FilesFuncionarioModule,
    FilesQuilometroModule,
    FilesServicoModule,
    FilesVeiculoModule,
    ManutencaoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
