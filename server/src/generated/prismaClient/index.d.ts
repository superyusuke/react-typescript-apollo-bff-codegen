import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.0.0-beta.8
 * Query Engine version: ff6959d77f8880ec037ed8201fff4a92f3aabaa0
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  db?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = PrismaClientOptions, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.raw``, values will be escaped automatically
   * const result = await prisma.raw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.raw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): accountDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model account
 */

export type account = {
  user_id: number
  username: string | null
}

export type accountSelect = {
  user_id?: boolean
  username?: boolean
}

export type accountGetPayload<
  S extends boolean | null | undefined | accountArgs,
  U = keyof S
> = S extends true
  ? account
  : S extends undefined
  ? never
  : S extends accountArgs | FindManyaccountArgs
  ? 'include' extends U
    ? account 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof account ? account[P]
: 
 never
    }
  : account
: account


export interface accountDelegate {
  /**
   * Find zero or one Account.
   * @param {FindOneaccountArgs} args - Arguments to find a Account
   * @example
   * // Get one Account
   * const account = await prisma.account.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneaccountArgs>(
    args: Subset<T, FindOneaccountArgs>
  ): CheckSelect<T, accountClient<account | null>, accountClient<accountGetPayload<T> | null>>
  /**
   * Find zero or more Accounts.
   * @param {FindManyaccountArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Accounts
   * const accounts = await prisma.account.findMany()
   * 
   * // Get first 10 Accounts
   * const accounts = await prisma.account.findMany({ first: 10 })
   * 
   * // Only select the `user_id`
   * const accountWithUser_idOnly = await prisma.account.findMany({ select: { user_id: true } })
   * 
  **/
  findMany<T extends FindManyaccountArgs>(
    args?: Subset<T, FindManyaccountArgs>
  ): CheckSelect<T, Promise<Array<account>>, Promise<Array<accountGetPayload<T>>>>
  /**
   * Create a Account.
   * @param {accountCreateArgs} args - Arguments to create a Account.
   * @example
   * // Create one Account
   * const user = await prisma.account.create({
   *   data: {
   *     // ... data to create a Account
   *   }
   * })
   * 
  **/
  create<T extends accountCreateArgs>(
    args: Subset<T, accountCreateArgs>
  ): CheckSelect<T, accountClient<account>, accountClient<accountGetPayload<T>>>
  /**
   * Delete a Account.
   * @param {accountDeleteArgs} args - Arguments to delete one Account.
   * @example
   * // Delete one Account
   * const user = await prisma.account.delete({
   *   where: {
   *     // ... filter to delete one Account
   *   }
   * })
   * 
  **/
  delete<T extends accountDeleteArgs>(
    args: Subset<T, accountDeleteArgs>
  ): CheckSelect<T, accountClient<account>, accountClient<accountGetPayload<T>>>
  /**
   * Update one Account.
   * @param {accountUpdateArgs} args - Arguments to update one Account.
   * @example
   * // Update one Account
   * const account = await prisma.account.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends accountUpdateArgs>(
    args: Subset<T, accountUpdateArgs>
  ): CheckSelect<T, accountClient<account>, accountClient<accountGetPayload<T>>>
  /**
   * Delete zero or more Accounts.
   * @param {accountDeleteManyArgs} args - Arguments to filter Accounts to delete.
   * @example
   * // Delete a few Accounts
   * const { count } = await prisma.account.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends accountDeleteManyArgs>(
    args: Subset<T, accountDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Accounts.
   * @param {accountUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Accounts
   * const account = await prisma.account.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends accountUpdateManyArgs>(
    args: Subset<T, accountUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Account.
   * @param {accountUpsertArgs} args - Arguments to update or create a Account.
   * @example
   * // Update or create a Account
   * const account = await prisma.account.upsert({
   *   create: {
   *     // ... data to create a Account
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Account we want to update
   *   }
   * })
  **/
  upsert<T extends accountUpsertArgs>(
    args: Subset<T, accountUpsertArgs>
  ): CheckSelect<T, accountClient<account>, accountClient<accountGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyaccountArgs, 'select' | 'include'>): Promise<number>
}

export declare class accountClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * account findOne
 */
export type FindOneaccountArgs = {
  /**
   * Select specific fields to fetch from the account
  **/
  select?: accountSelect | null
  /**
   * Filter, which account to fetch.
  **/
  where: accountWhereUniqueInput
}


/**
 * account findMany
 */
export type FindManyaccountArgs = {
  /**
   * Select specific fields to fetch from the account
  **/
  select?: accountSelect | null
  /**
   * Filter, which accounts to fetch.
  **/
  where?: accountWhereInput
  /**
   * Determine the order of the accounts to fetch.
  **/
  orderBy?: accountOrderByInput
  /**
   * Sets the position for listing accounts.
  **/
  cursor?: accountWhereUniqueInput
  /**
   * Get all accounts that come after or before the account you provide with the current order.
  **/
  take?: number
  /**
   * Skip the first `n` accounts.
  **/
  skip?: number
}


/**
 * account create
 */
export type accountCreateArgs = {
  /**
   * Select specific fields to fetch from the account
  **/
  select?: accountSelect | null
  /**
   * The data needed to create a account.
  **/
  data: accountCreateInput
}


/**
 * account update
 */
export type accountUpdateArgs = {
  /**
   * Select specific fields to fetch from the account
  **/
  select?: accountSelect | null
  /**
   * The data needed to update a account.
  **/
  data: accountUpdateInput
  /**
   * Choose, which account to update.
  **/
  where: accountWhereUniqueInput
}


/**
 * account updateMany
 */
export type accountUpdateManyArgs = {
  data: accountUpdateManyMutationInput
  where?: accountWhereInput
}


/**
 * account upsert
 */
export type accountUpsertArgs = {
  /**
   * Select specific fields to fetch from the account
  **/
  select?: accountSelect | null
  /**
   * The filter to search for the account to update in case it exists.
  **/
  where: accountWhereUniqueInput
  /**
   * In case the account found by the `where` argument doesn't exist, create a new account with this data.
  **/
  create: accountCreateInput
  /**
   * In case the account was found with the provided `where` argument, update it with this data.
  **/
  update: accountUpdateInput
}


/**
 * account delete
 */
export type accountDeleteArgs = {
  /**
   * Select specific fields to fetch from the account
  **/
  select?: accountSelect | null
  /**
   * Filter which account to delete.
  **/
  where: accountWhereUniqueInput
}


/**
 * account deleteMany
 */
export type accountDeleteManyArgs = {
  where?: accountWhereInput
}


/**
 * account without action
 */
export type accountArgs = {
  /**
   * Select specific fields to fetch from the account
  **/
  select?: accountSelect | null
}



/**
 * Deep Input Types
 */


export type accountWhereInput = {
  user_id?: number | IntFilter
  username?: string | NullableStringFilter | null
  AND?: Enumerable<accountWhereInput>
  OR?: Enumerable<accountWhereInput>
  NOT?: Enumerable<accountWhereInput>
}

export type accountWhereUniqueInput = {
  user_id?: number
}

export type accountCreateInput = {
  username?: string | null
}

export type accountUpdateInput = {
  user_id?: number
  username?: string | null
}

export type accountUpdateManyMutationInput = {
  user_id?: number
  username?: string | null
}

export type IntFilter = {
  equals?: number
  not?: number | IntFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type accountOrderByInput = {
  user_id?: OrderByArg | null
  username?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
