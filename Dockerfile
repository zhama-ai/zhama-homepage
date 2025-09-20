# 使用官方Node.js运行时作为基础镜像
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 创建非root用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# 复制构建产物（从CI构建）
COPY .next/standalone/ ./
COPY .next/static ./.next/static
COPY public ./public
COPY node_modules ./node_modules

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