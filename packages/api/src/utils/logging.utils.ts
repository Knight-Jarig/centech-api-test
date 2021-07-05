import configs from '../configs/vars';

enum LogLevel {
  info,
  warn,
  error,
  debug,
  trace,
}

type LogLevelStrings = keyof typeof LogLevel;

const applicationLogs = (
  level: LogLevelStrings,
  message: string,
  component: string,
  data: any = {},
  bu: string = configs.bu,
) => {
  console.log({
    date: new Date().toISOString(),
    level,
    correlationId: '',
    system: 'COREAPI',
    component,
    executiontime: 0, // TODO Need Start Execution time
    bussinessUnit: bu,
    message,
    data,
  });
};

const infoLog = (message: string, component: string, data: any) => {
  applicationLogs('info', message, component, data);
};

const warnLog = (message: string, component: string, data: any) => {
  applicationLogs('warn', message, component, data);
};

const errorLog = (message: string, component: string, data: any) => {
  applicationLogs('error', message, component, data);
};

const debugLog = (message: string, component: string, data: any) => {
  applicationLogs('debug', message, component, data);
};

const traceLog = (message: string, component: string, data: any) => {
  applicationLogs('trace', message, component, data);
};

export default {
  info: infoLog,
  warn: warnLog,
  error: errorLog,
  debug: debugLog,
  trace: traceLog,
};
