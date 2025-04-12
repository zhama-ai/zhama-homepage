FROM crpi-zcgiub6jx8rljw6m.cn-hangzhou.personal.cr.aliyuncs.com/zhama-ai/nginx:1.25.0

COPY --chown=nginx:nginx ./dist /app/
COPY --chown=nginx:nginx ./docker/run.sh /app/run.sh
COPY --chown=nginx:nginx ./docker/nginx.conf.template /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx ./docker/nginx.conf /etc/nginx/nginx.conf

RUN chown -R nginx:nginx /etc/nginx 

RUN chmod +x /app/run.sh
EXPOSE 80

USER nginx

CMD ["nginx", "-g", "daemon off;"]
