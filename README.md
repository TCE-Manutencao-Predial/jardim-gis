# 🌳 JardimGIS

**Sistema de Controle Geográfico de Árvores e Jardins**  
*Tribunal de Contas do Estado de Goiás*

---

## 📋 Sobre o Projeto

O **JardimGIS** é um sistema web desenvolvido para gestão e mapeamento de árvores, mudas, jardins e placas de identificação. O sistema permite o controle detalhado de espécies vegetais incluindo dados botânicos, localização geográfica (GPS), estado de conservação e histórico de plantio.

### 🎯 Principais Funcionalidades

- 🌲 **Cadastro completo de árvores** com dados botânicos
- 📍 **Geolocalização por GPS** (coordenadas latitude/longitude)
- 🏷️ **Controle de placas de identificação** e seu estado de conservação
- 📊 **Estado de conservação** das árvores (Excelente, Bom, Regular, Ruim, Crítico)
- 📅 **Histórico de plantio** com data e responsável
- 🌸 **Informações fenológicas** (época de floração e frutificação)
- 💾 **Sistema de backup automático** circular com 15 níveis
- 📤 **Exportação para Excel** dos dados cadastrados

---

## 🗂️ Estrutura de Dados

Cada árvore cadastrada possui os seguintes campos:

| Campo | Descrição |
|-------|-----------|
| **ID** | Código único de identificação |
| **Nome Popular** | Nome comum da espécie |
| **Nome Científico** | Nome botânico (nomenclatura binomial) |
| **Localização Textual** | Descrição do local onde está plantada |
| **Coordenadas GPS** | Latitude e longitude (formato: -16.6869, -49.2648) |
| **Data de Plantio** | Quando foi plantada (opcional) |
| **Plantado Por** | Nome do responsável pelo plantio (opcional) |
| **Nomes Populares Adicionais** | Outros nomes conhecidos da espécie |
| **Época de Floração** | Período do ano em que floresce |
| **Época de Frutificação** | Período do ano em que frutifica |
| **Características** | Descrição detalhada da espécie |
| **Estado de Conservação da Árvore** | Excelente / Bom / Regular / Ruim / Crítico |
| **Estado de Conservação da Placa** | Excelente / Bom / Regular / Ruim / Sem Placa |
| **Observações** | Anotações gerais |
| **Responsável** | Usuário que fez a última edição (automático) |
| **Data da Última Atualização** | Timestamp da última modificação (automático) |

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Python 3.x**
- **Flask 3.0.3** - Framework web
- **Waitress 3.0.0** - Servidor WSGI para produção
- **Schedule** - Agendamento de backups automáticos
- **FileHash** - Controle de concorrência em arquivos

### Frontend
- **HTML5 / CSS3**
- **JavaScript (ES6+)**
- **Font Awesome** - Ícones
- **SheetJS (xlsx)** - Exportação Excel

### Armazenamento
- **JSON** - Banco de dados de arquivos
- Sistema de backup circular automático

---

## 📦 Instalação e Configuração

### Pré-requisitos
- Python 3.8 ou superior
- Make (opcional, para usar comandos do Makefile)

### 1. Clone o repositório
```bash
git clone https://github.com/TCE-Manutencao-Predial/JardimGIS.git
cd JardimGIS
```

### 2. Configure o ambiente
```bash
make setup
```

### 3. Execute localmente
```bash
make run
```

O sistema estará disponível em: `http://127.0.0.1:4141`

---

## 🐧 Deploy em Produção (Linux)

### Deploy Automático
```bash
make deploy
```

### Deploy Manual
```bash
# 1. Configurar ambiente
cd /var/softwaresTCE/JardimGIS
make setup

# 2. Copiar arquivo de serviço
sudo cp scripts/jardimgis.service /usr/lib/systemd/system/

# 3. Habilitar e iniciar o serviço
sudo systemctl daemon-reload
sudo systemctl enable jardimgis.service
sudo systemctl start jardimgis.service

# 4. Verificar status
sudo systemctl status jardimgis.service
```

