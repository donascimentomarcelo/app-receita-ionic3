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
}
