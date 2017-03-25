import {NgModule, Component, Injectable} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";


@Component({
	selector: "app-formulario",
	template: `<form>Formulario</form>`
})
class appFormulario{}

@Component({
	selector: "app-listado",
	template: `<div>Listado</div>`
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
	            <a class="navbar-brand" href="#">Area51 Alumnos</a>
	          </div>
	          <div id="navbar" class="navbar-collapse collapse">
	            <ul class="nav navbar-nav">
	              <li class="active"><a href="#">Inicio</a></li>
	              <li><a href="#">Listado</a></li>
	              <li><a href="#">Inserción</a></li>
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
	`
})
class appBase{}

@NgModule({
	imports: [
		BrowserModule
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