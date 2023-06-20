import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string

    @Column()
    cpf_cnpj!: string

    @Column()
    rg!: string;

    @Column()
    sexo!: string;

    @Column()
    data_nascimento!: Date;

    @Column(
        {
            type: "decimal",
            transformer: {
               to(value: any) { return value },
               from(value: any) { return parseFloat(value) }
           }
        } )
    renda!: number;

    @Column()
    endereco!: string;

    @Column()
    email!: string;

    @Column()
    telefone!: string;
}