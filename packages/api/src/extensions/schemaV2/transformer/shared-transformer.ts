import { IV2ProductLinks as IProductLinks } from '../../../types/graphql';

interface productLinkInputItem {
  link_type?: string;
  linked_product_sku?: string;
}

export function getProductLinks(links: productLinkInputItem[] | null): IProductLinks | null {
  if (!links)
    return {
      upSellSKUs: [],
      crossSellSKUs: [],
      relatedSKUs: [],
      breadcrumbs: [],
      upSell: [],
      crossSell: [],
      related: [],
      similar: [],
    };

  const { cross_sell: crossSellSKUs, up_sell: upSellSKUs, related: relatedSKUs } = links.reduce(
    (memo, { link_type, linked_product_sku }) => {
      const list = memo[link_type] ?? [];

      list.push(linked_product_sku);

      return memo;
    },
    {
      cross_sell: [],
      grouped: [],
      related: [],
      up_sell: [],
    } as Record<string, string[]>,
  );

  return {
    crossSellSKUs,
    upSellSKUs,
    relatedSKUs,
    breadcrumbs: [],
    crossSell: [],
    upSell: [],
    related: [],
    similar: [],
  };
}
