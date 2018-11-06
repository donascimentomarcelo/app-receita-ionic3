import { ComentarioDTO } from './comentario.dto';
import { UsuarioDTO } from './usuario.dto';
export interface AvaliacaoDTO {
    id: string;
    comentario: ComentarioDTO;
    grau: string;
    usuario: UsuarioDTO;
}
