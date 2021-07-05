import { ICmsPage } from '../types/graphql';

function cmsPageTransform(data): ICmsPage {
  return {
    ...data,
    id: `${data.id}`,
  };
}

export { cmsPageTransform };
