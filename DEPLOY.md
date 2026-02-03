# 一简科创官网 - 部署指南

## 📋 部署前准备

1. **GitHub 账号**
   - 访问 https://github.com 注册账号（如果没有）

2. **推送代码到 GitHub**
   ```bash
   # 创建新的 GitHub 仓库
   # 仓库名建议: yijian-website

   # 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
   git remote add origin https://github.com/YOUR_USERNAME/yijian-website.git

   # 推送代码
   git branch -M main
   git push -u origin main
   ```

---

## 🚀 部署步骤

### 第一步：部署前端到 Vercel

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New" → "Project"
   - 选择刚才推送的 GitHub 仓库
   - 点击 "Import"

3. **配置环境变量**
   - 在 "Environment Variables" 部分添加：
     - Name: `VITE_API_BASE_URL`
     - Value: `<后端Render地址>` (部署后端后填入，例如: https://yijian-backend.onrender.com)
   - 点击 "Add"

4. **部署**
   - 点击 "Deploy" 按钮
   - 等待约 1-2 分钟
   - 部署成功后会获得域名，例如: `yijian-website.vercel.app`

5. **访问网站**
   - 点击 "Visit" 按钮查看部署的网站
   - Vercel 自动提供 HTTPS 证书

---

### 第二步：部署后端到 Render

#### 准备后端代码

由于 Render 不支持 SQLite，需要将后端和前端分离：

1. **创建后端专用仓库** (可选，也可以在同一个仓库)
2. **修改后端配置** 使用 Render 的 PostgreSQL 数据库

#### 快速部署（使用 SQLite 文件存储）

如果暂时不需要持久化数据库，可以暂时使用 SQLite：

1. **访问 Render**
   - 打开 https://render.com
   - 使用 GitHub 账号登录

2. **创建 Web Service**
   - 点击 "New" → "Web Service"
   - 选择 GitHub 仓库
   - 配置如下：
     - **Name**: `yijian-backend`
     - **Runtime**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `python3 server/main.py`

3. **环境变量**
   - `PORT`: `3000` (Render 自动设置)
   - 不需要其他配置

4. **部署**
   - 点击 "Create Web Service"
   - 等待约 2-3 分钟
   - 获得域名，例如: `yijian-backend.onrender.com`

5. **更新前端环境变量**
   - 回到 Vercel 项目设置
   - 更新 `VITE_API_BASE_URL` 为 Render 后端地址
   - 重新部署前端

---

## 🔧 高级配置

### 配置自定义域名

#### Vercel
1. 在项目设置中点击 "Domains"
2. 添加你的域名（如 `www.yijiankechuang.com`）
3. 按照提示配置 DNS 记录

#### Render
1. 在服务设置中点击 "Custom Domains"
2. 添加域名并配置 DNS

---

## 📝 常见问题

### Q: 为什么数据库会丢失？
A: Render 的免费版文件存储是临时的，重启后 SQLite 文件会被清空。生产环境建议使用 PostgreSQL。

### Q: 如何获取后端 API 域名？
A: Render 部署成功后，会在 Dashboard 显示域名，例如 `https://yijian-backend.onrender.com`

### Q: 如何查看后端日志？
A: 在 Render Dashboard 中点击你的服务，然后点击 "Logs" 标签

### Q: 前端如何连接后端？
A: 确保 Vercel 的环境变量 `VITE_API_BASE_URL` 设置为 Render 后端的完整 URL（包括 https://）

---

## 🔗 部署后的链接示例

部署成功后，你会获得类似这样的链接：

| 服务 | 域名示例 |
|------|---------|
| 前端 (Vercel) | https://yijian-website.vercel.app |
| 后端 (Render) | https://yijian-backend.onrender.com |
| API 文档 | https://yijian-backend.onrender.com/docs |
| 咨询接口 | https://yijian-backend.onrender.com/api/contact |

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看平台文档: https://vercel.com/docs / https://render.com/docs
2. 检查部署日志
3. 联系我协助调试
