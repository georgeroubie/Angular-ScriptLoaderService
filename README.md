# Description

Load JavaScript files dynamically in your Angular Project.

## Example

### Cached script
```
    const scriptFile: ScriptModel = {
        name: 'intercom',
        src: '/assets/js/intercom.js',
        loaded: false
    };
    this.scriptLoaderService.load(scriptFile).subscribe(() => {
        console.log('intercom is loaded');
    });
```

### No cached script

```
    const scriptFile: ScriptModel = {
        name: 'blobScriptFile',
        src: 'https://website.blob.core.windows.net/client-configuration/config.js',
        loaded: false
    };
    this.scriptLoaderService.load(scriptFile, true).subscribe(() => {
        console.log('Configuration is loaded. This script is never cached by the browser.');
    });
```
