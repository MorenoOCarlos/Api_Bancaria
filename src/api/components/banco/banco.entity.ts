import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('banco')
export class Banco {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nome_fantasia!: string

    @Column()
    razao_social!: string

    @Column()
    cnpj!: string

    @Column()
    numero!: string
}
