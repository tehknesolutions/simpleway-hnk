export const WORLD_1 = Object.freeze({
  id:'WORLD_01_AWAKENING',
  title:'The Awakening',
  subtitle:'Descubra o HNK pelo contexto.',
  levels:[
    {
      id:'L01_FIRST_CONTACT', order:1, title:'First Contact', mode:'choice',
      npc:'VODEMI!', prompt:'O NPC acabou de encontrar você. O que esta fala faz?',
      choices:[
        {id:'greeting',label:'Cumprimenta',correct:true},
        {id:'farewell',label:'Despede-se',correct:false},
        {id:'help',label:'Pede ajuda',correct:false}
      ],
      hints:['É o primeiro encontro.','Procure uma fórmula de abertura.','VODEMI funciona como saudação.'],
      unlocks:['VODEMI','SKILL_GREETING'], xp:10
    },
    {
      id:'L02_THE_GIFT', order:2, title:'The Gift', mode:'choice',
      npc:'TUMAVI!', prompt:'O NPC recebeu algo de você. Qual é a função?',
      choices:[
        {id:'thanks',label:'Agradecimento',correct:true},
        {id:'question',label:'Pergunta',correct:false},
        {id:'no',label:'Negação',correct:false}
      ],
      hints:['Algo favorável acabou de acontecer.','É uma fórmula pragmática.','TUMAVI funciona como agradecimento.'],
      unlocks:['TUMAVI','SKILL_THANKS'], xp:10
    },
    {
      id:'L03_TWO_DOORS', order:3, title:'The Two Doors', mode:'mapping',
      prompt:'Associe as duas respostas.',
      pairs:[
        {token:'PUMEK',target:'YES_RESPONSE',label:'Sim'},
        {token:'MUNASE',target:'NO_RESPONSE',label:'Não'}
      ],
      hints:['São respostas independentes.','Uma confirma e a outra recusa.','PUMEK = sim; MUNASE = não. MUNASE não é NE.'],
      unlocks:['PUMEK','MUNASE','SKILL_RESPONSE'], xp:10
    },
    {
      id:'L04_THE_SPEAKER', order:4, title:'The Speaker', mode:'choice',
      npc:'AN ZAMI HNK.', prompt:'Qual interpretação está licenciada neste frame?',
      choices:[
        {id:'speak',label:'Eu falo/uso HNK.',correct:true},
        {id:'where',label:'Onde você trabalha?',correct:false},
        {id:'thanks',label:'Obrigado.',correct:false}
      ],
      hints:['AN referencia o falante neste frame.','ZAMI é o núcleo de uso da língua.','AN ZAMI HNK = eu falo/uso HNK.'],
      unlocks:['AN','ZAMI','HNK','SKILL_LANGUAGE_SELF'], xp:10
    },
    {
      id:'L05_THE_SHADOW', order:5, title:'The Shadow', mode:'choice',
      prompt:'Qual forma expressa “eu não trabalho” no padrão testado?',
      choices:[
        {id:'correct',label:'AN NE VALI.',correct:true},
        {id:'wrong1',label:'AN VALI NE.',correct:false},
        {id:'wrong2',label:'NE AN VALI.',correct:false}
      ],
      hints:['Compare a posição do operador negativo.','NE fica entre AN e o predicate frame neste padrão.','AN NE VALI.'],
      unlocks:['NE','VALI','SKILL_NEGATION_SCOPED'], xp:10
    },
    {
      id:'L06_YESTERDAYS_ECHO', order:6, title:"Yesterday's Echo", mode:'choice',
      prompt:'Qual forma comunica o frame de trabalho com referência a ontem?',
      choices:[
        {id:'correct',label:'PA AN VALI.',correct:true},
        {id:'wrong1',label:'AN PA VALI.',correct:false},
        {id:'wrong2',label:'AN VALI PA.',correct:false}
      ],
      hints:['A referência temporal aparece na frente.','PA é a referência a ontem neste frame.','PA AN VALI.'],
      unlocks:['PA','SKILL_TIME_YESTERDAY'], xp:10
    },
    {
      id:'L07_QUESTION_SEAL', order:7, title:'The Question Seal', mode:'choice',
      npc:'EN ZAMI HNK KE?', prompt:'O que esta construção faz?',
      choices:[
        {id:'ask',label:'Pergunta se o interlocutor fala/usa HNK.',correct:true},
        {id:'universal',label:'Prova que KE transforma qualquer frase em pergunta.',correct:false},
        {id:'decl',label:'Declara que o falante usa HNK.',correct:false}
      ],
      hints:['EN referencia o addressee nesta construção.','KE está licenciado aqui, não universalmente.','EN ZAMI HNK KE? é um frame interrogativo recuperado/validado.'],
      unlocks:['EN','KE','SKILL_QUESTION_SCOPED'], xp:10
    },
    {
      id:'L08_FIRST_CONVERSATION', order:8, title:'First Conversation', mode:'dialogue',
      npc:'VODEMI!\nEN ZAMI HNK KE?',
      prompt:'Responda afirmativamente e depois declare que você fala HNK.',
      requiredIntents:['YES_RESPONSE','STATE_SPEAK_HNK'],
      tokenTray:['PUMEK','AN','ZAMI','HNK','MUNASE','NE'],
      hints:['A resposta possui dois atos.','Primeiro responda; depois faça a declaração.','PUMEK. / AN ZAMI HNK.'],
      unlocks:['ACH_FIRST_CONVERSATION','WORLD_02_READY'], xp:25
    }
  ]
});

