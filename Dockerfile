# Use an official Node.js image as the base
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use an official Nginx image to serve the app
FROM nginx:alpine

# Copy the built React app to the Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
#COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# build the image
# sudo docker build -t astroview:latest .

# run the container
# sudo docker run --name astroview -p 8017:80 --restart always astroview:latest &