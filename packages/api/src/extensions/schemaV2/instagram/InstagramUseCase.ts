import { MDCStoreConfig } from '../../schemaV2/types/mdc-store-config';
import { IV2InstagramPostsResponse } from '../../../types/graphql';
import { InstagramDataSource } from '../../../dataSource/instagram/InstagramDataSource'
import { mapInstagramData } from './InstagramTransformer';

interface InstagramUseCaseOption {
  instagram: InstagramDataSource;
}

export class InstagramUseCase {
  private store?: MDCStoreConfig;
  private instagramDataSource: InstagramDataSource;

  constructor({ instagram }: InstagramUseCaseOption) {
    this.instagramDataSource = instagram
  }
  initialize(config): void {
      this.store = config.context.store;
  }
  async v2InstagramPosts(): Promise<IV2InstagramPostsResponse[]>  {
    const response = await this.instagramDataSource.getPosts();
    return mapInstagramData(response.data)
  }
}
