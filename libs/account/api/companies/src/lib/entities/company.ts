import { IUser } from '@wws/api-interfaces';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
// import { User } from './user';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  domain: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @ManyToMany('User', 'companies', { cascade: true })
  @JoinTable({
    name: 'user_companies',
    joinColumn: {
      name: 'companyId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  users?: IUser[];
}