export const WORLD_2 = Object.freeze({
  id:'WORLD_02_CONSTRUCTION_FORGE',
  title:'The Construction Forge',
  subtitle:'Agora você constrói as estruturas.',
  levels:[
    {
      id:'L09_I_HAVE_A_BOOK', order:9, title:'I Have a Book', mode:'builder',
      prompt:'Monte o frame “Eu tenho um livro.”',
      targetIntent:'STATE_HAVE_BOOK',
      tokenTray:['AN','GAVURI','KAVESO','NE'],
      hints:['Comece pelo falante.','Use o predicate de posse antes do objeto.','AN GAVURI KAVESO.'],
      unlocks:['GAVURI','KAVESO','SKILL_POSSESSION_PREDICATE'], xp:10
    },
    {
      id:'L10_TWO_BOOKS', order:10, title:'Two Books', mode:'builder',
      prompt:'Monte o frame “Eu tenho dois livros.”',
      targetIntent:'STATE_HAVE_TWO_BOOKS',
      tokenTray:['AN','GAVURI','HIZEP','KAVESO','NE'],
      hints:['A quantidade entra junto do objeto.','Neste frame: CARDINAL + COUNTABLE_OBJECT.','AN GAVURI HIZEP KAVESO.'],
      unlocks:['HIZEP','SKILL_COUNTED_OBJECT'], xp:10
    },
    {
      id:'L11_I_WANT_WATER', order:11, title:'I Want Water', mode:'builder',
      prompt:'Monte o frame “Eu quero água.”',
      targetIntent:'STATE_WANT_WATER',
      tokenTray:['AN','MORAKU','SAVETA','NE'],
      hints:['Identifique o predicate de querer.','A água entra como conteúdo/objeto neste frame.','AN MORAKU SAVETA.'],
      unlocks:['MORAKU','SAVETA','SKILL_WANT_OBJECT'], xp:10
    },
    {
      id:'L12_I_DO_NOT_WANT_WATER', order:12, title:'I Do Not Want Water', mode:'builder',
      prompt:'Monte o frame negativo “Eu não quero água.”',
      targetIntent:'STATE_NOT_WANT_WATER',
      tokenTray:['AN','NE','MORAKU','SAVETA'],
      hints:['A negação já foi descoberta no World 1.','NE precede MORAKU neste frame licenciado.','AN NE MORAKU SAVETA.'],
      unlocks:['SKILL_NEGATION_ACTION'], xp:10
    },
    {
      id:'L13_THE_MISSING_LINK', order:13, title:'The Missing Link', mode:'builder',
      prompt:'Monte “Preciso ir para casa.”',
      targetIntent:'STATE_NEED_GO_HOME',
      tokenTray:['AN','KORUME','VEMI','LOKANI','DOMERA'],
      hints:['Há duas ações relacionadas.','Use VEMI entre o predicate de controle e a ação.','AN KORUME VEMI LOKANI DOMERA.'],
      unlocks:['KORUME','VEMI','LOKANI','DOMERA','SKILL_ACTION_CHAIN'], xp:10
    },
    {
      id:'L14_TOMORROW_WE_WORK', order:14, title:'Tomorrow We Work', mode:'builder',
      prompt:'Monte “Amanhã nós trabalhamos.”',
      targetIntent:'STATE_TOMORROW_WE_WORK',
      tokenTray:['TAMURI','NEMA','VALI','AN','PA'],
      hints:['Comece pela referência temporal.','Depois use a pessoa plural e o predicate.','TAMURI NEMA VALI.'],
      unlocks:['TAMURI','NEMA','SKILL_TIME_PERSON_STACK'], xp:10
    },
    {
      id:'L15_THEY_STUDY', order:15, title:'They Study', mode:'builder',
      prompt:'Monte “Eles/elas estudam.”',
      targetIntent:'STATE_THEY_STUDY',
      tokenTray:['VOMA','PELUKI','NEMA','VALI'],
      hints:['Escolha a terceira pessoa plural candidata.','O predicate não recebe flexão neste frame.','VOMA PELUKI.'],
      unlocks:['VOMA','PELUKI','SKILL_THIRD_PLURAL'], xp:10
    },
    {
      id:'L16_MY_MOTHER_WORKS', order:16, title:'My Mother Works', mode:'builder',
      prompt:'Mini Boss: monte “Minha mãe trabalha.”',
      targetIntent:'STATE_MY_MOTHER_WORKS',
      tokenTray:['AN','LENU','MAVERA','VALI','GAVURI'],
      hints:['Construa primeiro o NP possessivo.','AN LENU MAVERA funciona como bloco sujeito neste frame.','AN LENU MAVERA VALI.'],
      unlocks:['LENU','MAVERA','SKILL_COMPLEX_NP_SUBJECT','WORLD_03_READY'], xp:25
    }
  ]
});

