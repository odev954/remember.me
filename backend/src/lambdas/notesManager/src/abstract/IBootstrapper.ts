import { Server } from 'http';

export interface IBootstrapper {
  /**
   * Bootstraps the application.
   */
  bootstrap(): Promise<Server>;
}
