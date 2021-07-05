require('dotenv').config();

const { generate } = require('@graphql-codegen/cli');
const glob = require('glob');
const rimraf = require('rimraf');

const coreApiSdkDir = './../operation';
const packageName = 'graphql-request';

const schema = './../api/schema.graphql';

console.log({
  coreApiSdkDir,
  schema,
});

const packagePath = process
  .cwd()
  .replace('packages/operation', 'packages/' + packageName);
console.log('Clean sdk.ts');
rimraf.sync(packagePath + '/src/sdk.ts');

const generateRequest = () => {
  const packagePath = process
    .cwd()
    .replace('packages/operation', 'packages/' + packageName);

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
        ['codegen/plugin/custom-graphql-request/index.js']: {
          documentMode: 'external',
          importDocumentNodeExternallyFrom: '@central-tech/operation',
          skipTypename: true,
          documentVariableSuffix: '',
          typesPrefix: 'I',
        },
      },
    ],
    config: {
      namingConvention: {
        typeNames: 'change-case#pascalCase',
        transformUnderscore: true,
      },
    },
  };

  const output = packagePath + '/src/sdk.ts';
  generate(
    {
      schema,
      documents: [
        coreApiSdkDir + '/src/fragment/**/*.ts',
        coreApiSdkDir + '/src/query/**/*.ts',
        coreApiSdkDir + '/src/mutation/**/*.ts',
      ],
      generates: {
        [output]: baseHookConfig,
      },
    },
    true,
  );
};

generateRequest();
