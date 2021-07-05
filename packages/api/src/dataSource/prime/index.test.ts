import { Prime } from './';
jest.mock('../../configs/vars');

describe('Prime DataSource', () => {
  const prime = new Prime();

  it('getStockBySku', async () => {
    jest.spyOn(prime, 'fetchBySku').mockReturnValue(
      Promise.resolve([
        {
          sku: 'CDS10061688',
          stockInfo: {
            isInStock: true,
            manageStock: true,
            backorders: 0,
            stockItemMinQty: 0.0,
            stockStatus: true,
            stockStatusQty: 41.0,
            inventoryReservationQty: -1.0,
          },
          offset: 2443466,
          salable: true,
          lastUpdate: '2020-11-19T04:16:03.055247Z',
        },
      ]),
    );
    const stock = await prime.getStockBySku('CDS10061688');
    expect(stock).toEqual({
      sku: 'CDS10061688',
      quantity: 40,
    });
  });

  it('getStockBySkus', async () => {
    jest.spyOn(prime, 'fetchBySku').mockReturnValue(
      Promise.resolve([
        {
          sku: 'CDS10061688',
          stockInfo: {
            isInStock: true,
            manageStock: true,
            backorders: 0,
            stockItemMinQty: 0.0,
            stockStatus: true,
            stockStatusQty: 41.0,
            inventoryReservationQty: -1.0,
          },
          offset: 2443466,
          salable: true,
          lastUpdate: '2020-11-19T04:16:03.055247Z',
        },
        {
          sku: 'CDS10095751',
          stockInfo: {
            isInStock: true,
            manageStock: true,
            backorders: 0,
            stockItemMinQty: 0.0,
            stockStatus: true,
            stockStatusQty: 11.0,
            inventoryReservationQty: -1.0,
          },
          offset: 2318503,
          salable: true,
          lastUpdate: '2020-11-18T05:23:42.5711611Z',
        },
      ]),
    );
    const stocks = await prime.getStockBySkus(['CDS10061688', 'CDS10095751']);
    expect(stocks).toEqual([
      {
        sku: 'CDS10061688',
        quantity: 40,
      },
      {
        sku: 'CDS10095751',
        quantity: 10,
      },
    ]);
  });
});
