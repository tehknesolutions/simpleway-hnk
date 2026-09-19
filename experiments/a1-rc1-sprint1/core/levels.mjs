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

export const levelsById = new Map(WORLD_1.levels.map(l=>[l.id,l]));
