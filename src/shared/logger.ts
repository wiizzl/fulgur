const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

export const log = (message: string): void => {
  console.log(`${CYAN}[Fulgur]${RESET} ${message}`);
};

export const logServer = (message: string): void => {
  process.stdout.write(`${YELLOW}[Server]${RESET} ${message}`);
};

export const logError = (message: string): void => {
  console.error(`${RED}[Fulgur]${RESET} ${message}`);
};

export const logWarning = (message: string): void => {
  console.warn(`${YELLOW}[Fulgur]${RESET} ${message}`);
};
