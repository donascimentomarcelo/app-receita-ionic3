import { IngredientesDTO } from './../../models/ingredientes.dto';
import { enviroment } from './../../enviroment/enviroment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IngredienteService {

    constructor(public http: HttpClient) { }

    public listarTodos() : Observable<IngredientesDTO[]> {
        return this.http.get<IngredientesDTO[]>(`${enviroment.baseUrl}/engredientes`);    
    } 
}
