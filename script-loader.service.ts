// Angular Modules
import { Injectable } from '@angular/core';
// Application Interfaces
import { ScriptModel } from 'script-model';
// RxJs
import { Observable, Observer } from 'rxjs';

@Injectable()
export class ScriptLoaderService {
	private scripts: IScriptModel[] = [];

	public load(script: IScriptModel, nocache: boolean = false): Observable<IScriptModel> {
		return new Observable<IScriptModel>((observer: Observer<IScriptModel>) => {
			const existingScript: IScriptModel = this.scripts.find((s) => s.name === script.name);
			// Complete if the script is already loaded
			if (existingScript && existingScript.loaded) {
				observer.next(existingScript);
				observer.complete();
			} else {
				// Add the script to scripts array
				this.scripts = [...this.scripts, script];
				// Create the script
				const scriptElement: HTMLScriptElement = document.createElement('script');
				scriptElement.type = 'text/javascript';
				scriptElement.src = nocache ? `${script.src}?v=${Date.now()}` : script.src;
				scriptElement.onload = () => {
					script.loaded = true;
					observer.next(script);
					observer.complete();
				};
				scriptElement.onerror = (error: string | Event) => {
					console.log(`Couldn't load script ${script.src}`);
					observer.error(error);
				};
				// Load the script
				document.getElementsByTagName('body')[0].appendChild(scriptElement);
			}
		});
	}
}
