FROM nginx

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

VOLUME /etc/letsencrypt/live/

VOLUME /etc/nginx/conf.d/

# Copy SSL certificates
COPY fullchain.pem /etc/letsencrypt/live/financetrt.com/
COPY privkey.pem /etc/letsencrypt/live/financetrt.com/

COPY wwwfullchain.pem /etc/letsencrypt/live/www.financetrt.com/fullchain.pem
COPY wwwprivkey.pem /etc/letsencrypt/live/www.financetrt.com/privkey.pem

COPY apifullchain.pem /etc/letsencrypt/live/api.financetrt.com/fullchain.pem
COPY apiprivkey.pem /etc/letsencrypt/live/api.financetrt.com/privkey.pem

# Copy your custom Nginx configuration file
COPY api.conf /etc/nginx/conf.d/

# Expose ports#
EXPOSE 80
EXPOSE 443

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]

