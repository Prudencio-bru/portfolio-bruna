document.addEventListener('DOMContentLoaded', () => {

    // ====================================================================
    // 1. Lógica de Animação (Intersection Observer e Fade-Up-Item)
    // ====================================================================
    
    // Ativa as animações da seção Home imediatamente
    const homeSection = document.querySelector('.home');
    if(homeSection) {
        // Ativa a animação para o bloco de texto (h1, h2, p, links)
        const textElements = homeSection.querySelectorAll('.text-home h1, .text-home h2, .text-home p, .home-links a');
        textElements.forEach(el => el.classList.add('animated'));

        // Ativa a animação para a imagem de perfil
        const profilePick = homeSection.querySelector('.profile-pick');
        if (profilePick) profilePick.classList.add('animated');
    }

    // Seleciona todos os elementos que devem animar ao rolar (Nova classe: fade-up-item)
    const scrollElements = document.querySelectorAll('.fade-up-item, .icons-categories');

    // Opções: 10% do elemento visível já ativa a animação
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o elemento estiver visível, adiciona a classe 'animated'
                entry.target.classList.add('animated');
                // Para de observar depois de animar
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observa cada elemento
    scrollElements.forEach(el => {
        observer.observe(el);
    });

    
    // ====================================================================
    // 2. Lógica do Menu Hamburger
    // ====================================================================

    const menuToggle = document.querySelector('.menu-toggle');
    const navegation = document.querySelector('.navegation');

    menuToggle.addEventListener('click', () => {
        navegation.classList.toggle('active');
        menuToggle.classList.toggle('menu-open'); 
    });


    // ====================================================================
    // 3. Lógica das Abas Hard Skills
    // ====================================================================
    
    const categorias = document.querySelectorAll('.categoria-item');
    const conteudos = document.querySelectorAll('.hardskill-content');

    function handleTabClick(event) {
        const itemClicado = event.currentTarget;
        event.preventDefault(); 
        
        // Remove a classe 'active' de todos os itens LI
        categorias.forEach(item => {
            item.classList.remove('active');
        });

        // Adiciona a classe 'hidden' a todos os conteúdos
        conteudos.forEach(content => {
            // Remove a classe 'animated' antes de esconder para que a animação 
            // seja repetida ao reabrir a aba.
            content.querySelectorAll('.icons-categories').forEach(icon => {
                 icon.classList.remove('animated');
            });
            content.classList.add('hidden');
        });

        // Adiciona a classe 'active' ao item LI que foi clicado
        itemClicado.classList.add('active');
        
        const tabAlvoId = itemClicado.getAttribute('data-tab');
        const conteudoAlvo = document.getElementById(tabAlvoId);
        
        if (conteudoAlvo) {
            conteudoAlvo.classList.remove('hidden');

            // Ativa a animação dos ícones na aba recém-aberta com delay (Stagger Effect)
            const icons = conteudoAlvo.querySelectorAll('.icons-categories');
            icons.forEach((icon, index) => {
                // Adiciona um delay crescente para o efeito "stagger"
                icon.style.transitionDelay = `${index * 0.05}s`; 
                icon.classList.add('animated');
            });
        }
    }

    categorias.forEach(item => {
        item.addEventListener('click', handleTabClick);
    });

    // Inicia a animação da primeira aba (Frontend) ao carregar
    const frontendContent = document.getElementById('frontend-content');
    if (frontendContent) {
         const icons = frontendContent.querySelectorAll('.icons-categories');
         icons.forEach((icon, index) => {
            icon.style.transitionDelay = `${index * 0.05}s`; 
            icon.classList.add('animated');
         });
    }
});