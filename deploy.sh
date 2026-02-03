#!/bin/bash

# 一简科创官网 - 部署辅助脚本

echo "======================================"
echo "   一简科创官网 - 部署辅助工具"
echo "======================================"
echo ""

# 检查是否已配置远程仓库
if git remote get-url origin > /dev/null 2>&1; then
    echo "✓ 已配置远程仓库"
    echo "  远程地址: $(git remote get-url origin)"
    echo ""
    read -p "是否推送到远程仓库? (y/n): " confirm
    if [ "$confirm" = "y" ]; then
        git push origin main
    fi
else
    echo "✗ 未配置远程仓库"
    echo ""
    echo "请按照以下步骤操作："
    echo ""
    echo "1. 访问 https://github.com/new 创建新仓库"
    echo "   - 仓库名建议: yijian-website"
    echo "   - 设为 Public"
    echo ""
    echo "2. 复制仓库 URL (例如: https://github.com/你的用户名/yijian-website.git)"
    echo ""
    echo "3. 运行以下命令添加远程仓库并推送："
    echo ""
    read -p "请输入 GitHub 仓库 URL: " repo_url

    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        git branch -M main
        git push -u origin main
    fi
fi

echo ""
echo "======================================"
echo "   接下来的步骤："
echo "======================================"
echo ""
echo "1. 访问 https://vercel.com 使用 GitHub 登录"
echo "2. 点击 'Add New' → 'Project' 导入仓库"
echo "3. 添加环境变量: VITE_API_BASE_URL"
echo "4. 部署后，访问 https://vercel.com/docs 查看详情"
echo ""
echo "详细说明请查看: DEPLOY.md"
echo ""
