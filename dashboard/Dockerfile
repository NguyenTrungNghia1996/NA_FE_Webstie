FROM node:18-alpine as nodebuilder

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

FROM node:18-alpine as bin
COPY --from=nodebuilder /app/.output ./.output
CMD ["node", ".output/server/index.mjs"]
