import logger from 'pino';
import dayjs from 'dayjs';

const pinoLog = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default pinoLog;
