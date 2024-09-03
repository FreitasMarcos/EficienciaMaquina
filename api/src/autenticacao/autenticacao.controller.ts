import { Controller,Post, Get, Body, Res } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { UsuarioDto } from './dto/usuario.dto';

import {Response} from 'express'

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('criar')
  criar(@Body() dto:UsuarioDto){
    return this.autenticacaoService.criar(dto);
  }

  @Post('entrar')
  entrar(@Body() dto:UsuarioDto, @Res() res: Response){
    return this.autenticacaoService.entrar(dto, res);
  }

  @Get('sair')
  sair(){
    return this.autenticacaoService.sair();
  }

}
