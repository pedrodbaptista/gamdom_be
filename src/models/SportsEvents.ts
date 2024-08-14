import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('sport_events')
export class SportEvents {
  @PrimaryGeneratedColumn()
  event_id: number;

  @Column({type: 'text'})
  event_name: string;

  @Column({type: 'smallint'})
  odds: number;
}
