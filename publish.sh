#!/bin/bash
set -euo pipefail

PUBLISHER=$(node -p "require('./package.json').publisher")
EXT_NAME=$(node -p "require('./package.json').name")
# patch / minor / major
VERSION_TYPE="patch"

echo "=== 🚀 VSCode 插件自动发布流程启动 ==="
echo "📦 发布者：$PUBLISHER"
echo "🔌 插件名：$EXT_NAME"
echo "🏷️  版本升级：$VERSION_TYPE"
echo ""

# 检查 vsce 是否安装
if ! command -v vsce &> /dev/null; then
    echo "❌ 错误：未安装 vsce，请先执行：npm install -g @vscode/vsce"
    exit 1
fi

# 检查 package.json 存在
if [ ! -f "package.json" ]; then
    echo "❌ 错误：当前目录不是插件根目录，未找到 package.json"
    exit 1
fi

# 保存升级前的原始版本号（用于失败后回滚）
ORIGINAL_VERSION=$(node -p "require('./package.json').version")
echo "✅ 当前版本：$ORIGINAL_VERSION"

rollback_version() {
    if [ $? -ne 0 ]; then
        echo ""
        echo "⚠️  发布流程出错，自动恢复 package.json 版本号..."
        # 直接写回原始版本
        node -p "
            const pkg = require('./package.json');
            pkg.version = '$ORIGINAL_VERSION';
            require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n');
            console.log('✅ 版本已回滚至：$ORIGINAL_VERSION');
        "
    fi
}
# 捕获错误信号，执行回滚
trap rollback_version EXIT

echo "✅ 清理旧文件..."
rm -rf out dist *.vsix 2>/dev/null

echo "✅ 自动升级版本..."
npm version "$VERSION_TYPE" --no-git-tag-version
UPDATED_VERSION=$(node -p "require('./package.json').version")
echo "✅ 版本已升级至：$UPDATED_VERSION"

echo "✅ 打包 VSIX..."
vsce package

echo "✅ 发布到 VSCode 市场..."
vsce publish

echo "✅ 提交到 GitHub..."
git add package.json && git commit -m "chore: release $(node -p "require('./package.json').version")" && git push

echo ""
echo "🎉 发布成功！插件已自动上线 VS Code 扩展市场"
echo "=== 发布流程全部完成 ==="
exit 0