import {
  Entity,
  ObjectIdColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('libClient')
export class LibClient {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  clientUid: string;

  @Column()
  clientName: string;

  @Column()
  jibeBaseUrl: {
    j2Url: string;
    j3Url: string;
  };

  @Column()
  identificationCode: string;

  @Column()
  clientKey: string;

  @Column()
  jibeToken: string;

  @Column()
  clientIdentificationLogo: string;

  @Column()
  lastRefreshupdateWeatherForecastIntervalate: {
    value: number;
    unit: string;
  };
  @Column()
  updateWeatherForecastTimesteps: string;

  @Column()
  updateWeatherForecastUnits: string;
}
