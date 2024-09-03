import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EficienciaMaquinaService } from './eficiencia-maquina.service';
import { EficienciaMaquinaDto } from './dto/EficienciaMaquina.dto';

@Controller('eficiencia-maquina')
export class EficienciaMaquinaController {
  constructor(private readonly eficienciaMaquinaService: EficienciaMaquinaService) {}

  @Post('criar')
  criar(@Body() dto: EficienciaMaquinaDto){
    return this.eficienciaMaquinaService.criar(dto)
  }

  @Get('eficienciaHistorico/:id')
  retornar(@Param() params:{id:string}){
    return this.eficienciaMaquinaService.retornar(params.id)
  }
}
