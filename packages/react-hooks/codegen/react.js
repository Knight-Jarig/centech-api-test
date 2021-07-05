require('dotenv').config();

const { generate } = require('@graphql-codegen/cli');
const glob = require('glob');
const rimraf = require('rimraf');

const coreApiSdkDir = './../operation';
const baseSrc = '/src';
const reactPackage = [
  {
    packageName: 'react-hooks',
    config: {
      withHooks: true,
    },
    extension: '.ts',
  },
];

const schema = './../api/schema.graphql';

const mutationResult = glob.sync(coreApiSdkDir + baseSrc + '/mutation/**/*.ts');
const queryResult = glob.sync(coreApiSdkDir + baseSrc + '/query/**/*.ts');
console.log(coreApiSdkDir + baseSrc + '/mutation/**/*.ts');

const mutationFile = mutationResult.filter((value) => !value.endsWith('index.ts'));
const queryFiles = queryResult.filter((value) => !value.endsWith('index.ts'));
console.log({
  coreApiSdkDir,
  schema,
});
console.log({ queryFiles, mutationFile });

reactPackage.map(({ packageName, config }) => {
  console.log('Clean query');
  rimraf.sync('./src/query/*');

  console.log('Clean mutation');
  rimraf.sync('./src/mutation/*');
});

const generateReact = (documentFile, options = {}) => {
  if (documentFile.endsWith('index.ts')) {
    return;
  }

  reactPackage.map(({ packageName, config, extension }) => {
    const packagePath = process.cwd().replace('packages/operation', 'packages/' + packageName);

    const baseHookConfig = {
      hooks: {
        afterOneFileWrite: ['prettier --write'],
      },
      preset: 'import-types',
      presetConfig: {
        typesPath: '@central-tech/operation/dist/types',
        importTypesNamespace: 'Types',
      },
      plugins: [
        {
          ['typescript-react-apollo']: {
            documentMode: 'external',
            importDocumentNodeExternallyFrom: '@central-tech/operation/dist' + documentFile.replace('./../operation/src/', '/'),
            nonOptionalTypename: true,
            skipTypename: true,
            typesPrefix: 'I',
            withHooks: false,
            withHOC: false,
            withComponent: false,
            ...config,
          },
        },
      ],
      config: {
        // preResolveTypes: true,
        // avoidOptionals: true,
        reactApolloVersion: 2,
        namingConvention: {
          typeNames: 'change-case#pascalCase',
          transformUnderscore: true,
        },
      },
    };

    const output = documentFile.replace('./../operation/src/', './src/').replace('.ts', extension);
    // console.log({ documentFile, output });
    generate(
      {
        schema,
        documents: ['./../operation/src/fragment/**/*.ts', documentFile],
        generates: {
          [output]: baseHookConfig,
        },
      },
      true,
    ).catch((e) => {
      console.error(e);
      process.exit(1);
    });
  });
};
// console.log(coreApiSdkDir + baseSrc + '/query/*.ts');
queryFiles.map((item) => {
  generateReact(item, {
    prefix: 'query',
  });
});
mutationFile.map((item) => {
  generateReact(item, {
    prefix: 'mutation',
  });
});
