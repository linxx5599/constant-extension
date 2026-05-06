const vscode = require("vscode");
const utils = require("./utils");
const config = require("./config");

//vscode error message
function showErrorMessage(message) {
  vscode.window.showErrorMessage(message);
}
//get editor
async function run(fn) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  // 获取选中的文本
  const selections = editor.selections;
  const cache = new Map();
  const textEdits = new vscode.WorkspaceEdit();
  for (const selection of selections) {
    const selectedText = editor.document.getText(selection);
    // 在这里可以进行其他操作，使用选中的文本进行处理

    if (!cache.has(selectedText)) {
      const [err, result] = await utils.asyncFn(fn(selectedText));
      if (err) {
        showErrorMessage(err);
        continue;
      }
      cache.set(selectedText, result);
    }
    const edit = new vscode.TextEdit(selection, cache.get(selectedText));
    textEdits.set(editor.document.uri, [edit]);
  }
  try {
    // 应用批量编辑
    await vscode.workspace.applyEdit(textEdits);
  } catch (e) {
    showErrorMessage(config.EDIT_FAILURE + ":" + e);
  }
}
const events = {
  lowerSnakeCase: utils.convertToLowerSnakeCase,
  upperSnakeCase: utils.convertToUpperSnakeCase,
  lowerCamelCase: utils.convertToLowerCamelCase,
  upperCamelCase: utils.convertToUpperCamelCase,
  lowerKebabCase: utils.convertToLowerKebabCase,
  upperKebabCase: utils.convertToUpperKebabCase,
  lowerCase: (t) => Promise.resolve(t.toLowerCase()),
  upperCase: (t) => Promise.resolve(t.toUpperCase()),
};
const copyEvents = {
  copyPathJsonPath: utils.copyPathJsonPath,
  copyPathLowerCase: utils.copyPathLowerCase,
  copyPathUpperCase: utils.copyPathUpperCase,
  copyPathLowerKebabCase: utils.copyPathLowerKebabCase,
  copyPathUpperKebabCase: utils.copyPathUpperKebabCase,
  copyPathLowerCamelCase: utils.copyPathLowerCamelCase,
  copyPathUpperCamelCase: utils.copyPathUpperCamelCase,
  copyPathLowerSnakeCase: utils.copyPathLowerSnakeCase,
  copyPathUpperSnakeCase: utils.copyPathUpperSnakeCase,
  copyPathJsonPathWithValue: utils.copyPathJsonPathWithValue,
  copyPathLowerCaseWithValue: utils.copyPathLowerCaseWithValue,
  copyPathUpperCaseWithValue: utils.copyPathUpperCaseWithValue,
  copyPathLowerKebabCaseWithValue: utils.copyPathLowerKebabCaseWithValue,
  copyPathUpperKebabCaseWithValue: utils.copyPathUpperKebabCaseWithValue,
  copyPathLowerCamelCaseWithValue: utils.copyPathLowerCamelCaseWithValue,
  copyPathUpperCamelCaseWithValue: utils.copyPathUpperCamelCaseWithValue,
  copyPathLowerSnakeCaseWithValue: utils.copyPathLowerSnakeCaseWithValue,
  copyPathUpperSnakeCaseWithValue: utils.copyPathUpperSnakeCaseWithValue,
};
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  for (const event in events) {
    const disposable = vscode.commands.registerCommand(event, () =>
      run(events[event])
    );
    context.subscriptions.push(disposable);
  }
  for (const event in copyEvents) {
    const disposable = vscode.commands.registerCommand(event, copyEvents[event]);
    context.subscriptions.push(disposable);
  }
}
function deactivate() {}
module.exports = {
  activate,
  deactivate,
};
