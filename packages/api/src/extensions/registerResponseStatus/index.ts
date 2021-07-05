/**
 * @title Register Response Status
 * @desc Return magento message instend of true|false in register mutation.
 **/
import typeDef from './types.graphql';
import { IRegister } from '../../types/graphql';

const resolver = {
  Register: {
    error: async ({ data, message }: IRegister) => {
      return !!data ? null : { message };
    },
  },
};

export { typeDef, resolver };
