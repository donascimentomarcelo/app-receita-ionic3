import { ReceitasFiltro } from './../../models/filtros/receita.filter';
import { ReceitasDTO } from './../../models/receitas.dto';
import { enviroment } from './../../enviroment/enviroment.dev';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReceitaService {

constructor(public http: HttpClient) { }

    public listarTodos() : Observable<ReceitasDTO[]> {
        return this.http.get<ReceitasDTO[]>(`${enviroment.baseUrl}/receitas`);
    }

    public filtrar(filtro: ReceitasFiltro) : Observable<ReceitasDTO[]> {
        return this.http.post<ReceitasDTO[]>(`${enviroment.baseUrl}/receitas/filtrar`, filtro);
    }

    public listarMinhasReceitas() : Observable<ReceitasDTO[]> {
        return this.http.get<ReceitasDTO[]>(`${enviroment.baseUrl}/receitas/minhas-receitas`);
    }

    public pesquisar(id: number) : Observable<ReceitasDTO> {
        return this.http.get<ReceitasDTO>(`${enviroment.baseUrl}/receitas/${id}`);
    }
}
