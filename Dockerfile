# ---- Base image ----
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose your app port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
