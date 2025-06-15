import { RoleUsuarios } from "../entities/role.enum";

export class CreateUsuarioDto {
  empresa_id: string;
  nome: string;
  email: string;
  senha_hash: string;
  role: RoleUsuarios;
  ativo: boolean;
}
