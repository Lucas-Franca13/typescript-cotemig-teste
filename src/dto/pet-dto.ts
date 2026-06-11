// =============================================================================
// PASSO 2 — DTO (Data Transfer Object): o formato dos dados da entidade
// =============================================================================
// DTO é apenas um TIPO que descreve quais campos a entidade Pet possui.
// Ele não roda nada — serve para o TypeScript avisar se você esquecer ou
// errar um campo. É O PONTO QUE MAIS MUDA ao trocar de entidade:
// basta alterar o nome (PetDTO) e a lista de campos abaixo.
// =============================================================================

export interface PetDTO {
    name: string;   // nome do pet (texto)
    age: number;    // idade do pet (número)
    race: string;   // raça do pet (texto)
}
