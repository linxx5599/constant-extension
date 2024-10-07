const vscode = require('vscode');
const utils = require('./utils');
const config = require('./config');

//vscode error message
function showErrorMessage(message) {
	vscode.window.showErrorMessage(message);
}
//get editor
async function run(fn) {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		// 获取选中的文本
		const selections = editor.selections;
		for (const selection of selections) {
			const selectedText = editor.document.getText(selection);
			// 在这里可以进行其他操作，使用选中的文本进行处理
			try {
				if (fn) {
					const result = await fn(selectedText);
					editor.edit(editBuilder => {
						editBuilder.replace(selection, result);
					});
				}
			} catch (error) {
				showErrorMessage(error);
			}
		}

	} else {
		showErrorMessage(config.EMPTY_TEXT);
	}
}
const events = {
	lowerSnakeCase: utils.convertToLowerSnakeCase,
	upperSnakeCase: utils.convertToUpperSnakeCase,
	lowerCamelCase: utils.convertToLowerCamelCase,
	upperCamelCase: utils.convertToLowerCamelCase,
	lowerKebabCase: utils.convertToLowerKebabCase,
	upperKebabCase: utils.convertToUpperKebabCase,
	lowerCase: t => t.toLowerCase(),
	upperCase: t => t.toUpperCase()
}
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	for (const event in events) {
		const disposable = vscode.commands.registerCommand(event, () => run(events[event]));
		context.subscriptions.push(disposable);
	}
}
function deactivate() { }
module.exports = {
	activate,
	deactivate
}
