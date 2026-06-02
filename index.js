import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ================= THREE.JS BACKGROUND INTERACTIVE MATRIX =================
const canvas = document.querySelector('#webgl-canvas');
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.BufferGeometry();
  const verticesCount = 400;
  const posArray = new Float32Array(verticesCount * 3);

  for(let i=0; i < verticesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 8;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const material = new THREE.PointsMaterial({
    size: 0.025,
    color: 0xf59e0b, 
    transparent: true,
    opacity: 0.8
  });

  const particleMesh = new THREE.Points(geometry, material);
  scene.add(particleMesh);
  camera.position.z = 3;

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
  });

  const clock = new THREE.Clock();
  function animateBackground() {
    requestAnimationFrame(animateBackground);
    const elapsedTime = clock.getElapsedTime();

    particleMesh.rotation.y = elapsedTime * 0.04;
    particleMesh.rotation.x += (mouseY * 0.1 - particleMesh.rotation.x) * 0.2;
    particleMesh.rotation.y += (mouseX * 0.1 - particleMesh.rotation.y) * 0.2;

    renderer.render(scene, camera);
  }
  animateBackground();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ================= DOMAIN-SPECIFIC PARTICLE ASSEMBLY ENGINE =================
const domainPools = {
  "web-dev": ["<", ">", "/", "{", "}", "div", "css", "js", "web", "dom"],
  "ai-automation": ["0", "1", "0", "1", "ai", "bot", "run", "sync", "api"],
  "testing": ["PASS", "FAIL", "ERR", "404", "200", "test", "spec", "qa"],
  "consultancy": ["•", "•", "•", "net", "sys", "tech", "plan", "ops"]
};

const activeInstances = [];

function setupMultiCanvasEngine() {
  activeInstances.length = 0; 
  document.querySelectorAll('.service-trigger-box').forEach(box => {
    const sCanvas = box.querySelector('.fragment-canvas');
    if (!sCanvas) return;
    const sCtx = sCanvas.getContext('2d');
    const sInfo = box.querySelector('.assembly-info');
    const sBg = box.querySelector('.assembly-card-bg');
    const type = box.getAttribute('data-service');

    const tokens = domainPools[type] || ["*"];
    const pCount = 35;
    const localParticles = [];

    sCanvas.width = box.clientWidth;
    sCanvas.height = box.clientHeight;

    for (let i = 0; i < pCount; i++) {
      localParticles.push({
        text: tokens[Math.floor(Math.random() * tokens.length)],
        homeX: 50 + Math.random() * (sCanvas.width - 100),
        homeY: 50 + Math.random() * (sCanvas.height - 100),
        offsetX: (Math.random() - 0.5) * 500,
        offsetY: (Math.random() - 0.5) * 500,
        size: 11 + Math.random() * 10
      });
    }

    activeInstances.push({ 
      box, 
      canvas: sCanvas, 
      ctx: sCtx, 
      info: sInfo, 
      bg: sBg, 
      particles: localParticles,
      currentProgress: 1 
    });
  });
}

function runGlobalAssemblyLoop() {
  activeInstances.forEach(inst => {
    const ctx = inst.ctx;
    const w = inst.canvas.width;
    const h = inst.canvas.height;
    
    ctx.clearRect(0, 0, w, h);

    const rect = inst.box.getBoundingClientRect();
    const winHeight = window.innerHeight;
    
    let targetProgress = (rect.top - winHeight * 0.22) / (winHeight * 0.65);
    targetProgress = Math.max(0, Math.min(1, targetProgress));

    inst.currentProgress += (targetProgress - inst.currentProgress) * 0.09;
    const progress = inst.currentProgress;

    if (progress < 0.01) {
      if (inst.info) {
        inst.info.classList.remove('opacity-0', 'translate-y-6', 'pointer-events-none');
        inst.info.classList.add('opacity-100', 'translate-y-0');
      }
      if (inst.bg) {
        inst.bg.style.background = "rgba(10, 10, 10, 0.95)";
        inst.bg.style.border = "1px solid rgba(245, 158, 11, 0.4)";
        inst.bg.style.boxShadow = "0 20px 40px rgba(0,0,0,0.7)";
      }
    } else {
      if (inst.info) {
        inst.info.classList.remove('opacity-100', 'translate-y-0');
        inst.info.classList.add('opacity-0', 'translate-y-6', 'pointer-events-none');
      }
      if (inst.bg) {
        inst.bg.style.background = "transparent";
        inst.bg.style.border = "1px solid transparent";
        inst.bg.style.boxShadow = "none";
      }
    }

    ctx.strokeStyle = `rgba(245, 158, 11, ${0.05 + (1 - progress) * 0.25})`;
    ctx.lineWidth = 1;
    ctx.strokeRect(15, 15, w - 30, h - 30);

    if (progress > 0.005) {
      inst.particles.forEach(p => {
        ctx.save();
        ctx.fillStyle = `rgba(245, 158, 11, ${progress * (0.12 + (1 - progress) * 0.65)})`;
        ctx.font = `bold ${p.size}px monospace`;
        
        const currentX = p.homeX + (p.offsetX * progress);
        const currentY = p.homeY + (p.offsetY * progress);

        ctx.fillText(p.text, currentX, currentY);
        ctx.restore();
      });
    }
  });

  requestAnimationFrame(runGlobalAssemblyLoop);
}

