
# Parâmetros de Deploy
# ----------------------------

PROJECT_NAME="JardimGIS"
SERVICE_NAME="JardimGIS.service"

ROOT_FRONTEND=/var/www/automacao.tce.go.gov.br/$PROJECT_NAME

ROOT_SOFTWARES=/var/softwaresTCE
ROOT_BACKEND=$ROOT_SOFTWARES"/"$PROJECT_NAME

GIT_REPO_NAME="JardimGIS"
GIT_REPO_OWNER="TCE-Manutencao-Predial"
GIT_REPO_LINK="https://github.com/$GIT_REPO_OWNER/$GIT_REPO_NAME.git"

HTACCESS_FILE="scripts/htaccess"

# Configurações
AUTO_HABILITAR_SERVICO=true

LOGS_PATH=/var/softwaresTCE/logs/JardimGIS
