#!/bin/bash
set -e

if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

DB_CONTAINER="inventario-db"
DB_NAME="${DB_NAME:-inventario_db}"
DB_USER="${DB_USER:-inventario_user}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups"
BACKUP_FILE="${BACKUP_DIR}/WongIndustries_Respaldo_${TIMESTAMP}.sql"

mkdir -p "${BACKUP_DIR}"

if [ ! "$(docker ps -q -f name=${DB_CONTAINER})" ]; then
    echo "ERROR: El contenedor ${DB_CONTAINER} no esta en ejecucion."
    exit 1
fi

docker exec -t "${DB_CONTAINER}" pg_dump -U "${DB_USER}" -d "${DB_NAME}" --clean --if-exists > "${BACKUP_FILE}"

if [ -s "${BACKUP_FILE}" ]; then
    echo "Respaldo completado: ${BACKUP_FILE}"
else
    echo "ERROR: El archivo de respaldo se genero vacio."
    rm -f "${BACKUP_FILE}"
    exit 1
fi
