import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrupoDTO } from '../../models/grupo.dto';
import { enviroment } from '../../enviroment/enviroment.dev';

@Injectable()
export class GrupoService {

constructor(public http: HttpClient) { }
    public listar(): Observable<GrupoDTO[]> {
        return this.http.get<GrupoDTO[]>(`${enviroment.baseUrl}/grupos`);
    }
}
