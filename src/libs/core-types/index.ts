export type onCallbackType = (action: string, params?: unknown) => void;

export type Dictionary<T> = {
  [k: string]: T;
}

export type MuiColorType = 'primary' | 'secondary' | 'info' | 'success' | 'error';

export type MuiSizeType = 'small' | 'medium' | 'large';
