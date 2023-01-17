import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('activating show-link-list extension');
	let disposable = vscode.commands.registerCommand('show-link-list.show', () => {
		let config = vscode.workspace.getConfiguration();
		let links = <Array<any>>config.get("show-link-list.links");
		if (links && links.length > 0) {
			let items = links.map(link => {
				return { label: link.label, url: link.url };
			});
			vscode.window.showQuickPick(items, { placeHolder: "Please pick the link you want to access or start typing to filter." }).then(selectedLink => {
				if (selectedLink) {
					vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(selectedLink.url));
				}
			});
		} else {
			vscode.window.showErrorMessage(`Your configuration is empty. Make sure to add it to '.vscode/settings.json' as below (or see README of this extension):
			{
				"show-link-list.links": [
					{
						"label": "Google",
						"url": "https://www.google.com"
					}
				]
			}`)
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
