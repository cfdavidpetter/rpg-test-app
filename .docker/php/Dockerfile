FROM php:8.2.11-fpm-alpine
RUN apk add --no-cache openssl bash mysql-client nodejs npm alpine-sdk autoconf vim nginx openrc libzip-dev
RUN docker-php-ext-install pdo pdo_mysql zip bcmath

WORKDIR /var/www

RUN rm -rf /var/www/html
RUN ln -s public_html html

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

EXPOSE 9000
ENTRYPOINT ["php-fpm"]