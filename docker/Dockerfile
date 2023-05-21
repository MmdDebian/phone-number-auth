FROM node:18.14-alpine3.17 as base
RUN apk --no-cache add curl
# RUN apt-get update && apt-get install curl -y

FROM node:18.14-alpine3.17 as build
WORKDIR /app
COPY tsconfig*.json ./
COPY package*.json ./
RUN npm ci
COPY src/ src/
RUN npm run build
 
FROM base as production
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
RUN npm prune --omit=dev
EXPOSE 3000
CMD ["node",  "dist/main"]
