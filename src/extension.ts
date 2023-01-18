import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('activating favorite-urls extension');
	let disposable = vscode.commands.registerCommand('favorite-urls.show', () => {
		let config = vscode.workspace.getConfiguration();
		let links = <Array<any>>config.get("favorite-urls.list");
		if (links && links.length > 0) {
			let items = links.map(link => {
				return { label: link.label, url: link.url };
			});

			let sorting = <boolean>config.get("favorite-urls.sort");
			if (sorting) {
				items = items.sort((a, b) => a.label.localeCompare(b.label));
			}

			vscode.window.showQuickPick(items, { placeHolder: "Please pick the URL you want to access or start typing to filter." }).then(selectedLink => {
				if (selectedLink) {
					vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(selectedLink.url));
				}
			});
		} else {
			vscode.window.showErrorMessage(`Your configuration is empty. Make sure to add it to '.vscode/settings.json' as below (or see README of this extension):
			{
				"favorite-urls": {
					list": [
						{
							"label": "Google",
							"url": "https://www.google.com"
						}
					]
				}
			}`)
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
