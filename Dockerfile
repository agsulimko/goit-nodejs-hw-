# FROM node

# WORKDIR /app

# COPY . .

# RUN npm install

# EXPOSE 3000

# CMD [ "node", "app" ]

FROM node:16.20.2

WORKDIR /app

COPY . .

# Установка необходимых инструментов для компиляции
RUN apt-get update && apt-get install -y build-essential python

# Установка зависимостей
RUN npm install
# Перекомпиляция bcrypt
RUN npm rebuild bcrypt --build-from-source


EXPOSE 3000

CMD [ "node", "server" ]
