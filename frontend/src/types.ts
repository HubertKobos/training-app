import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options{
   
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'body';
        context?: HttpContext;
        params?: HttpParams | {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    
}

export interface UserData{
    id: number,
    token: string
}

export interface Training{
    id: number;
    date: Date; 
    distanceKm: number | null;
    time: Date | null; 
    kcal?: number | null;
    comment?: string; 
    averageSpeed: number;
    userId: number
}