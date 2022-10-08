import { Estoque } from "src/estoque/entities/estoque.entity";
import { Fornecedor } from "src/fornecedor/entities/fornecedor.entity";
import { Iten } from "src/itens/entities/iten.entity";

export class CreateEntradaDto {
    
    estoque: Estoque;

    item: Iten;
    
    quant: number;
    
    valorAquisicao: number;
    
    data: Date;
    
    fornecedor: Fornecedor;
}
