// editar_controle_arvores.js - Script para edição de Árvores - JardimGIS

// Função para remover um card de Árvore
function removeNFCard(button) {
    if (confirm('Tem certeza que deseja remover este registro de árvore?')) {
        const card = button.closest('.nfs-card');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
            card.remove();
            updateNFIndexes();
        }, 300);
    }
}

// Função para atualizar os índices após remoção
function updateNFIndexes() {
    const cards = document.querySelectorAll('.nfs-card');
    cards.forEach((card, index) => {
        card.setAttribute('data-nf-index', index);
        
        // Atualiza todos os inputs dentro do card
        const inputs = card.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const name = input.getAttribute('name');
            if (name) {
                const newName = name.replace(/row-\d+-/, `row-${index}-`);
                input.setAttribute('name', newName);
            }
        });
    });
}

// Função para adicionar nova Árvore
document.addEventListener('DOMContentLoaded', function() {
    const btnAddRow = document.getElementById('btn-add-row');
    
    if (btnAddRow) {
        btnAddRow.addEventListener('click', function() {
            const container = document.getElementById('nfs-container');
            const currentCards = container.querySelectorAll('.nfs-card');
            const newIndex = currentCards.length;
            
            const newCard = createNFCard(newIndex);
            container.insertAdjacentHTML('beforeend', newCard);
            
            // Animação de entrada
            const addedCard = container.lastElementChild;
            addedCard.style.opacity = '0';
            addedCard.style.transform = 'scale(0.8)';
            setTimeout(() => {
                addedCard.style.transition = 'all 0.3s';
                addedCard.style.opacity = '1';
                addedCard.style.transform = 'scale(1)';
            }, 10);
            
            // Scroll suave até o novo card
            addedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    
    // Removida formatação de valores monetários (não se aplica a árvores)
});

// Função para criar HTML de um novo card de Árvore
function createNFCard(index) {
    return `
        <div class="nfs-card" data-nf-index="${index}">
            <div class="nfs-card-header">
                <div class="nfs-card-empresa">
                    <i class="fas fa-leaf"></i> Nova Árvore
                </div>
                <button type="button" class="nfs-btn-remove" onclick="removeNFCard(this)">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            
            <div class="nfs-card-body">
                <div class="nfs-valor-display" style="font-size: 1em; font-style: italic;">Nome científico não informado</div>
                
                <div class="nfs-form-row">
                    <div class="nfs-form-group">
                        <label class="nfs-label">
                            <i class="fas fa-hashtag"></i> ID
                        </label>
                        <input type="text" 
                               name="row-${index}-ID" 
                               value=""
                               class="nfs-input"
                               placeholder="Código único">
                    </div>
                    
                    <div class="nfs-form-group">
                        <label class="nfs-label">
                            <i class="fas fa-leaf"></i> Nome Popular
                        </label>
                        <input type="text" 
                               name="row-${index}-Nome Popular" 
                               value=""
                               class="nfs-input"
                               placeholder="Ex: Ipê Amarelo">
                    </div>
                </div>

                <div class="nfs-form-group">
                    <label class="nfs-label">
                        <i class="fas fa-dna"></i> Nome Científico
                    </label>
                    <input type="text" 
                           name="row-${index}-Nome Científico" 
                           value=""
                           class="nfs-input"
                           placeholder="Ex: Handroanthus chrysotrichus">
                </div>

                <div class="nfs-form-group">
                    <label class="nfs-label">
                        <i class="fas fa-map-marker-alt"></i> Localização Textual
                    </label>
                    <input type="text" 
                           name="row-${index}-Localização Textual" 
                           value=""
                           class="nfs-input"
                           placeholder="Ex: Jardim frontal - Entrada principal">
                </div>

                <div class="nfs-form-group">
                    <label class="nfs-label">
                        <i class="fas fa-map-pin"></i> Coordenadas GPS
                    </label>
                    <input type="text" 
                           name="row-${index}-Coordenadas GPS" 
                           value=""
                           class="nfs-input"
                           placeholder="Ex: -16.6869, -49.2648">
                </div>

                <div class="nfs-form-row">
                    <div class="nfs-form-group">
                        <label class="nfs-label">
                            <i class="fas fa-calendar-plus"></i> Data de Plantio
                        </label>
                        <input type="text" 
                               name="row-${index}-Data de Plantio" 
                               value=""
                               class="nfs-input nfs-input-data"
                               placeholder="DD/MM/AAAA">
                    </div>
                    
                    <div class="nfs-form-group">
                        <label class="nfs-label">
                            <i class="fas fa-user-friends"></i> Plantado Por
                        </label>
                        <input type="text" 
                               name="row-${index}-Plantado Por" 
                               value=""
                               class="nfs-input"
                               placeholder="Nome do responsável">
                    </div>
                </div>

                <div class="nfs-form-group">
                    <label class="nfs-label">
                        <i class="fas fa-tags"></i> Nomes Populares Adicionais
                    </label>
                    <input type="text" 
                           name="row-${index}-Nomes Populares Adicionais" 
                           value=""
                           class="nfs-input"
                           placeholder="Outros nomes conhecidos">
                </div>

                <div class="nfs-form-row">
                    <div class="nfs-form-group">
                        <label class="nfs-label">
                            <i class="fas fa-flower"></i> Época de Floração
                        </label>
                        <input type="text" 
                               name="row-${index}-Época de Floração" 
                               value=""
                               class="nfs-input"
                               placeholder="Ex: Julho a Setembro">
                    </div>
                    
                    <div class="nfs-form-group">
                        <label class="nfs-label">
                            <i class="fas fa-apple-alt"></i> Época de Frutificação
                        </label>
                        <input type="text" 
                               name="row-${index}-Época de Frutificação" 
                               value=""
                               class="nfs-input"
                               placeholder="Ex: Setembro a Novembro">
                    </div>
                </div>

                <div class="nfs-form-group">
                    <label class="nfs-label">
                        <i class="fas fa-info-circle"></i> Características
                    </label>
                    <textarea name="row-${index}-Características" 
                              class="nfs-textarea"
                              placeholder="Descrição das características da espécie"
                              rows="2"></textarea>
                </div>

                <div class="nfs-form-row">
                    <div class="nfs-form-group">
                        <label class="nfs-label">
                            <i class="fas fa-heart"></i> Estado da Árvore
                        </label>
                        <select name="row-${index}-Estado de Conservação da Árvore" class="nfs-input">
                            <option value="Excelente">Excelente</option>
                            <option value="Bom" selected>Bom</option>
                            <option value="Regular">Regular</option>
                            <option value="Ruim">Ruim</option>
                            <option value="Crítico">Crítico</option>
                        </select>
                    </div>
                    
                    <div class="nfs-form-group">
                        <label class="nfs-label">
                            <i class="fas fa-sign"></i> Estado da Placa
                        </label>
                        <select name="row-${index}-Estado de Conservação da Placa" class="nfs-input">
                            <option value="Excelente">Excelente</option>
                            <option value="Bom" selected>Bom</option>
                            <option value="Regular">Regular</option>
                            <option value="Ruim">Ruim</option>
                            <option value="Sem Placa">Sem Placa</option>
                        </select>
                    </div>
                </div>

                <div class="nfs-form-row">
                    <div class="nfs-form-group">
                        <label class="nfs-label">
                            <i class="fas fa-user-tie"></i> Responsável
                        </label>
                        <input type="text" 
                               name="row-${index}-Responsável" 
                               value="Não definido"
                               class="nfs-input nfs-input-readonly"
                               placeholder="Responsável pela edição"
                               readonly>
                    </div>
                    
                    <div class="nfs-form-group">
                        <label class="nfs-label">
                            <i class="fas fa-clock"></i> Última Atualização
                        </label>
                        <input type="text" 
                               name="row-${index}-Data da Última Atualização" 
                               value="Nunca editado"
                               class="nfs-input nfs-input-readonly"
                               placeholder="Data da última modificação"
                               readonly>
                    </div>
                </div>

                <div class="nfs-form-group">
                    <label class="nfs-label">
                        <i class="fas fa-sticky-note"></i> Observações
                    </label>
                    <textarea name="row-${index}-Observações" 
                              class="nfs-textarea"
                              placeholder="Observações adicionais sobre a árvore"
                              rows="2"></textarea>
                </div>

                <input type="hidden" name="row-${index}-original" value="{}" />
            </div>
        </div>
    `;
}

// Função removida - não se aplica a sistema de árvores
// function formatarValor(input) { ... }

// Confirmação antes de sair da página com alterações não salvas
let formModified = false;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nfs-form');
    
    if (form) {
        form.addEventListener('input', function() {
            formModified = true;
        });
        
        form.addEventListener('submit', function() {
            formModified = false;
        });
    }
});

window.addEventListener('beforeunload', function(e) {
    if (formModified) {
        e.preventDefault();
        e.returnValue = '';
    }
});
