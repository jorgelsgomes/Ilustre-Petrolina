// admin.js - Sistema de administração
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticação
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    
    const uploadForm = document.getElementById('uploadForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Carregar galeria admin
    loadAdminGallery();
    
    // Event listeners
    uploadForm.addEventListener('submit', handleImageUpload);
    logoutBtn.addEventListener('click', logout);
    
    async function handleImageUpload(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('imageFile');
        const captionInput = document.getElementById('imageCaption');
        const file = fileInput.files[0];
        const caption = captionInput.value.trim();
        
        if (!file || !caption) {
            showMessage('Por favor, selecione uma imagem e adicione uma legenda.', 'error');
            return;
        }
        
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
            showMessage('Por favor, selecione apenas arquivos de imagem.', 'error');
            return;
        }
        
        // Validar tamanho (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showMessage('A imagem deve ter no máximo 5MB.', 'error');
            return;
        }
        
        try {
            // Simular upload (para GitHub Pages, usamos base64)
            const base64 = await fileToBase64(file);
            const imageData = {
                id: Date.now(),
                filename: `image_${Date.now()}.${file.type.split('/')[1]}`,
                caption: caption,
                uploadDate: new Date().toISOString().split('T')[0],
                base64: base64
            };
            
            // Adicionar à lista de imagens
            await addImageToGallery(imageData);
            
            // Limpar formulário
            uploadForm.reset();
            
            // Recarregar galeria admin
            loadAdminGallery();
            
            showMessage('Imagem adicionada com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro no upload:', error);
            showMessage('Erro ao fazer upload da imagem.', 'error');
        }
    }
    
    async function addImageToGallery(imageData) {
        try {
            // Carregar dados atuais
            const response = await fetch('images.json');
            const data = await response.json();
            
            // Adicionar nova imagem
            data.images.push({
                id: imageData.id,
                filename: imageData.filename,
                caption: imageData.caption,
                uploadDate: imageData.uploadDate
            });
            
            // Para GitHub Pages, salvamos no localStorage
            // Em um ambiente real, isso seria enviado para um servidor
            localStorage.setItem('ilustrePetrolinaImages', JSON.stringify(data));
            
            // Simular salvamento da imagem (em um ambiente real, seria enviada para servidor)
            localStorage.setItem(`image_${imageData.id}`, imageData.base64);
            
        } catch (error) {
            throw new Error('Erro ao salvar imagem');
        }
    }
    
    async function loadAdminGallery() {
        try {
            // Tentar carregar do localStorage primeiro (imagens adicionadas)
            let data;
            const localData = localStorage.getItem('ilustrePetrolinaImages');
            
            if (localData) {
                data = JSON.parse(localData);
            } else {
                const response = await fetch('images.json');
                data = await response.json();
            }
            
            const adminGallery = document.getElementById('adminGallery');
            adminGallery.innerHTML = '';
            
            if (data.images && data.images.length > 0) {
                data.images.forEach(image => {
                    const galleryItem = createAdminGalleryItem(image);
                    adminGallery.appendChild(galleryItem);
                });
            } else {
                adminGallery.innerHTML = '<p style="text-align: center; color: #666;">Nenhuma imagem encontrada.</p>';
            }
        } catch (error) {
            console.error('Erro ao carregar galeria admin:', error);
        }
    }
    
    function createAdminGalleryItem(image) {
        const item = document.createElement('div');
        item.className = 'admin-gallery-item';
        
        // Verificar se é uma imagem local (base64) ou do servidor
        let imageSrc;
        const localImage = localStorage.getItem(`image_${image.id}`);
        if (localImage) {
            imageSrc = localImage;
        } else {
            imageSrc = `images/${image.filename}`;
        }
        
        item.innerHTML = `
            <img src="${imageSrc}" alt="${image.caption}" loading="lazy">
            <div class="caption">${image.caption}</div>
            <button class="delete-btn" onclick="deleteImage(${image.id})" title="Excluir imagem">×</button>
        `;
        
        return item;
    }
    
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    
    function showMessage(message, type) {
        // Remover mensagens existentes
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type === 'error' ? 'error-message' : 'success-message'}`;
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        uploadForm.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});

// Função global para deletar imagem
async function deleteImage(imageId) {
    if (!confirm('Tem certeza que deseja excluir esta imagem?')) {
        return;
    }
    
    try {
        // Carregar dados atuais
        let data;
        const localData = localStorage.getItem('ilustrePetrolinaImages');
        
        if (localData) {
            data = JSON.parse(localData);
        } else {
            const response = await fetch('images.json');
            data = await response.json();
        }
        
        // Remover imagem da lista
        data.images = data.images.filter(img => img.id !== imageId);
        
        // Salvar dados atualizados
        localStorage.setItem('ilustrePetrolinaImages', JSON.stringify(data));
        
        // Remover imagem do localStorage
        localStorage.removeItem(`image_${imageId}`);
        
        // Recarregar galeria
        location.reload();
        
    } catch (error) {
        console.error('Erro ao deletar imagem:', error);
        alert('Erro ao deletar imagem.');
    }
}

// Importar funções de autenticação
function isAuthenticated() {
    const session = localStorage.getItem('ilustrePetrolinaSession');
    if (!session) return false;
    
    try {
        const sessionData = JSON.parse(session);
        return sessionData.isAuthenticated === true;
    } catch (error) {
        return false;
    }
}

function logout() {
    localStorage.removeItem('ilustrePetrolinaSession');
    window.location.href = 'login.html';
}

