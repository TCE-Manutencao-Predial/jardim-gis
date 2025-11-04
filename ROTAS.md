# Mapeamento de Rotas - JardimGIS

## 🗺️ Configuração de Rotas

### Prefixo Global
```python
ROUTES_PREFIX = '/jardimgis'
```

---

## 📍 Rotas Disponíveis

### 1. **Rota Raiz** (Redirecionamento)
```
GET /  →  Redireciona para /jardimgis
```
**Função**: `root_redirect()`  
**Localização**: `app/__init__.py`  
**Descrição**: Redireciona a raiz do site para a página principal do JardimGIS

---

### 2. **Página Principal - Gestão de Árvores**
```
GET  /jardimgis/  →  Exibe lista de árvores
POST /jardimgis/  →  Salva alterações nas árvores
```
**Blueprint**: `web_bp`  
**Função**: `index()`  
**Template**: `index.html`  
**Autenticação**: ✅ Requerida  
**Descrição**: Interface principal para cadastro e edição de árvores

---

### 3. **Administração - Gerenciamento de Backups**
```
GET /jardimgis/admin/backups
```
**Blueprint**: `admin_bp`  
**Função**: `gerenciar_backups()`  
**Autenticação**: ✅ Requerida  
**Descrição**: Página para visualizar e gerenciar backups do sistema

---

### 4. **Páginas de Erro**

#### Erro 401/403 - Acesso Negado
```
GET /jardimgis/erro_acesso_negado_401
GET /jardimgis/erro_acesso_negado_403
```
**Template**: `base/erro_acesso_negado.html`

#### Erro 404 - Página Não Encontrada
```
GET /jardimgis/erro_pagina_nao_encontrada_404
```
**Template**: `base/erro_pagina_nao_encontrada.html`

#### Erro 500 - Erro Interno
```
GET /jardimgis/erro_interno_servidor_500
```
**Template**: `base/erro_interno.html`

---

## 🎨 Templates Disponíveis

### Templates Principais
- `index.html` - Página principal de gestão de árvores
- `base/erro_acesso_negado.html` - Página de acesso negado
- `base/erro_interno.html` - Página de erro interno
- `base/erro_pagina_nao_encontrada.html` - Página não encontrada

---

## 📊 Fluxo de Navegação

```
┌─────────────┐
│      /      │
│   (Raiz)    │
└─────┬───────┘
      │ Redirect
      ▼
┌─────────────────┐
│   /jardimgis/   │
│  (Página Prin.) │◄──┐
└────────┬────────┘   │
         │            │
         ├─ GET  → Exibe lista de árvores
         │            │
         └─ POST → Salva alterações
                       │
                       └─ Redirect (sucesso)

┌──────────────────────────┐
│ /jardimgis/admin/backups │
│   (Admin - Backups)      │
└──────────────────────────┘
```

---

## 🔧 Configuração Apache (Exemplo)

Para usar com Apache e mod_wsgi:

```apache
<Location /jardimgis>
    ProxyPass http://127.0.0.1:4141/jardimgis
    ProxyPassReverse http://127.0.0.1:4141/jardimgis
    
    # Autenticação
    AuthType Basic
    AuthName "JardimGIS - TCE-GO"
    AuthUserFile /etc/httpd/.htpasswd
    Require valid-user
    
    # Header para usuário autenticado
    RewriteEngine On
    RewriteCond %{LA-U:REMOTE_USER} (.+)
    RewriteRule .* - [E=RU:%1]
    RequestHeader set X-Remote-User "%{RU}e"
</Location>
```

---

## ✅ Verificação de Funcionamento

### Teste Local
```bash
# Inicie o servidor
make run

# Teste as rotas
curl http://127.0.0.1:4141/              # → Redireciona para /jardimgis
curl http://127.0.0.1:4141/jardimgis/    # → Página principal
```

### Estrutura de URL Final

Com o prefixo `/jardimgis`:
- ✅ `/` → Redireciona para `/jardimgis`
- ✅ `/jardimgis/` → Página principal (GET/POST)
- ✅ `/jardimgis/admin/backups` → Gerenciamento de backups
- ✅ `/jardimgis/erro_acesso_negado_401` → Erro 401
- ✅ `/jardimgis/erro_interno_servidor_500` → Erro 500

---

## 🔐 Autenticação

O sistema usa o header `X-Remote-User` configurado pelo Apache:

```python
usuario_autenticado = request.headers.get("X-Remote-User")
if not usuario_autenticado:
    usuario_autenticado = "admin"  # Padrão em desenvolvimento
```

---

## 📝 Notas Importantes

1. **Prefixo de Rotas**: Todas as rotas do `web_bp` e `admin_bp` são prefixadas com `/jardimgis`
2. **Compatibilidade**: O sistema funciona tanto com quanto sem o prefixo (ajustável via `ROUTES_PREFIX`)
3. **Static Files**: Arquivos estáticos também são servidos sob `/jardimgis/static/`
4. **Blueprints**: 
   - `web_bp` → Rotas principais da aplicação
   - `admin_bp` → Rotas administrativas
   - `arvores_bp` → Blueprint reservado para futuras expansões

---

## 🚀 Status

✅ **Todas as rotas configuradas e funcionais**  
✅ **Templates corretamente referenciados**  
✅ **Sistema de redirecionamento funcional**  
✅ **Autenticação integrada**  
✅ **Sem erros de compilação**
