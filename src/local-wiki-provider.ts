import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class LocalWikiProvider implements vscode.TreeDataProvider<WikiItem> {
    onDidChangeTreeData?: vscode.Event<WikiItem | null | undefined> | undefined;

    constructor(private pathToWikiFolder: string | undefined) {
        if (!pathToWikiFolder) {
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
        if (!this.pathExists(rootFolderPath)) return [];

        return fs.readdirSync(rootFolderPath, {
            encoding: "utf-8",
            withFileTypes: true,
        }).map(file => new WikiItem(path.join(rootFolderPath, file.name), file.name));
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
    
    constructor(resourceLocation: string, label:string, ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.command = {
            command: "localWiki.openWikiResource",
            title: "Open file",
            arguments: [vscode.Uri.file(resourceLocation)]
        }
    }
}


export class LocalWikiExtension {

    constructor(private context: vscode.ExtensionContext) {

        const localWikiProvider = new LocalWikiProvider('C:/Users/Almin/Documents/misc');
        this.context.subscriptions.push(vscode.window.registerTreeDataProvider('localWiki', localWikiProvider));

        vscode.commands.registerCommand('localWiki.openWikiResource', resource => this.openResource(resource));
    }

    private openResource(resource: vscode.Uri): void {
		vscode.window.showTextDocument(resource);
	}

}