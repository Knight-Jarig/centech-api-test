import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
import { AddressCustomAttributes, pickAddressCustomAttributes } from './AddressCustomAttributes';
import { ICreateCustomerAddress } from '../../../../types/graphql';

@Exclude()
export class PostCustomerAddressesRequestBody {
  @Expose()
  @IsString()
  firstname: string;

  @Expose()
  @IsString()
  lastname: string;

  @Expose()
  @IsString({ each: true })
  @Transform(value => value ?? ['n/a'])
  street: string[];

  @Expose()
  @IsString()
  @Transform(value => value ?? 'n/a')
  city: string;

  @Expose()
  @IsString()
  telephone: string;

  @Expose()
  @IsString()
  @Length(5)
  postcode: string;

  @Expose()
  @IsString()
  @Transform(value => value ?? 'TH')
  country_id: string;

  @Expose()
  @IsNumber()
  customer_id: number;

  @Expose()
  @IsNumber()
  @Transform((_, obj: ICreateCustomerAddress) => parseInt(obj.province.id))
  region_id: number;

  @Expose()
  @IsString()
  @IsOptional()
  @Transform((_, obj: ICreateCustomerAddress) => obj.province?.name)
  region?: string;

  @Expose()
  @IsString()
  @IsOptional()
  company?: string;

  @Expose()
  @IsString()
  @IsOptional()
  vat_id?: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  @Transform((_, { is_default_billing }) => is_default_billing)
  default_billing?: boolean;

  @Expose()
  @IsBoolean()
  @IsOptional()
  @Transform((_, { is_default_shipping }) => is_default_shipping)
  default_shipping?: boolean;

  @Expose()
  @Transform(pickAddressCustomAttributes)
  custom_attributes: Record<string, any> & AddressCustomAttributes;
}
