# Use an official Node.js runtime as a parent image
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use a smaller Nginx image for the final stage
FROM nginx:alpine AS final

# Ensure the default Nginx configuration is removed to avoid conflicts
RUN rm /etc/nginx/conf.d/default.conf

# Copy the built React application to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY /default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Tag the built image
LABEL version="dev"
LABEL name="my-react-app"