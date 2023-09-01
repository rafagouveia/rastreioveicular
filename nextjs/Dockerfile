FROM node:20-slim
RUN apt-get update && apt-get install -y procps  && corepack enable
WORKDIR /home/node/app

USER node

CMD [ "tail", "-f", "/dev/null" ]