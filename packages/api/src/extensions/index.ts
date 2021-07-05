import map from 'lodash/map';
import merge from 'lodash/merge';
import config from '../configs/vars';

const extensionsSchema = () => {
  const extensionSchema = {
    typeDefs: [],
    resolvers: [],
  };
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const extensionConfig = require(`../configs/extensions/${config.bu}.extension`).default;
    const extensionConfigKeys = Object.keys(extensionConfig);
    map(extensionConfigKeys, key => {
      if (extensionConfig[key]) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const extensionFile = require(`./${key}`);
          if (extensionFile) {
            const typeDefs = [].concat(extensionFile.typeDef);
            extensionSchema.typeDefs = [...extensionSchema.typeDefs, ...typeDefs];
            extensionSchema.resolvers = merge(extensionSchema.resolvers, extensionFile.resolver);
          }
        } catch (error) {
          console.log(`extension ${key} not found`);
        }
      }
    });

    return extensionSchema;
  } catch (error) {
    console.log(error);
    return extensionSchema;
  }
};

export default extensionsSchema();
