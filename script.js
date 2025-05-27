const datasCorretas = ["29112021", "06122021", "10122021"]; // ddmmaaaa
let etapa = 1;
let entradaAtual = "";

document.addEventListener("DOMContentLoaded", () => {
  criarTeclado("teclado1");
  criarTeclado("teclado2");
  criarTeclado("teclado3");
  atualizarDisplay();
});

function criarTeclado(id) {
  const container = document.getElementById(id);
  const numeros = ["1","2","3","4","5","6","7","8","9","←","0"];
  numeros.forEach(num => {
    const btn = document.createElement("button");
    btn.textContent = num;
    btn.onclick = () => {
      if (num === "←") {
        entradaAtual = entradaAtual.slice(0, -1);
      } else if (entradaAtual.length < 8) {
        entradaAtual += num;
      }
      atualizarDisplay();

      if (entradaAtual.length === 8) {
        setTimeout(verificarData, 200);
      }
    };
    container.appendChild(btn);
  });
}

function atualizarDisplay() {
  const campo = document.getElementById(`data${etapa}`);

  let raw = entradaAtual;
  let dataFormatada = "";

  if (raw.length >= 2) {
    dataFormatada += raw.slice(0, 2) + "/";
  } else {
    dataFormatada += raw;
  }

  if (raw.length >= 4) {
    dataFormatada += raw.slice(2, 4) + "/";
  } else if (raw.length > 2) {
    dataFormatada += raw.slice(2);
  }

  if (raw.length > 4) {
    dataFormatada += raw.slice(4);
  }

  campo.textContent = dataFormatada;
  document.getElementById("erro").textContent = "";
}


function verificarData() {
  const campo = document.getElementById(`data${etapa}`);

  if (entradaAtual === datasCorretas[etapa - 1]) {
    campo.style.backgroundColor = "#4caf50"; // verde
    setTimeout(() => {
      mostrarConfirmacao();
      campo.style.backgroundColor = "#3b3b3b"; // volta ao normal
    }, 800);
  } else {
    campo.style.backgroundColor = "#e53935"; // vermelho
    document.getElementById("erro").textContent = "Data incorreta!";
    setTimeout(() => {
      entradaAtual = "";
      atualizarDisplay();
      campo.style.backgroundColor = "#3b3b3b"; // volta ao normal
    }, 1000);
  }
}

function mostrarConfirmacao() {
  document.getElementById(`tela${etapa}`).style.display = "none";
  document.getElementById(`confirmacao${etapa}`).style.display = "flex";

  setTimeout(() => {
    document.getElementById(`confirmacao${etapa}`).style.display = "none";
    if (etapa < 3) {
      etapa++;
      entradaAtual = "";
      document.getElementById(`tela${etapa}`).style.display = "flex";
      atualizarDisplay();
    } else {
      mostrarConteudo();
    }
  }, 1300);
}

function mostrarConteudo() {
  document.getElementById("conteudo").style.display = "flex";
}

// Funcionalidade do carrossel de imagens
let currentIndex = 0;
const imagens = document.querySelectorAll('.imagens img');
const indicadores = document.querySelectorAll('.indicador');

// Função para mostrar a imagem correspondente ao índice
function mostrarImagem(index) {
  const width = imagens[0].clientWidth;
  document.querySelector('.imagens').style.transform = `translateX(-${index * width}px)`;

  // Remove a classe 'active' de todos os indicadores
  indicadores.forEach(indicator => indicator.classList.remove('ativo'));
  
  // Adiciona a classe 'active' ao indicador correspondente ao índice
  indicadores[index].classList.add('ativo');
}

// Mostra a próxima imagem automaticamente a cada 3 segundos
setInterval(() => {
  currentIndex = (currentIndex + 1) % imagens.length;
  mostrarImagem(currentIndex);
}, 3000);

// Adiciona evento de clique nos indicadores para mudar a imagem
indicadores.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index;  // Atualiza o índice para o que foi clicado
    mostrarImagem(currentIndex); // Muda a imagem correspondente
  });
});

