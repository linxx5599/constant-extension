# 介绍

这是一款 VScode 插件，它能转换你的变量名为各种命名规则的格式，试试看！

# 使用方法

打开VScode，在`拓展`搜索：constant-extension

在编辑器中选中字符，右键->Rename->选择想要转换的格式

# 命名方法

- 大驼峰：UperCamelCase ✅
- 小驼峰：lowerCamelCase ✅
- 大蛇形：SNAKE_CASE ✅
- 小蛇形：snake_case ✅
- 小脊柱：kebab-case ✅
- 大脊柱：KEBAB-CASE ✅
- 全小写： case ✅
- 全大写： CASE ✅


# TODO

- 添加自定义单词匹配

**Enjoy!**


# Logs
```bash
v0.0.1 废弃 ❌
v0.0.2 初始版本 

2024-11-16
v0.0.3 修复批量替换

2024-11-17
v0.0.4 修复批量替换后回退需要单个回退
v0.0.5 缓存相同文字批量替换，修复全小写、全大写功能

2025-04-07
v0.0.6 新增命名方法copyYamlToPath
v0.0.7 修复copyYamlToPath bug

2025-04-08
v0.0.8 修改copyYamlPath菜单单独显示 修复copyYamlPath 功能bug 去除多选单独打开弹窗选择
```
