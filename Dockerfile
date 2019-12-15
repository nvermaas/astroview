# production environment
FROM nginx:latest
COPY build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# build the image
# sudo docker build -t astroview:latest .

# run the container
# sudo docker run --name astroview -p 8017:80 --restart always astroview:latest &