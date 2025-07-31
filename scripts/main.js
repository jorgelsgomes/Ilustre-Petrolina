// main.js - Script principal para a galeria
document.addEventListener('DOMContentLoaded', function() {
    loadGallery();
});

async function loadGallery() {
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
        
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';
        
        if (data.images && data.images.length > 0) {
            data.images.forEach(image => {
                const galleryItem = createGalleryItem(image);
                gallery.appendChild(galleryItem);
            });
        } else {
            gallery.innerHTML = '<p style="text-align: center; color: #666; font-size: 1.2rem;">Nenhuma imagem encontrada. Use o painel de administração para adicionar imagens.</p>';
        }
    } catch (error) {
        console.error('Erro ao carregar galeria:', error);
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '<p style="text-align: center; color: #e74c3c;">Erro ao carregar a galeria.</p>';
    }
}

function createGalleryItem(image) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
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
        <div class="gallery-caption">${image.caption}</div>
    `;
    
    return item;
}

// Função para atualizar a galeria (chamada após upload)
function refreshGallery() {
    loadGallery();
}