export const WORLD_3 = Object.freeze({
  id:'WORLD_03_GRAMMAR_DUNGEON',
  title:'The Grammar Dungeon',
  subtitle:'Aprenda também onde o HNK RC1 não permite generalizar.',
  levels:[
    {
      id:'L17_NE_TRAP', order:17, title:'NE Trap', mode:'contrast',
      prompt:'Qual forma mantém a posição de NE no frame aprendido?',
      choices:[
        {id:'a',label:'AN NE ZAMI HNK.',correct:true,feedback:'VALID: NE precede o predicate frame neste padrão.'},
        {id:'b',label:'AN ZAMI NE HNK.',correct:false,feedback:'ORDER ERROR: esta ordem não está licenciada.'}
      ],
      hints:['Compare com AN NE VALI.','NE não flutua livremente.','Escolha AN NE ZAMI HNK.'],
      unlocks:['SKILL_NEGATION_CONTRAST'], xp:10
    },
    {
      id:'L18_NUMBER_TRAP', order:18, title:'Number Trap', mode:'contrast',
      prompt:'Qual ordem está licenciada para “dois livros” neste RC1?',
      choices:[
        {id:'a',label:'HIZEP KAVESO',correct:true,feedback:'VALID: CARDINAL + COUNTABLE_OBJECT no frame testado.'},
        {id:'b',label:'KAVESO HIZEP',correct:false,feedback:'UNMAPPED: a ordem inversa não foi licenciada.'}
      ],
      hints:['O numeral entra antes do objeto neste frame.','Não assuma ordem livre.','HIZEP KAVESO.'],
      unlocks:['SKILL_QUANTITY_CONTRAST'], xp:10
    },
    {
      id:'L19_VEMI_TRAP', order:19, title:'VEMI Trap', mode:'contrast',
      prompt:'Qual cadeia de ações está licenciada?',
      choices:[
        {id:'a',label:'AN KORUME VEMI LOKANI DOMERA.',correct:true,feedback:'VALID: VEMI conecta o predicate de controle à ação.'},
        {id:'b',label:'AN KORUME LOKANI DOMERA.',correct:false,feedback:'MISSING LINK: este frame exige VEMI.'}
      ],
      hints:['Duas ações estão conectadas.','Use a skill da Forge.','KORUME + VEMI + LOKANI.'],
      unlocks:['SKILL_VEMI_CONTRAST'], xp:10
    },
    {
      id:'L20_WATER_TRAP', order:20, title:'The Water Trap', mode:'contrast',
      prompt:'Qual forma expressa duas garrafas de água sem contar SAVETA diretamente?',
      choices:[
        {id:'a',label:'AN MORAKU HIZEP KOPERA SAVETA.',correct:true,feedback:'VALID: quantidade + recipiente + conteúdo massivo.'},
        {id:'b',label:'AN MORAKU HIZEP SAVETA.',correct:false,feedback:'MASS-NOUN TRAP: SAVETA não foi licenciado como nome diretamente contável.'}
      ],
      hints:['Água é conteúdo massivo neste RC1.','Conte um recipiente, não SAVETA diretamente.','HIZEP KOPERA SAVETA.'],
      unlocks:['KOPERA','SKILL_CONTAINER_MASS'], xp:10
    },
    {
      id:'L21_LOCATION_SHADOW', order:21, title:'Location Shadow', mode:'contrast',
      prompt:'Qual forma está licenciada para “ele/ela não está em casa”?',
      choices:[
        {id:'a',label:'ERU NE RUMI DOMERA.',correct:true,feedback:'VALID: patch de negação locativa escopado.'},
        {id:'b',label:'ERU RUMI NE DOMERA.',correct:false,feedback:'ORDER ERROR: NE não foi licenciado depois de RUMI.'}
      ],
      hints:['RUMI possui um patch negativo próprio.','NE aparece antes de RUMI neste frame.','ERU NE RUMI DOMERA.'],
      unlocks:['ERU','RUMI','SKILL_NEGATED_LOCATION'], xp:10
    },
    {
      id:'L22_NOTHING_HERE', order:22, title:'Nothing Here', mode:'contrast',
      prompt:'Qual padrão expressa “não há banheiro no hotel”?',
      choices:[
        {id:'a',label:'NE HAVORI TUMERA RUMI HAVENU.',correct:true,feedback:'VALID: existência negativa possui seu próprio padrão.'},
        {id:'b',label:'HAVORI NE TUMERA RUMI HAVENU.',correct:false,feedback:'EXISTENCE TRAP: esta posição de NE não está licenciada.'}
      ],
      hints:['Existência não copia mecanicamente o frame pessoal.','O patch existencial começa por NE.','NE HAVORI TUMERA RUMI HAVENU.'],
      unlocks:['HAVORI','TUMERA','HAVENU','SKILL_NEGATED_EXISTENCE'], xp:10
    },
    {
      id:'L23_ADJECTIVE_DOOR', order:23, title:'The Adjective Door', mode:'contrast',
      prompt:'Qual opção descreve corretamente o estado do RC1 para “livro pequeno” como NP interno?',
      choices:[
        {id:'a',label:'MISERO KAVESO já é um NP atributivo licenciado.',correct:false,feedback:'LOCKED: esta ordem atributiva não foi licenciada.'},
        {id:'b',label:'KAVESO MISERO já é um NP atributivo licenciado.',correct:false,feedback:'TRAP: KAVESO MISERO é descrição predicativa no frame conhecido, não um NP atributivo livre.'},
        {id:'c',label:'Nenhuma ordem atributiva está licenciada ainda.',correct:true,feedback:'BOUNDARY FOUND: use KAVESO MISERO como descrição separada; NP atributivo continua bloqueado.'}
      ],
      hints:['Uma frase descritiva não é automaticamente um NP.','KAVESO MISERO tem uso predicativo escopado.','A resposta correta é que o NP atributivo continua bloqueado.'],
      unlocks:['MISERO','SKILL_ATTRIBUTIVE_BOUNDARY'], xp:10
    },
    {
      id:'L24_QUESTION_TRAP', order:24, title:'The Question Trap', mode:'contrast',
      prompt:'A forma “VOMA LIKADO SEVAI HAVENU KE?” já está licenciada como pergunta geral no RC1?',
      choices:[
        {id:'yes',label:'Sim. KE transforma qualquer sentença em pergunta.',correct:false,feedback:'OVERGENERALIZATION: KE não é universal no RC1.'},
        {id:'no',label:'Não. Esta pergunta continua não licenciada.',correct:true,feedback:'BOUNDARY FOUND: KE permanece escopado aos frames interrogativos registrados.'}
      ],
      hints:['Lembre do Question Seal do World 1.','KE foi descoberto em frames específicos.','Não generalize KE para qualquer pessoa/predicado.'],
      unlocks:['LIKADO','SEVAI','SKILL_QUESTION_BOUNDARY','WORLD_04_READY'], xp:25
    }
  ]
});

