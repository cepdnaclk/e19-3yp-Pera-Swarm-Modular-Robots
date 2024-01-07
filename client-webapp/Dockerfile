# Development
FROM node:18 as development
WORKDIR /app
COPY ./package*.json .
RUN npm install -g pnpm
RUN pnpm install 
COPY . .
EXPOSE 3000
CMD ["pnpm", "start"]

# Production - Build the React App
FROM development as build
RUN pnpm run build

# Production - Serve the App using Nginx
FROM nginx:1.21 as serve
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
