# FROM node

# WORKDIR /app

# COPY . .

# RUN npm install

# EXPOSE 3000

# CMD [ "node", "app" ]

FROM node:16.20.2
# создаем папку где будет наш проект
WORKDIR /app

# скопировать с корневого в коневой
COPY . .

# Установка необходимых инструментов для компиляции
RUN apt-get update && apt-get install -y build-essential python

# Установка зависимостей
RUN npm install
# Перекомпиляция bcrypt
RUN npm rebuild bcrypt --build-from-source

# номер порта где запускаем
EXPOSE 3000

# команда запуска
CMD [ "node", "server" ]

