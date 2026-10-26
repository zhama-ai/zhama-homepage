FROM node:22-alpine
WORKDIR /cache
RUN mkdir /data && chown node:node /data
COPY src/lib/download.ts src/lib/release-builds.ts src/lib/release-cache.ts ./src/lib/
COPY scripts/release-cache-server.mjs ./scripts/
RUN printf '{"type":"module"}\n' > package.json
USER node
ENV NODE_ENV=production PORT=3000 RELEASE_CACHE_FILE=/data/latest.json
EXPOSE 3000
CMD ["node", "--experimental-strip-types", "scripts/release-cache-server.mjs"]
