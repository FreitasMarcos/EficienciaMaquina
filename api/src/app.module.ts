import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { EficienciaMaquinaModule } from './eficiencia-maquina/eficiencia-maquina.module';

@Module({
  imports: [AutenticacaoModule, EficienciaMaquinaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
