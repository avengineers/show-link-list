import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('activating show-link-list extension');
	let disposable = vscode.commands.registerCommand('show-link-list.show', () => {
		let config = vscode.workspace.getConfiguration();
		let links = <Array<any>>config.get("show-link-list.links");
		let items = links.map(link => {
			return { label: link.label, url: link.url };
		});
		vscode.window.showQuickPick(items).then(selectedLink => {
			if (selectedLink) {
				vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(selectedLink.url));
			}
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
