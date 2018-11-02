import { UsuarioDTO } from './usuario.dto';
export interface AvaliacaoDTO {

    comentario: string;
    grau: string;
    usuario: UsuarioDTO;
}
