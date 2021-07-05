declare global {
  namespace NodeJS {
    interface Global {
      newrelic: any;
    }
  }
}
export default global;
