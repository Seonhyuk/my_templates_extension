import * as vscode from "vscode";
import * as fs from "fs";
import { join } from "path";
import { capitalizeFirstLetter } from "./../utils";
import { updateIndexFile } from "./updateIndexFile";

export const createFiles = async (label: string, uri: any) => {
  const input = await vscode.window.showInputBox({
    prompt: "Enter the name",
  });

  if (!input) {
    vscode.window.showErrorMessage("You must provide an input");
    return;
  }

  const rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  const templatePath = join(rootPath || "", "my_templates", label);

  const clickedDirectory = uri.fsPath;
  const targetFolder = join(clickedDirectory, input);

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  fs.readdir(templatePath, (err, files) => {
    if (err) {
      vscode.window.showErrorMessage("Error reading the template folder");
      return;
    }

    files.forEach((file) => {
      const templateFilePath = join(templatePath, file);
      const newFileName = file.replace("{name}", input).replace(".myt", "");
      const newFilePath = join(targetFolder, newFileName);

      if (fs.existsSync(templateFilePath)) {
        let fileContent = fs.readFileSync(templateFilePath, "utf-8");

        fileContent = fileContent
          .replace(/{name}/g, input)
          .replace(/{Name}/g, capitalizeFirstLetter(input));

        fs.writeFileSync(newFilePath, fileContent, "utf-8");
      } else {
        vscode.window.showErrorMessage(`Template file not found: ${templateFilePath}`);
      }
    });

    updateIndexFile(clickedDirectory, input);
  });
};
