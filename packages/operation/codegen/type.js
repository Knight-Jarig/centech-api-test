require('dotenv').config();
const { generate } = require('@graphql-codegen/cli');

const schema = '../api/schema.graphql';

generate(
  {
    schema,
    documents: './src/**/*.ts',
    generates: {
      [process.cwd() + '/src/types.ts']: {
        hooks: {
          afterOneFileWrite: ['prettier --write'],
        },
        plugins: [
          {
            ['typescript']: {},
          },
          {
            ['typescript-operations']: {},
          },
        ],
        config: {
          typesPrefix: 'I',
          useIndexSignature: true,
          strict: true,
          preResolveTypes: true,
          namingConvention: {
            typeNames: 'change-case#pascalCase',
            transformUnderscore: true,
          },
        },
      },
    },
  },
  true,
);
