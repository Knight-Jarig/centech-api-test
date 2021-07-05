export function generateTagKeyBySku(sku: string): string {
  return `tags:product:${sku}`;
}

export async function tagCache(client, key, value) {
  try {
    const productMDCUrls = ['/products/url-key', '/V2/products/'];
    const productCatalogServiceUrl = ['/catalog-service/'];
    let skus = [];

    if (productMDCUrls.some(url => key.includes(url))) {
      skus = [getProductSkuFromMdc(value)];
    } else if (productCatalogServiceUrl.some(url => key.includes(url))) {
      skus = getProductSkuFromCatalogService(value);
    }

    skus.forEach(sku => client.sadd(generateTagKeyBySku(sku), key));
  } catch (e) {
    console.error(e);
  }
}

export function getProductSkuFromMdc(value) {
  const cacheData = JSON.parse(value);
  const { sku } = JSON.parse(cacheData.body);

  return sku;
}

export function getProductSkuFromCatalogService(value) {
  const cacheData = JSON.parse(value);
  const body = JSON.parse(cacheData.body);
  const { products }: { products: [] } = body;
  const skuList = products.map(({ sku }) => sku);

  return skuList;
}

export function canUseCache(appEnv: string, cacheControl: string): boolean {
  if (appEnv === 'sit' && cacheControl === 'no-cache') {
    return false;
  }
  return true;
}

export const getCache = async (key: string, redisClient: any): Promise<any> => {
  if (redisClient) {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  }
  return;
};

export const setCache = async (key: string, value: any, redisClient: any, ttl: number): Promise<void> => {
  if (redisClient) {
    await redisClient.set(key, JSON.stringify(value), { ttl });
  }
  return;
};

export const deleteCache = async (key: string, redisClient: any): Promise<void> => {
  if (redisClient) {
    await redisClient.delete(key);
  }
  return;
};
