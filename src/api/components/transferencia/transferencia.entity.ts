import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transferencia')
export class Transferencia {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column(
        {
            type: "decimal",
            transformer: {
               to(value: any) { return value },
               from(value: any) { return parseFloat(value) }
           }
        } )
    valor!: number;

    @Column()
    data_hora!: Date;

    @Column()
    descricao!: string;

    @Column()
    conta_origem_id!: number;

    @Column()
    conta_destino_id!: number;
}
