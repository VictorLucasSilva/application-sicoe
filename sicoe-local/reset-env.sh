#!/bin/bash

unset DB_HOST
unset DB_PORT
unset DB_USERNAME
unset DB_PASSWORD
unset DB_DATABASE
unset DB_SYNCHRONIZE
unset DB_LOGGING
unset DB_SSL
unset DB_SSL_REJECT_UNAUTHORIZED
unset AZURE_STORAGE_CONNECTION_STRING
unset AZURE_STORAGE_MEDIA_CONTAINER
unset AZURE_STORAGE_GENERIC_CONTAINER

cd /home/victor/app-sicoe/sicoe-local

docker compose down

docker compose up -d

docker logs sicoe-backend -f
