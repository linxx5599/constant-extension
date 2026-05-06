const WordsNinjaPack = require("wordsninja");
const WordsNinja = new WordsNinjaPack();
const vscode = require("vscode");
const yaml = require("js-yaml");

function injectWords() {
  WordsNinja.addWords("kube");
}

function convertToLowerSnakeCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);

        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(words.toLowerCase());
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            res += words[i].toLowerCase() + "_";
          }
          resolve(res.slice(0, -1));
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

function convertToUpperSnakeCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);

        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(words.toUpperCase());
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            res += words[i].toUpperCase() + "_";
          }
          resolve(res.slice(0, -1));
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

function convertToLowerKebabCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);

        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(words.toLowerCase());
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            res += words[i].toLowerCase() + "-";
          }
          resolve(res.slice(0, -1));
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

function convertToUpperKebabCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);

        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(words.toUpperCase());
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            res += words[i].toUpperCase() + "-";
          }
          resolve(res.slice(0, -1));
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

function convertToLowerCamelCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);
        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(words.toLowerCase());
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            if (i === 0) {
              res += words[i].toLowerCase();
            } else {
              res += capitalizeFirstLetter(words[i].toLowerCase());
            }
          }
          resolve(res);
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

function convertToUpperCamelCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);

        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(capitalizeFirstLetter(words.toLowerCase()));
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            res += capitalizeFirstLetter(words[i].toLowerCase());
          }
          resolve(res);
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

// 首字母大写
function capitalizeFirstLetter(str) {
  if (str.length === 0) {
    return str; // 空字符串不做处理
  }

  const firstLetter = str.charAt(0).toUpperCase();
  const restOfTheString = str.slice(1);

  return firstLetter + restOfTheString;
}
const SEARCH_STR = "sdsdfdfghgjhksddszdxzxcdfdfdfdfdfdsafderetrhfghfsdf";
function dfs(obj, path, searchStr) {
  let testPath;
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      testPath = JSON.parse(JSON.stringify(path));
      testPath.push(`[${i}]`);
      if (obj[i] === searchStr) {
        return testPath;
      } else if (typeof obj[i] === "object" && obj[i] !== null) {
        const dfsResult = dfs(obj[i], testPath, searchStr);
        if (dfsResult !== undefined) {
          return dfsResult;
        }
      }
    }
  } else {
    for (const key in obj) {
      testPath = JSON.parse(JSON.stringify(path));
      testPath.push(key);
      if (obj[key] === searchStr) {
        return testPath;
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        const dfsResult = dfs(obj[key], testPath, searchStr);
        if (dfsResult !== undefined) {
          return dfsResult;
        }
      }
    }
  }
}

function getSelectedLines(textEditor) {
  const lines = new Set();

  textEditor.selections.forEach((selection) => {
    const startLine = selection.start.line;
    let endLine = selection.end.line;
    if (selection.end.character === 0 && endLine > startLine) {
      endLine -= 1;
    }

    for (let line = startLine; line <= endLine; line++) {
      lines.add(line);
    }
  });

  return Array.from(lines).sort((a, b) => a - b);
}

function getPathFromLine(textEditor, selectedLine) {
  if (textEditor.document.languageId === "json") {
    return getJsonPathFromActiveLine(textEditor, selectedLine);
  }
  const selection = new vscode.Selection(
    0,
    0,
    selectedLine,
    textEditor.document.lineAt(selectedLine).range.end.character
  );
  const yamlString = textEditor.document.getText(selection);
  const yamlLines = yamlString.split(/\r?\n/);
  const lastLine = yamlLines[yamlLines.length - 1];
  const propertyData = lastLine.split(":", 1);
  propertyData[1] = `${SEARCH_STR}`;
  yamlLines[yamlLines.length - 1] = propertyData.join(": ");
  const yamlData = yaml.load(yamlLines.join("\n"));
  return dfs(yamlData, [], `${SEARCH_STR}`);
}

function getPathsFromSelection() {
  const textEditor = vscode.window.activeTextEditor;
  if (textEditor !== undefined) {
    return getSelectedLines(textEditor)
      .map((line) => getPathFromLine(textEditor, line))
      .filter((path) => path !== undefined);
  }
}

function getPathValue(yamlData, objPath) {
  return objPath.reduce((current, item) => {
    if (current === undefined || current === null) {
      return undefined;
    }

    const arrayIndex = item.match(/^\[(\d+)\]$/);
    if (arrayIndex !== null) {
      return current[Number(arrayIndex[1])];
    }

    return current[item];
  }, yamlData);
}

function getPathEntriesFromSelection() {
  const textEditor = vscode.window.activeTextEditor;
  if (textEditor !== undefined) {
    const yamlData = yaml.load(textEditor.document.getText());
    return getSelectedLines(textEditor)
      .map((line) => getPathFromLine(textEditor, line))
      .filter((path) => path !== undefined)
      .map((path) => ({
        path,
        value: getPathValue(yamlData, path),
      }));
  }
}

function getJsonPathFromActiveLine(textEditor, selectedLine) {
  const yamlLines = textEditor.document.getText().split(/\r?\n/);
  const lastLine = yamlLines[selectedLine];
  const propertyData = lastLine.match(/^(.*?:\s*)(.*?)(,?\s*)$/);
  if (propertyData === null) {
    return;
  }

  yamlLines[selectedLine] =
    propertyData[1] + JSON.stringify(SEARCH_STR) + propertyData[3];
  const yamlData = yaml.load(yamlLines.join("\n"));
  return dfs(yamlData, [], `${SEARCH_STR}`);
}

