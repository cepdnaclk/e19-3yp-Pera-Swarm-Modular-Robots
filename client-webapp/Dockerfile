# Development
FROM node:18 as development
WORKDIR /app
COPY ./package*.json .
RUN npm install 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# Production - Build the React App
FROM development as build
RUN npm run build

# Production - Serve the App using Nginx
FROM nginx:1.21 as serve
COPY --from=build /app/build /usr/share/nginx/html
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
