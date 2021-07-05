import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import DataLakeApi from '../../dataSource/dataLakeApi';
import DataLakeRecommendationApi from '../../dataSource/dataLakeRecommendationApi';
import { CatalogServiceDataSource } from '../../dataSource/catalogService';
import { CaMPDataSource } from '../../dataSource/camp/CaMPDataSource';
import { CmsDataSource } from '../../dataSource/cms/CmsDataSource';
import ConsentServiceApi from '../../dataSource/consentServiceApi';
import { T1PassportDataSource } from '../t1Passport/T1PassportDataSource';

jest.mock('../../dataSource/magento/MagentoDataSource');
jest.mock('../../dataSource/dataLakeApi');
jest.mock('../../dataSource/dataLakeRecommendationApi');
jest.mock('../../dataSource/catalogService');
jest.mock('../../dataSource/cms/CmsDataSource');
jest.mock('../../dataSource/consentServiceApi');

export const createDataSources = jest.fn(() => {
  const dataLake = new DataLakeApi();
  const dataLakeRecommendation = new DataLakeRecommendationApi();
  const catalogService = new CatalogServiceDataSource();
  const magento = new MagentoDataSource();
  const camp = new CaMPDataSource();
  const cms = new CmsDataSource();
  const contsentServiceApi = new ConsentServiceApi();
  const t1Passport = new T1PassportDataSource();

  return {
    magento,
    dataLake,
    dataLakeRecommendation,
    catalogService,
    camp,
    cms,
    contsentServiceApi,
  };
});
