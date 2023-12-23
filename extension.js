const vscode = require('vscode');
const utils = require('./utils');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let lowerSnakeCase = vscode.commands.registerCommand('lowerSnakeCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			// 获取选中的文本
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);
			// 在这里可以进行其他操作，使用选中的文本进行处理
			utils.convertToLowerSnakeCase(selectedText)
				.then(result => {
					editor.edit(editBuilder => {
						editBuilder.replace(selection, result);
					});
				})
				.catch(error => {
					vscode.window.showErrorMessage(error);; // 处理错误信息
				});
		} else {
			vscode.window.showErrorMessage('No active text editor.');
		}
	});

	let upperSnakeCase = vscode.commands.registerCommand('upperSnakeCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			// 获取选中的文本
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);
			// 在这里可以进行其他操作，使用选中的文本进行处理
			utils.convertToUpperSnakeCase(selectedText)
				.then(result => {
					editor.edit(editBuilder => {
						editBuilder.replace(selection, result);
					});
				})
				.catch(error => {
					vscode.window.showErrorMessage(error);; // 处理错误信息
				});
		} else {
			vscode.window.showErrorMessage('No active text editor.');
		}
	});

	let lowerCamelCase = vscode.commands.registerCommand('lowerCamelCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			// 获取选中的文本
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);
			// 在这里可以进行其他操作，使用选中的文本进行处理
			utils.convertToLowerCamelCase(selectedText)
				.then(result => {
					editor.edit(editBuilder => {
						editBuilder.replace(selection, result);
					});
				})
				.catch(error => {
					vscode.window.showErrorMessage(error);; // 处理错误信息
				});
		} else {
			vscode.window.showErrorMessage('No active text editor.');
		}
	});

	let upperCamelCase = vscode.commands.registerCommand('upperCamelCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			// 获取选中的文本
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);
			// 在这里可以进行其他操作，使用选中的文本进行处理
			utils.convertToUpperCamelCase(selectedText)
				.then(result => {
					editor.edit(editBuilder => {
						editBuilder.replace(selection, result);
					});
				})
				.catch(error => {
					vscode.window.showErrorMessage(error);; // 处理错误信息
				});
		} else {
			vscode.window.showErrorMessage('No active text editor.');
		}
	});

	let lowerKebabCase = vscode.commands.registerCommand('lowerKebabCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			// 获取选中的文本
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);
			// 在这里可以进行其他操作，使用选中的文本进行处理
			utils.convertToLowerKebabCase(selectedText)
				.then(result => {
					editor.edit(editBuilder => {
						editBuilder.replace(selection, result);
					});
				})
				.catch(error => {
					vscode.window.showErrorMessage(error);; // 处理错误信息
				});
		} else {
			vscode.window.showErrorMessage('No active text editor.');
		}
	});

	let upperKebabCase = vscode.commands.registerCommand('upperKebabCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			// 获取选中的文本
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);
			// 在这里可以进行其他操作，使用选中的文本进行处理
			utils.convertToUpperKebabCase(selectedText)
				.then(result => {
					editor.edit(editBuilder => {
						editBuilder.replace(selection, result);
					});
				})
				.catch(error => {
					vscode.window.showErrorMessage(error);; // 处理错误信息
				});
		} else {
			vscode.window.showErrorMessage('No active text editor.');
		}
	});

	let lowerCase = vscode.commands.registerCommand('lowerCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			// 获取选中的文本
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);
			editor.edit(editBuilder => {
				editBuilder.replace(selection, selectedText.toLowerCase());
			});
		} else {
			vscode.window.showErrorMessage('No active text editor.');
		}
	});

	let upperCase = vscode.commands.registerCommand('upperCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);
			editor.edit(editBuilder => {
				editBuilder.replace(selection, selectedText.toUpperCase());
			});
		} else {
			vscode.window.showErrorMessage('No active text editor.');
		}
	});
	context.subscriptions.push(lowerSnakeCase, upperSnakeCase);
	context.subscriptions.push(lowerCase, upperCase);
}
function deactivate() { }
module.exports = {
	activate,
	deactivate
}
