import crypto from 'crypto';

function random() {
  return crypto.randomBytes(4).readUInt32LE() / 0x100000000;
}

function randomString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(random() * charactersLength));
  }
  return result;
}

export function generateAmxHeader(publicKey: string, secretKey: string) {
  const nOnce = randomString(15);
  const timeStamp = Math.floor(Date.now() / 1000);
  const signatureString = `${nOnce}${timeStamp}`;
  const hashAuthString = crypto.createHmac('sha256', secretKey).update(signatureString).digest('hex');

  return `amx ${publicKey}:${hashAuthString}:${nOnce}:${timeStamp}`;
}
