/**
 * Portfólio de Matemática Core Engine - 2026
 * Desenvolvido sob especificações de alta performance para Web (60 FPS)
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inicialização de submódulos independentes
    Engine3D.init();
    MotionSystem.initIntro();
    MotionSystem.initScrollInteractions();
    InterfaceController.initTabs();
    InterfaceController.initAccordions();
    InterfaceController.initLightbox();
    InterfaceController.initCursor();
    InterfaceController.initPremiumHover();
});

/* ==========================================================================
   MODULE: ENGINE 3D (THREE.JS COMPACT MATHEMATICAL NET)
   ========================================================================== */
const Engine3D = {
    scene: null,
    camera: null,
    renderer: null,
    particles: null,
    particleCount: 120,
    mouse: { x: 0, y: 0 },
    targetMouse: { x: 0, y: 0 },

    init() {
        const container = document.createElement('div');
        container.id = 'webgl-background';
        document.body.prepend(container);

        // Instanciação de Ambiente
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 40;

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        this.buildMathematicalGrid();
        this.bindEvents();
        this.loop();
    },

    buildMathematicalGrid() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const initialScales = new Float32Array(this.particleCount);

        for (let i = 0; i < this.particleCount * 3; i += 3) {
            // Distribuição baseada em coordenadas aleatórias tridimensionais
            positions[i] = (Math.random() - 0.5) * 80;
            positions[i + 1] = (Math.random() - 0.5) * 80;
            positions[i + 2] = (Math.random() - 0.5) * 40;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Shader customizado básico estruturado em material nativo para otimização externa
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.25,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);

        // Adição de linhas estruturais conectivas discretas para simular matrizes de dados
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.03 });
        const lineGeometry = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.scene.add(lines);
    },

    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            // Normalização das coordenadas do mouse de -1 a 1
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    },

    loop() {
        requestAnimationFrame(() => this.loop());

        // Amortecimento suave (Lerp) para reação do mouse contínua e cinemática
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        this.particles.rotation.y = this.mouse.x * 0.15;
        this.particles.rotation.x = -this.mouse.y * 0.15;
        
        // Rotação autônoma passiva constante
        this.particles.rotation.z += 0.0005;

        this.renderer.render(this.scene, this.camera);
    }
};

/* ==========================================================================
   MODULE: MOTION SYSTEM (GSAP ORCHESTRATION & SCROLLTRIGGER)
   ========================================================================== */
