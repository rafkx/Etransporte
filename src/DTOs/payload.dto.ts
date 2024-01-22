export class Payload {
  id: string;

  name: string;

  email: string;

  role: string;

  funcionario: string;

  constructor(
    id: string,
    name: string,
    email: string,
    role: string,
    funcionario: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.funcionario = funcionario;
  }
}
