import { UsuarioDTO } from './usuario.dto';
import { RespostaDTO } from "./resposta.dto";

export interface ComentarioDTO {
    id: string;
    comentario: string;
    resposta: RespostaDTO[]
    usuario: UsuarioDTO;
}
