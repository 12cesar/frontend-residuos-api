export interface Lugar{
    id:string,
    nombre:string,
    lng: number,
    lat:number,
    color: string
}
// Generated by https://quicktype.io

// Generated by https://quicktype.io

export interface RespMarcadores {
    [key:string]:Lugar
}