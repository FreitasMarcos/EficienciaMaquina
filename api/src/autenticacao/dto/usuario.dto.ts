import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class UsuarioDto{

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    senha:string

    @IsString()
    nome?:string


    @IsString()
    cidade:string





    
}