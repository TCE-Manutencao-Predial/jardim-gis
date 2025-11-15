#!/bin/bash

# JardimGIS v2.0.0 - Executa via Python (não mais waitress-serve direto)

source ./scripts/config.sh

cd $ROOT_BACKEND

# Executa jardim_gis.py que carrega .env.deploy e inicia Waitress
python3 jardim_gis.py
