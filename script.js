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
    campo.style.backgroundColor = "#4caf50";
    setTimeout(() => {
      mostrarConfirmacao();
      campo.style.backgroundColor = "#3b3b3b";
    }, 800);
  } else {
    campo.style.backgroundColor = "#e53935";
    document.getElementById("erro").textContent = "Data incorreta!";
    setTimeout(() => {
      entradaAtual = "";
      atualizarDisplay();
      campo.style.backgroundColor = "#3b3b3b";
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

let currentIndex = 0;
const imagens = document.querySelectorAll('.imagens img');
const indicadores = document.querySelectorAll('.indicador');

function mostrarImagem(index) {
  const width = imagens[0].clientWidth;
  document.querySelector('.imagens').style.transform = `translateX(-${index * width}px)`;

  indicadores.forEach(indicator => indicator.classList.remove('ativo'));
  
  indicadores[index].classList.add('ativo');
}

setInterval(() => {
  currentIndex = (currentIndex + 1) % imagens.length;
  mostrarImagem(currentIndex);
}, 3000);

indicadores.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index;
    mostrarImagem(currentIndex);
  });
});

function atualizarContagem() {
  const inicio = new Date(2021, 11, 6, 11, 40, 0);
  const agora = new Date();

  let anos = agora.getFullYear() - inicio.getFullYear();
  let meses = agora.getMonth() - inicio.getMonth();
  let dias = agora.getDate() - inicio.getDate();
  let horas = agora.getHours() - inicio.getHours();
  let minutos = agora.getMinutes() - inicio.getMinutes();
  let segundos = agora.getSeconds() - inicio.getSeconds();

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

let isDragging = false;
let startX, scrollLeft;

const carrossel = document.querySelector('.carrossel');
const imagens2 = document.querySelector('.imagens');
const indicadores2 = document.querySelector('.indicadores');

indicadores.addEventListener('mousedown', (e) => {
  e.preventDefault();
});

carrossel.addEventListener('mousedown', (e) => {
  if (e.target !== imagens) return;

  isDragging = true;
  startX = e.pageX - carrossel.offsetLeft;
  scrollLeft = carrossel.scrollLeft;
});

carrossel.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - carrossel.offsetLeft;
  const walk = (x - startX) * 3;
  carrossel.scrollLeft = scrollLeft - walk;
  atualizarIndicadores();
});

carrossel.addEventListener('mouseup', () => {
  isDragging = false;
});

carrossel.addEventListener('touchstart', (e) => {
  if (e.target !== imagens) return;

  isDragging = true;
  startX = e.touches[0].pageX - carrossel.offsetLeft;
  scrollLeft = carrossel.scrollLeft;
});

carrossel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.touches[0].pageX - carrossel.offsetLeft;
  const walk = (x - startX) * 3;
  carrossel.scrollLeft = scrollLeft - walk;
  atualizarIndicadores();
});

carrossel.addEventListener('touchend', () => {
  isDragging = false;
});

function atualizarIndicadores() {
  const totalImagens = imagens.children.length;
  const larguraImagem = carrossel.offsetWidth;
  const indexAtual = Math.round(carrossel.scrollLeft / larguraImagem);

  const indicadoresArray = Array.from(indicadores.children);
  indicadoresArray.forEach((indicador, index) => {
    if (index === indexAtual) {
      indicador.classList.add('ativo');
    } else {
      indicador.classList.remove('ativo');
    }
  });
}

function ajustarScrollCarrossel(index) {
  const larguraImagem = carrossel.offsetWidth;
  carrossel.scrollLeft = index * larguraImagem;
}

document.querySelectorAll('.indicado').forEach((indicador, index) => {
  indicador.addEventListener('click', () => ajustarScrollCarrossel(index));
});
