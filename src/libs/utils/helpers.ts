import { Dictionary } from '../core-types';

export function intRandByMax(number: number) {
  return Math.floor(Math.random() * number);
}

export function encodeSearchParams<T>(params: Dictionary<T> = {}): string {
  const search = new URLSearchParams();

  for (const prop in params) {
    const val = typeof params[prop] === 'number' ? params[prop].toString() : params[prop];

    search.append(prop, val as string);
  }

  return search.toString();
}
