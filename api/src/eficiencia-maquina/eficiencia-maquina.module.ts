import { Module } from '@nestjs/common';
import { EficienciaMaquinaService } from './eficiencia-maquina.service';
import { EficienciaMaquinaController } from './eficiencia-maquina.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [EficienciaMaquinaController],
  providers: [EficienciaMaquinaService, PrismaService],
})
export class EficienciaMaquinaModule {}
