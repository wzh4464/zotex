// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { exportBibLatex, flushBibLatex } from './export-bib';
import { addCitation, addZoteroSelectedCitation } from './add-cite';
import { addCiteBib, addZoteroSelectedCiteBib } from './add-cite-bib';
import { addMdCiteBib } from './add-md-bib';
import { addHyperLinkCitation } from './add-link';
import { openInZotero } from './open-zotero';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "zotex" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('zotex.exportBibLatex', async () => {
		let latestBibName = context.workspaceState.get<string>('latestBibName');
		const bibName = await exportBibLatex(latestBibName);
		if (bibName && bibName !== latestBibName) {
			context.workspaceState.update('latestBibName', bibName);
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand('zotex.flushBibLatex', async () => {
		let latestBibName = context.workspaceState.get<string>('latestBibName');
		const bibName = await flushBibLatex(latestBibName);
		if (bibName && bibName !== latestBibName) {
			context.workspaceState.update('latestBibName', bibName);
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand('zotex.addCiteBib', async () => {
		let latestBibName = context.workspaceState.get<string>('latestBibName');
		const bibName = await addCiteBib(latestBibName);
		if (bibName && bibName !== latestBibName) {
			context.workspaceState.update('latestBibName', bibName);
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand('zotex.addZoteroSelectedCitationAndBibliography', async () => {
		let latestBibName = context.workspaceState.get<string>('latestBibName');
		const bibName = await addZoteroSelectedCiteBib(latestBibName);
		if (bibName && bibName !== latestBibName) {
			context.workspaceState.update('latestBibName', bibName);
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('zotex.addCitation', addCitation));
	context.subscriptions.push(vscode.commands.registerCommand('zotex.addZoteroSelectedCitation', addZoteroSelectedCitation));
	context.subscriptions.push(vscode.commands.registerCommand('zotex.addMdCiteBib', addMdCiteBib));
	context.subscriptions.push(vscode.commands.registerCommand('zotex.addHyperLinkCitation', addHyperLinkCitation));
	context.subscriptions.push(vscode.commands.registerCommand('zotex.openInZotero', openInZotero));

}

// This method is called when your extension is deactivated
export function deactivate() {}
