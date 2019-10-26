import { NgModule } from "@angular/core";
import { PersonasComponent } from "./personas/personas.component";
import { Routes, RouterModule } from "@angular/router";
import { FormularioComponent } from "./personas/formulario/formulario.component";
import { ErrorComponent } from "./error/error.component";
import { LoginComponent } from "./login/login.component";
import { GuardianService } from "./login/guardian.service";

const routes: Routes = [
  { path: "", component: PersonasComponent, canActivate: [GuardianService] },
  {
    path: "personas",
    canActivate: [GuardianService],
    component: PersonasComponent,
    children: [
      { path: "agregar", component: FormularioComponent },
      { path: ":id", component: FormularioComponent }
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
