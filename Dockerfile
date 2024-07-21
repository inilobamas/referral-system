# Stage 1: Build the application
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env ./

# Install only production dependencies
RUN npm install --only=production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]