FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json lerna.json ./
COPY projects/shared-workers ./projects/shared-workers
COPY projects/front ./projects/front

RUN npm install --loglevel notice --unsafe-perm
RUN npm run --prefix projects/front build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "run", "--prefix", "projects/front", "start"]