FROM crpi-zcgiub6jx8rljw6m.cn-hangzhou.personal.cr.aliyuncs.com/zhama-ai/nginx:1.25.0

COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
