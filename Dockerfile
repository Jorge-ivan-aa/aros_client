# Serve the application with Nginx
FROM nginx:stable-alpine
COPY dist/aros_client/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
