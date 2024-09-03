import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { EficienciaMaquinaDto } from './dto/EficienciaMaquina.dto';

@Injectable()
export class EficienciaMaquinaService {
    constructor(private prisma: PrismaService){}

    async criar(dto:EficienciaMaquinaDto){
        const {temperatura, usuarioId} = dto

        const validaUsuario =  await this.prisma.usuario.findUnique({
            where:{id: usuarioId}
        }) 

        if(!validaUsuario){
            throw new BadRequestException('Usuário não encontrado')
        }

        var eficiencia: number

        /* 
            25 - diferença entre 100 e 75 %
            4 - diferença entre 28 - 24

            25/4 = 6.25
        */

        if(temperatura >= 28){
            eficiencia = 100
        }else if(temperatura < 24){
            eficiencia = 75
        }else{
            eficiencia =  75 + (temperatura - 24) * 6.25;
        }

        const agora = new Date();
        const offset = agora.getTimezoneOffset(); 
        const criadoEm = new Date(agora.getTime() - offset * 60000);

        const criarEfifiencia =  await this.prisma.eficienciaMaquina.create({
            data:{
                temperatura: temperatura,
                eficiencia: eficiencia,
                usuario: {connect:{id: usuarioId}},
                criadoEm: criadoEm
            }
        })

        if(criarEfifiencia){
            return criarEfifiencia
        }else{
            return {message: 'Não foi possivel criar'}
        }
    }

    async retornar(usuarioId: string){

        const userId = Number(usuarioId)

        console.log('here')

        const validaUsuario = await this.prisma.usuario.findUnique({
            where:{id: userId}
        })

        if(!validaUsuario){
            throw new BadRequestException('Usuário não encontrado')
        }

        const eficienciasMaquinas = await this.prisma.eficienciaMaquina.findMany({
            where:{
                usuarioId: userId
            }
        })

        if(!eficienciasMaquinas){
            throw new BadRequestException('Não foi encontrado dados de eficiencia')
        }


        return eficienciasMaquinas
    }
}
