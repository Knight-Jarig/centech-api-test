import sha1 from 'sha1';
import config from '../configs/vars';

const secret = config.magento.secret;

export const encrypt = (text: string, secretKey: string = secret): string => {
  return sha1(`${text}${secretKey}`);
};