const MotionSystem = {
    initIntro() {
        // Registro de plugins do ecossistema GreenSock
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Sequência Cinemática de Abertura (Landing Orchestration)
        tl.fromTo(".hero-badge", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 })
          .fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2 }, "-=0.7")
          .fromTo(".hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
          .fromTo(".team-member", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 }, "-=0.6")
          .fromTo(".navbar", { y: -100 }, { y: 0, duration: 1.2 }, "-=1")
          .fromTo(".hero-quote", { opacity: 0 }, { opacity: 1, duration: 1.5 }, "-=0.5");
    },

    initScrollInteractions() {
        // Efeito de contagem progressiva automatizada no Dashboard Futurista
        gsap.utils.toArray(".card-value").forEach(value => {
            const targetValue = parseInt(value.innerText, 10);
            value.innerText = "0";

            gsap.to(value, {
                scrollTrigger: {
                    trigger: value,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                innerText: targetValue,
                duration: 2.5,
                snap: { innerText: 1 },
                ease: "power3.out"
            });
        });

        // Revelação de Elementos da Linha do Tempo via ScrollTrigger
        gsap.utils.toArray(".timeline-item").forEach(item => {
            gsap.fromTo(item, 
                { opacity: 0, y: 40 },
                {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out"
                }
            );
        });

        // Revelação sequencial dos Cards de Mapas Mentais
        gsap.from(".map-card", {
            scrollTrigger: {
                trigger: "#mapas",
                start: "top 75%"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }
};

/* ==========================================================================
   MODULE: INTERFACE & EXPERIENCE CONTROLLER
   ========================================================================== */
const InterfaceController = {
    initTabs() {
        const buttons = document.querySelectorAll(".tab-btn");
        const panels = document.querySelectorAll(".tab-panel");

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const target = btn.getAttribute("data-tab");

                buttons.forEach(b => b.classList.remove("active"));
                panels.forEach(p => p.classList.remove("active"));

                btn.classList.add("active");
                const targetPanel = document.getElementById(target);
                targetPanel.classList.add("active");
                
                // Microinteração magnética discreta de feedback no clique
                gsap.fromTo(targetPanel, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
            });
        });
    },

    initAccordions() {
        const headers = document.querySelectorAll(".accordion-header");

        headers.forEach(header => {
            header.addEventListener("click", () => {
                const item = header.parentElement;
                const body = item.querySelector(".accordion-body");
                const isActive = item.classList.contains("active");

                // Fecha todos os outros blocos para manter a interface limpa (Comportamento Clássico Apple)
                document.querySelectorAll(".accordion-item").forEach(i => {
                    i.classList.remove("active");
                    i.querySelector(".accordion-body").style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add("active");
                    body.style.maxHeight = body.scrollHeight + "px";
                }
            });
        });
    },

    initLightbox() {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImg");
        const caption = document.getElementById("modalCaption");
        const closeBtn = document.querySelector(".modal-close");
        const triggerImages = document.querySelectorAll(".zoomable-img");

        triggerImages.forEach(img => {
            img.addEventListener("click", () => {
                modal.style.display = "flex";
                modalImg.src = img.src;
                caption.innerText = img.alt;
                setTimeout(() => modal.classList.add("open"), 10);
            });
        });

        const closeModal = () => {
            modal.classList.remove("open");
            setTimeout(() => modal.style.display = "none", 400);
        };

        closeBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });
    },

    initCursor() {
        const cursor = document.createElement('div');
        const follower = document.createElement('div');
        cursor.className = 'custom-cursor';
        follower.className = 'custom-cursor-follower';
        document.body.appendChild(cursor);
        document.body.appendChild(follower);

        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
        });

        // Efeito expansivo ao passar por elementos clicáveis interativos
        document.querySelectorAll('a, button, .zoomable-img, .accordion-header').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
                cursor.style.backgroundColor = 'rgba(255,255,255,0.05)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    },

    initPremiumHover() {
        // Efeito de Iluminação Direcional Baseado em Mouse de Célula de Interface Stripe
        const cards = document.querySelectorAll('.dash-card, .exercise-card, .map-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                
                // Leve inclinação 3D baseada em coordenadas de inclinação
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = -(y - centerY) / 25;
                const rotateY = (x - centerX) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, -4px, 0)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
            });
        });
    }
};

/* ==========================================================================
   BANCO DE DADOS COMPLETO (APENAS TEXTOS E RESOLUÇÕES)
   ========================================================================== */
