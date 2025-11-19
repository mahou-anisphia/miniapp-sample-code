// File Write
export interface WriteFileParams {
  mode: "write" | "append" | "overwrite";
  data: string;
  fileName: string;
  share: string;
}

export const writeFile = (params: WriteFileParams): Promise<void> => {
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
      "WVFile",
      "write",
      params,
      () => resolve(),
      (error: any) => {
        reject(
          new Error(
            error?.msg || JSON.stringify(error) || "Failed to write file"
          )
        );
      }
    );
  });
};

// File Read
export interface ReadFileParams {
  fileName: string;
  share: string;
}

export interface ReadFileResult {
  data: string;
}

export const readFile = (params: ReadFileParams): Promise<ReadFileResult> => {
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
      "WVFile",
      "read",
      params,
      (result: ReadFileResult) => resolve(result),
      (error: any) => {
        reject(
          new Error(
            error?.msg || JSON.stringify(error) || "Failed to read file"
          )
        );
      }
    );
  });
};

// Get File Info
export interface GetFileInfoParams {
  filePath: string;
}

export interface FileInfo {
  fileSize: string;
}

export const getFileInfo = (params: GetFileInfoParams): Promise<FileInfo> => {
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
      "WVFile",
      "getFileInfo",
      params,
      (result: FileInfo) => resolve(result),
      (error: any) => {
        reject(
          new Error(
            error?.msg || JSON.stringify(error) || "Failed to get file info"
          )
        );
      }
    );
  });
};

// Download File
export interface DownloadFileParams {
  url: string;
  name?: string;
}

export interface DownloadFileResult {
  filePath: string;
}

export const downloadFile = (
  params: DownloadFileParams
): Promise<DownloadFileResult> => {
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
      "WVFile",
      "downloadFile",
      params,
      (result: DownloadFileResult) => resolve(result),
      (error: any) => {
        reject(
          new Error(
            error?.msg || JSON.stringify(error) || "Failed to download file"
          )
        );
      }
    );
  });
};

// Upload File
export interface UploadFileParams {
  url: string;
  filePath: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface UploadFileResult {
  data: string;
  headers: string;
}

export const uploadFile = (
  params: UploadFileParams
): Promise<UploadFileResult> => {
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
      "WVFile",
      "uploadFile",
      params,
      (result: UploadFileResult) => resolve(result),
      (error: any) => {
        reject(
          new Error(
            error?.msg || JSON.stringify(error) || "Failed to upload file"
          )
        );
      }
    );
  });
};

// Choose Files
export interface ChooseFilesResult {
  files: Array<{
    path: string;
  }>;
}

export const chooseFiles = (): Promise<ChooseFilesResult> => {
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
      "WVFile",
      "chooseFiles",
      {},
      (result: ChooseFilesResult) => resolve(result),
      (error: any) => {
        reject(
          new Error(
            error?.msg || JSON.stringify(error) || "Failed to choose files"
          )
        );
      }
    );
  });
};

// Get Data by File Path
export interface GetDataByFilePathParams {
  path: string;
}

export interface GetDataByFilePathResult {
  base64Data: string;
}

export const getDataByFilePath = (
  params: GetDataByFilePathParams
): Promise<GetDataByFilePathResult> => {
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
      "WVFile",
      "getDataByFilePath",
      params,
      (result: GetDataByFilePathResult) => resolve(result),
      (error: any) => {
        reject(
          new Error(
            error?.msg || JSON.stringify(error) || "Failed to get file data"
          )
        );
      }
    );
  });
};
