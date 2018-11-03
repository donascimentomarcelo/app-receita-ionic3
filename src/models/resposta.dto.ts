import { UsuarioDTO } from './usuario.dto';
export interface RespostaDTO {
    id: string;
    resposta: string;
    ususario: UsuarioDTO;
}
