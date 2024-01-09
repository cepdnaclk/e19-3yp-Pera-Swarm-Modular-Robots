FROM node:18 as development
WORKDIR /app
# Point docker to correct executables
ENV PATH="/app/node_modules/.bin:$PATH"
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npm", "run", "dev"]

FROM development as build
CMD ["npm", "run", "prod"]