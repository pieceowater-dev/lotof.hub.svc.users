# Stage 1: Build Stage
FROM node:20-slim as build

# Install git (required by npm install)
RUN apt-get update

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install all dependencies for building (including dev dependencies)
RUN npm install

# Copy all files into the container (including .ts files)
COPY . .

# Build the TypeScript files
RUN npm run build

# Stage 2: Production Stage
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN apt-get update && npm install --omit=dev

# Set NODE_ENV to production for better performance
ENV NODE_ENV=production

ARG BUILD_MODE
ENV MODE=$BUILD_MODE

ENV PORT=3000
# Expose port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]