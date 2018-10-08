import { IngredientesDTO } from './ingredientes.dto';
export interface ReceitasDTO {
    descricao: string;
    titulo: string;
    engredientes: IngredientesDTO[];
}