function copyText(text) {
  vscode.window.showInformationMessage(`复制成功: ${text}`);
  vscode.env.clipboard.writeText(text);
}

function formatPathValue(value) {
  if (typeof value === "string") {
    return value;
  }

  if (value === undefined) {
    return "";
  }

  if (value !== null && typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

function getPathWords(objPath) {
  return objPath
    .map((item) => item.replace(/^\[/, "").replace(/\]$/, ""))
    .flatMap((item) =>
      item
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .split(/[^A-Za-z0-9]+/)
        .filter(Boolean)
    );
}

function formatCamelCase(words, upperFirst) {
  return words
    .map((word, index) => {
      const lowerWord = word.toLowerCase();
      if (index === 0 && !upperFirst) {
        return lowerWord;
      }
      return capitalizeFirstLetter(lowerWord);
    })
    .join("");
}

function copyPathWithFormatter(formatter) {
  const objPaths = getPathsFromSelection();
  if (objPaths !== undefined && objPaths.length > 0) {
    copyText(objPaths.map(formatter).join("\n"));
  }
}

function copyPathWithValueFormatter(formatter) {
  const entries = getPathEntriesFromSelection();
  if (entries !== undefined && entries.length > 0) {
    copyText(
      entries
        .map((entry) => `${formatter(entry.path)}: ${formatPathValue(entry.value)}`)
        .join("\n")
    );
  }
}

function copyPathJsonPath() {
  copyPathWithFormatter((objPath) => objPath.join("."));
}

function copyPathLowerCase() {
  copyPathWithFormatter((objPath) => getPathWords(objPath).join("").toLowerCase());
}

function copyPathUpperCase() {
  copyPathWithFormatter((objPath) => getPathWords(objPath).join("").toUpperCase());
}

function copyPathLowerKebabCase() {
  copyPathWithFormatter((objPath) => getPathWords(objPath).join("-").toLowerCase());
}

function copyPathUpperKebabCase() {
  copyPathWithFormatter((objPath) => getPathWords(objPath).join("-").toUpperCase());
}

function copyPathLowerCamelCase() {
  copyPathWithFormatter((objPath) => formatCamelCase(getPathWords(objPath), false));
}

function copyPathUpperCamelCase() {
  copyPathWithFormatter((objPath) => formatCamelCase(getPathWords(objPath), true));
}

function copyPathLowerSnakeCase() {
  copyPathWithFormatter((objPath) => getPathWords(objPath).join("_").toLowerCase());
}

function copyPathUpperSnakeCase() {
  copyPathWithFormatter((objPath) => getPathWords(objPath).join("_").toUpperCase());
}

function copyPathJsonPathWithValue() {
  copyPathWithValueFormatter((objPath) => objPath.join("."));
}

function copyPathLowerCaseWithValue() {
  copyPathWithValueFormatter((objPath) =>
    getPathWords(objPath).join("").toLowerCase()
  );
}

function copyPathUpperCaseWithValue() {
  copyPathWithValueFormatter((objPath) =>
    getPathWords(objPath).join("").toUpperCase()
  );
}

function copyPathLowerKebabCaseWithValue() {
  copyPathWithValueFormatter((objPath) =>
    getPathWords(objPath).join("-").toLowerCase()
  );
}

function copyPathUpperKebabCaseWithValue() {
  copyPathWithValueFormatter((objPath) =>
    getPathWords(objPath).join("-").toUpperCase()
  );
}

function copyPathLowerCamelCaseWithValue() {
  copyPathWithValueFormatter((objPath) =>
    formatCamelCase(getPathWords(objPath), false)
  );
}

function copyPathUpperCamelCaseWithValue() {
  copyPathWithValueFormatter((objPath) =>
    formatCamelCase(getPathWords(objPath), true)
  );
}

function copyPathLowerSnakeCaseWithValue() {
  copyPathWithValueFormatter((objPath) =>
    getPathWords(objPath).join("_").toLowerCase()
  );
}

function copyPathUpperSnakeCaseWithValue() {
  copyPathWithValueFormatter((objPath) =>
    getPathWords(objPath).join("_").toUpperCase()
  );
}

module.exports = {
  convertToLowerSnakeCase,
  convertToUpperSnakeCase,
  convertToLowerKebabCase,
  convertToUpperKebabCase,
  convertToLowerCamelCase,
  convertToUpperCamelCase,
  asyncFn(fn) {
    return new Promise((resolve) => {
      fn.then((result) => resolve([null, result])).catch((error) =>
        resolve([error || true, null])
      );
    });
  },
  copyPathJsonPath,
  copyPathLowerCase,
  copyPathUpperCase,
  copyPathLowerKebabCase,
  copyPathUpperKebabCase,
  copyPathLowerCamelCase,
  copyPathUpperCamelCase,
  copyPathLowerSnakeCase,
  copyPathUpperSnakeCase,
  copyPathJsonPathWithValue,
  copyPathLowerCaseWithValue,
  copyPathUpperCaseWithValue,
  copyPathLowerKebabCaseWithValue,
  copyPathUpperKebabCaseWithValue,
  copyPathLowerCamelCaseWithValue,
  copyPathUpperCamelCaseWithValue,
  copyPathLowerSnakeCaseWithValue,
  copyPathUpperSnakeCaseWithValue,
};
