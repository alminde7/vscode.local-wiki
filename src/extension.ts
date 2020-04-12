import * as vscode from 'vscode';
import { LocalWikiProvider } from './local-wiki-provider';

export function activate(context: vscode.ExtensionContext) {

	// TODO Determine location of wiki.

	const localWikiProvider = new LocalWikiProvider(vscode.workspace.rootPath);
	vscode.window.registerTreeDataProvider('local-wiki', localWikiProvider);
}

// this method is called when your extension is deactivated
export function deactivate() {}