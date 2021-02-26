import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem {
    public id: number;
    public descricao: string;
    public data: Date;
    public link: string;
    public interacao: string;
    public tag: string;
    public usuario: User;
    public tema: Tema;

}