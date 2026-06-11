// =============================================================================
// PASSO 7 — Index: ponto de entrada (o primeiro arquivo que o Node executa)
// =============================================================================
// Sua única função é importar e disparar o servidor configurado no Passo 6.
// É este arquivo que você roda (ex.: "tsx src/index.ts" ou "node dist/index.js").
// =============================================================================

import { server } from "./server";   // PASSO 6: função que configura e inicia o Express

// Inicia o programa (chama a função server()).
(server)();
