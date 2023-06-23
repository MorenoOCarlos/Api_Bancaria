import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conta } from '../conta/conta.entity';

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

    @ManyToOne(() => Conta, { eager: true })
    @JoinColumn({
        name: "conta_origem_id",
        referencedColumnName: "id"
    })
    conta_Origem!: Conta;

    @ManyToOne(()=> Conta,{eager:true})
    @JoinColumn({
    name: "conta_destino_id",
    referencedColumnName: "id"
    })
    conta_Destino!: Conta;
}