// ================= DYNAMIC PORTFOLIO DATA DATASET =================
const projectVault = {
  "web-dev": {
    headline: "Web Development Portfolio",
    tagline: "Clean, fast websites designed to deliver seamless user experiences and scale easily.",
    items: [
      { name: "Custom E-Commerce Platform", meta: "Next.js / Firestore", url: "https://yourportfolio-link1.com" },
      { name: "Dynamic Booking Application", meta: "Vanilla JS / Tailwind", url: "https://yourportfolio-link2.com" }
    ]
  },
  "ai-automation": {
    headline: "AI Automation Portfolio",
    tagline: "Smart software setups that eliminate manual processes and handle tracking automatically.",
    items: [
      { name: "AI Lead Capture Pipeline", meta: "Python / OpenAI API", url: "#" },
      { name: "Automated Feedback Processing System", meta: "NodeJS / Cloud Functions", url: "#" }
    ]
  },
  "testing": { headline: "Testing Protocols", tagline: "Locked", items: [] },
  "consultancy": { headline: "IT Systems Consultation", tagline: "Locked", items: [] }
};

// ================= MODAL CONTROLLER =================
const modal = document.getElementById('portfolio-modal');
const headerArea = document.getElementById('modal-header-area');
const gridContainer = document.getElementById('modal-grid-container');

window.openPortfolio = function(category) {
  const data = projectVault[category];
  if (!data || data.items.length === 0) return; 

  headerArea.innerHTML = `
    <p class="text-amber-500 font-mono text-xs uppercase tracking-widest">// COMPLETED WORKS</p>
    <h4 class="text-3xl font-black text-white uppercase mt-1">${data.headline}</h4>
    <p class="text-neutral-400 text-xs font-light mt-2 max-w-xl">${data.tagline}</p>
  `;
  gridContainer.innerHTML = '';

  data.items.forEach(proj => {
    gridContainer.innerHTML += `
      <div class="bg-neutral-950/90 border border-neutral-900 rounded-xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition duration-300">
        <div>
          <span class="text-[10px] bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono px-2 py-0.5 rounded">${proj.meta}</span>
          <h5 class="text-white font-bold mt-3 text-base">${proj.name}</h5>
        </div>
        <div class="pt-6">
          <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="text-xs text-amber-500 font-semibold tracking-wider hover:text-amber-400 transition inline-flex items-center gap-1">
            Launch Live Site <span>→</span>
          </a>
        </div>
      </div>
    `;
  });

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; 
  }
};

window.closePortfolio = function() {
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

// ================= FORM SUBMISSION LOGIC =================
const leadForm = document.getElementById('agency-lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const trigger = document.getElementById('node-submit-trigger');
    const callbackText = document.getElementById('node-status-callback');

    trigger.disabled = true;
    trigger.innerText = "SENDING FORM INFO...";
    callbackText.classList.remove('hidden', 'text-emerald-500', 'text-red-500');
    callbackText.classList.add('text-amber-500');
    callbackText.innerText = "Connecting with secure database server...";

    try {
      await addDoc(collection(db, "leads"), {
        clientName: document.getElementById('node-name').value,
        clientEmail: document.getElementById('node-email').value,
        selectedServiceVector: document.getElementById('node-vector').value,
        scopeSpecifications: document.getElementById('node-specifications').value,
        timestamp: serverTimestamp(),
        processedState: "unread"
      });

      callbackText.classList.replace('text-amber-500', 'text-emerald-500');
      callbackText.innerText = "✓ Information saved successfully. We will be in touch shortly.";
      leadForm.reset();
    } catch (err) {
      console.error(err);
      callbackText.classList.replace('text-amber-500', 'text-red-500');
      callbackText.innerText = "✕ Form error. Please check your network or try again later.";
    } finally {
      trigger.disabled = false;
      trigger.innerText = "SUBMIT PROJECT REQUEST";
    }
  });
}

// ================= CHATBOT FUNCTIONALITY =================
window.toggleChatbotState = function() {
  const frame = document.getElementById('chatbot-frame');
  const icon = document.getElementById('bubble-icon');
  if (frame && icon) {
    frame.classList.toggle('hidden');
    icon.innerText = frame.classList.contains('hidden') ? "💬" : "✕";
  }
};

window.processChatMessage = function() {
  const field = document.getElementById('chat-user-input');
  const text = field ? field.value.trim() : '';
  if(!text) return;

  const panel = document.getElementById('chat-message-display');
  if (!panel) return;

  panel.innerHTML += `
    <div class="bg-amber-500 text-black p-3 rounded-xl rounded-tr-none self-end max-w-[85%] ml-auto font-medium">
      ${text}
    </div>
  `;
  field.value = '';
  panel.scrollTop = panel.scrollHeight;

  setTimeout(() => {
    let responseText = "Got it. If you need exact pricing or project estimates, please fill out our 'Get a Quote' form on the page.";
    
    const lowered = text.toLowerCase();
    if(lowered.includes('web') || lowered.includes('dev')) {
      responseText = "Our development team builds custom web apps using Next.js and Firebase. Click on the 'Web Development' service card to check out our latest live projects.";
    } else if(lowered.includes('ai') || lowered.includes('automation')) {
      responseText = "We build custom automation systems that run tasks automatically using databases and AI models. Click on our 'AI Automation Services' card to learn more.";
    }

    panel.innerHTML += `
      <div class="bg-neutral-900 text-neutral-300 p-3 rounded-xl rounded-tl-none border border-neutral-800/60 max-w-[85%]">
        ${responseText}
      </div>
    `;
    panel.scrollTop = panel.scrollHeight;
  }, 750);
};

const chatInput = document.getElementById('chat-user-input');
if (chatInput) {
  chatInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') window.processChatMessage();
  });
}

// Initialize Engines on Window Context Load
window.addEventListener('DOMContentLoaded', () => {
  setupMultiCanvasEngine();
  runGlobalAssemblyLoop();
});
window.addEventListener('resize', setupMultiCanvasEngine);