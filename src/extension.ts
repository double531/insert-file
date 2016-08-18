'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "insert-file" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.insertFile', () => {
        // The code you place here will be executed every time your command is executed
        vscode.window.showInputBox().then((text) => {
            let dirname = path.dirname(text);
            if (dirname == ".") {
                dirname = vscode.workspace.rootPath;
            }

            let filepath:string  =  dirname + "/" +  path.basename(text);
            fs.readFile(filepath, (err, data)=>{
                if (err) {
                    vscode.window.showErrorMessage(err.message);
                    return;
                }
               
                const editor = vscode.window.activeTextEditor;
                // check if there is no selection
                if (editor.selection.isEmpty) {
                    // the Position object gives you the line and character where the cursor is
                    const position = editor.selection.active;
                    vscode.window.activeTextEditor.edit(edit => {
                    edit.insert(position, data.toString());
                    
                    vscode.window.showInformationMessage("insert file: " + filepath + " is success.");
                 });
                }
            });
        });

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}