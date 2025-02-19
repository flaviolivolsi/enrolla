import { initializeGraphQLClient } from '../api';
import { InitialzeOptions } from '../interfaces';
import { refreshStore } from '../store';
import { InitilizationError, PollingError } from '../errors';
import { validateConfiguration } from './validation';

export let _configuration: InitialzeOptions;

const startPolling = (configuration: InitialzeOptions) => {
  if (!configuration?.polling) return;
  const { enabled, intervalSeconds, onError } = configuration.polling;

  if (enabled) {
    setInterval(() => {
      refreshStore().catch((err) => {
        onError?.(new PollingError(err));
      });
    }, intervalSeconds * 1000);
  }
};

/**
 * Initializes the Enrolla SDK. Must be called once before any other SDK methods.
 *
 * @param options
 * @throws {InitilizationError} if the configuration is invalid or if failed to fetch feature data.
 */
export const initialize = async (options: InitialzeOptions) => {
  validateConfiguration(options);
  _configuration = Object.freeze(options);

  initializeGraphQLClient(_configuration);
  startPolling(_configuration);

  try {
    await refreshStore();
  } catch (err) {
    throw new InitilizationError(
      'Failed in initial fetch of feature data.',
      err
    );
  }
};
