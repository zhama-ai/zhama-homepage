# Static website image. Built by deploy/website/build-images.sh from a verified
# dist/ and the routes generated for it; not built from the repository root.
FROM nginx:1.28-alpine

RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

COPY site.conf /etc/nginx/conf.d/default.conf
COPY site-routes.conf /etc/nginx/site-routes.conf
COPY dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --start-interval=2s --retries=3 \
  CMD wget -q -T 4 -O /dev/null http://127.0.0.1/healthz || exit 1
