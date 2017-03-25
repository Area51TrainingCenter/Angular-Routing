import {NgModule, Component, Injectable} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {Routes, RouterModule} from "@angular/router";

import {Http, HttpModule} from "@angular/http";
import 'rxjs/Rx';

class Alumno {
	constructor(id:number, nombres:string, apellidos:string) {}
}

@Injectable()
class AlumnoServicio{
	resultados: Alumno[];
	ruta: string = "http://angular.tibajodemanda.com";

	constructor(private http:Http, router: Router){
		this.resultados = [];
	}

	listado(){
		const promesa = new Promise(
			(resolve, reject) => {
				this.http
					.get(`${this.ruta}/alumnos`)
					.toPromise()
					.then(
						registros => {
							const lista = registros.json();
							this.resultados = lista.map(elemento => {
								return new Alumno(
									elemento.id,
									elemento.nombres,
									elemento.apellidos);
							})
							resolve();
						},

						error => {
							reject(error);
						}
					)
			});

		return promesa;
	}

	insertar(alumno: Alumno){
		const promesa = new Promise(
			(resolve, reject) => {
				this.http
					.post(`${this.ruta}/alumnos`, {nombres: alumno.nombres, apellidos: alumno.apellidos})
					.toPromise()
					.then(
						registro => {
							this.router.navigate(["listado"]);
							resolve();
						},

						error => {
							reject(error)
						}
					)			
			}
		)
	}

	editar(id:number) {
		const promesa = new Promise(
			(resolve, reject) => {
				this.http
					.get(`${this.ruta}/alumnos/${id}`)
					.toPromise()
					.then(
						registro => {
							resolve(registro);
						},

						error => {
							reject(error);
						}
					)
			}
		);

		return promesa;
	}

	eliminar(id:number) {
		const promesa = new Promise(
			(resolve, reject) => {
				this.http
					.delete(`${this.ruta}/alumnos/${id}`)
					.toPromise()
					.then(
						registro => {
							resolve();
						},

						error => {
							reject(error);
						}
					)
			}
		);

		return promesa;
	}

}


@Component({
	selector: "app-formulario",
	template: `
		<form>
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Nombres">
			</div>
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Apellidos">
			</div>
			<div class="form-group">
				<a href class="btn btn-success btn-block">Ingresar</a>
			</div>
		</form>
	`
})
class appFormulario{}

@Component({
	selector: "app-listado",
	template: `
		<table class="table table-striped">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nombres</th>
					<th>Apellidos</th>
				</tr>
			</thead>
			<tbody>

			</tbody>
		</table>


	`
})
class appListado{}

@Component({
	selector: "app-cabecera",
	template: `
	<nav class="navbar navbar-default">
	        <div class="container-fluid">
	          <div class="navbar-header">
	            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	              <span class="sr-only">Toggle navigation</span>
	              <span class="icon-bar"></span>
	              <span class="icon-bar"></span>
	              <span class="icon-bar"></span>
	            </button>
	            <a class="navbar-brand" [routerLink]="['listado']">Area51 Alumnos</a>
	          </div>
	          <div id="navbar" class="navbar-collapse collapse">
	            <ul class="nav navbar-nav">
	              <li [routerLinkActive]="['active']"><a [routerLink]="['listado','tamano','pagina']">Inicio</a></li>
	              <li [routerLinkActive]="['active']"><a [routerLink]="['insercion']">Inserción</a></li>
	            </ul>
	          </div>
	        </div>
	      </nav>
	`
})
class appCabecera{}


@Component({
	selector: "app",
	template: `
		<app-cabecera></app-cabecera>
		<router-outlet></router-outlet>
	`
})
class appBase{}

const rutas: Routes = [
	{path: "", redirectTo: "listado", pathMatch: "full"},
	{path: "listado", component: appListado},
	{path: "insercion", component: appFormulario},
	{path: "**", redirectTo: "listado"}
]

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(rutas, {useHash: true}),
		HttpModule
	],
	declarations: [
		appBase,
		appCabecera,
		appListado,
		appFormulario
	],
	bootstrap: [
		appBase
	],
	providers: [
		AlumnoServicio
	]
})
class appModulo{}

platformBrowserDynamic().bootstrapModule(appModulo);