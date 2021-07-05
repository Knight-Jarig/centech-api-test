import crypto from 'crypto';

const filterActiveBanner = (banners, keys) => {
  let filteredBanner = JSON.parse(JSON.stringify(banners));
  const newSlidePosition = {};
  const newSlideSorted = [];
  const newSlideIds = [];
  let position = 0;
  keys.map(key => {
    const slide = filteredBanner.extension_attributes?.slides?.find(s => String(s.id) === String(key));
    if (slide) {
      newSlideSorted.push(slide);
      newSlideIds.push(slide.id);
      newSlidePosition[key] = `${position}`;
      position++;
    }
  })

  filteredBanner = {
    ...filteredBanner,
    extension_attributes: {
      ...filteredBanner.extension_attributes,
      slides: newSlideSorted
    },
    slide_position: JSON.stringify(newSlidePosition),
    slide_ids: newSlideIds
  }

  return filteredBanner
}

const shuffleSlides = banners => {
  let slidePosition = JSON.parse(banners.slide_position);
  let keys = Object.keys(slidePosition) ?? [];
  let shuffledKeys = keys
    .map(a => ({ sort: crypto.randomBytes(4).readUInt32LE() / 0x100000000, value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value);

  return filterActiveBanner(banners, shuffledKeys);
};

const sortingBanners = banners => {
  let slidePosition = JSON.parse(banners.slide_position);
  let sortedKeys = Object.keys(slidePosition).sort(function(a,b){return slidePosition[a]-slidePosition[b]}) ?? [];

  return filterActiveBanner(banners, sortedKeys);
}

export {
  shuffleSlides,
  sortingBanners,
  filterActiveBanner
}
