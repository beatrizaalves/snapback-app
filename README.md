# SnapBack

Protótipo funcional do aplicativo SnapBack, companheiro da palmilha PalmAlign. O público de referência tem 60 anos ou mais. Os dados de Maria Aparecida, 67 anos, de Campinas-SP, são uma persona de demonstração e não medições de uma pessoa real.

## Tecnologias

- React, Vite e TypeScript
- React Router DOM
- CSS3
- Lucide React
- Recharts
- jsPDF, para gerar o relatório no navegador
- LocalStorage

## Como instalar

```bash
npm install
```

## Como executar

```bash
npm run dev
```

Abra o endereço que o Vite mostrar, em geral `http://localhost:5173`.
Ou acesse o site: https://snapback-sandy.vercel.app/

## Como demonstrar

Na tela de entrada há três acessos, sem senha real:

- Abrir demonstração da Maria (paciente, já configurada)
- Entrar como fisioterapeuta
- Entrar como clínica

O PIN da Maria, se quiser usar o teclado, é `1234`. No cadastro, o código de verificação simulado é `123456`.

Em Perfil, **Restaurar dados demonstrativos** volta a persona inicial.

## Estrutura

```text
src/
  components/   botões, formulários, gráficos, navegação
  layouts/      paciente, fisioterapeuta, clínica e acesso
  pages/        uma pasta por módulo
  contexts/     estado único e regras de atualização
  services/     LocalStorage, PDF e leitura em voz
  data/         persona, séries e mapas
  routes/       rotas
  styles/       paleta e componentes
```

## Funcionalidades

- Acesso, cadastro, LGPD, PIN, bloqueio e sessão encerrada por inatividade
- Pareamento, avaliação e palmilha simulados
- Painel, mapa de pressão, pisada, estímulos, evolução e dor
- Plano, exercícios, lembretes, conquistas, treino e relatório PDF
- Contatos, alerta de queda para o familiar, fisioterapeuta e clínica
- Ajuda com guias que não dependem de internet
- Acessibilidade salva no navegador: fonte, contraste, modo simples e leitura

A clínica só lista quem autorizou o compartilhamento. A intensidade Forte respeita o limite gravado pelo fisioterapeuta. A atualização da palmilha exige pelo menos 30% de bateria em cada pé.

## Limitações das simulações

Não há backend, palmilha, Bluetooth, biometria, câmera, Apple Saúde, Health Connect, loja ou central de atendimento. Onde a tela depende disso, o texto diz que a ação é simulada e o resultado fica só no navegador.

WhatsApp, e-mail, telefone e SAMU abrem o aplicativo correspondente do aparelho. Nenhuma chamada ou mensagem é enviada automaticamente.

A história de indicadores anonimizados internos não faz parte deste aplicativo.
