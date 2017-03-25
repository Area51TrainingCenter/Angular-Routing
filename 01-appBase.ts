import {NgModule, Component, Injectable} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";




@Component({
	selector: "app",
	template: `<h1>Componente</h1>`
})
class appBase{}


@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		appBase
	],
	bootstrap: [
		appBase
	]
})
class appModulo{}

platformBrowserDynamic().bootstrapModule(appModulo);