export interface NavBarUpdateParams {
  title?: string;
  titleColor?: string;
  barStyle?: "float" | "normal";
  backgroundColor?: string;
  hideBackButton?: string;
  theme?: "light" | "dark";
}

export interface NavBarHeightResult {
  height: number;
  screenWidth: number;
  screenHeight: number;
}

export const updateNavBar = (params: NavBarUpdateParams): Promise<void> => {
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
      "WVNavigationBar",
      "update",
      params,
      () => {
        resolve();
      },
      (error: any) => {
        reject(
          new Error(JSON.stringify(error) || "Failed to update navigation bar")
        );
      }
    );
  });
};

export const getNavBarHeight = (): Promise<NavBarHeightResult> => {
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
      "WVNavigationBar",
      "getHeight",
      {},
      (result: NavBarHeightResult) => {
        resolve(result);
      },
      (error: any) => {
        reject(
          new Error(
            JSON.stringify(error) || "Failed to get navigation bar height"
          )
        );
      }
    );
  });
};
