FROM node:20.16.0-alpine AS builder

ENV REACT_APP_COMPANY_ID=1
ENV REACT_APP_API_URL="http://localhost:3005/api/"
ENV REACT_APP_COMPANY_NAME="Ediciones Técnicas"
ENV REACT_APP_COMPANY_POWERED="powered by ITMS Analitics"
ENV REACT_APP_SOURCE_STOCK=4
ENV REACT_APP_SOURCE_BRECHA=1
ENV REACT_APP_SOURCE_DEMAND=2
ENV REACT_APP_SOURCE_STANDARD=3
ENV NODE_ENV=development
ENV PORT=80

# Install Nginx and envsubst
RUN apk add --no-cache nginx gettext

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm install -g npm@10.8.2
RUN npm install react-scripts -g --silent
RUN npm install --force

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN npm run build

# Expose the port that Nginx will listen on
#EXPOSE 3000

# production environment
FROM nginx:stable-alpine
COPY --from=builder /opt/web/build /usr/share/nginx/html
# new
COPY ./nginx.config /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]