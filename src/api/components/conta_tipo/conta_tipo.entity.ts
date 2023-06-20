import { Collection, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('conta_tipo')
export class Conta_Tipo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    sigla!: string;
}
