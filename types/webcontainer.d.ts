import "@webcontainer/api";

declare module "@webcontainer/api" {
  interface WebContainer {
    /**
     * Register an event listener.
     */
    on(event: string, handler: (...args: any[]) => void): void;

    /**
     * Register a one-time event listener (auto-removes after first call).
     */
    once(event: string, handler: (...args: any[]) => void): void;

    /**
     * Remove a registered event listener.
     */
    off(event: string, handler: (...args: any[]) => void): void;

    /**
     * Store the running dev server process (custom field).
     */
    _devProcess?: {
      kill: () => void;
      exit: Promise<number>;
    };
  }
}
