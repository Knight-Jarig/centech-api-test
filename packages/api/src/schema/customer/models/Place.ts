import { IsString } from 'class-validator';
import { IPlace } from '../../../types/graphql';

export class Place implements IPlace {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
