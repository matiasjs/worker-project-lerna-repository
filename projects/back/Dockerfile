FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json lerna.json ./
COPY projects/shared-workers ./projects/shared-workers
COPY projects/back ./projects/back

RUN npm install --loglevel notice --unsafe-perm
RUN npm run --prefix projects/back/ build

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000
CMD ["npm", "run", "--prefix", "projects/back", "start:prod"]