export const WORLD_4 = Object.freeze({
  id:'WORLD_04_OPEN_WORLD',
  title:'The Open World',
  subtitle:'Resolva a situação. Não existe mais uma resposta única exibida para você.',
  levels:[
    {
      id:'L25_LOST', order:25, title:'Lost', mode:'open_world',
      prompt:'🚉 Você está perdido. Descubra como chegar à estação.',
      objectives:[
        {id:'ROUTE_STATION',intent:'REQUEST_ROUTE_STATION',label:'Pedir rota para a estação'}
      ],
      tokenTray:['DARUVI','KODERA','KUVAN','RUMI'],
      hints:['Você precisa pedir uma rota.','Use a fórmula de navegação com um lugar.','DARUVI KODERA?'],
      unlocks:['DARUVI','KODERA','SKILL_ROUTE_REQUEST'], xp:10
    },
    {
      id:'L26_DONT_UNDERSTAND', order:26, title:"I Don't Understand", mode:'open_world',
      prompt:'🗣️ O NPC falou algo que você não entendeu. Faça a conversa continuar.',
      objectives:[
        {id:'NONUNDERSTANDING',intent:'SIGNAL_NONUNDERSTANDING',label:'Sinalizar que não entendeu'},
        {id:'REPEAT',intent:'REQUEST_REPEAT',label:'Pedir repetição'},
        {id:'POLITENESS',intent:'POLITENESS',label:'Usar cortesia',required:false}
      ],
      tokenTray:['AN','NE','KURAVI','LURAVO','REVATI','MUNASE'],
      hints:['Você precisa sinalizar o problema e pedir uma nova tentativa.','Há um predicate de compreender e uma fórmula de repetição.','AN NE KURAVI. / LURAVO. / REVATI?'],
      unlocks:['KURAVI','LURAVO','REVATI','SKILL_COMMUNICATION_REPAIR'], xp:10
    },
    {
      id:'L27_WATER_FOR_TWO', order:27, title:'Water for Two', mode:'open_world',
      prompt:'💧 Peça duas garrafas de água.',
      objectives:[
        {id:'WANT_WATER_TWO',intent:'STATE_WANT_TWO_BOTTLES_WATER',label:'Pedir duas garrafas de água'}
      ],
      tokenTray:['AN','MORAKU','HIZEP','KOPERA','SAVETA','KAVESO'],
      hints:['Não conte SAVETA diretamente.','Conte o recipiente e depois indique o conteúdo.','AN MORAKU HIZEP KOPERA SAVETA.'],
      unlocks:['SKILL_OPEN_WORLD_CONTAINER'], xp:10
    },
    {
      id:'L28_TOMORROWS_TRIP', order:28, title:"Tomorrow's Trip", mode:'open_world',
      prompt:'🌅 Amanhã você precisa ir para a estação.',
      objectives:[
        {id:'TOMORROW_TRIP',intent:'STATE_TOMORROW_NEED_GO_STATION',label:'Expressar a necessidade de ir amanhã à estação'}
      ],
      tokenTray:['TAMURI','AN','KORUME','VEMI','LOKANI','KODERA','PA'],
      hints:['Empilhe tempo + pessoa + necessidade + ação.','A cadeia continua exigindo VEMI.','TAMURI AN KORUME VEMI LOKANI KODERA.'],
      unlocks:['SKILL_OPEN_WORLD_ACTION_STACK'], xp:10
    },
    {
      id:'L29_LOST_BOOK', order:29, title:'Lost Book', mode:'open_world',
      prompt:'📕 Seu livro sumiu. Descubra onde ele está.',
      objectives:[
        {id:'LOCATE_BOOK',intent:'REQUEST_LOCATION_MY_BOOK',label:'Perguntar onde está seu livro'}
      ],
      tokenTray:['AN','LENU','KAVESO','RUMI','KUVAN','KE','SEVAI'],
      hints:['Comece pelo NP possessivo já aprendido.','Combine posse + localização + WHERE no frame escopado.','AN LENU KAVESO RUMI KUVAN KE?'],
      unlocks:['KUVAN','SKILL_OPEN_WORLD_LOCATION_QUESTION'], xp:10
    },
    {
      id:'L30_HOTEL_PROBLEM', order:30, title:'Hotel Problem', mode:'open_world',
      prompt:'🚻 O hotel não tem banheiro. Expresse essa situação.',
      objectives:[
        {id:'NO_BATHROOM',intent:'STATE_NO_BATHROOM_AT_HOTEL',label:'Expressar ausência de banheiro no hotel'}
      ],
      tokenTray:['NE','HAVORI','TUMERA','RUMI','HAVENU','ERU'],
      hints:['Use o patch existencial, não o frame pessoal.','A existência negativa começa com NE.','NE HAVORI TUMERA RUMI HAVENU.'],
      unlocks:['SKILL_OPEN_WORLD_NEGATIVE_EXISTENCE'], xp:10
    },
    {
      id:'L31_MARKET_SURVIVAL', order:31, title:'Market Survival', mode:'open_world',
      prompt:'🛍️ Saia da loja com dois livros e descubra o preço. Você pode usar várias falas.',
      objectives:[
        {id:'IDENTIFY_BOOK',intent:'IDENTIFY_THIS_BOOK',label:'Identificar o livro'},
        {id:'WANT_TWO_BOOKS',intent:'STATE_WANT_TWO_BOOKS',label:'Pedir dois livros'},
        {id:'ASK_PRICE',intent:'REQUEST_PRICE',label:'Perguntar o preço'}
      ],
      tokenTray:['SEVAI','KAVESO','AN','MORAKU','HIZEP','KADURI','GAVURI','PUMEK'],
      hints:['A missão tem três objetivos independentes.','Você pode usar uma fala para cada objetivo.','SEVAI KAVESO. / AN MORAKU HIZEP KAVESO. / KADURI?'],
      unlocks:['KADURI','SKILL_MARKET_SURVIVAL','FINAL_BOSS_READY'], xp:25
    }
  ]
});

export const WORLDS = Object.freeze([WORLD_1,WORLD_2,WORLD_3,WORLD_4]);
export const campaignLevels = Object.freeze(WORLDS.flatMap(w=>w.levels));
export const levelsById = new Map(campaignLevels.map(l=>[l.id,l]));
export const worldByLevelId = new Map(WORLDS.flatMap(w=>w.levels.map(l=>[l.id,w])));