### Gerenciamento do Serviço
```bash
# Status
make service-status

# Reiniciar
make service-restart

# Ver logs
make log
```

---

## 📁 Estrutura do Projeto

```
JardimGIS/
├── app/
│   ├── __init__.py              # Inicialização da aplicação Flask
│   ├── config.py                # Configurações do sistema
│   ├── dados/
│   │   ├── arvores.json         # Dados das árvores
│   │   └── bak/                 # Backups automáticos
│   ├── routes/
│   │   ├── web/                 # Rotas principais
│   │   └── features/
│   │       └── arvores/         # Rotas específicas de árvores
│   ├── static/
│   │   ├── css/                 # Estilos
│   │   └── js/                  # Scripts JavaScript
│   ├── templates/               # Templates HTML
│   └── utils/
│       ├── data/                # Gerenciamento de dados JSON
│       ├── managers/            # Gerenciadores de backup
│       └── schedulers/          # Agendador de tarefas
├── scripts/
│   ├── jardimgis.service        # Arquivo systemd
│   ├── deploy.sh                # Script de deploy
│   ├── run.sh                   # Script de execução
│   └── config.sh                # Configurações de deploy
├── jardimgis.py                 # Ponto de entrada da aplicação
├── makefile                     # Comandos make
├── requirements.txt             # Dependências Python
└── pyproject.toml               # Configuração do projeto

```

---

## 🔧 Configuração

### Arquivo de Configuração Principal
`app/config.py`

```python
# Diretórios
DATA_DIR = '/var/softwaresTCE/dados/jardimgis'  # Produção
LOG_DIR = '/var/softwaresTCE/logs/jardimgis'    # Produção

# Arquivos
ARVORES_JSON_PATH = os.path.join(DATA_DIR, 'arvores.json')
BACKUP_DIR = os.path.join(DATA_DIR, 'bak')

# Prefixo de rotas (para Apache)
ROUTES_PREFIX = '/jardimgis'
```

### Backups Automáticos
- **Frequência**: Diariamente às 20h
- **Níveis**: 15 backups circulares
- **Localização**: `DATA_DIR/bak/`
- **Formato**: `arvores.json.bak1` até `.bak15`

---

## 🌐 Rotas da Aplicação

| Rota | Descrição |
|------|-----------|
| `/jardimgis` | Página principal - Gestão de árvores |
| `/jardimgis/admin/backups` | Gerenciamento de backups |

---

## 👥 Controle de Acesso

O sistema utiliza autenticação Apache com `X-Remote-User` header.  
Em desenvolvimento, o usuário padrão é `admin`.

---

## 📊 Exportação de Dados

O sistema permite exportar todos os dados para Excel (.xlsx) com formatação profissional incluindo:
- Cabeçalhos formatados
- Colunas com largura ajustada
- Filtros automáticos
- Informações de auditoria

---

## 🔒 Segurança

- ✅ Validação de tipos de arquivo no upload
- ✅ Limite de tamanho de arquivo (100MB)
- ✅ Autenticação via Apache
- ✅ Backup antes de cada alteração
- ⚠️ **IMPORTANTE**: Altere a `SECRET_KEY` em produção!

---

## 🐛 Logs

### Localização dos Logs
- **Produção**: `/var/softwaresTCE/logs/jardimgis/jardimgis.log`
- **Desenvolvimento**: `app/logs/jardimgis.log`

### Ver Logs do Serviço
```bash
# Logs em tempo real
sudo journalctl -u jardimgis -f

# Últimas 100 linhas
sudo journalctl -u jardimgis -n 100
```

---

## 🤝 Contribuição

Este é um projeto interno do TCE-GO desenvolvido pela equipe de Infraestrutura Predial.

---

## 👨‍💻 Autor

**Eng. Pedro Henrique**  
Serviço de Infraestrutura Predial  
Tribunal de Contas do Estado de Goiás

---

## 📄 Licença

© 2025 - Tribunal de Contas do Estado de Goiás  
Todos os direitos reservados.

---

## 📞 Suporte

Para suporte ou dúvidas sobre o sistema, entre em contato com a equipe de Infraestrutura Predial do TCE-GO.
