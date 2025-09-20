# 使用官方Node.js运行时作为基础镜像 (使用debian版本而不是alpine来解决better-sqlite3兼容性问题)
FROM node:22-slim

# 设置工作目录
WORKDIR /app

# 安装必要的系统依赖 (better-sqlite3需要)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 创建非root用户
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 --gid nodejs nextjs

# 复制构建产物（从CI构建）
COPY .next/standalone/ ./
COPY .next/static ./.next/static
COPY public ./public

# 重新构建原生模块以确保与当前环境兼容
RUN npm rebuild

# 设置文件所有者为nextjs用户
RUN chown -R nextjs:nodejs /app
USER nextjs

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 启动应用
CMD ["node", "server.js"]