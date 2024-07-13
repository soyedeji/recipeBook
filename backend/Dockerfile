# Use the official PHP image as a base image
FROM php:8.3.7-apache

# Install necessary PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Copy the application code into the container
COPY public/ /var/www/html/

# Set working directory
WORKDIR /var/www/html/
