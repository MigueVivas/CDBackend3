FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]

# Escribir en terminal: docker -v (Para ver si el programa corre y que version tenemos)
# Y luego: docker build -t coder-backend3 .

# ***Para correr el servidor en docker desde linea de comandos colocá en la terminal: docker run -p 8080:8080 coder-backend3

# 