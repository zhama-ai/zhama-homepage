# 使用官方Node.js运行时作为基础镜像
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 创建非root用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# 复制构建产物（从CI构建）
COPY .next/standalone/ ./

# Debug: Check what files we have after copying standalone
RUN echo "=== Debug: Files after copying standalone ===" && \
    ls -la && \
    echo "=== Debug: .next directory structure ===" && \
    ls -la .next/ 2>/dev/null || echo "No .next directory yet"

COPY .next/static ./.next/static

# Debug: Check static files after copy
RUN echo "=== Debug: Files after copying static ===" && \
    ls -la .next/ && \
    echo "=== Debug: Static directory content ===" && \
    ls -la .next/static/ 2>/dev/null || echo "No static directory"

COPY public ./public

# Debug: Final file check
RUN echo "=== Debug: Final file structure ===" && \
    ls -la && \
    echo "=== Debug: Final .next structure ===" && \
    find .next/ -type d | head -10 2>/dev/null || echo "No .next structure found"

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