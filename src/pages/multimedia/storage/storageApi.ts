export const setItem = (key: string, value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.WindVane) {
      reject(
        new Error(
          "WindVane is not available. Please run in Mini App environment."
        )
      );
      return;
    }

    window.WindVane.call(
      "WVStorage",
      "setItem",
      { key, value },
      () => {
        resolve();
      },
      (error: any) => {
        reject(
          new Error(error?.msg || JSON.stringify(error) || "Failed to set item")
        );
      }
    );
  });
};

export const getItem = (key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!window.WindVane) {
      reject(
        new Error(
          "WindVane is not available. Please run in Mini App environment."
        )
      );
      return;
    }

    window.WindVane.call(
      "WVStorage",
      "getItem",
      { key },
      (result: { data: string }) => {
        resolve(result.data);
      },
      (error: any) => {
        reject(
          new Error(error?.msg || JSON.stringify(error) || "Failed to get item")
        );
      }
    );
  });
};

export const removeItem = (key: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.WindVane) {
      reject(
        new Error(
          "WindVane is not available. Please run in Mini App environment."
        )
      );
      return;
    }

    window.WindVane.call(
      "WVStorage",
      "removeItem",
      { key },
      () => {
        resolve();
      },
      (error: any) => {
        reject(
          new Error(
            error?.msg || JSON.stringify(error) || "Failed to remove item"
          )
        );
      }
    );
  });
};

export const clearStorage = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.WindVane) {
      reject(
        new Error(
          "WindVane is not available. Please run in Mini App environment."
        )
      );
      return;
    }

    window.WindVane.call(
      "WVStorage",
      "clearStorage",
      {},
      () => {
        resolve();
      },
      (error: any) => {
        reject(
          new Error(
            error?.msg || JSON.stringify(error) || "Failed to clear storage"
          )
        );
      }
    );
  });
};

export const clearStorageSync = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.WindVane) {
      reject(
        new Error(
          "WindVane is not available. Please run in Mini App environment."
        )
      );
      return;
    }

    window.WindVane.call(
      "WVStorage",
      "clearStorageSync",
      {},
      () => {
        resolve();
      },
      (error: any) => {
        reject(
          new Error(
            error?.msg ||
              JSON.stringify(error) ||
              "Failed to clear storage sync"
          )
        );
      }
    );
  });
};
