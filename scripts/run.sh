#!/bin/bash

# JardimGIS v2.0.0 - Executa via Python da venv

source ./scripts/config.sh

cd $ROOT_BACKEND

# Ativa venv se existir, senão usa python3 do sistema
if [ -d ".venv" ]; then
    echo "[Run] Usando Python da venv"
    .venv/bin/python3 jardim_gis.py
else
    echo "[Run] AVISO: venv não encontrada, usando python3 do sistema"
    python3 jardim_gis.py
fi
