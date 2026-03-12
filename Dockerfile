# ================================
# Stage 1: Build React Frontend
# ================================
FROM node:20 AS frontend-build
WORKDIR /app
COPY frontend/ .
RUN npm install
RUN npm run build

# ================================
# Stage 2: Setup PHP + Nginx
# ================================
FROM php:8.2-fpm

# Install Nginx and required PHP extensions
RUN apt-get update && apt-get install -y \
    nginx \
    && docker-php-ext-install pdo pdo_mysql mysqli \
    && rm -rf /var/lib/apt/lists/*

# Copy React build output
COPY --from=frontend-build /app/dist /var/www/html

# Copy PHP backend
COPY backend/ /var/www/html/api/

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Permissions
RUN chown -R www-data:www-data /var/www/html

# Expose HTTP port
EXPOSE 80

# Start PHP-FPM + Nginx
CMD php-fpm -D && nginx -g "daemon off;"