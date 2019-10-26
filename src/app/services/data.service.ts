import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Persona } from "../persona.model";
import { LoginService } from "../login/login.service";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(
    private httpCliente: HttpClient,
    private loginService: LoginService
  ) {}

  cargarPersonas() {
    const token = this.loginService.getIdToken();
    return this.httpCliente.get(
      "https://listado-personas-30933.firebaseio.com/datos.json?auth=" + token
    );
  }

  guardarPersonas(personas: Persona[]) {
    const token = this.loginService.getIdToken();
    this.httpCliente
      .put(
        "https://listado-personas-30933.firebaseio.com/datos.json?auth=" +
          token,
        personas
      )
      .subscribe(
        response => {
          console.log("Resultado de guardar personas: " + response);
        },
        error => {
          console.log("Error al guardar personas", error);
        }
      );
  }

  modificarPersona(index: number, persona: Persona) {
    const token = this.loginService.getIdToken();
    let url: string;
    url =
      "https://listado-personas-30933.firebaseio.com/datos/" +
      index +
      ".json?auth=" +
      token;
    this.httpCliente
      .put(url, persona)
      .subscribe(
        response => console.log("resultado de modificar persona: " + response),
        error => console.log("Error de modificar persona: " + error)
      );
  }
}
