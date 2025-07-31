// login.js - Sistema de autenticação
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    
    // Credenciais válidas
    const validCredentials = [
        { username: 'daiandreson', password: 'desenhista' },
        { username: 'jorge', password: 'programador' }
    ];
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Validar credenciais
        const isValid = validCredentials.some(cred => 
            cred.username === username && cred.password === password
        );
        
        if (isValid) {
            // Criar sessão
            const sessionData = {
                username: username,
                loginTime: new Date().toISOString(),
                isAuthenticated: true
            };
            
            localStorage.setItem('ilustrePetrolinaSession', JSON.stringify(sessionData));
            
            // Redirecionar para admin
            window.location.href = 'admin.html';
        } else {
            showError('Usuário ou senha incorretos.');
        }
    });
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Esconder erro após 5 segundos
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
    
    // Limpar mensagem de erro quando o usuário começar a digitar
    document.getElementById('username').addEventListener('input', clearError);
    document.getElementById('password').addEventListener('input', clearError);
    
    function clearError() {
        errorMessage.style.display = 'none';
    }
});

// Função para verificar se o usuário está logado
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

// Função para fazer logout
function logout() {
    localStorage.removeItem('ilustrePetrolinaSession');
    window.location.href = 'login.html';
}

