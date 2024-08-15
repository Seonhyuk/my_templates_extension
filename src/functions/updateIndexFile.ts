import * as vscode from "vscode";
import * as fs from "fs";
import { join } from "path";

export const updateIndexFile = (targetDirectory: string, input: string) => {
  const indexFilePath = join(targetDirectory, "index.ts");

  if (fs.existsSync(indexFilePath)) {
    const content = fs.readFileSync(indexFilePath, "utf-8");
    const additionalContent = `\nexport * from './${input}';\nexport { default as ${input} } from './${input}';\n`;

    const newContent = content + additionalContent;

    fs.writeFileSync(indexFilePath, newContent, "utf-8");
  }
};
