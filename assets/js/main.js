/* =========================================================
   STAY COWORKING — main.js
   Sistema de unidades + interações do site
   ========================================================= */
(function () {
  'use strict';

  /* -------------------------------------------------------
     1) UNIDADES
     Cada unidade agora vive na sua própria pasta (raiz = Oeste,
     /sul/ = Sul), porque as duas têm espaços diferentes — então
     trocar de unidade navega para a página correspondente na
     outra pasta, em vez de só re-renderizar o texto.
     Este objeto ainda alimenta telefone/endereço/WhatsApp/mapa
     de cada página via atributos data-unit-*.

     ATENÇÃO: o endereço da unidade Sul abaixo é um placeholder
     (ainda não confirmado pelo cliente) — atualize `endereco`,
     `enderecoCurto`, `mapa` e `mapaLink` assim que tiver o
     endereço real.
     ------------------------------------------------------- */
  var UNIDADES = {
    oeste: {
      id: 'oeste',
      nome: 'Stay Oeste',
      curto: 'Oeste',
      resumo: 'Setor Oeste · Rua 22, nº 431 — a unidade original, no coração de Goiânia.',
      endereco: 'Rua 22, nº 431, Qd. H10, Lt. 24 — Setor Oeste, Goiânia/GO',
      enderecoCurto: 'Rua 22, nº 431 — Setor Oeste',
      bairro: 'Setor Oeste',
      telefone: '62 3602-0711',
      telefoneLink: 'tel:+556236020711',
      whatsapp: '5562991486262',
      whatsappLabel: '(62) 99148-6262',
      horario: 'Seg a Sex, das 08:00 às 18:00',
      mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.7264129020773!2d-49.27059758474287!3d-16.6905685884997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1f14a8e2031%3A0x40fd924881abb920!2sStay%20Coworking%20%26%20Caf%C3%A9!5e0!3m2!1spt-BR!2sbr!4v1567629355777!5m2!1spt-BR!2sbr',
      mapaLink: 'https://www.google.com/maps/search/?api=1&query=Rua+22,+431,+Setor+Oeste,+Goi%C3%A2nia+-+GO'
    },
    sul: {
      id: 'sul',
      nome: 'Stay Sul',
      curto: 'Sul',
      resumo: 'Setor Sul · salas privativas e Sala Gates para reuniões de até 8 pessoas.',
      endereco: 'R. 127, 273 — Setor Sul, Goiânia/GO, 74093-090',
      enderecoCurto: 'R. 127, 273 — Setor Sul',
      bairro: 'Setor Sul',
      telefone: '62 99848-0123',
      telefoneLink: 'tel:+556299848123',
      whatsapp: '5562998480123',
      whatsappLabel: '(62) 99848-0123',
      horario: 'Seg a Sex, das 08:00 às 18:00',
      mapa: 'https://www.google.com/maps?q=R.+127,+273,+Setor+Sul,+Goi%C3%A2nia+-+GO&output=embed',
      mapaLink: 'https://www.google.com/maps/search/?api=1&query=R.+127,+273,+Setor+Sul,+Goi%C3%A2nia+-+GO'
    }
  };

  /* -------------------------------------------------------
     1b) AVALIAÇÕES DO GOOGLE
     Dados agregados confirmados no perfil do Google (jul/2026):
     nota 4,9 · 87 avaliações · CID 0x935ef1f14a8e2031:0x40fd924881abb920

     Cada item do array vira um card do carrossel (3 por vez no desktop).
     Cole aqui as avaliações do painel do Google Meu Negócio:
       { nome:'Nome do autor', nota:5, data:'mar/2026', texto:'...' }
     ------------------------------------------------------- */
  /* Avaliações reais, extraídas dos links de avaliação do Google enviados
     pelo cliente (jul/2026). Se a Places API (ver GOOGLE abaixo) estiver
     configurada, ela assume automaticamente — este array é o retorno
     caso a chave não exista ou a chamada falhe. */
  var AVALIACOES = [
    {
      nome: 'Sara Emilly',
      nota: 5,
      data: '4 meses atrás',
      texto: 'Excelente local, amei o ambiente calmo, limpinho e super cheiroso. Além da recepcionista ser super educada. Estão de parabéns com o ambiente.',
      foto: 'https://lh3.googleusercontent.com/a/ACg8ocLXdDIO4m1FZAz0TP2y9I1vb_rR4SVMSH-eHzdvrLDLvj5aBg=w80-h80-p-rp-mo-ba12-br100'
    },
    {
      nome: 'Rodrigo Vieira',
      nota: 5,
      data: '9 meses atrás',
      texto: 'O Stay Coworking é um espaço simplesmente sensacional! Estrutura moderna, ambientes confortáveis e uma energia que realmente inspira produtividade. A equipe é super acolhedora e sempre disposta a ajudar. Sem dúvida, o melhor coworking de Goiânia para quem busca um lugar que une profissionalismo, criatividade e bem-estar!',
      foto: 'https://lh3.googleusercontent.com/a-/ALV-UjXDr8Z8F6n5NFTfOX8rpMTmNk-on6Ce8HmzaWR_PbMvjhQv62wE=w80-h80-p-rp-mo-ba12-br100'
    },
    {
      nome: 'Edmilson Costa Filho',
      nota: 5,
      data: '9 meses atrás',
      texto: 'Local excelente, organizado, com total infraestrutura. Recomendo a todos.',
      foto: 'https://lh3.googleusercontent.com/a-/ALV-UjWWOMEQl1mRMawhLAY9nQgEKDew2oJWkO7IhCVIPnZ7VUAyVy8=w80-h80-p-rp-mo-br100'
    },
    {
      nome: 'Carlos Henrique',
      nota: 5,
      data: '3 meses atrás',
      texto: 'Sou prestador de serviço, volta e meia tenho que ir lá, sempre sou muito bem atendido e acho o ambiente bem aconchegante.',
      foto: 'https://lh3.googleusercontent.com/a-/ALV-UjXqiHiIAct_j_NQBukt7xf2x_w581oJA0yxQPbYZTd93ojKNTL7OQ=w80-h80-p-rp-mo-ba12-br100'
    },
    {
      nome: 'Vanessa Lopes',
      nota: 5,
      data: 'um ano atrás',
      texto: 'Ambiente confortável e excelente atendimento.',
      foto: 'https://lh3.googleusercontent.com/a-/ALV-UjUO2RedHYQ0pda4ywokf9Fk8NRXiyuE-w_JdqzWyZzeWQtLJ3V_bg=w80-h80-p-rp-mo-br100'
    },
    {
      nome: 'O Melhor do Goiás',
      nota: 5,
      data: '4 anos atrás',
      texto: 'Espaço maravilhoso. Excelente opção de trabalho. Gostamos muito de todo o ambiente e opções. Obrigado pela receptividade, Mari!',
      foto: 'https://lh3.googleusercontent.com/a/ACg8ocL8qdSm-dchJ_OEQuQP48JWVtzw87mirnVaMZ0lyk9GU5tyng=w80-h80-p-rp-mo-ba12-br100'
    },
    {
      nome: 'Lúcio Luiz',
      nota: 5,
      data: '5 anos atrás',
      texto: 'Hoje tenho um espaço que posso chamar de escritório. Nunca fui tão bem atendido em um coworking como no Stay Coworking. Salas, mesas, cadeiras, tudo novinho e organizado. Super indico!',
      foto: 'https://lh3.googleusercontent.com/a-/ALV-UjWXpMH1mmWWz_0EgH8BVszH3FQJUYtajZfIyTDlSSnwkPr6JwGB_w=w80-h80-p-rp-mo-ba12-br100'
    },
    {
      nome: 'maycon mendes',
      nota: 5,
      data: '6 anos atrás',
      texto: 'Ótimo atendimento, espaço aconchegante e moderno, superou minhas expectativas.',
      foto: 'https://lh3.googleusercontent.com/a/ACg8ocIi3RYaVsbq2S2h8RNkv-6vr5JOOLETSdSXASfMUxdz05KqXQ=w80-h80-p-rp-mo-ba12-br100'
    },
    {
      nome: 'Giselle Alves',
      nota: 5,
      data: '3 anos atrás',
      texto: 'Local agradável, organizado, com salas completas para atendimento aos usuários e seus clientes, além de contar com uma recepcionista sempre atenta às necessidades dos clientes. Utilizo as salas para atendimento e assinatura de contratos, e sempre elogiam o local. Atende perfeitamente minhas demandas!',
      foto: 'https://lh3.googleusercontent.com/a-/ALV-UjXca7Rt_AY_E2YKhyubnbIV2p7f2m6I-39T-A-qAqXlKGAS9khY=w80-h80-p-rp-mo-ba12-br100'
    },
    {
      nome: 'Mírian Rosa',
      nota: 5,
      data: '2 anos atrás',
      texto: 'Excelente atendimento e boa estrutura.',
      foto: 'https://lh3.googleusercontent.com/a-/ALV-UjU-pAFEL4O1F8atfM3mk4mORVw9mbsofso25HgYEBVfYga2ouXt=w80-h80-p-rp-mo-ba12-br100'
    }
  ];

  /* -------------------------------------------------------
     1c) INTEGRAÇÃO COM A GOOGLE PLACES API (opcional)

     Com a chave preenchida, o carrossel passa a buscar as
     avaliações direto do Google a cada carregamento — e a
     nota e a contagem do bloco de destaque se atualizam
     sozinhas. Sem chave, o site usa o array AVALIACOES acima.

     Como obter a chave:
       1. console.cloud.google.com → crie um projeto
       2. Ative "Maps JavaScript API" e "Places API (New)"
       3. Credenciais → Criar credencial → Chave de API
       4. RESTRINJA a chave: "Sites" → staycoworking.com.br/*
          (sem restrição, a chave pode ser usada por terceiros
           e a fatura vai para você)
       5. Cole a chave em `apiKey` abaixo

     Observação: a API devolve no máximo 5 avaliações — é um
     limite do Google, não do site.
     ------------------------------------------------------- */
  var GOOGLE = {
    apiKey: '',                     // <<< cole aqui a chave de API restrita
    placeId: '',                    // opcional: se souber o Place ID (ChIJ...), cole aqui
    consulta: 'Stay Coworking e Café, Rua 22, 431, Setor Oeste, Goiânia, GO',
    idioma: 'pt-BR'
  };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /** A unidade é determinada pela pasta em que a página está (raiz = Oeste,
      /sul/ = Sul) — não por preferência salva, já que cada unidade agora
      tem espaços/páginas próprias e não dá pra "trocar" o conteúdo no lugar. */
  function pastaAtual() {
    return /\/sul\//.test(window.location.pathname) ? 'sul' : 'oeste';
  }

  function unidadeAtual() {
    return UNIDADES[pastaAtual()] || UNIDADES.oeste;
  }

  function msgWhats(u) {
    return encodeURIComponent(
      'Olá! Vim pelo site da Stay Coworking e quero saber mais sobre a unidade ' + u.curto + '.'
    );
  }

  /** Aplica os dados da unidade em toda a página. */
  function aplicarUnidade(u) {
    // Textos
    $$('[data-unit-text]').forEach(function (el) {
      var chave = el.getAttribute('data-unit-text');
      if (u[chave] != null) el.textContent = u[chave];
    });

    // Links de WhatsApp (mantém mensagem customizada quando houver data-wa-msg)
    $$('[data-unit-wa]').forEach(function (el) {
      var msg = el.getAttribute('data-wa-msg');
      el.href = 'https://wa.me/' + u.whatsapp + '?text=' + (msg ? encodeURIComponent(msg) : msgWhats(u));
    });

    // Telefone
    $$('[data-unit-tel]').forEach(function (el) { el.href = u.telefoneLink; });

    // Mapa
    $$('[data-unit-map]').forEach(function (el) { el.src = u.mapa; });
    $$('[data-unit-maplink]').forEach(function (el) { el.href = u.mapaLink; });

    // Estado do seletor
    $$('[data-unit-current]').forEach(function (el) { el.textContent = u.curto; });
    $$('.unit__opt').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-unit-id') === u.id);
      var chk = $('.unit__check', b);
      if (chk) chk.style.display = b.getAttribute('data-unit-id') === u.id ? '' : 'none';
    });

    document.documentElement.setAttribute('data-unidade', u.id);
  }

  /** Troca de unidade = navegar para a mesma página na pasta da outra
      unidade (raiz ↔ /sul/), já que os espaços são diferentes entre elas. */
  function selecionarUnidade(id) {
    if (!UNIDADES[id]) return;
    fecharMenus();
    var atual = pastaAtual();
    if (id === atual) return;
    var pagina = (document.body.getAttribute('data-page') || 'index') + '.html';
    var destino = id === 'sul' ? 'sul/' + pagina : (atual === 'sul' ? '../' + pagina : pagina);
    window.location.href = destino;
  }

  /* -------------------------------------------------------
     2) SELETOR DE UNIDADE (dropdown)
     ------------------------------------------------------- */
  function fecharMenus() {
    $$('.unit__menu').forEach(function (m) { m.classList.remove('is-open'); });
    $$('.unit__btn').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  }

  function initUnidades() {
    aplicarUnidade(unidadeAtual());

    $$('.unit__btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var menu = btn.parentElement.querySelector('.unit__menu');
        var aberto = menu.classList.contains('is-open');
        fecharMenus();
        if (!aberto) {
          menu.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    $$('.unit__opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        selecionarUnidade(opt.getAttribute('data-unit-id'));
      });
    });

    document.addEventListener('click', fecharMenus);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharMenus(); });
  }

  /* -------------------------------------------------------
     3) HEADER + MENU MOBILE
     ------------------------------------------------------- */
  function initHeader() {
    var header = $('.header');
    if (header) {
      var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    var burger = $('.burger');
    var nav = $('.mobile-nav');
    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
      var aberto = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', aberto);
      burger.setAttribute('aria-expanded', String(aberto));
      document.body.style.overflow = aberto ? 'hidden' : '';
    });

    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* -------------------------------------------------------
     4) FILTRO DE ESPAÇOS
     ------------------------------------------------------- */
  function initFiltros() {
    var filtros = $$('.filter');
    if (!filtros.length) return;
    var cards = $$('[data-cat]');

    filtros.forEach(function (f) {
      f.addEventListener('click', function () {
        filtros.forEach(function (x) { x.classList.remove('is-active'); });
        f.classList.add('is-active');
        var alvo = f.getAttribute('data-filter');
        cards.forEach(function (c) {
          var cats = (c.getAttribute('data-cat') || '').split(' ');
          c.classList.toggle('is-hidden', alvo !== 'all' && cats.indexOf(alvo) === -1);
        });
      });
    });
  }

  /* -------------------------------------------------------
     5) FAQ
     ------------------------------------------------------- */
  function initFaq() {
    $$('.faq__q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.faq__item');
        var painel = $('.faq__a', item);
        var aberto = item.classList.contains('is-open');

        $$('.faq__item.is-open').forEach(function (o) {
          o.classList.remove('is-open');
          $('.faq__a', o).style.maxHeight = null;
          $('.faq__q', o).setAttribute('aria-expanded', 'false');
        });

        if (!aberto) {
          item.classList.add('is-open');
          painel.style.maxHeight = painel.scrollHeight + 'px';
          q.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* -------------------------------------------------------
     6) LIGHTBOX
     ------------------------------------------------------- */
  function initLightbox() {
    var gatilhos = $$('[data-lightbox]');
    if (!gatilhos.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML =
      '<button class="lightbox__close" aria-label="Fechar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
      '<button class="lightbox__nav prev" aria-label="Anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>' +
      '<img alt="">' +
      '<button class="lightbox__nav next" aria-label="Próxima"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></button>';
    document.body.appendChild(box);

    var img = $('img', box);
    var atual = 0;

    function abrir(i) {
      atual = (i + gatilhos.length) % gatilhos.length;
      var origem = $('img', gatilhos[atual]) || gatilhos[atual];
      img.src = gatilhos[atual].getAttribute('data-lightbox') || origem.src;
      img.alt = origem.alt || '';
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function fechar() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    gatilhos.forEach(function (g, i) { g.addEventListener('click', function () { abrir(i); }); });
    $('.lightbox__close', box).addEventListener('click', fechar);
    $('.prev', box).addEventListener('click', function (e) { e.stopPropagation(); abrir(atual - 1); });
    $('.next', box).addEventListener('click', function (e) { e.stopPropagation(); abrir(atual + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) fechar(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') fechar();
      if (e.key === 'ArrowLeft') abrir(atual - 1);
      if (e.key === 'ArrowRight') abrir(atual + 1);
    });
  }

  /* -------------------------------------------------------
     7) FORMULÁRIO → WHATSAPP
     ------------------------------------------------------- */
  function initForm() {
    $$('form[data-wa-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var u = unidadeAtual();
        var d = new FormData(form);
        var linhas = [
          'Olá, Stay! Vim pelo site.',
          '',
          'Nome: ' + (d.get('nome') || '—'),
          'Interesse: ' + (d.get('interesse') || '—'),
          'Unidade: ' + u.nome
        ];
        var obs = d.get('mensagem');
        if (obs) linhas.push('Observação: ' + obs);
        window.open('https://wa.me/' + u.whatsapp + '?text=' + encodeURIComponent(linhas.join('\n')), '_blank', 'noopener');
      });
    });
  }

  /* -------------------------------------------------------
     8) REVEAL ON SCROLL
     ------------------------------------------------------- */
  function initReveal() {
    var alvos = $$('.reveal');
    if (!alvos.length) return;
    if (!('IntersectionObserver' in window)) {
      alvos.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px' });
    alvos.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });
  }

  /* -------------------------------------------------------
     9) CONTADORES
     ------------------------------------------------------- */
  function initContadores() {
    var alvos = $$('[data-count]');
    if (!alvos.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var fim = parseFloat(el.getAttribute('data-count'));
        var suf = el.getAttribute('data-suffix') || '';
        var ini = performance.now();
        (function passo(t) {
          var p = Math.min((t - ini) / 1200, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(fim * eased).toLocaleString('pt-BR') + suf;
          if (p < 1) requestAnimationFrame(passo);
        })(ini);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    alvos.forEach(function (el) { io.observe(el); });
  }

  /* -------------------------------------------------------
     9b) CARROSSEL DE AVALIAÇÕES DO GOOGLE
     ------------------------------------------------------- */
  var SVG_ESTRELA = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.5 7 1-5 4.9 1.2 7L12 18l-6.2 3.4L7 14.4 2 9.5l7-1L12 2Z"/></svg>';

  /* Logo oficial do Google — path verificado (Wikimedia Commons,
     "Google G logo.svg", viewBox 24x24), não mais reconstruído à mão.
     A versão anterior tinha curvas Bézier erradas e saía distorcida. */
  var GOOGLE_BADGE =
    '<span class="rev__g" aria-hidden="true">' +
    '<svg viewBox="0 0 24 24" width="24" height="24">' +
    '<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>' +
    '<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>' +
    '<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>' +
    '<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>' +
    '</svg></span>';

  function iniciais(nome) {
    return nome.split(/\s+/).slice(0, 2).map(function (p) { return p.charAt(0); }).join('').toUpperCase();
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function cardAvaliacao(a) {
    var nota = a.nota || 5;
    var estrelas = '';
    for (var i = 0; i < nota; i++) estrelas += SVG_ESTRELA;

    /* Sem loading="lazy": são avatares de 42px dentro de um carrossel
       horizontal, onde o cálculo de "distância até a viewport" do
       navegador nem sempre prioriza o carregamento corretamente. */
    var avatar = a.foto
      ? '<img class="rev__av rev__av--img" src="' + esc(a.foto) + '" alt="" referrerpolicy="no-referrer" ' +
        'onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'rev__av\',textContent:\'' + esc(iniciais(a.nome)) + '\'}))">'
      : '<span class="rev__av">' + esc(iniciais(a.nome)) + '</span>';

    var nome = a.url
      ? '<a href="' + esc(a.url) + '" target="_blank" rel="noopener"><b>' + esc(a.nome) + '</b></a>'
      : '<b>' + esc(a.nome) + '</b>';

    return '<article class="rev">' +
      '<div class="rev__top"><div class="rev__stars" aria-label="' + nota + ' de 5 estrelas">' + estrelas + '</div>' + GOOGLE_BADGE + '</div>' +
      '<p class="rev__txt">“' + esc(a.texto) + '”</p>' +
      '<div class="rev__who">' + avatar +
      '<div>' + nome + (a.data ? '<span>' + esc(a.data) + '</span>' : '') + '</div></div>' +
      '</article>';
  }

  var carrosselMontado = false;

  /* Carrossel por transform: .revs__track é a janela (overflow:hidden) e
     .revs__rail é o trilho que desliza dentro dela — o deslocamento vira
     uma transição CSS de transform, então trocar de página sempre anima
     como um slide, em vez de depender da rolagem nativa do navegador. */
  function renderAvaliacoes(lista) {
    var raiz = $('.revs');
    if (!raiz) return;

    var viewport = $('.revs__viewport', raiz);
    var track = $('.revs__track', raiz);
    var rail = $('.revs__rail', track);
    var dots = $('.revs__dots', raiz);
    var prev = $('.revs__btn.prev', raiz);
    var next = $('.revs__btn.next', raiz);
    var vazio = $('.revs__empty', raiz);

    /* Estado vazio: nunca destrói o markup do carrossel, só o esconde —
       assim um retorno posterior da API consegue preenchê-lo. */
    if (!lista.length) {
      viewport.hidden = true;
      dots.hidden = true;
      if (vazio) vazio.hidden = false;
      return;
    }

    if (vazio) vazio.hidden = true;
    viewport.hidden = false;
    dots.hidden = false;

    rail.innerHTML = lista.map(cardAvaliacao).join('');

    var cards = $$('.rev', rail);
    var paginaAtual = 0;

    var visiveis = function () {
      return Math.max(1, Math.round(track.clientWidth / (cards[0].offsetWidth + 24)));
    };
    /* Janela deslizante: cada clique avança 1 card (não um bloco de 3),
       então o card seguinte entra sozinho pela lateral a cada passo,
       compondo o trio visível aos poucos em vez de trocar tudo de vez. */
    var totalPosicoes = function () { return Math.max(1, cards.length - visiveis() + 1); };

    /* Looping: passar do último card volta ao primeiro (e vice-versa),
       em vez de travar nas pontas — módulo garante o índice sempre
       válido, mesmo vindo de -1 ou de total. */
    function posicionar(p) {
      var total = totalPosicoes();
      paginaAtual = ((p % total) + total) % total;
      var passo = cards[0].offsetWidth + 24;
      var alvo = paginaAtual * passo;
      var max = Math.max(0, rail.scrollWidth - track.clientWidth);
      rail.style.transform = 'translateX(-' + Math.min(alvo, max) + 'px)';
      sincronizar();
    }

    function montarDots() {
      var total = totalPosicoes();
      dots.innerHTML = '';
      dots.style.display = total < 2 ? 'none' : '';
      for (var i = 0; i < total; i++) {
        var b = document.createElement('button');
        b.className = 'revs__dot' + (i === 0 ? ' is-active' : '');
        b.setAttribute('aria-label', 'Ir para a avaliação ' + (i + 1));
        b.dataset.p = i;
        b.addEventListener('click', function () { posicionar(Number(this.dataset.p)); });
        dots.appendChild(b);
      }
    }

    function sincronizar() {
      $$('.revs__dot', dots).forEach(function (d, i) { d.classList.toggle('is-active', i === paginaAtual); });
      // looping: as setas nunca travam, só somem quando não há o que navegar
      prev.disabled = false;
      next.disabled = false;
      var some = cards.length <= visiveis();
      prev.style.display = some ? 'none' : '';
      next.style.display = some ? 'none' : '';
    }

    /* Os listeners são ligados uma única vez; um novo render (ex.: dados
       vindos do Google) só troca os cards e reposiciona o trilho. */
    if (!carrosselMontado) {
      prev.addEventListener('click', function () { posicionar(paginaAtual - 1); });
      next.addEventListener('click', function () { posicionar(paginaAtual + 1); });
      track.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') posicionar(paginaAtual + 1);
        if (e.key === 'ArrowLeft') posicionar(paginaAtual - 1);
      });
      // no resize a largura do card muda (breakpoints) — remonta os
      // indicadores e reposiciona sem o dado de página ficar obsoleto.
      window.addEventListener('resize', function () { montarDots(); posicionar(paginaAtual); });
      carrosselMontado = true;
    }

    montarDots();
    posicionar(0);
  }

  /* -------------------------------------------------------
     9c) GOOGLE PLACES API — avaliações ao vivo
     ------------------------------------------------------- */

  /** Carrega o bootstrap da Maps JavaScript API sob demanda. */
  function carregarMapsAPI() {
    if (window.google && window.google.maps && window.google.maps.importLibrary) {
      return Promise.resolve();
    }
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(GOOGLE.apiKey) +
              '&v=weekly&libraries=places&language=' + encodeURIComponent(GOOGLE.idioma) + '&region=BR';
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Falha ao carregar a Maps JavaScript API')); };
      document.head.appendChild(s);
    });
  }

  /** Converte uma review da Places API para o formato dos cards. */
  function normalizarReview(r) {
    var autor = r.authorAttribution || {};
    return {
      nome: autor.displayName || 'Avaliação no Google',
      nota: r.rating || 5,
      data: r.relativePublishTimeDescription || '',
      texto: (typeof r.text === 'string' ? r.text : (r.text && r.text.text) || '').trim(),
      foto: autor.photoURI || '',
      url: autor.uri || ''
    };
  }

  function atualizarNota(nota, total, uri) {
    var n = $('.rating__n');
    var c = $('.rating__count');
    if (n && typeof nota === 'number') n.textContent = nota.toFixed(1).replace('.', ',');
    if (c && typeof total === 'number') {
      c.textContent = total.toLocaleString('pt-BR') + ' avaliações no Google';
      var cta = $('.rating__cta .btn');
      if (cta) {
        cta.textContent = 'Ler as ' + total.toLocaleString('pt-BR') + ' avaliações no Google';
        if (uri) cta.href = uri;
      }
    }
  }

  function carregarAvaliacoesGoogle() {
    if (!GOOGLE.apiKey || !$('.revs')) return;

    carregarMapsAPI()
      .then(function () { return google.maps.importLibrary('places'); })
      .then(function (lib) {
        var Place = lib.Place;

        if (GOOGLE.placeId) return new Place({ id: GOOGLE.placeId });

        return Place.searchByText({
          textQuery: GOOGLE.consulta,
          fields: ['id'],
          language: GOOGLE.idioma,
          region: 'br',
          maxResultCount: 1
        }).then(function (res) {
          if (!res.places || !res.places.length) throw new Error('Local não encontrado na Places API');
          return res.places[0];
        });
      })
      .then(function (place) {
        return place.fetchFields({
          fields: ['displayName', 'rating', 'userRatingCount', 'reviews', 'googleMapsURI']
        }).then(function () { return place; });
      })
      .then(function (place) {
        atualizarNota(place.rating, place.userRatingCount, place.googleMapsURI);

        var lista = (place.reviews || [])
          .map(normalizarReview)
          .filter(function (r) { return r.texto; });

        if (lista.length) renderAvaliacoes(lista);
      })
      .catch(function (err) {
        // Falhou (chave inválida, cota, offline): mantém os cards estáticos.
        if (window.console) console.warn('[Stay] Avaliações do Google indisponíveis:', err.message);
      });
  }

  function initAvaliacoes() {
    renderAvaliacoes(AVALIACOES);
    carregarAvaliacoesGoogle();
  }

  /* -------------------------------------------------------
     10) ANO NO RODAPÉ
     ------------------------------------------------------- */
  function initAno() {
    $$('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* -------------------------------------------------------
     11) COOKIES — LGPD (Lei nº 13.709/2018)
     Nenhum cookie não essencial (ex.: Google Tag Manager) é
     carregado antes do usuário decidir. A escolha fica salva
     no localStorage e pode ser revista a qualquer momento pelo
     link "Preferências de cookies", injetado no rodapé.
     ------------------------------------------------------- */
  var COOKIE_KEY = 'stay.cookieConsent';
  var GTM_ID = 'GTM-WR3MW7B';
  var gtmCarregado = false;

  function lerConsentimento() {
    try {
      var bruto = localStorage.getItem(COOKIE_KEY);
      return bruto ? JSON.parse(bruto) : null;
    } catch (e) { return null; }
  }

  function salvarConsentimento(c) {
    try { localStorage.setItem(COOKIE_KEY, JSON.stringify(c)); } catch (e) { /* modo privado */ }
  }

  /** Bootstrap oficial do GTM, só é chamado depois do consentimento. */
  function carregarGTM() {
    if (gtmCarregado) return;
    gtmCarregado = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = document.getElementsByTagName('script')[0];
    var j = document.createElement('script');
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    f.parentNode.insertBefore(j, f);
  }

  function aplicarConsentimento(c) {
    if (c && c.analytics) carregarGTM();
  }

  function initCookieConsent() {
    var salvo = lerConsentimento();
    if (salvo) aplicarConsentimento(salvo);

    var bar = document.createElement('div');
    bar.className = 'cookiebar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Aviso de cookies');
    bar.innerHTML =
      '<div class="container cookiebar__in">' +
        '<p>Usamos cookies para melhorar sua experiência de navegação, em conformidade com a <b>Lei Geral de Proteção de Dados (LGPD)</b>. Você pode aceitar todos os cookies, rejeitar os não essenciais ou personalizar suas preferências em Configurações.</p>' +
        '<div class="cookiebar__actions">' +
          '<button class="btn btn--ghost btn--sm" type="button" data-cookie="settings">Configurações</button>' +
          '<button class="btn btn--ghost btn--sm" type="button" data-cookie="reject">Rejeitar</button>' +
          '<button class="btn btn--primary btn--sm" type="button" data-cookie="accept">Aceitar todos</button>' +
        '</div>' +
      '</div>';

    var modal = document.createElement('div');
    modal.className = 'cookiemodal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'cookiemodal-title');
    modal.innerHTML =
      '<div class="cookiemodal__box">' +
        '<button class="cookiemodal__close" type="button" aria-label="Fechar">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
        '</button>' +
        '<h3 id="cookiemodal-title" class="h4">Preferências de cookies</h3>' +
        '<p class="cookiemodal__intro">Utilizamos cookies para garantir o funcionamento do site e, com a sua permissão, para entender como você usa nossas páginas — em conformidade com a LGPD (Lei nº 13.709/2018). Veja as categorias abaixo:</p>' +
        '<div class="cookiemodal__cat">' +
          '<div class="cookiemodal__cat-head"><b>Cookies necessários</b><span class="cookiemodal__locked">Sempre ativos</span></div>' +
          '<p>Essenciais para a navegação e o funcionamento do site (menu, formulários, WhatsApp). Não podem ser desativados.</p>' +
        '</div>' +
        '<div class="cookiemodal__cat">' +
          '<div class="cookiemodal__cat-head"><b>Cookies de análise e desempenho</b>' +
            '<label class="cookiemodal__switch"><input type="checkbox" id="cookie-cat-analytics"><span></span></label>' +
          '</div>' +
          '<p>Nos ajudam a entender como os visitantes usam o site (Google Tag Manager), para melhorarmos sua experiência. Só são ativados com a sua autorização.</p>' +
        '</div>' +
        '<div class="cookiemodal__actions">' +
          '<button class="btn btn--ghost btn--sm" type="button" data-cookie="reject-all">Rejeitar todos</button>' +
          '<button class="btn btn--ghost btn--sm" type="button" data-cookie="save">Salvar preferências</button>' +
          '<button class="btn btn--primary btn--sm" type="button" data-cookie="accept-all">Aceitar todos</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(bar);
    document.body.appendChild(modal);

    var checkbox = $('#cookie-cat-analytics', modal);

    function fecharBanner() { bar.classList.remove('is-open'); }
    function abrirBanner() { bar.classList.add('is-open'); }
    function fecharModal() { modal.classList.remove('is-open'); document.body.style.overflow = ''; }
    function abrirModal() {
      var atual = lerConsentimento();
      checkbox.checked = !!(atual && atual.analytics);
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function decidir(c) {
      salvarConsentimento(c);
      aplicarConsentimento(c);
      fecharBanner();
      fecharModal();
    }

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cookie]');
      if (!btn) return;
      var acao = btn.getAttribute('data-cookie');
      if (acao === 'accept') decidir({ necessary: true, analytics: true, ts: Date.now() });
      if (acao === 'reject') decidir({ necessary: true, analytics: false, ts: Date.now() });
      if (acao === 'settings') abrirModal();
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) { fecharModal(); return; }
      var btn = e.target.closest('[data-cookie]');
      if (btn) {
        var acao = btn.getAttribute('data-cookie');
        if (acao === 'accept-all') decidir({ necessary: true, analytics: true, ts: Date.now() });
        if (acao === 'reject-all') decidir({ necessary: true, analytics: false, ts: Date.now() });
        if (acao === 'save') decidir({ necessary: true, analytics: checkbox.checked, ts: Date.now() });
      }
      if (e.target.closest('.cookiemodal__close')) fecharModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) fecharModal();
    });

    // Link para reabrir as preferências a qualquer momento, no rodapé.
    $$('.footer__bar').forEach(function (barra) {
      var link = document.createElement('button');
      link.type = 'button';
      link.className = 'footer__cookie-link';
      link.textContent = 'Preferências de cookies';
      link.addEventListener('click', abrirModal);
      barra.appendChild(link);
    });

    if (!salvo) abrirBanner();
  }

  /* -------------------------------------------------------
     Boot
     ------------------------------------------------------- */
  function boot() {
    initUnidades();
    initHeader();
    initFiltros();
    initFaq();
    initLightbox();
    initForm();
    initReveal();
    initContadores();
    initAvaliacoes();
    initAno();
    initCookieConsent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
