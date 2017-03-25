import {NgModule, Component, Injectable} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {Routes, RouterModule} from "@angular/router";


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
	            <a class="navbar-brand" href="/#/">Area51 Alumnos</a>
	          </div>
	          <div id="navbar" class="navbar-collapse collapse">
	            <ul class="nav navbar-nav">
	              <li class="active"><a href="/#/listado">Inicio</a></li>
	              <li><a href="/#/insercion">Inserción</a></li>
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
		RouterModule.forRoot(rutas, {useHash: true})
	],
	declarations: [
		appBase,
		appCabecera,
		appListado,
		appFormulario
	],
	bootstrap: [
		appBase
	]
})
class appModulo{}

platformBrowserDynamic().bootstrapModule(appModulo);