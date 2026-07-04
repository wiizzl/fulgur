import { HEALTH_PATH } from "#/shared/constants";

export async function waitForBackend(port: number, timeout = 10000) {
  const start = Date.now();
  const healthUrl = `http://localhost:${port}${HEALTH_PATH}`;

  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(healthUrl);

      if (response.ok) {
        return true;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  return false;
}
