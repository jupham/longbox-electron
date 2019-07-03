import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Comic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    filePath: string;
}