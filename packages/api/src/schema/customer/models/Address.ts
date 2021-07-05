import { IsBoolean, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';

import { IAddressType, ICustomerAddress, IPlace, IRegion, ITaxType } from '../../../types/graphql';
import { customAttributes, fromCustomAttributes } from '../../../utils/transformer';
import { Place } from './Place';

@Exclude()
export class Address implements ICustomerAddress {
  @Expose()
  @IsString()
  @Transform(value => value?.toString())
  id: string;

  @Expose()
  @IsString()
  firstname: string;

  @Expose()
  @IsString()
  lastname: string;

  @Expose()
  @IsString()
  telephone: string;

  @Expose()
  @IsString()
  @IsOptional()
  @Transform(fromCustomAttributes({ key: 'building' }))
  building?: string;

  @Expose()
  @IsString()
  @Transform(fromCustomAttributes({ key: 'address_line', defaultValue: '' }))
  address_line: string;

  @Expose()
  @ValidateNested()
  get subdistrict(): IPlace {
    const place = new Place();

    place.id = this.custom_attributes.subdistrict_id?.toString();
    place.name = this.custom_attributes.subdistrict;

    return place;
  }

  @Expose()
  @ValidateNested()
  get district(): IPlace {
    const place = new Place();

    place.id = this.custom_attributes.district_id?.toString();
    place.name = this.custom_attributes.district;

    return place;
  }

  @Expose()
  @ValidateNested()
  get province(): IPlace {
    const place = new Place();

    place.id = this.region_id?.toString();
    place.name = this.region?.region;

    return place;
  }

  @Expose()
  @IsString()
  postcode: string;

  @Expose()
  @IsString()
  @IsOptional()
  @Transform(fromCustomAttributes({ key: 'address_name' }))
  address_name: string;

  @Expose()
  @IsEnum(IAddressType)
  @Transform(
    fromCustomAttributes({
      key: 'customer_address_type',
      defaultValue: IAddressType.Shipping,
      transform: val => val?.toUpperCase(),
    }),
  )
  customer_address_type: IAddressType;

  @Expose()
  @IsEnum(ITaxType)
  @Transform(
    fromCustomAttributes({
      key: 'full_tax_type',
      defaultValue: ITaxType.Personal,
      transform: val => val?.toUpperCase(),
    }),
  )
  full_tax_type: ITaxType;

  @Expose()
  @IsString()
  @IsOptional()
  vat_id?: string;

  @Expose()
  @IsString()
  @IsOptional()
  company?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @Transform(fromCustomAttributes({ key: 'branch_id' }))
  branch_id?: string;

  @Expose()
  @IsString()
  country_id: string;

  @Expose()
  @IsBoolean()
  get is_default_billing(): boolean {
    return !!this.default_billing;
  }

  @Expose()
  @IsBoolean()
  get is_default_shipping(): boolean {
    return !!this.default_shipping!;
  }

  // deprecated
  @Expose() customer_id?: number;
  @Expose() street?: string[];
  @Expose() city?: string;
  @Expose() region_id?: string;
  @Expose() region?: IRegion;
  @Expose() default_billing?: boolean;
  @Expose() default_shipping?: boolean;

  @Expose()
  @Transform(customAttributes)
  custom_attributes?: any;
}
