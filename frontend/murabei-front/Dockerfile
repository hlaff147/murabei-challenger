# Dockerfile.react

# Pull official base image
FROM node:16.16

# Set working directory
WORKDIR /murabei-front

# Add `/murabei-front/node_modules/.bin` to $PATH
ENV PATH /murabei-front/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent
RUN yarn global add react-scripts@4.0.3 --silent

# Add app
COPY . ./

# Start app
CMD ["yarn", "start"]
