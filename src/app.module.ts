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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