const resolutionsDatabase = {
    // PÁGINA 67 - EXPONENCIAIS
    "p67_q6": {
        pageNumber: "67 - Ex. 6",
        title: "Análise da Função Exponencial f(x) = (5/4)ˣ",
        enunciado: "Sendo f(x) = (5/4)ˣ para x ∈ ℝ, analise as propriedades da função para determinar a afirmação correta sobre o seu comportamento gráfico e conjunto imagem.",
        steps: [
            "Observe a base da função exponencial: a = 5/4. Como 5/4 > 1, a função é estritamente crescente.",
            "As funções exponenciais elementares da forma f(x) = aˣ com a > 0 e a ≠ 1 possuem como conjunto imagem apenas os valores estritamente maiores que zero.",
            "A curva se aproxima do eixo x sem nunca tocá-lo (assíntota horizontal em y = 0), logo Im(f) = ]0, +∞[."
        ],
        finalAnswer: "Alternativa correta: c) a imagem é Im(f) = ]0, +∞["
    },
    "p67_q7": {
        pageNumber: "67 - Ex. 7",
        title: "Crescimento de Cultura de Bactérias",
        enunciado: "O gráfico mostra a evolução do número de bactérias em certa cultura. Quantas bactérias haverá aproximadamente decorridos 30 minutos do início?",
        steps: [
            "Modelamos a lei de crescimento a partir do gráfico: N(t) = N₀ · bᵗ. Para t = 0, N(0) = 10⁴, portanto N₀ = 10⁴.",
            "Do gráfico, quando t = 3 horas, N(3) = 8 · 10⁴. Substituindo: 10⁴ · b³ = 8 · 10⁴ ⟹ b³ = 8 ⟹ b = 2. A equação é N(t) = 10⁴ · 2ᵗ.",
            "O tempo pedido é 30 minutos, o que equivale a t = 0,5 horas (ou 1/2).",
            "Calculamos N(0,5) = 10⁴ · 2^(1/2) = 10⁴ · √2. Adotando √2 ≈ 1,414, temos 10.000 · 1,414 = 14.140."
        ],
        finalAnswer: "Aproximadamente 14.140 bactérias."
    },
    "p67_q8": {
        pageNumber: "67 - Ex. 8",
        title: "Cálculos Exponenciais Aproximados",
        enunciado: "Utilize regras de exponenciação para determinar os valores reais aproximados para as expressões: a) 2^(4e) e b) e^(3/2).",
        steps: [
            "Para o item (a), substituímos o valor irracional da base neperiana e ≈ 2,71828 no expoente: 4 · 2,71828 ≈ 10,8731.",
            "Calculamos a potência resultante: 2^(10,8731) ≈ 1875,59.",
            "Para o item (b), transformamos o expoente fracionário em radical: e^(3/2) = √(e³).",
            "Aproximando o valor sob a raiz: √(2,71828³) = √20,0855 ≈ 4,48."
        ],
        finalAnswer: "a) ≈ 1875,59  |  b) ≈ 4,48"
    },

    // PÁGINA 89 - CONCEITOS DE LOGARITMOS
    "p89_q1": {
        pageNumber: "89 - Ex. 1",
        title: "Aplicação da Definição de Logaritmos",
        enunciado: "Calcule os valores utilizando a definição fundamental log_a(b) = x ⟺ aˣ = b: a) log₆ 36, b) log₁₀ 0,01, c) log_(1/4) 2√2.",
        steps: [
            "Item a: log₆ 36 = x ⟺ 6ˣ = 36. Como 36 = 6², temos x = 2.",
            "Item b: log₁₀ 0,01 = x ⟺ 10ˣ = 0,01. Como 0,01 = 1/100 = 10⁻², temos x = -2.",
            "Item c: log_(1/4) 2√2 = x ⟺ (1/4)ˣ = 2√2 ⟹ (2⁻²)ˣ = 2¹ · 2^(1/2) ⟹ 2⁻²ˣ = 2^(3/2) ⟹ -2x = 3/2 ⟹ x = -3/4."
        ],
        finalAnswer: "a) 2  |  b) -2  |  c) -3/4"
    },
    "p89_q2": {
        pageNumber: "89 - Ex. 2",
        title: "Uso de Dados Exponenciais para Logaritmos",
        enunciado: "Calcule o valor de log₁₀ 1,4 sabendo que 2 = 10^(0,301) e 7 = 10^(0,845).",
        steps: [
            "Escrevemos o logaritmando na forma de fração: 1,4 = 14 / 10.",
            "Substituindo na expressão: log₁₀(14/10) = log₁₀(2 · 7) - log₁₀(10).",
            "Aplicando as propriedades operatórias de multiplicação e divisão: log₁₀(2) + log₁₀(7) - log₁₀(10).",
            "Por definição, se 2 = 10^(0,301), then log₁₀(2) = 0,301. Se 7 = 10^(0,845), então log₁₀(7) = 0,845.",
            "Efetuamos a soma aritmética final: 0,301 + 0,845 - 1 = 0,146."
        ],
        finalAnswer: "log₁₀ 1,4 = 0,146"
    },
    "p89_q3": {
        pageNumber: "89 - Ex. 3",
        title: "Logaritmo de Logaritmo",
        enunciado: "Determine qual número natural representa a expressão composta log₁₀ (log₁₀ 10).",
        steps: [
            "Resolvemos primeiro o logaritmo que se encontra no parêntese interno: log₁₀ 10.",
            "Como a base e o logaritmando são iguais, log₁₀ 10 = 1.",
            "Substituímos o resultado na parte externa da expressão: log₁₀ (1).",
            "O logaritmo do número 1 em qualquer base permitida é igual a 0."
        ],
        finalAnswer: "O valor da expressão é 0"
    },
    "p89_q4": {
        pageNumber: "89 - Ex. 4",
        title: "Simplificação de Expressões com Propriedades",
        enunciado: "Calcule o valor numérico real da expressão: log₇ 7³ + log₉ 1⁶ + 2^(log₂ 5).",
        steps: [
            "Análise do primeiro termo: log₇ 7³ = 3 (propriedade do expoente do logaritmando).",
            "Análise do segundo termo: Como 1⁶ = 1, a expressão vira log₉ 1, cujo valor é igual a 0.",
            "Análise do terceiro termo: Utilizando a propriedade da identidade exponencial a^(log_a b) = b, temos 2^(log₂ 5) = 5.",
            "Somando os resultados parciais obtidos: 3 + 0 + 5 = 8."
        ],
        finalAnswer: "Resultado final = 8"
    },

    // PÁGINA 104 - FUNÇÕES LOGARÍTMICAS
    "p104_q13": {
        pageNumber: "104 - Ex. 13",
        title: "Análise Gráfica de f(x) = log_(1/3) x",
        enunciado: "Determine os pontos chaves e descreva o comportamento para o esboço gráfico da função f(x) = log_(1/3) x.",
        steps: [
            "Identifique a base do logaritmo: b = 1/3. Como 0 < 1/3 < 1, a função é estritamente decrescente.",
            "Calculamos pontos notáveis para o mapeamento das coordenadas no plano cartesiano:",
            "Para x = 1 ⟹ y = log_(1/3) 1 = 0, gerando o ponto (1, 0).",
            "Para x = 3 ⟹ y = log_(1/3) 3 = -1, gerando o ponto (3, -1).",
            "Para x = 1/3 ⟹ y = log_(1/3) (1/3) = 1, gerando o ponto (1/3, 1)."
        ],
        finalAnswer: "Função decrescente, corta o eixo x em (1,0) e passa por (3,-1)."
    },
    "p104_q14": {
        pageNumber: "104 - Ex. 14",
        title: "Domínio e Inversa da Função log₂ (4x - 1)",
        enunciado: "Dada a função f(x) = log₂ (4x - 1), determine: a) a classificação de crescimento, b) o domínio de existência, c) a expressão algébrica da função inversa.",
        steps: [
            "Item a: A base é 2. Como 2 > 1, a função é estritamente crescente.",
            "Item b: Pela condição de existência de logaritmos, o logaritmando precisa ser positivo: 4x - 1 > 0 ⟹ 4x > 1 ⟹ x > 1/4.",
            "Item c: Para achar a inversa, trocamos x por y e isolamos a nova variável: x = log₂ (4y - 1) ⟹ 2ˣ = 4y - 1 ⟹ 4y = 2ˣ + 1 ⟹ y = (2ˣ + 1)/4."
        ],
        finalAnswer: "a) Crescente  |  b) Domínio = {x ∈ ℝ | x > 1/4}  |  c) f⁻¹(x) = (2ˣ + 1)/4"
    },
    "p104_q15": {
        pageNumber: "104 - Ex. 15",
        title: "Área de Região Retangular no Gráfico",
        enunciado: "A curva do gráfico representa a função f(x) = log₂ (x/2). Encontre a medida da área do retângulo hachurado.",
        steps: [
            "Encontramos a base do retângulo calculando a distância entre as coordenadas x informadas: Base = 4 - 1 = 3.",
            "Determinamos a altura obtendo o valor da função no ponto limite superior x = 4: f(4) = log₂ (4/2) = log₂ 2 = 1.",
            "O limite inferior do retângulo está alinhado no eixo horizontal y = 0, logo a Altura = 1 - 0 = 1.",
            "Calculamos a área multiplicando os valores da base e da altura: Área = Base · Altura = 3 · 1 = 3."
        ],
        finalAnswer: "Área = 3 unidades de área."
    },

    // MATRIZES
    "matriz_q1": {
        pageNumber: "Matrizes - Q1",
        title: "Matriz de Adjacência de Rede Viária",
        enunciado: "Construa a matriz de conectividade A = [a_ij]₄ₓ₄ para as quatro cidades do mapa rodoviário, adotando 1 se há ligação direta e 0 caso contrário.",
        steps: [
            "Linha 1 (Cidade 1): possui ligação direta apenas para a cidade 2. Linha = [0, 1, 0, 0].",
            "Linha 2 (Cidade 2): possui conexões diretas com as cidades 1, 3 e 4. Linha = [1, 0, 1, 1].",
            "Linha 3 (Cidade 3): possui conexões diretas com as cidades 2 e 4. Linha = [0, 1, 0, 1].",
            "Linha 4 (Cidade 4): possui conexões diretas com as cidades 2 e 3. Linha = [0, 1, 1, 0]."
        ],
        finalAnswer: "Matriz A = [[0, 1, 0, 0], [1, 0, 1, 1], [0, 1, 0, 1], [0, 1, 1, 0]]"
    },

    // GEOMETRIA PLANA (FIGURAS COMPOSTAS)
    "geo_a": {
        pageNumber: "Geometria - Figura A",
        title: "Área do Polígono em L",
        enunciado: "Calcule a área total da figura em formato de L com medidas externas de 140 cm, 80 cm e recortes internos.",
        steps: [
            "Dividimos o L verticalmente em duas partes retangulares simples.",
            "Parte 1 (Retângulo vertical esquerdo): base de 80 cm e altura de 80 cm. Área = 80 · 80 = 6.400 cm².",
            "Parte 2 (Retângulo horizontal direito): base restante de 140 cm - 80 cm = 60 cm. A altura informada é de 30 cm. Área = 60 · 30 = 1.800 cm².",
            "Somamos as áreas parciais: 6.400 + 1.800 = 8.200 cm²."
        ],
        finalAnswer: "Área total = 8.200 cm²"
    },
    "geo_b": {
        pageNumber: "Geometria - Figura B",
        title: "Área do Triângulo Escaleno",
        enunciado: "Calcule a área do triângulo obtusângulo que possui base de 9 cm e uma projeção de altura externa medindo 4 cm.",
        steps: [
            "A fórmula da área de qualquer triângulo é dada pelo produto da base pela altura dividido por dois.",
            "A base do triângulo mede 9 cm e a altura perpendicular relativa a essa base mede 4 cm.",
            "Aplicando os valores na fórmula: Área = (9 · 4) / 2 = 36 / 2 = 18 cm²."
        ],
        finalAnswer: "Área total = 18 cm²"
    },
    "geo_c": {
        pageNumber: "Geometria - Figura C",
        title: "Área de Triângulo por Semiperímetro",
        enunciado: "Calcule a área do triângulo de lados medindo a = 7 cm, b = 8 cm e c = 9 cm.",
        steps: [
            "Utilizamos a Fórmula de Heron. Primeiro calculamos o semiperímetro p = (7 + 8 + 9) / 2 = 12 cm.",
            "Escrevemos o termo do produto sob o radical: Área = √(12 · (12-7) · (12-8) · (12-9)).",
            "Simplificando os termos: Área = √(12 · 5 · 4 · 3) = √720.",
            "Fatorando o radicando para extrair a raiz simplificada: √720 = √(144 · 5) = 12√5 cm²."
        ],
        finalAnswer: "Área = 12√5 cm² (aproximadamente 26,83 cm²)"
    },
    "geo_d": {
        pageNumber: "Geometria - Figura D",
        title: "Área da Composição Retângulo-Triângulo",
        enunciado: "Determine a área da figura irregular composta por uma base retangular de 40 m por 30 m e topo triangular.",
        steps: [
            "Dividimos o cálculo nas duas formas planas explícitas.",
            "Área da base retangular inferior: Área = base · altura = 40 · 30 = 1.200 m².",
            "Área do triângulo retângulo superior: Cateto base mede 40 m e cateto altura mede 30 m. Área = (40 · 30) / 2 = 600 m².",
            "Somamos as duas superfícies para o resultado consolidado: 1.200 + 600 = 1.800 m²."
        ],
        finalAnswer: "Área total = 1.800 m²"
    }
};