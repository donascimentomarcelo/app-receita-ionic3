import { ReceitasDTO } from './receitas.dto';
import { IngredientesDTO } from './ingredientes.dto';
export interface ItemReceitaDTO {
    engrediente: IngredientesDTO;
    receita: ReceitasDTO;
}
