interface GetSettingResult {
  authSetting: {
    [key: string]: string;
  };
}

export const getSetting = (): Promise<GetSettingResult> => {
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
      "wv",
      "getSetting",
      {},
      (result: GetSettingResult) => {
        resolve(result);
      },
      (error: any) => {
        reject(new Error(JSON.stringify(error) || "Failed to get settings"));
      }
    );
  });
};
