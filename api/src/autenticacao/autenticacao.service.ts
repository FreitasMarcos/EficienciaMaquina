import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { UsuarioDto } from './dto/usuario.dto';
import {Response} from 'express'

@Injectable()
export class AutenticacaoService {
    constructor(private prisma:PrismaService){}

    async criar(dto: UsuarioDto){

        const {nome, email, senha, cidade} = dto

        console.log(nome, email, senha, cidade)

        const localizaEmail = await this.prisma.usuario.findUnique({
            where: {email:email}
        })

        if (localizaEmail){
            throw new BadRequestException('E-mail já cadastrado')
        }

        const criptografia = await this.senhaHash(senha)

        const novoUsuario = await this.prisma.usuario.create({
            data:{
                nome:nome,
                email: email,
                senha: criptografia,
                cidade: cidade
            }
        })

        if(novoUsuario){
            return {message:'Usuario criado com sucesso'}
        }else{
            return {message: 'Algo de errado ocorreu, por favor entrar em contato com a equipe de desenvolvimento para analisar o problema'}
        }

    }

    async entrar(dto:UsuarioDto, res:Response){

        const {email, senha} = dto

        const verificaUsuario = await this.prisma.usuario.findUnique({
            where:{
                email: email
            }
        })

        if(!verificaUsuario){
            throw new BadRequestException('E-mail não encontrado')
        }

        const verificaSenha = await this.compararSenha({senha, hash:verificaUsuario.senha})

        if(!verificaSenha){
            throw new BadRequestException('Senha incorreta')
        }

        const usuarioAutentifcado = {
            id:verificaUsuario.id,
            email:verificaUsuario.email,
            nome:verificaUsuario.nome,
            cidade: verificaUsuario.cidade
        }

        return res.send(usuarioAutentifcado)

    }

    async sair(){
        return {message:'usuário deslogado'}
    }




    async senhaHash(senha:String){
        return await bcrypt.hash(senha, 10)
    }

    async compararSenha(args:{senha:string, hash:string}){
        return await bcrypt.compare(args.senha, args.hash)
    }
}