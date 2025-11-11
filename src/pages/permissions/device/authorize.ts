export type PermissionScope =
  | "location"
  | "camera"
  | "bluetooth"
  | "album"
  | "contacts"
  | "microphone"
  | "file"
  | "call"
  | "vibrate"
  | "screen";

export interface AuthorizeResult {
  successScope: Record<string, boolean>;
  msg: string;
}

export const authorize = (scope: PermissionScope): Promise<AuthorizeResult> => {
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
      "authorize",
      { scope },
      (result: AuthorizeResult) => {
        resolve(result);
      },
      (error: any) => {
        reject(new Error(JSON.stringify(error) || "Failed to authorize"));
      }
    );
  });
};
