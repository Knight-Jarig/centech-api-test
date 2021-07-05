import { IStoreConfig } from '../types/graphql';

function storeConfigTransform(storeConfig): IStoreConfig {
  return {
    ...storeConfig,
    id: `${storeConfig.id}`,
  };
}

export { storeConfigTransform };
