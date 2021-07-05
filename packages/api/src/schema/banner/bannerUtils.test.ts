
import { shuffleSlides, sortingBanners, filterActiveBanner } from './bannerUtils';
import { bannersRandomMDC, bannersMDC, keysMock, sortedBannerMock, bannersMDCWithSamePos, bannersMDCWithSamePosSorted } from './__mocks__/bannerMock';

describe('bannerUtils', () => {
  it(`Should return shuffled banner slides properly `, () => {
    const result = shuffleSlides(bannersRandomMDC)
    const isSame = JSON.stringify(result.slide_position) === JSON.stringify(bannersRandomMDC.slide_position);
    expect(isSame).toEqual(false);
  });

  it(`Should return filtered banner sildes properly`, () => {
    const result = filterActiveBanner(bannersMDC, keysMock);
    expect(result.slide_ids.length).toEqual(bannersMDC.extension_attributes.slides.length);
  });

  it(`Should return sorted banner slides properly `, () => {
    const result = sortingBanners(bannersMDC);
    expect(result).toEqual(sortedBannerMock);
  });

  it(`Should return sorted banner slides in case that same position then sorting by slide id`, () => {
    const result = sortingBanners(bannersMDCWithSamePos);
    expect(result).toEqual(bannersMDCWithSamePosSorted);
  })
});
