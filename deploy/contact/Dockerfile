FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY server/contact ./server/contact
COPY shared ./shared
RUN mkdir /app/.contact-data && chown -R node:node /app/.contact-data
USER node
ENV NODE_ENV=production CONTACT_HOST=0.0.0.0 CONTACT_PORT=4351
EXPOSE 4351
HEALTHCHECK --interval=30s --timeout=5s CMD node -e "fetch('http://127.0.0.1:4351/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server/contact/start.mjs"]
