import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { createFiles } from "./createFiles";

export const createSelect = (uri: any) => {
  const rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  const templatesDir = path.join(rootPath || "", "my_templates");

  if (fs.existsSync(templatesDir)) {
    const templateDirs = fs
      .readdirSync(templatesDir)
      .filter(
        (file) =>
          fs.statSync(path.join(templatesDir, file)).isDirectory() &&
          fs.readdirSync(path.join(templatesDir, file)).length !== 0
      );

    const templates = vscode.window.createQuickPick();
    templates.items = templateDirs.map((dir) => ({ label: dir }));

    templates.onDidChangeSelection((selection) => {
      if (selection[0]) {
        createFiles(selection[0].label, uri);
      }
      templates.hide();
    });

    templates.onDidHide(() => templates.dispose());
    templates.show();
  } else {
    vscode.window.showErrorMessage("No templates directory found.");
  }
};
