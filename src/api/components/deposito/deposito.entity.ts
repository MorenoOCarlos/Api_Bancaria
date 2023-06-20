import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('deposito')
export class Deposito {
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
    conta_id!: number;
}
