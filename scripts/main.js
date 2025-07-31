// main.js - Script principal para a galeria
// Fechar modal ao clicar fora da imagem
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('fullscreenModal');
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeFullscreen();
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeFullscreen();
        }
    });
    
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
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = image.caption;
    img.loading = 'lazy';
    img.onclick = () => openFullscreen(imageSrc, image.caption);
    
    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    caption.textContent = image.caption;
    
    item.appendChild(img);
    item.appendChild(caption);
    
    return item;
}

// Função para atualizar a galeria (chamada após upload)
function refreshGallery() {
    loadGallery();
}



// Funções para modal de tela cheia
function openFullscreen(imageSrc, caption) {
    const modal = document.getElementById('fullscreenModal');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const fullscreenCaption = document.getElementById('fullscreenCaption');
    
    fullscreenImage.src = imageSrc;
    fullscreenImage.alt = caption;
    fullscreenCaption.textContent = caption;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Previne scroll da página
}

function closeFullscreen() {
    const modal = document.getElementById('fullscreenModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaura scroll da página
}

