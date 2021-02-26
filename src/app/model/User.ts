import { Postagem } from "./Postagem"

export class User{

    public id: number;
    public nome_completo: string;
    public email: string;
    public senha: string;
    public contato: string;
    public foto: string;
    public postagem: Postagem[];
}