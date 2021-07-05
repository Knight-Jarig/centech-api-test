import { MDCStoreConfig } from '../types/mdc-store-config';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { DataSource } from 'apollo-datasource';
import { CatalogServiceDataSource } from '../../../dataSource/catalogService';
import { IFiltersQuery } from '../../../types/graphql';

export class BrandUseCaseOptions {
  catalogService: CatalogServiceDataSource;
  magento: MagentoDataSource;
}

export class BrandUseCase extends DataSource {
  private store?: MDCStoreConfig;
  private locale = 'en';
  private token: string;

  private catalogService: CatalogServiceDataSource;
  private magento: MagentoDataSource;

  constructor({ catalogService, magento }: BrandUseCaseOptions) {
    super();

    this.catalogService = catalogService;
    this.magento = magento;
  }

  initialize(config): void {
    this.store = config.context.store;
    this.locale = config.context.locale;
    this.token = config.context.authToken;
  }

  async findOne({ brandId }) {
    const brand = await this.magento.brand.findOne({ brandId, storeCode: this.store.code });

    return brand;
  }

  async find({ filterGroups, page, size, sortOrders }: IFiltersQuery) {
    const brands = await this.magento.brand.find({
      filterGroups,
      page,
      size,
      sortOrders: sortOrders as any,
      storeCode: this.store.code,
    });

    return await Promise.all(
      brands.map(async ({ brand_id: brandId }) => {
        const brand = await this.magento.brand.findOne({ brandId, storeCode: this.store.code });

        return {
          id: `${brand.brand_id}`,
          name: brand.name,
          imageUrl: brand.extension_attributes.brand_image_url,
          contentCss: brand.extension_attributes.menu_css,
          logo: brand.logo,
          description: brand.description,
          urlKey: brand.url_key,
        };
      }),
    );
  }
}
