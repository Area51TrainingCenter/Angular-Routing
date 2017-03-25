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
	template: `<header>Cabecera</header>`
})
class appCabecera{}


@Component({
	selector: "app",
	template: `
		<h1>Componente</h1>
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