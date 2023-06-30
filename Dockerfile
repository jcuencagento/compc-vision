# Use the official Node.js 18.16.0 Alpine image as the base image
FROM node:18.16.0-alpine AS base

# Install Next.js globally
RUN yarn global add next

# Set the working directory to /app
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Copy the entire project to the working directory
COPY . .

# Build the Next.js project
RUN npm run build

# Stage 2: Create a lightweight production image
FROM node:18.16.0-alpine AS production

# Set the working directory to /app
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Copy the built files from the previous stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/server.js ./
COPY --from=base /app/pages ./pages
COPY --from=base /app/components ./components
COPY --from=base /app/api ./api
COPY --from=base /app/styles ./styles
COPY --from=base /app/public ./public

# Expose the desired port
EXPOSE 3003

# Set the command to start the Next.js application
CMD ["node", "server.js"]