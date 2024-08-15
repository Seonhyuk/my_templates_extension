import * as vscode from "vscode";
import { createSelect } from "./functions";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("extension.selectTemplate", createSelect);

  context.subscriptions.push(disposable);
}

export function deactivate() {}
