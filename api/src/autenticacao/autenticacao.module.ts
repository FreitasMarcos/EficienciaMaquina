import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, PrismaService],
})
export class AutenticacaoModule {}
