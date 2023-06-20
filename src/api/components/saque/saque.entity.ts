import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('saque')
export class Saque {
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

    @Column(
        {
            type: "decimal",
            transformer: {
               to(value: any) { return value },
               from(value: any) { return parseFloat(value) }
           }
        } )
    conta_id!: number;
}
