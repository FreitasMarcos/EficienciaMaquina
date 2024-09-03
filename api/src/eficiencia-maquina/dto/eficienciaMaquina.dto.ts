import { IsNumber, IsNotEmpty, isNumber } from "class-validator";

export class EficienciaMaquinaDto{

    @IsNotEmpty()
    @IsNumber()
    temperatura: number  
 
    @IsNumber()
    @IsNotEmpty()
    eficiencia?: number  

    @IsNotEmpty()
    @IsNumber()
    usuarioId :number 

}