import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
import { AddressCustomAttributes, pickAddressCustomAttributes } from './AddressCustomAttributes';
import { IEditCustomerAddress } from '../../../../types/graphql';

@Exclude()
export class PutCustomerAddressesIdRequestBody {
  @Expose()
  @IsNumber()
  @Transform(value => +value)
  id: number;

  @Expose()
  @IsString()
  @IsOptional()
  firstname?: string;

  @Expose()
  @IsString()
  @IsOptional()
  lastname?: string;

  @Expose()
  @IsString({ each: true })
  @IsOptional()
  street?: string[];

  @Expose()
  @IsString()
  @IsOptional()
  city?: string;

  @Expose()
  @IsString()
  @IsOptional()
  telephone?: string;

  @Expose()
  @IsString()
  @Length(5)
  @IsOptional()
  postcode?: string;

  @Expose()
  @IsString()
  @IsOptional()
  country_id?: string;

  @Expose()
  @IsNumber()
  customer_id: number;

  @Expose()
  @IsNumber()
  @Transform((_, obj: IEditCustomerAddress) => (obj.province ? parseInt(obj.province.id) : undefined))
  @IsOptional()
  region_id?: number;

  @Expose()
  @IsString()
  @IsOptional()
  @Transform((_, obj: IEditCustomerAddress) => obj.province?.name)
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
  @Transform((default_billing, { is_default_billing }: IEditCustomerAddress) => is_default_billing ?? default_billing)
  default_billing?: boolean;

  @Expose()
  @IsBoolean()
  @IsOptional()
  @Transform(
    (default_shipping, { is_default_shipping }: IEditCustomerAddress) => is_default_shipping ?? default_shipping,
  )
  default_shipping?: boolean;

  @Expose()
  @Transform(pickAddressCustomAttributes)
  custom_attributes: Record<string, any> & AddressCustomAttributes;
}
