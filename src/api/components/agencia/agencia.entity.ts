import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agencia')
export class Agencia {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    numero!: string;

    @Column()
    nome_fantasia!: string;

    @Column()
    razao_social!: string;

    @Column()
    cnpj!: string;

    @Column()
    telefone!: string;

    @Column()
    email!: string;

    @Column()
    ban_id!: number;
}