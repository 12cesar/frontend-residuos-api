// Generated by https://quicktype.io

export interface ResultVehiculos {
    ok:       boolean;
    msg:      string;
    vehiculo: Vehiculo[];
}
export interface ResultVehiculo {
    ok:       boolean;
    msg:      string;
    vehiculo: Vehiculo;
}
export interface Vehiculo {
    _id:     string;
    nombre:  string;
    marca:   string;
    placa:   string;
    color:   string;
    ano:     string;
    estado:  boolean;
    usuario: Usuario;
}

export interface Usuario {
    _id:    string;
    nombre: string;
}
