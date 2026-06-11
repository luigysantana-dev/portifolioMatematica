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