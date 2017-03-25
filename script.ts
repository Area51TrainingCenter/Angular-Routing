import {NgModule, Component, Injectable} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {Routes, RouterModule, Router, ActivatedRoute} from "@angular/router";

import {Http, HttpModule} from "@angular/http";
import 'rxjs/Rx';

import {FormsModule} from "@angular/forms";

class Alumno {
	constructor(public id:number, public nombres:string, public apellidos:string) {}
}

@Injectable()
class AlumnoServicio{
	resultados: Alumno[];
	ruta: string = "http://angular.tibajodemanda.com";

	constructor(private http:Http, private router: Router){
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
							//this.router.navigate(["listado"]);
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
	selector: "app-edicion",
	template: `
		<form>
			<div class="form-group">
				<input type="text" name="nombres" class="form-control" placeholder="Nombres" [(ngModel)]="nombresAlumno">
			</div>
			<div class="form-group">
				<input type="text" name="apellidos" class="form-control" placeholder="Apellidos" [(ngModel)]="apellidosAlumno">
			</div>
			<div class="form-group">
				<button type="button" class="btn btn-success" >Grabar</button>
			</div>
		</form>
	`
})
class appEdicion{
	private nombresAlumno:string = "";
	private apellidosAlumno:string = "";
	private idAlumno: number;

	constructor(private alumnoServicio: AlumnoServicio, private router: ActivatedRoute){
		this.router.params.subscribe(parametros => {
			this.alumnoServicio
				.editar(parametros["id"])
				.then(registro => {
					const reg = registro.json();
					this.nombresAlumno = reg.nombres;
					this.apellidosAlumno = reg.apellidos;

					this.idAlumno = registro.id;
				})
		})
	}

	grabar(nombres:string, apellidos:string){

	}
}


@Component({
	selector: "app-formulario",
	template: `
		<form>
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Nombres" #nombres>
			</div>
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Apellidos" #apellidos>
			</div>
			<div class="form-group">
				<button class="btn btn-success btn-block" (click)="grabar(nombres.value, apellidos.value)">Ingresar</button>
			</div>
		</form>
	`
})
class appFormulario{
	constructor(private alumnoServicio: AlumnoServicio, router:Router){}

	grabar(nombres:string, apellidos:string) {
		const alumno:Alumno = new Alumno(0, nombres, apellidos);

		this.alumnoServicio
			.insertar(alumno)
	}
}

@Component({
	selector: "app-listado",
	template: `
		<table class="table table-striped">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nombres</th>
					<th>Apellidos</th>
					<th>Acción</th>
				</tr>
			</thead>
			<tbody>
				<tr *ngFor="let item of alumnoServicio.resultados">
					<td>{{item.id}}</td>
					<td>{{item.nombres}}</td>
					<td>{{item.apellidos}}</td>
					<td><a (click)="editar(item.id)" class="btn btn-warning">Editar</a>&nbsp;<a (click)="eliminar(item.id)" class="btn btn-danger">Eliminar</a>
				</tr>
			</tbody>
		</table>
	`
})
class appListado{
	constructor(private alumnoServicio:AlumnoServicio, private router:Router) {
		this.alumnoServicio.listado();
	}

	editar(id:number){
		this.router.navigate(["edicion",id]);
	}

	eliminar(id:number){

	}
}

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
	{path: "edicion/:id", component: appEdicion},
	{path: "**", redirectTo: "listado"}
]

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(rutas, {useHash: true}),
		HttpModule,
		FormsModule
	],
	declarations: [
		appBase,
		appCabecera,
		appListado,
		appFormulario,
		appEdicion
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