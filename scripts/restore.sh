#!/bin/bash
set -e

if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

DB_CONTAINER="inventario-db"
DB_NAME="${DB_NAME:-inventario_db}"
DB_USER="${DB_USER:-inventario_user}"
BACKUP_FILE="$1"

if [ -z "${BACKUP_FILE}" ]; then
    echo "Uso: ./scripts/restore.sh <archivo_respaldo.sql>"
    exit 1
fi

if [ ! -f "${BACKUP_FILE}" ]; then
    echo "ERROR: El archivo '${BACKUP_FILE}' no existe."
    exit 1
fi

if [ ! "$(docker ps -q -f name=${DB_CONTAINER})" ]; then
    echo "ERROR: El contenedor ${DB_CONTAINER} no esta en ejecucion."
    exit 1
fi

docker exec -i "${DB_CONTAINER}" psql -U "${DB_USER}" -d "${DB_NAME}" < "${BACKUP_FILE}"

echo "Restauracion completada exitosamente."
