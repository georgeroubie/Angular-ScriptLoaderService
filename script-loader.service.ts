// Angular Modules
import { Injectable } from '@angular/core';
// Application Interfaces
import { ScriptModel } from 'script-model';
// RxJs
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class ScriptLoaderService {
    private scripts: ScriptModel[] = [];

    public load(script: ScriptModel, nocache: boolean = false): Observable<ScriptModel> {
        return new Observable<ScriptModel>((observer: Observer<ScriptModel>) => {
            let existingScript = this.scripts.find(s => s.name == script.name);

            // Complete if already loaded
            if (existingScript && existingScript.loaded) {
                observer.next(existingScript);
                observer.complete();
            }
            else {
                // Add the script
                this.scripts = [...this.scripts, script];

                // Load the script
                let scriptElement = document.createElement('script');
                scriptElement.type = 'text/javascript';
                if(nocache) {
                    scriptElement.src = `${script.src}?v=${Date.now()}`;
                } else {
                    scriptElement.src = script.src;
                }

                scriptElement.onload = () => {
                    script.loaded = true;
                    observer.next(script);
                    observer.complete();
                };

                scriptElement.onerror = (error: any) => {
                    console.log(`Couldn't load script ${script.src}`);
                    observer.error(error);
                };

                document.getElementsByTagName('body')[0].appendChild(scriptElement);
            }
        });
    }
}
