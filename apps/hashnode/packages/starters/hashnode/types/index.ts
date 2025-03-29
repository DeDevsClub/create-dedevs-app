export type Nullish = undefined | null;
/**
 * Make some properties of T required.
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: NonNullable<T[P]> };

export * from './Badge';
export * from './Page';
export * from './Post';
export * from './Publication';
export * from './Response';
export * from './Series';
export * from './User';
export * from './extras';
