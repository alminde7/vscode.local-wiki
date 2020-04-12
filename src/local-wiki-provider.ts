import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class LocalWikiProvider implements vscode.TreeDataProvider<WikiItem> {
    onDidChangeTreeData?: vscode.Event<WikiItem | null | undefined> | undefined;

    constructor(private pathToWikiFolder: string | undefined) {
        if(!pathToWikiFolder) {
            this.pathToWikiFolder = '';
        }
    }

    getTreeItem(element: WikiItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: WikiItem | undefined): vscode.ProviderResult<WikiItem[]> {
        if (!this.pathToWikiFolder) {
			vscode.window.showInformationMessage('No dependency in empty workspace');
			return Promise.resolve([]);
		}

		return Promise.resolve(this.getFilesinFolder(this.pathToWikiFolder));
    }

    private getFilesinFolder(rootFolderPath: string): WikiItem[] {
        if(!this.pathExists(rootFolderPath)) return [];

        return fs.readdirSync(rootFolderPath, {
            encoding : "utf-8",
            withFileTypes: true,
        }).map(file => new WikiItem(file.name, vscode.TreeItemCollapsibleState.None));
	}

	private pathExists(p: string): boolean {
		try {
			fs.accessSync(p);
		} catch (err) {
			return false;
		}

		return true;
	}

}

export class WikiItem extends vscode.TreeItem {

}