function atualizarContagem() {
  const inicio = new Date(2021, 11, 6, 11, 40, 0); // 6 de Dezembro de 2021 (mês 11)
  const agora = new Date();

  let anos = agora.getFullYear() - inicio.getFullYear();
  let meses = agora.getMonth() - inicio.getMonth();
  let dias = agora.getDate() - inicio.getDate();
  let horas = agora.getHours() - inicio.getHours();
  let minutos = agora.getMinutes() - inicio.getMinutes();
  let segundos = agora.getSeconds() - inicio.getSeconds();

  // Ajustes para valores negativos (em cascata)
  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }

  if (minutos < 0) {
    minutos += 60;
    horas--;
  }

  if (horas < 0) {
    horas += 24;
    dias--;
  }

  if (dias < 0) {
    const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
    dias += mesAnterior.getDate();
    meses--;
  }

  if (meses < 0) {
    meses += 12;
    anos--;
  }

  const tempoEl = document.getElementById("tempo");
  if (tempoEl) {
    tempoEl.textContent = `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
  }
}

setInterval(atualizarContagem, 1000);
atualizarContagem();

let isDragging = false; // Para verificar se o usuário está arrastando
let startX, scrollLeft; // Para controlar a posição inicial e o deslocamento

// Seleciona a área das imagens do carrossel
const carrossel = document.querySelector('.carrossel');
const imagens2 = document.querySelector('.imagens');
const indicadores2 = document.querySelector('.indicadores'); // Seleciona os indicadores

// Impede o arraste na área dos indicadores
indicadores.addEventListener('mousedown', (e) => {
  e.preventDefault(); // Impede a interação de arraste nos indicadores
});

// Evento para iniciar o arraste no computador
carrossel.addEventListener('mousedown', (e) => {
  // Verifica se a área onde o clique aconteceu está dentro da parte de imagens
  if (e.target !== imagens) return; // Não inicia o arraste se for nos indicadores

  isDragging = true;
  startX = e.pageX - carrossel.offsetLeft; // Posição inicial
  scrollLeft = carrossel.scrollLeft; // Posição atual do scroll
});

// Evento para mover o carrossel durante o arraste no computador
carrossel.addEventListener('mousemove', (e) => {
  if (!isDragging) return; // Se não estiver arrastando, nada acontece
  e.preventDefault(); // Impede o comportamento padrão do mouse
  const x = e.pageX - carrossel.offsetLeft; // Posição do mouse
  const walk = (x - startX) * 3; // A velocidade do arraste
  carrossel.scrollLeft = scrollLeft - walk; // Atualiza a posição do scroll
  atualizarIndicadores(); // Atualiza a posição dos indicadores durante o arraste
});

// Evento para finalizar o arraste no computador
carrossel.addEventListener('mouseup', () => {
  isDragging = false; // Finaliza o arraste
});

// Evento para iniciar o arraste em dispositivos móveis
carrossel.addEventListener('touchstart', (e) => {
  if (e.target !== imagens) return; // Não inicia o arraste se for nos indicadores

  isDragging = true;
  startX = e.touches[0].pageX - carrossel.offsetLeft; // Posição inicial
  scrollLeft = carrossel.scrollLeft; // Posição atual do scroll
});

// Evento para mover o carrossel durante o arraste em dispositivos móveis
carrossel.addEventListener('touchmove', (e) => {
  if (!isDragging) return; // Se não estiver arrastando, nada acontece
  e.preventDefault(); // Impede o comportamento padrão do toque
  const x = e.touches[0].pageX - carrossel.offsetLeft; // Posição do toque
  const walk = (x - startX) * 3; // A velocidade do arraste
  carrossel.scrollLeft = scrollLeft - walk; // Atualiza a posição do scroll
  atualizarIndicadores(); // Atualiza a posição dos indicadores durante o arraste
});

// Evento para finalizar o arraste em dispositivos móveis
carrossel.addEventListener('touchend', () => {
  isDragging = false; // Finaliza o arraste
});

// Função para atualizar os indicadores
function atualizarIndicadores() {
  const totalImagens = imagens.children.length;
  const larguraImagem = carrossel.offsetWidth;
  const indexAtual = Math.round(carrossel.scrollLeft / larguraImagem);

  // Atualiza a classe de indicador ativo
  const indicadoresArray = Array.from(indicadores.children);
  indicadoresArray.forEach((indicador, index) => {
    if (index === indexAtual) {
      indicador.classList.add('ativo');
    } else {
      indicador.classList.remove('ativo');
    }
  });
}

// Função para ajustar o scroll do carrossel conforme os indicadores
function ajustarScrollCarrossel(index) {
  const larguraImagem = carrossel.offsetWidth;
  carrossel.scrollLeft = index * larguraImagem; // Atualiza a posição do scroll
}

// Adiciona event listener para os indicadores
document.querySelectorAll('.indicado').forEach((indicador, index) => {
  indicador.addEventListener('click', () => ajustarScrollCarrossel(index));
});
