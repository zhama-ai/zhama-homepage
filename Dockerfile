FROM crpi-zcgiub6jx8rljw6m.cn-hangzhou.personal.cr.aliyuncs.com/zhama-ai/nginx:1.25.0
WORKDIR /app
COPY dist /app
COPY ./docker/run.sh /app/run.sh
COPY ./docker/nginx.conf.template /app/nginx.conf.template
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["/app/run.sh"]
