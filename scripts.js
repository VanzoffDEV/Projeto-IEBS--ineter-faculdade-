document.addEventListener('DOMContentLoaded', () => {

  // --- 1. PEGA OS ELEMENTOS ---
  const btnAdicionarVideo = document.getElementById('btn-adicionar-video');
  const listaVideosContainer = document.getElementById('lista-videos-container');
  const videoPrincipalContainer = document.getElementById('video-principal-container'); 

  // --- 2. VÍDEO PADRÃO ---
  // Troque o título e a URL para o vídeo que você quer que apareça
  // quando a página carregar (com base na sua screenshot)
  let videoPrincipalAtual = {
    titulo: 'CULTO DA FAMÍLIA',
    url: 'https://www.youtube.com/watch?v=jyKM74i01yo' // MUDE PARA O LINK DO VÍDEO REAL
  };

  // --- 3. FUNÇÕES AUXILIARES (NÃO MUDAM) ---
  
  // Converte URL do YouTube para URL de embed
  function getEmbedUrl(urlVideo) {
    let videoId = '';
    if (urlVideo.includes("youtube.com/watch?v=")) {
      videoId = urlVideo.split("v=")[1].split("&")[0];
    } else if (urlVideo.includes("youtu.be/")) {
      videoId = urlVideo.split("youtu.be/")[1].split("?")[0];
    } else if (urlVideo.includes("youtube.com/embed/")) {
      // Já é um link de embed, só retorna
      return urlVideo;
    }
    
    if(videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return ''; // Retorna vazio se não for um link do YouTube válido
  }

  // Cria e retorna um elemento iframe para o vídeo
  function criarIframeVideo(embedUrl) {
    const iframeVideo = document.createElement('iframe');
    iframeVideo.src = embedUrl;
    iframeVideo.setAttribute('frameborder', '0');
    iframeVideo.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframeVideo.setAttribute('allowfullscreen', '');
    return iframeVideo;
  }

  // --- 4. FUNÇÕES PRINCIPAIS (NÃO MUDAM) ---

  // ADICIONA VÍDEO NA LISTA (com 'prepend' para ir para o topo)
  function adicionarVideoNaLista(titulo, urlOriginal) {
    const embedUrl = getEmbedUrl(urlOriginal);
    if (!embedUrl) return;

    const videoItemDiv = document.createElement('div');
    videoItemDiv.classList.add('video-item');

    const tituloH3 = document.createElement('h3');
    tituloH3.textContent = titulo;

    const iframeVideo = criarIframeVideo(embedUrl);

    videoItemDiv.appendChild(tituloH3);
    videoItemDiv.appendChild(iframeVideo);

    listaVideosContainer.prepend(videoItemDiv); // <- Usando prepend
  }

  // ATUALIZA O VÍDEO PRINCIPAL
  function atualizarVideoPrincipal(titulo, urlOriginal) {
    const embedUrl = getEmbedUrl(urlOriginal);
    if (!embedUrl) return;

    videoPrincipalContainer.innerHTML = '';
    const iframeVideo = criarIframeVideo(embedUrl);
    videoPrincipalContainer.appendChild(iframeVideo);

    videoPrincipalAtual = { titulo, url: urlOriginal }; // Salva a URL original
  }

  // CARREGA O PRIMEIRO VÍDEO
  function carregarPrimeiroVideoPrincipal() {
    if (videoPrincipalAtual.url) {
      atualizarVideoPrincipal(videoPrincipalAtual.titulo, videoPrincipalAtual.url);
    }
  }

  // --- 5. A GRANDE MUDANÇA ESTÁ AQUI ---
  // 
  // O código de clique do botão '+' só vai ser
  // preparado SE o botão existir na página.
  //
  // Isso evita erros no 'index.html', que não tem o botão.
  
  if (btnAdicionarVideo) {
    
    // Se o botão existe (estamos no admin.html), adicione o evento
    btnAdicionarVideo.addEventListener('click', () => {
      
      // 1. Pega as informações do vídeo principal ATUAL
      const tituloAntigo = videoPrincipalAtual.titulo;
      const urlAntiga = videoPrincipalAtual.url; 

      // 2. Adiciona o vídeo principal antigo à lista de vídeos
      if (tituloAntigo && urlAntiga) {
        adicionarVideoNaLista(tituloAntigo, urlAntiga);
      }

      // 3. Pede as informações do NOVO vídeo ao usuário
      const novoTitulo = prompt('Digite o título do NOVO vídeo principal:');
      if (!novoTitulo) return; 

      const novaUrl = prompt('Digite a URL do NOVO vídeo principal do YouTube:');
      if (!novaUrl) return; 

      // 4. Atualiza o vídeo principal com o novo vídeo
      atualizarVideoPrincipal(novoTitulo, novaUrl);
    });

  } // --- FIM DA VERIFICAÇÃO ---


  // --- 6. CARREGAMENTO INICIAL ---
  // Isso roda nas duas páginas (index.html e admin.html)
  // para que ambas mostrem o vídeo principal.
  carregarPrimeiroVideoPrincipal();

});