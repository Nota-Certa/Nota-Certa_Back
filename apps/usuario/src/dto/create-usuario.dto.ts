export class CreateUsuarioDto {
  empresa_id: string;
  nome: string;
  email: string;
  senha_hash: string;
  role: string;
  ativo: boolean;
}
