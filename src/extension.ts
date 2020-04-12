import * as vscode from 'vscode';
import { LocalWikiProvider, LocalWikiExtension } from './local-wiki-provider';

export function activate(context: vscode.ExtensionContext) {

	// TODO Determine location of wiki.
	new LocalWikiExtension(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}