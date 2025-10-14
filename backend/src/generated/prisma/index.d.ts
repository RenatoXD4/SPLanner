
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * //////////////////////////// CONFIG DATABASE
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Proyectos
 * 
 */
export type Proyectos = $Result.DefaultSelection<Prisma.$ProyectosPayload>
/**
 * Model Tarea
 * 
 */
export type Tarea = $Result.DefaultSelection<Prisma.$TareaPayload>
/**
 * Model BloqueContenido
 * //// BLOQUE MANIPULA EL ORDEN DE COMPONENTES DENTRO DE UNA TAREA > ej: un titulo no especificamente debe de aparecer de los primeros, se podria mover al final de la desc de la tarea
 */
export type BloqueContenido = $Result.DefaultSelection<Prisma.$BloqueContenidoPayload>
/**
 * Model Roles
 * 
 */
export type Roles = $Result.DefaultSelection<Prisma.$RolesPayload>
/**
 * Model Miembro
 * 
 */
export type Miembro = $Result.DefaultSelection<Prisma.$MiembroPayload>
/**
 * Model Estado
 * 
 */
export type Estado = $Result.DefaultSelection<Prisma.$EstadoPayload>
/**
 * Model Responsable
 * 
 */
export type Responsable = $Result.DefaultSelection<Prisma.$ResponsablePayload>
/**
 * Model Comentario
 * 
 */
export type Comentario = $Result.DefaultSelection<Prisma.$ComentarioPayload>
/**
 * Model Notificacion
 * 
 */
export type Notificacion = $Result.DefaultSelection<Prisma.$NotificacionPayload>
/**
 * Model Etiqueta
 * 
 */
export type Etiqueta = $Result.DefaultSelection<Prisma.$EtiquetaPayload>
/**
 * Model TareasEtiquetas
 * 
 */
export type TareasEtiquetas = $Result.DefaultSelection<Prisma.$TareasEtiquetasPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TipoDeBloque: {
  PARAGRAPH: 'PARAGRAPH',
  HEADING_1: 'HEADING_1',
  HEADING_2: 'HEADING_2',
  CHECKLIST: 'CHECKLIST',
  IMAGE: 'IMAGE',
  CODE: 'CODE'
};

export type TipoDeBloque = (typeof TipoDeBloque)[keyof typeof TipoDeBloque]

}

export type TipoDeBloque = $Enums.TipoDeBloque

export const TipoDeBloque: typeof $Enums.TipoDeBloque

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proyectos`: Exposes CRUD operations for the **Proyectos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proyectos
    * const proyectos = await prisma.proyectos.findMany()
    * ```
    */
  get proyectos(): Prisma.ProyectosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tarea`: Exposes CRUD operations for the **Tarea** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tareas
    * const tareas = await prisma.tarea.findMany()
    * ```
    */
  get tarea(): Prisma.TareaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bloqueContenido`: Exposes CRUD operations for the **BloqueContenido** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BloqueContenidos
    * const bloqueContenidos = await prisma.bloqueContenido.findMany()
    * ```
    */
  get bloqueContenido(): Prisma.BloqueContenidoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roles`: Exposes CRUD operations for the **Roles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.roles.findMany()
    * ```
    */
  get roles(): Prisma.RolesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.miembro`: Exposes CRUD operations for the **Miembro** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Miembros
    * const miembros = await prisma.miembro.findMany()
    * ```
    */
  get miembro(): Prisma.MiembroDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.estado`: Exposes CRUD operations for the **Estado** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Estados
    * const estados = await prisma.estado.findMany()
    * ```
    */
  get estado(): Prisma.EstadoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.responsable`: Exposes CRUD operations for the **Responsable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Responsables
    * const responsables = await prisma.responsable.findMany()
    * ```
    */
  get responsable(): Prisma.ResponsableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comentario`: Exposes CRUD operations for the **Comentario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comentarios
    * const comentarios = await prisma.comentario.findMany()
    * ```
    */
  get comentario(): Prisma.ComentarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificacion`: Exposes CRUD operations for the **Notificacion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notificacions
    * const notificacions = await prisma.notificacion.findMany()
    * ```
    */
  get notificacion(): Prisma.NotificacionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.etiqueta`: Exposes CRUD operations for the **Etiqueta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Etiquetas
    * const etiquetas = await prisma.etiqueta.findMany()
    * ```
    */
  get etiqueta(): Prisma.EtiquetaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tareasEtiquetas`: Exposes CRUD operations for the **TareasEtiquetas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TareasEtiquetas
    * const tareasEtiquetas = await prisma.tareasEtiquetas.findMany()
    * ```
    */
  get tareasEtiquetas(): Prisma.TareasEtiquetasDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Proyectos: 'Proyectos',
    Tarea: 'Tarea',
    BloqueContenido: 'BloqueContenido',
    Roles: 'Roles',
    Miembro: 'Miembro',
    Estado: 'Estado',
    Responsable: 'Responsable',
    Comentario: 'Comentario',
    Notificacion: 'Notificacion',
    Etiqueta: 'Etiqueta',
    TareasEtiquetas: 'TareasEtiquetas'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "proyectos" | "tarea" | "bloqueContenido" | "roles" | "miembro" | "estado" | "responsable" | "comentario" | "notificacion" | "etiqueta" | "tareasEtiquetas"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Proyectos: {
        payload: Prisma.$ProyectosPayload<ExtArgs>
        fields: Prisma.ProyectosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProyectosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProyectosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectosPayload>
          }
          findFirst: {
            args: Prisma.ProyectosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProyectosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectosPayload>
          }
          findMany: {
            args: Prisma.ProyectosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectosPayload>[]
          }
          create: {
            args: Prisma.ProyectosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectosPayload>
          }
          createMany: {
            args: Prisma.ProyectosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProyectosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectosPayload>[]
          }
          delete: {
            args: Prisma.ProyectosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectosPayload>
          }
          update: {
            args: Prisma.ProyectosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectosPayload>
          }
          deleteMany: {
            args: Prisma.ProyectosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProyectosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProyectosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectosPayload>[]
          }
          upsert: {
            args: Prisma.ProyectosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectosPayload>
          }
          aggregate: {
            args: Prisma.ProyectosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProyectos>
          }
          groupBy: {
            args: Prisma.ProyectosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProyectosGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProyectosCountArgs<ExtArgs>
            result: $Utils.Optional<ProyectosCountAggregateOutputType> | number
          }
        }
      }
      Tarea: {
        payload: Prisma.$TareaPayload<ExtArgs>
        fields: Prisma.TareaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TareaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TareaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          findFirst: {
            args: Prisma.TareaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TareaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          findMany: {
            args: Prisma.TareaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>[]
          }
          create: {
            args: Prisma.TareaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          createMany: {
            args: Prisma.TareaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TareaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>[]
          }
          delete: {
            args: Prisma.TareaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          update: {
            args: Prisma.TareaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          deleteMany: {
            args: Prisma.TareaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TareaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TareaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>[]
          }
          upsert: {
            args: Prisma.TareaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          aggregate: {
            args: Prisma.TareaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTarea>
          }
          groupBy: {
            args: Prisma.TareaGroupByArgs<ExtArgs>
            result: $Utils.Optional<TareaGroupByOutputType>[]
          }
          count: {
            args: Prisma.TareaCountArgs<ExtArgs>
            result: $Utils.Optional<TareaCountAggregateOutputType> | number
          }
        }
      }
      BloqueContenido: {
        payload: Prisma.$BloqueContenidoPayload<ExtArgs>
        fields: Prisma.BloqueContenidoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BloqueContenidoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BloqueContenidoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BloqueContenidoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BloqueContenidoPayload>
          }
          findFirst: {
            args: Prisma.BloqueContenidoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BloqueContenidoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BloqueContenidoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BloqueContenidoPayload>
          }
          findMany: {
            args: Prisma.BloqueContenidoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BloqueContenidoPayload>[]
          }
          create: {
            args: Prisma.BloqueContenidoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BloqueContenidoPayload>
          }
          createMany: {
            args: Prisma.BloqueContenidoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BloqueContenidoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BloqueContenidoPayload>[]
          }
          delete: {
            args: Prisma.BloqueContenidoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BloqueContenidoPayload>
          }
          update: {
            args: Prisma.BloqueContenidoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BloqueContenidoPayload>
          }
          deleteMany: {
            args: Prisma.BloqueContenidoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BloqueContenidoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BloqueContenidoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BloqueContenidoPayload>[]
          }
          upsert: {
            args: Prisma.BloqueContenidoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BloqueContenidoPayload>
          }
          aggregate: {
            args: Prisma.BloqueContenidoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBloqueContenido>
          }
          groupBy: {
            args: Prisma.BloqueContenidoGroupByArgs<ExtArgs>
            result: $Utils.Optional<BloqueContenidoGroupByOutputType>[]
          }
          count: {
            args: Prisma.BloqueContenidoCountArgs<ExtArgs>
            result: $Utils.Optional<BloqueContenidoCountAggregateOutputType> | number
          }
        }
      }
      Roles: {
        payload: Prisma.$RolesPayload<ExtArgs>
        fields: Prisma.RolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          findFirst: {
            args: Prisma.RolesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          findMany: {
            args: Prisma.RolesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>[]
          }
          create: {
            args: Prisma.RolesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          createMany: {
            args: Prisma.RolesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RolesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>[]
          }
          delete: {
            args: Prisma.RolesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          update: {
            args: Prisma.RolesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          deleteMany: {
            args: Prisma.RolesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RolesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>[]
          }
          upsert: {
            args: Prisma.RolesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          aggregate: {
            args: Prisma.RolesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoles>
          }
          groupBy: {
            args: Prisma.RolesGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolesCountArgs<ExtArgs>
            result: $Utils.Optional<RolesCountAggregateOutputType> | number
          }
        }
      }
      Miembro: {
        payload: Prisma.$MiembroPayload<ExtArgs>
        fields: Prisma.MiembroFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MiembroFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MiembroPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MiembroFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MiembroPayload>
          }
          findFirst: {
            args: Prisma.MiembroFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MiembroPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MiembroFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MiembroPayload>
          }
          findMany: {
            args: Prisma.MiembroFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MiembroPayload>[]
          }
          create: {
            args: Prisma.MiembroCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MiembroPayload>
          }
          createMany: {
            args: Prisma.MiembroCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MiembroCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MiembroPayload>[]
          }
          delete: {
            args: Prisma.MiembroDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MiembroPayload>
          }
          update: {
            args: Prisma.MiembroUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MiembroPayload>
          }
          deleteMany: {
            args: Prisma.MiembroDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MiembroUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MiembroUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MiembroPayload>[]
          }
          upsert: {
            args: Prisma.MiembroUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MiembroPayload>
          }
          aggregate: {
            args: Prisma.MiembroAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMiembro>
          }
          groupBy: {
            args: Prisma.MiembroGroupByArgs<ExtArgs>
            result: $Utils.Optional<MiembroGroupByOutputType>[]
          }
          count: {
            args: Prisma.MiembroCountArgs<ExtArgs>
            result: $Utils.Optional<MiembroCountAggregateOutputType> | number
          }
        }
      }
      Estado: {
        payload: Prisma.$EstadoPayload<ExtArgs>
        fields: Prisma.EstadoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EstadoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstadoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EstadoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstadoPayload>
          }
          findFirst: {
            args: Prisma.EstadoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstadoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EstadoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstadoPayload>
          }
          findMany: {
            args: Prisma.EstadoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstadoPayload>[]
          }
          create: {
            args: Prisma.EstadoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstadoPayload>
          }
          createMany: {
            args: Prisma.EstadoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EstadoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstadoPayload>[]
          }
          delete: {
            args: Prisma.EstadoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstadoPayload>
          }
          update: {
            args: Prisma.EstadoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstadoPayload>
          }
          deleteMany: {
            args: Prisma.EstadoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EstadoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EstadoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstadoPayload>[]
          }
          upsert: {
            args: Prisma.EstadoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstadoPayload>
          }
          aggregate: {
            args: Prisma.EstadoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEstado>
          }
          groupBy: {
            args: Prisma.EstadoGroupByArgs<ExtArgs>
            result: $Utils.Optional<EstadoGroupByOutputType>[]
          }
          count: {
            args: Prisma.EstadoCountArgs<ExtArgs>
            result: $Utils.Optional<EstadoCountAggregateOutputType> | number
          }
        }
      }
      Responsable: {
        payload: Prisma.$ResponsablePayload<ExtArgs>
        fields: Prisma.ResponsableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResponsableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResponsableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsablePayload>
          }
          findFirst: {
            args: Prisma.ResponsableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResponsableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsablePayload>
          }
          findMany: {
            args: Prisma.ResponsableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsablePayload>[]
          }
          create: {
            args: Prisma.ResponsableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsablePayload>
          }
          createMany: {
            args: Prisma.ResponsableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResponsableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsablePayload>[]
          }
          delete: {
            args: Prisma.ResponsableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsablePayload>
          }
          update: {
            args: Prisma.ResponsableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsablePayload>
          }
          deleteMany: {
            args: Prisma.ResponsableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResponsableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResponsableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsablePayload>[]
          }
          upsert: {
            args: Prisma.ResponsableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsablePayload>
          }
          aggregate: {
            args: Prisma.ResponsableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResponsable>
          }
          groupBy: {
            args: Prisma.ResponsableGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResponsableGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResponsableCountArgs<ExtArgs>
            result: $Utils.Optional<ResponsableCountAggregateOutputType> | number
          }
        }
      }
      Comentario: {
        payload: Prisma.$ComentarioPayload<ExtArgs>
        fields: Prisma.ComentarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComentarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComentarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComentarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComentarioPayload>
          }
          findFirst: {
            args: Prisma.ComentarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComentarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComentarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComentarioPayload>
          }
          findMany: {
            args: Prisma.ComentarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComentarioPayload>[]
          }
          create: {
            args: Prisma.ComentarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComentarioPayload>
          }
          createMany: {
            args: Prisma.ComentarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComentarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComentarioPayload>[]
          }
          delete: {
            args: Prisma.ComentarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComentarioPayload>
          }
          update: {
            args: Prisma.ComentarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComentarioPayload>
          }
          deleteMany: {
            args: Prisma.ComentarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComentarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComentarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComentarioPayload>[]
          }
          upsert: {
            args: Prisma.ComentarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComentarioPayload>
          }
          aggregate: {
            args: Prisma.ComentarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComentario>
          }
          groupBy: {
            args: Prisma.ComentarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComentarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComentarioCountArgs<ExtArgs>
            result: $Utils.Optional<ComentarioCountAggregateOutputType> | number
          }
        }
      }
      Notificacion: {
        payload: Prisma.$NotificacionPayload<ExtArgs>
        fields: Prisma.NotificacionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificacionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificacionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          findFirst: {
            args: Prisma.NotificacionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificacionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          findMany: {
            args: Prisma.NotificacionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>[]
          }
          create: {
            args: Prisma.NotificacionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          createMany: {
            args: Prisma.NotificacionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificacionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>[]
          }
          delete: {
            args: Prisma.NotificacionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          update: {
            args: Prisma.NotificacionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          deleteMany: {
            args: Prisma.NotificacionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificacionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificacionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>[]
          }
          upsert: {
            args: Prisma.NotificacionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          aggregate: {
            args: Prisma.NotificacionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificacion>
          }
          groupBy: {
            args: Prisma.NotificacionGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificacionGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificacionCountArgs<ExtArgs>
            result: $Utils.Optional<NotificacionCountAggregateOutputType> | number
          }
        }
      }
      Etiqueta: {
        payload: Prisma.$EtiquetaPayload<ExtArgs>
        fields: Prisma.EtiquetaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EtiquetaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtiquetaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EtiquetaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtiquetaPayload>
          }
          findFirst: {
            args: Prisma.EtiquetaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtiquetaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EtiquetaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtiquetaPayload>
          }
          findMany: {
            args: Prisma.EtiquetaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtiquetaPayload>[]
          }
          create: {
            args: Prisma.EtiquetaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtiquetaPayload>
          }
          createMany: {
            args: Prisma.EtiquetaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EtiquetaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtiquetaPayload>[]
          }
          delete: {
            args: Prisma.EtiquetaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtiquetaPayload>
          }
          update: {
            args: Prisma.EtiquetaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtiquetaPayload>
          }
          deleteMany: {
            args: Prisma.EtiquetaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EtiquetaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EtiquetaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtiquetaPayload>[]
          }
          upsert: {
            args: Prisma.EtiquetaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtiquetaPayload>
          }
          aggregate: {
            args: Prisma.EtiquetaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEtiqueta>
          }
          groupBy: {
            args: Prisma.EtiquetaGroupByArgs<ExtArgs>
            result: $Utils.Optional<EtiquetaGroupByOutputType>[]
          }
          count: {
            args: Prisma.EtiquetaCountArgs<ExtArgs>
            result: $Utils.Optional<EtiquetaCountAggregateOutputType> | number
          }
        }
      }
      TareasEtiquetas: {
        payload: Prisma.$TareasEtiquetasPayload<ExtArgs>
        fields: Prisma.TareasEtiquetasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TareasEtiquetasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareasEtiquetasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TareasEtiquetasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareasEtiquetasPayload>
          }
          findFirst: {
            args: Prisma.TareasEtiquetasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareasEtiquetasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TareasEtiquetasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareasEtiquetasPayload>
          }
          findMany: {
            args: Prisma.TareasEtiquetasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareasEtiquetasPayload>[]
          }
          create: {
            args: Prisma.TareasEtiquetasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareasEtiquetasPayload>
          }
          createMany: {
            args: Prisma.TareasEtiquetasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TareasEtiquetasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareasEtiquetasPayload>[]
          }
          delete: {
            args: Prisma.TareasEtiquetasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareasEtiquetasPayload>
          }
          update: {
            args: Prisma.TareasEtiquetasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareasEtiquetasPayload>
          }
          deleteMany: {
            args: Prisma.TareasEtiquetasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TareasEtiquetasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TareasEtiquetasUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareasEtiquetasPayload>[]
          }
          upsert: {
            args: Prisma.TareasEtiquetasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareasEtiquetasPayload>
          }
          aggregate: {
            args: Prisma.TareasEtiquetasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTareasEtiquetas>
          }
          groupBy: {
            args: Prisma.TareasEtiquetasGroupByArgs<ExtArgs>
            result: $Utils.Optional<TareasEtiquetasGroupByOutputType>[]
          }
          count: {
            args: Prisma.TareasEtiquetasCountArgs<ExtArgs>
            result: $Utils.Optional<TareasEtiquetasCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    proyectos?: ProyectosOmit
    tarea?: TareaOmit
    bloqueContenido?: BloqueContenidoOmit
    roles?: RolesOmit
    miembro?: MiembroOmit
    estado?: EstadoOmit
    responsable?: ResponsableOmit
    comentario?: ComentarioOmit
    notificacion?: NotificacionOmit
    etiqueta?: EtiquetaOmit
    tareasEtiquetas?: TareasEtiquetasOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    proyectosCreados: number
    miembroDe: number
    responsableDe: number
    comentarios: number
    notificaciones: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proyectosCreados?: boolean | UsuarioCountOutputTypeCountProyectosCreadosArgs
    miembroDe?: boolean | UsuarioCountOutputTypeCountMiembroDeArgs
    responsableDe?: boolean | UsuarioCountOutputTypeCountResponsableDeArgs
    comentarios?: boolean | UsuarioCountOutputTypeCountComentariosArgs
    notificaciones?: boolean | UsuarioCountOutputTypeCountNotificacionesArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountProyectosCreadosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProyectosWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountMiembroDeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MiembroWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountResponsableDeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponsableWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountComentariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComentarioWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountNotificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificacionWhereInput
  }


  /**
   * Count Type ProyectosCountOutputType
   */

  export type ProyectosCountOutputType = {
    miembros: number
    estados: number
    tareas: number
  }

  export type ProyectosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    miembros?: boolean | ProyectosCountOutputTypeCountMiembrosArgs
    estados?: boolean | ProyectosCountOutputTypeCountEstadosArgs
    tareas?: boolean | ProyectosCountOutputTypeCountTareasArgs
  }

  // Custom InputTypes
  /**
   * ProyectosCountOutputType without action
   */
  export type ProyectosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProyectosCountOutputType
     */
    select?: ProyectosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProyectosCountOutputType without action
   */
  export type ProyectosCountOutputTypeCountMiembrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MiembroWhereInput
  }

  /**
   * ProyectosCountOutputType without action
   */
  export type ProyectosCountOutputTypeCountEstadosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EstadoWhereInput
  }

  /**
   * ProyectosCountOutputType without action
   */
  export type ProyectosCountOutputTypeCountTareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TareaWhereInput
  }


  /**
   * Count Type TareaCountOutputType
   */

  export type TareaCountOutputType = {
    responsables: number
    comentarios: number
    notificaciones: number
    etiquetas: number
    BloqueContenido: number
  }

  export type TareaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responsables?: boolean | TareaCountOutputTypeCountResponsablesArgs
    comentarios?: boolean | TareaCountOutputTypeCountComentariosArgs
    notificaciones?: boolean | TareaCountOutputTypeCountNotificacionesArgs
    etiquetas?: boolean | TareaCountOutputTypeCountEtiquetasArgs
    BloqueContenido?: boolean | TareaCountOutputTypeCountBloqueContenidoArgs
  }

  // Custom InputTypes
  /**
   * TareaCountOutputType without action
   */
  export type TareaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaCountOutputType
     */
    select?: TareaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TareaCountOutputType without action
   */
  export type TareaCountOutputTypeCountResponsablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponsableWhereInput
  }

  /**
   * TareaCountOutputType without action
   */
  export type TareaCountOutputTypeCountComentariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComentarioWhereInput
  }

  /**
   * TareaCountOutputType without action
   */
  export type TareaCountOutputTypeCountNotificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificacionWhereInput
  }

  /**
   * TareaCountOutputType without action
   */
  export type TareaCountOutputTypeCountEtiquetasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TareasEtiquetasWhereInput
  }

  /**
   * TareaCountOutputType without action
   */
  export type TareaCountOutputTypeCountBloqueContenidoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BloqueContenidoWhereInput
  }


  /**
   * Count Type RolesCountOutputType
   */

  export type RolesCountOutputType = {
    miembros: number
  }

  export type RolesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    miembros?: boolean | RolesCountOutputTypeCountMiembrosArgs
  }

  // Custom InputTypes
  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolesCountOutputType
     */
    select?: RolesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeCountMiembrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MiembroWhereInput
  }


  /**
   * Count Type EstadoCountOutputType
   */

  export type EstadoCountOutputType = {
    tareas: number
  }

  export type EstadoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tareas?: boolean | EstadoCountOutputTypeCountTareasArgs
  }

  // Custom InputTypes
  /**
   * EstadoCountOutputType without action
   */
  export type EstadoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EstadoCountOutputType
     */
    select?: EstadoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EstadoCountOutputType without action
   */
  export type EstadoCountOutputTypeCountTareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TareaWhereInput
  }


  /**
   * Count Type EtiquetaCountOutputType
   */

  export type EtiquetaCountOutputType = {
    tareas: number
  }

  export type EtiquetaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tareas?: boolean | EtiquetaCountOutputTypeCountTareasArgs
  }

  // Custom InputTypes
  /**
   * EtiquetaCountOutputType without action
   */
  export type EtiquetaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EtiquetaCountOutputType
     */
    select?: EtiquetaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EtiquetaCountOutputType without action
   */
  export type EtiquetaCountOutputTypeCountTareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TareasEtiquetasWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    apellido: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    apellido: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nombre: number
    apellido: number
    email: number
    password: number
    createdAt: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    nombre?: true
    apellido?: true
    email?: true
    password?: true
    createdAt?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nombre?: true
    apellido?: true
    email?: true
    password?: true
    createdAt?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nombre?: true
    apellido?: true
    email?: true
    password?: true
    createdAt?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt: Date
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    proyectosCreados?: boolean | Usuario$proyectosCreadosArgs<ExtArgs>
    miembroDe?: boolean | Usuario$miembroDeArgs<ExtArgs>
    responsableDe?: boolean | Usuario$responsableDeArgs<ExtArgs>
    comentarios?: boolean | Usuario$comentariosArgs<ExtArgs>
    notificaciones?: boolean | Usuario$notificacionesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "apellido" | "email" | "password" | "createdAt", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proyectosCreados?: boolean | Usuario$proyectosCreadosArgs<ExtArgs>
    miembroDe?: boolean | Usuario$miembroDeArgs<ExtArgs>
    responsableDe?: boolean | Usuario$responsableDeArgs<ExtArgs>
    comentarios?: boolean | Usuario$comentariosArgs<ExtArgs>
    notificaciones?: boolean | Usuario$notificacionesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      proyectosCreados: Prisma.$ProyectosPayload<ExtArgs>[]
      miembroDe: Prisma.$MiembroPayload<ExtArgs>[]
      responsableDe: Prisma.$ResponsablePayload<ExtArgs>[]
      comentarios: Prisma.$ComentarioPayload<ExtArgs>[]
      notificaciones: Prisma.$NotificacionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      apellido: string
      email: string
      password: string
      createdAt: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    proyectosCreados<T extends Usuario$proyectosCreadosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$proyectosCreadosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    miembroDe<T extends Usuario$miembroDeArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$miembroDeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    responsableDe<T extends Usuario$responsableDeArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$responsableDeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comentarios<T extends Usuario$comentariosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$comentariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notificaciones<T extends Usuario$notificacionesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$notificacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly apellido: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly password: FieldRef<"Usuario", 'String'>
    readonly createdAt: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.proyectosCreados
   */
  export type Usuario$proyectosCreadosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosInclude<ExtArgs> | null
    where?: ProyectosWhereInput
    orderBy?: ProyectosOrderByWithRelationInput | ProyectosOrderByWithRelationInput[]
    cursor?: ProyectosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProyectosScalarFieldEnum | ProyectosScalarFieldEnum[]
  }

  /**
   * Usuario.miembroDe
   */
  export type Usuario$miembroDeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    where?: MiembroWhereInput
    orderBy?: MiembroOrderByWithRelationInput | MiembroOrderByWithRelationInput[]
    cursor?: MiembroWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MiembroScalarFieldEnum | MiembroScalarFieldEnum[]
  }

  /**
   * Usuario.responsableDe
   */
  export type Usuario$responsableDeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
    where?: ResponsableWhereInput
    orderBy?: ResponsableOrderByWithRelationInput | ResponsableOrderByWithRelationInput[]
    cursor?: ResponsableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResponsableScalarFieldEnum | ResponsableScalarFieldEnum[]
  }

  /**
   * Usuario.comentarios
   */
  export type Usuario$comentariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
    where?: ComentarioWhereInput
    orderBy?: ComentarioOrderByWithRelationInput | ComentarioOrderByWithRelationInput[]
    cursor?: ComentarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComentarioScalarFieldEnum | ComentarioScalarFieldEnum[]
  }

  /**
   * Usuario.notificaciones
   */
  export type Usuario$notificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    where?: NotificacionWhereInput
    orderBy?: NotificacionOrderByWithRelationInput | NotificacionOrderByWithRelationInput[]
    cursor?: NotificacionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificacionScalarFieldEnum | NotificacionScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Proyectos
   */

  export type AggregateProyectos = {
    _count: ProyectosCountAggregateOutputType | null
    _min: ProyectosMinAggregateOutputType | null
    _max: ProyectosMaxAggregateOutputType | null
  }

  export type ProyectosMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    descripcion: string | null
    createdAt: Date | null
    creadoPorId: string | null
  }

  export type ProyectosMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    descripcion: string | null
    createdAt: Date | null
    creadoPorId: string | null
  }

  export type ProyectosCountAggregateOutputType = {
    id: number
    nombre: number
    descripcion: number
    createdAt: number
    creadoPorId: number
    _all: number
  }


  export type ProyectosMinAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createdAt?: true
    creadoPorId?: true
  }

  export type ProyectosMaxAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createdAt?: true
    creadoPorId?: true
  }

  export type ProyectosCountAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createdAt?: true
    creadoPorId?: true
    _all?: true
  }

  export type ProyectosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proyectos to aggregate.
     */
    where?: ProyectosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectosOrderByWithRelationInput | ProyectosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProyectosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Proyectos
    **/
    _count?: true | ProyectosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProyectosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProyectosMaxAggregateInputType
  }

  export type GetProyectosAggregateType<T extends ProyectosAggregateArgs> = {
        [P in keyof T & keyof AggregateProyectos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProyectos[P]>
      : GetScalarType<T[P], AggregateProyectos[P]>
  }




  export type ProyectosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProyectosWhereInput
    orderBy?: ProyectosOrderByWithAggregationInput | ProyectosOrderByWithAggregationInput[]
    by: ProyectosScalarFieldEnum[] | ProyectosScalarFieldEnum
    having?: ProyectosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProyectosCountAggregateInputType | true
    _min?: ProyectosMinAggregateInputType
    _max?: ProyectosMaxAggregateInputType
  }

  export type ProyectosGroupByOutputType = {
    id: string
    nombre: string
    descripcion: string | null
    createdAt: Date
    creadoPorId: string
    _count: ProyectosCountAggregateOutputType | null
    _min: ProyectosMinAggregateOutputType | null
    _max: ProyectosMaxAggregateOutputType | null
  }

  type GetProyectosGroupByPayload<T extends ProyectosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProyectosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProyectosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProyectosGroupByOutputType[P]>
            : GetScalarType<T[P], ProyectosGroupByOutputType[P]>
        }
      >
    >


  export type ProyectosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    createdAt?: boolean
    creadoPorId?: boolean
    creadoPor?: boolean | UsuarioDefaultArgs<ExtArgs>
    miembros?: boolean | Proyectos$miembrosArgs<ExtArgs>
    estados?: boolean | Proyectos$estadosArgs<ExtArgs>
    tareas?: boolean | Proyectos$tareasArgs<ExtArgs>
    _count?: boolean | ProyectosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proyectos"]>

  export type ProyectosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    createdAt?: boolean
    creadoPorId?: boolean
    creadoPor?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proyectos"]>

  export type ProyectosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    createdAt?: boolean
    creadoPorId?: boolean
    creadoPor?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proyectos"]>

  export type ProyectosSelectScalar = {
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    createdAt?: boolean
    creadoPorId?: boolean
  }

  export type ProyectosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "descripcion" | "createdAt" | "creadoPorId", ExtArgs["result"]["proyectos"]>
  export type ProyectosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creadoPor?: boolean | UsuarioDefaultArgs<ExtArgs>
    miembros?: boolean | Proyectos$miembrosArgs<ExtArgs>
    estados?: boolean | Proyectos$estadosArgs<ExtArgs>
    tareas?: boolean | Proyectos$tareasArgs<ExtArgs>
    _count?: boolean | ProyectosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProyectosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creadoPor?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ProyectosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creadoPor?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $ProyectosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Proyectos"
    objects: {
      creadoPor: Prisma.$UsuarioPayload<ExtArgs>
      miembros: Prisma.$MiembroPayload<ExtArgs>[]
      /**
       * ID de 
       */
      estados: Prisma.$EstadoPayload<ExtArgs>[]
      tareas: Prisma.$TareaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      descripcion: string | null
      createdAt: Date
      creadoPorId: string
    }, ExtArgs["result"]["proyectos"]>
    composites: {}
  }

  type ProyectosGetPayload<S extends boolean | null | undefined | ProyectosDefaultArgs> = $Result.GetResult<Prisma.$ProyectosPayload, S>

  type ProyectosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProyectosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProyectosCountAggregateInputType | true
    }

  export interface ProyectosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Proyectos'], meta: { name: 'Proyectos' } }
    /**
     * Find zero or one Proyectos that matches the filter.
     * @param {ProyectosFindUniqueArgs} args - Arguments to find a Proyectos
     * @example
     * // Get one Proyectos
     * const proyectos = await prisma.proyectos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProyectosFindUniqueArgs>(args: SelectSubset<T, ProyectosFindUniqueArgs<ExtArgs>>): Prisma__ProyectosClient<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Proyectos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProyectosFindUniqueOrThrowArgs} args - Arguments to find a Proyectos
     * @example
     * // Get one Proyectos
     * const proyectos = await prisma.proyectos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProyectosFindUniqueOrThrowArgs>(args: SelectSubset<T, ProyectosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProyectosClient<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proyectos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectosFindFirstArgs} args - Arguments to find a Proyectos
     * @example
     * // Get one Proyectos
     * const proyectos = await prisma.proyectos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProyectosFindFirstArgs>(args?: SelectSubset<T, ProyectosFindFirstArgs<ExtArgs>>): Prisma__ProyectosClient<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proyectos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectosFindFirstOrThrowArgs} args - Arguments to find a Proyectos
     * @example
     * // Get one Proyectos
     * const proyectos = await prisma.proyectos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProyectosFindFirstOrThrowArgs>(args?: SelectSubset<T, ProyectosFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProyectosClient<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Proyectos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proyectos
     * const proyectos = await prisma.proyectos.findMany()
     * 
     * // Get first 10 Proyectos
     * const proyectos = await prisma.proyectos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proyectosWithIdOnly = await prisma.proyectos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProyectosFindManyArgs>(args?: SelectSubset<T, ProyectosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Proyectos.
     * @param {ProyectosCreateArgs} args - Arguments to create a Proyectos.
     * @example
     * // Create one Proyectos
     * const Proyectos = await prisma.proyectos.create({
     *   data: {
     *     // ... data to create a Proyectos
     *   }
     * })
     * 
     */
    create<T extends ProyectosCreateArgs>(args: SelectSubset<T, ProyectosCreateArgs<ExtArgs>>): Prisma__ProyectosClient<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Proyectos.
     * @param {ProyectosCreateManyArgs} args - Arguments to create many Proyectos.
     * @example
     * // Create many Proyectos
     * const proyectos = await prisma.proyectos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProyectosCreateManyArgs>(args?: SelectSubset<T, ProyectosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Proyectos and returns the data saved in the database.
     * @param {ProyectosCreateManyAndReturnArgs} args - Arguments to create many Proyectos.
     * @example
     * // Create many Proyectos
     * const proyectos = await prisma.proyectos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Proyectos and only return the `id`
     * const proyectosWithIdOnly = await prisma.proyectos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProyectosCreateManyAndReturnArgs>(args?: SelectSubset<T, ProyectosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Proyectos.
     * @param {ProyectosDeleteArgs} args - Arguments to delete one Proyectos.
     * @example
     * // Delete one Proyectos
     * const Proyectos = await prisma.proyectos.delete({
     *   where: {
     *     // ... filter to delete one Proyectos
     *   }
     * })
     * 
     */
    delete<T extends ProyectosDeleteArgs>(args: SelectSubset<T, ProyectosDeleteArgs<ExtArgs>>): Prisma__ProyectosClient<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Proyectos.
     * @param {ProyectosUpdateArgs} args - Arguments to update one Proyectos.
     * @example
     * // Update one Proyectos
     * const proyectos = await prisma.proyectos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProyectosUpdateArgs>(args: SelectSubset<T, ProyectosUpdateArgs<ExtArgs>>): Prisma__ProyectosClient<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Proyectos.
     * @param {ProyectosDeleteManyArgs} args - Arguments to filter Proyectos to delete.
     * @example
     * // Delete a few Proyectos
     * const { count } = await prisma.proyectos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProyectosDeleteManyArgs>(args?: SelectSubset<T, ProyectosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proyectos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proyectos
     * const proyectos = await prisma.proyectos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProyectosUpdateManyArgs>(args: SelectSubset<T, ProyectosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proyectos and returns the data updated in the database.
     * @param {ProyectosUpdateManyAndReturnArgs} args - Arguments to update many Proyectos.
     * @example
     * // Update many Proyectos
     * const proyectos = await prisma.proyectos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Proyectos and only return the `id`
     * const proyectosWithIdOnly = await prisma.proyectos.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProyectosUpdateManyAndReturnArgs>(args: SelectSubset<T, ProyectosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Proyectos.
     * @param {ProyectosUpsertArgs} args - Arguments to update or create a Proyectos.
     * @example
     * // Update or create a Proyectos
     * const proyectos = await prisma.proyectos.upsert({
     *   create: {
     *     // ... data to create a Proyectos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proyectos we want to update
     *   }
     * })
     */
    upsert<T extends ProyectosUpsertArgs>(args: SelectSubset<T, ProyectosUpsertArgs<ExtArgs>>): Prisma__ProyectosClient<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Proyectos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectosCountArgs} args - Arguments to filter Proyectos to count.
     * @example
     * // Count the number of Proyectos
     * const count = await prisma.proyectos.count({
     *   where: {
     *     // ... the filter for the Proyectos we want to count
     *   }
     * })
    **/
    count<T extends ProyectosCountArgs>(
      args?: Subset<T, ProyectosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProyectosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proyectos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProyectosAggregateArgs>(args: Subset<T, ProyectosAggregateArgs>): Prisma.PrismaPromise<GetProyectosAggregateType<T>>

    /**
     * Group by Proyectos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProyectosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProyectosGroupByArgs['orderBy'] }
        : { orderBy?: ProyectosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProyectosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProyectosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Proyectos model
   */
  readonly fields: ProyectosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Proyectos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProyectosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creadoPor<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    miembros<T extends Proyectos$miembrosArgs<ExtArgs> = {}>(args?: Subset<T, Proyectos$miembrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    estados<T extends Proyectos$estadosArgs<ExtArgs> = {}>(args?: Subset<T, Proyectos$estadosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tareas<T extends Proyectos$tareasArgs<ExtArgs> = {}>(args?: Subset<T, Proyectos$tareasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Proyectos model
   */
  interface ProyectosFieldRefs {
    readonly id: FieldRef<"Proyectos", 'String'>
    readonly nombre: FieldRef<"Proyectos", 'String'>
    readonly descripcion: FieldRef<"Proyectos", 'String'>
    readonly createdAt: FieldRef<"Proyectos", 'DateTime'>
    readonly creadoPorId: FieldRef<"Proyectos", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Proyectos findUnique
   */
  export type ProyectosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosInclude<ExtArgs> | null
    /**
     * Filter, which Proyectos to fetch.
     */
    where: ProyectosWhereUniqueInput
  }

  /**
   * Proyectos findUniqueOrThrow
   */
  export type ProyectosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosInclude<ExtArgs> | null
    /**
     * Filter, which Proyectos to fetch.
     */
    where: ProyectosWhereUniqueInput
  }

  /**
   * Proyectos findFirst
   */
  export type ProyectosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosInclude<ExtArgs> | null
    /**
     * Filter, which Proyectos to fetch.
     */
    where?: ProyectosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectosOrderByWithRelationInput | ProyectosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proyectos.
     */
    cursor?: ProyectosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proyectos.
     */
    distinct?: ProyectosScalarFieldEnum | ProyectosScalarFieldEnum[]
  }

  /**
   * Proyectos findFirstOrThrow
   */
  export type ProyectosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosInclude<ExtArgs> | null
    /**
     * Filter, which Proyectos to fetch.
     */
    where?: ProyectosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectosOrderByWithRelationInput | ProyectosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proyectos.
     */
    cursor?: ProyectosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proyectos.
     */
    distinct?: ProyectosScalarFieldEnum | ProyectosScalarFieldEnum[]
  }

  /**
   * Proyectos findMany
   */
  export type ProyectosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosInclude<ExtArgs> | null
    /**
     * Filter, which Proyectos to fetch.
     */
    where?: ProyectosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectosOrderByWithRelationInput | ProyectosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Proyectos.
     */
    cursor?: ProyectosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    distinct?: ProyectosScalarFieldEnum | ProyectosScalarFieldEnum[]
  }

  /**
   * Proyectos create
   */
  export type ProyectosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosInclude<ExtArgs> | null
    /**
     * The data needed to create a Proyectos.
     */
    data: XOR<ProyectosCreateInput, ProyectosUncheckedCreateInput>
  }

  /**
   * Proyectos createMany
   */
  export type ProyectosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Proyectos.
     */
    data: ProyectosCreateManyInput | ProyectosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Proyectos createManyAndReturn
   */
  export type ProyectosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * The data used to create many Proyectos.
     */
    data: ProyectosCreateManyInput | ProyectosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Proyectos update
   */
  export type ProyectosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosInclude<ExtArgs> | null
    /**
     * The data needed to update a Proyectos.
     */
    data: XOR<ProyectosUpdateInput, ProyectosUncheckedUpdateInput>
    /**
     * Choose, which Proyectos to update.
     */
    where: ProyectosWhereUniqueInput
  }

  /**
   * Proyectos updateMany
   */
  export type ProyectosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Proyectos.
     */
    data: XOR<ProyectosUpdateManyMutationInput, ProyectosUncheckedUpdateManyInput>
    /**
     * Filter which Proyectos to update
     */
    where?: ProyectosWhereInput
    /**
     * Limit how many Proyectos to update.
     */
    limit?: number
  }

  /**
   * Proyectos updateManyAndReturn
   */
  export type ProyectosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * The data used to update Proyectos.
     */
    data: XOR<ProyectosUpdateManyMutationInput, ProyectosUncheckedUpdateManyInput>
    /**
     * Filter which Proyectos to update
     */
    where?: ProyectosWhereInput
    /**
     * Limit how many Proyectos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Proyectos upsert
   */
  export type ProyectosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosInclude<ExtArgs> | null
    /**
     * The filter to search for the Proyectos to update in case it exists.
     */
    where: ProyectosWhereUniqueInput
    /**
     * In case the Proyectos found by the `where` argument doesn't exist, create a new Proyectos with this data.
     */
    create: XOR<ProyectosCreateInput, ProyectosUncheckedCreateInput>
    /**
     * In case the Proyectos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProyectosUpdateInput, ProyectosUncheckedUpdateInput>
  }

  /**
   * Proyectos delete
   */
  export type ProyectosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosInclude<ExtArgs> | null
    /**
     * Filter which Proyectos to delete.
     */
    where: ProyectosWhereUniqueInput
  }

  /**
   * Proyectos deleteMany
   */
  export type ProyectosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proyectos to delete
     */
    where?: ProyectosWhereInput
    /**
     * Limit how many Proyectos to delete.
     */
    limit?: number
  }

  /**
   * Proyectos.miembros
   */
  export type Proyectos$miembrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    where?: MiembroWhereInput
    orderBy?: MiembroOrderByWithRelationInput | MiembroOrderByWithRelationInput[]
    cursor?: MiembroWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MiembroScalarFieldEnum | MiembroScalarFieldEnum[]
  }

  /**
   * Proyectos.estados
   */
  export type Proyectos$estadosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoInclude<ExtArgs> | null
    where?: EstadoWhereInput
    orderBy?: EstadoOrderByWithRelationInput | EstadoOrderByWithRelationInput[]
    cursor?: EstadoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EstadoScalarFieldEnum | EstadoScalarFieldEnum[]
  }

  /**
   * Proyectos.tareas
   */
  export type Proyectos$tareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    where?: TareaWhereInput
    orderBy?: TareaOrderByWithRelationInput | TareaOrderByWithRelationInput[]
    cursor?: TareaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TareaScalarFieldEnum | TareaScalarFieldEnum[]
  }

  /**
   * Proyectos without action
   */
  export type ProyectosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyectos
     */
    select?: ProyectosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyectos
     */
    omit?: ProyectosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectosInclude<ExtArgs> | null
  }


  /**
   * Model Tarea
   */

  export type AggregateTarea = {
    _count: TareaCountAggregateOutputType | null
    _avg: TareaAvgAggregateOutputType | null
    _sum: TareaSumAggregateOutputType | null
    _min: TareaMinAggregateOutputType | null
    _max: TareaMaxAggregateOutputType | null
  }

  export type TareaAvgAggregateOutputType = {
    posicion: number | null
    estadoId: number | null
  }

  export type TareaSumAggregateOutputType = {
    posicion: number | null
    estadoId: number | null
  }

  export type TareaMinAggregateOutputType = {
    id: string | null
    titulo: string | null
    fechaLimite: Date | null
    posicion: number | null
    createdAt: Date | null
    proyectoId: string | null
    estadoId: number | null
  }

  export type TareaMaxAggregateOutputType = {
    id: string | null
    titulo: string | null
    fechaLimite: Date | null
    posicion: number | null
    createdAt: Date | null
    proyectoId: string | null
    estadoId: number | null
  }

  export type TareaCountAggregateOutputType = {
    id: number
    titulo: number
    fechaLimite: number
    posicion: number
    createdAt: number
    proyectoId: number
    estadoId: number
    _all: number
  }


  export type TareaAvgAggregateInputType = {
    posicion?: true
    estadoId?: true
  }

  export type TareaSumAggregateInputType = {
    posicion?: true
    estadoId?: true
  }

  export type TareaMinAggregateInputType = {
    id?: true
    titulo?: true
    fechaLimite?: true
    posicion?: true
    createdAt?: true
    proyectoId?: true
    estadoId?: true
  }

  export type TareaMaxAggregateInputType = {
    id?: true
    titulo?: true
    fechaLimite?: true
    posicion?: true
    createdAt?: true
    proyectoId?: true
    estadoId?: true
  }

  export type TareaCountAggregateInputType = {
    id?: true
    titulo?: true
    fechaLimite?: true
    posicion?: true
    createdAt?: true
    proyectoId?: true
    estadoId?: true
    _all?: true
  }

  export type TareaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tarea to aggregate.
     */
    where?: TareaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tareas to fetch.
     */
    orderBy?: TareaOrderByWithRelationInput | TareaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TareaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tareas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tareas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tareas
    **/
    _count?: true | TareaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TareaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TareaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TareaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TareaMaxAggregateInputType
  }

  export type GetTareaAggregateType<T extends TareaAggregateArgs> = {
        [P in keyof T & keyof AggregateTarea]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTarea[P]>
      : GetScalarType<T[P], AggregateTarea[P]>
  }




  export type TareaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TareaWhereInput
    orderBy?: TareaOrderByWithAggregationInput | TareaOrderByWithAggregationInput[]
    by: TareaScalarFieldEnum[] | TareaScalarFieldEnum
    having?: TareaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TareaCountAggregateInputType | true
    _avg?: TareaAvgAggregateInputType
    _sum?: TareaSumAggregateInputType
    _min?: TareaMinAggregateInputType
    _max?: TareaMaxAggregateInputType
  }

  export type TareaGroupByOutputType = {
    id: string
    titulo: string | null
    fechaLimite: Date | null
    posicion: number
    createdAt: Date
    proyectoId: string
    estadoId: number
    _count: TareaCountAggregateOutputType | null
    _avg: TareaAvgAggregateOutputType | null
    _sum: TareaSumAggregateOutputType | null
    _min: TareaMinAggregateOutputType | null
    _max: TareaMaxAggregateOutputType | null
  }

  type GetTareaGroupByPayload<T extends TareaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TareaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TareaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TareaGroupByOutputType[P]>
            : GetScalarType<T[P], TareaGroupByOutputType[P]>
        }
      >
    >


  export type TareaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    fechaLimite?: boolean
    posicion?: boolean
    createdAt?: boolean
    proyectoId?: boolean
    estadoId?: boolean
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    estado?: boolean | EstadoDefaultArgs<ExtArgs>
    responsables?: boolean | Tarea$responsablesArgs<ExtArgs>
    comentarios?: boolean | Tarea$comentariosArgs<ExtArgs>
    notificaciones?: boolean | Tarea$notificacionesArgs<ExtArgs>
    etiquetas?: boolean | Tarea$etiquetasArgs<ExtArgs>
    BloqueContenido?: boolean | Tarea$BloqueContenidoArgs<ExtArgs>
    _count?: boolean | TareaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tarea"]>

  export type TareaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    fechaLimite?: boolean
    posicion?: boolean
    createdAt?: boolean
    proyectoId?: boolean
    estadoId?: boolean
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    estado?: boolean | EstadoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tarea"]>

  export type TareaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    fechaLimite?: boolean
    posicion?: boolean
    createdAt?: boolean
    proyectoId?: boolean
    estadoId?: boolean
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    estado?: boolean | EstadoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tarea"]>

  export type TareaSelectScalar = {
    id?: boolean
    titulo?: boolean
    fechaLimite?: boolean
    posicion?: boolean
    createdAt?: boolean
    proyectoId?: boolean
    estadoId?: boolean
  }

  export type TareaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titulo" | "fechaLimite" | "posicion" | "createdAt" | "proyectoId" | "estadoId", ExtArgs["result"]["tarea"]>
  export type TareaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    estado?: boolean | EstadoDefaultArgs<ExtArgs>
    responsables?: boolean | Tarea$responsablesArgs<ExtArgs>
    comentarios?: boolean | Tarea$comentariosArgs<ExtArgs>
    notificaciones?: boolean | Tarea$notificacionesArgs<ExtArgs>
    etiquetas?: boolean | Tarea$etiquetasArgs<ExtArgs>
    BloqueContenido?: boolean | Tarea$BloqueContenidoArgs<ExtArgs>
    _count?: boolean | TareaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TareaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    estado?: boolean | EstadoDefaultArgs<ExtArgs>
  }
  export type TareaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    estado?: boolean | EstadoDefaultArgs<ExtArgs>
  }

  export type $TareaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tarea"
    objects: {
      proyecto: Prisma.$ProyectosPayload<ExtArgs>
      estado: Prisma.$EstadoPayload<ExtArgs>
      responsables: Prisma.$ResponsablePayload<ExtArgs>[]
      comentarios: Prisma.$ComentarioPayload<ExtArgs>[]
      notificaciones: Prisma.$NotificacionPayload<ExtArgs>[]
      etiquetas: Prisma.$TareasEtiquetasPayload<ExtArgs>[]
      BloqueContenido: Prisma.$BloqueContenidoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titulo: string | null
      fechaLimite: Date | null
      posicion: number
      createdAt: Date
      proyectoId: string
      estadoId: number
    }, ExtArgs["result"]["tarea"]>
    composites: {}
  }

  type TareaGetPayload<S extends boolean | null | undefined | TareaDefaultArgs> = $Result.GetResult<Prisma.$TareaPayload, S>

  type TareaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TareaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TareaCountAggregateInputType | true
    }

  export interface TareaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tarea'], meta: { name: 'Tarea' } }
    /**
     * Find zero or one Tarea that matches the filter.
     * @param {TareaFindUniqueArgs} args - Arguments to find a Tarea
     * @example
     * // Get one Tarea
     * const tarea = await prisma.tarea.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TareaFindUniqueArgs>(args: SelectSubset<T, TareaFindUniqueArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tarea that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TareaFindUniqueOrThrowArgs} args - Arguments to find a Tarea
     * @example
     * // Get one Tarea
     * const tarea = await prisma.tarea.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TareaFindUniqueOrThrowArgs>(args: SelectSubset<T, TareaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tarea that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaFindFirstArgs} args - Arguments to find a Tarea
     * @example
     * // Get one Tarea
     * const tarea = await prisma.tarea.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TareaFindFirstArgs>(args?: SelectSubset<T, TareaFindFirstArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tarea that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaFindFirstOrThrowArgs} args - Arguments to find a Tarea
     * @example
     * // Get one Tarea
     * const tarea = await prisma.tarea.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TareaFindFirstOrThrowArgs>(args?: SelectSubset<T, TareaFindFirstOrThrowArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tareas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tareas
     * const tareas = await prisma.tarea.findMany()
     * 
     * // Get first 10 Tareas
     * const tareas = await prisma.tarea.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tareaWithIdOnly = await prisma.tarea.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TareaFindManyArgs>(args?: SelectSubset<T, TareaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tarea.
     * @param {TareaCreateArgs} args - Arguments to create a Tarea.
     * @example
     * // Create one Tarea
     * const Tarea = await prisma.tarea.create({
     *   data: {
     *     // ... data to create a Tarea
     *   }
     * })
     * 
     */
    create<T extends TareaCreateArgs>(args: SelectSubset<T, TareaCreateArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tareas.
     * @param {TareaCreateManyArgs} args - Arguments to create many Tareas.
     * @example
     * // Create many Tareas
     * const tarea = await prisma.tarea.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TareaCreateManyArgs>(args?: SelectSubset<T, TareaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tareas and returns the data saved in the database.
     * @param {TareaCreateManyAndReturnArgs} args - Arguments to create many Tareas.
     * @example
     * // Create many Tareas
     * const tarea = await prisma.tarea.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tareas and only return the `id`
     * const tareaWithIdOnly = await prisma.tarea.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TareaCreateManyAndReturnArgs>(args?: SelectSubset<T, TareaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tarea.
     * @param {TareaDeleteArgs} args - Arguments to delete one Tarea.
     * @example
     * // Delete one Tarea
     * const Tarea = await prisma.tarea.delete({
     *   where: {
     *     // ... filter to delete one Tarea
     *   }
     * })
     * 
     */
    delete<T extends TareaDeleteArgs>(args: SelectSubset<T, TareaDeleteArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tarea.
     * @param {TareaUpdateArgs} args - Arguments to update one Tarea.
     * @example
     * // Update one Tarea
     * const tarea = await prisma.tarea.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TareaUpdateArgs>(args: SelectSubset<T, TareaUpdateArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tareas.
     * @param {TareaDeleteManyArgs} args - Arguments to filter Tareas to delete.
     * @example
     * // Delete a few Tareas
     * const { count } = await prisma.tarea.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TareaDeleteManyArgs>(args?: SelectSubset<T, TareaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tareas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tareas
     * const tarea = await prisma.tarea.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TareaUpdateManyArgs>(args: SelectSubset<T, TareaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tareas and returns the data updated in the database.
     * @param {TareaUpdateManyAndReturnArgs} args - Arguments to update many Tareas.
     * @example
     * // Update many Tareas
     * const tarea = await prisma.tarea.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tareas and only return the `id`
     * const tareaWithIdOnly = await prisma.tarea.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TareaUpdateManyAndReturnArgs>(args: SelectSubset<T, TareaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tarea.
     * @param {TareaUpsertArgs} args - Arguments to update or create a Tarea.
     * @example
     * // Update or create a Tarea
     * const tarea = await prisma.tarea.upsert({
     *   create: {
     *     // ... data to create a Tarea
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tarea we want to update
     *   }
     * })
     */
    upsert<T extends TareaUpsertArgs>(args: SelectSubset<T, TareaUpsertArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tareas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaCountArgs} args - Arguments to filter Tareas to count.
     * @example
     * // Count the number of Tareas
     * const count = await prisma.tarea.count({
     *   where: {
     *     // ... the filter for the Tareas we want to count
     *   }
     * })
    **/
    count<T extends TareaCountArgs>(
      args?: Subset<T, TareaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TareaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tarea.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TareaAggregateArgs>(args: Subset<T, TareaAggregateArgs>): Prisma.PrismaPromise<GetTareaAggregateType<T>>

    /**
     * Group by Tarea.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TareaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TareaGroupByArgs['orderBy'] }
        : { orderBy?: TareaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TareaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTareaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tarea model
   */
  readonly fields: TareaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tarea.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TareaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    proyecto<T extends ProyectosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProyectosDefaultArgs<ExtArgs>>): Prisma__ProyectosClient<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    estado<T extends EstadoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EstadoDefaultArgs<ExtArgs>>): Prisma__EstadoClient<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    responsables<T extends Tarea$responsablesArgs<ExtArgs> = {}>(args?: Subset<T, Tarea$responsablesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comentarios<T extends Tarea$comentariosArgs<ExtArgs> = {}>(args?: Subset<T, Tarea$comentariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notificaciones<T extends Tarea$notificacionesArgs<ExtArgs> = {}>(args?: Subset<T, Tarea$notificacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    etiquetas<T extends Tarea$etiquetasArgs<ExtArgs> = {}>(args?: Subset<T, Tarea$etiquetasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    BloqueContenido<T extends Tarea$BloqueContenidoArgs<ExtArgs> = {}>(args?: Subset<T, Tarea$BloqueContenidoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tarea model
   */
  interface TareaFieldRefs {
    readonly id: FieldRef<"Tarea", 'String'>
    readonly titulo: FieldRef<"Tarea", 'String'>
    readonly fechaLimite: FieldRef<"Tarea", 'DateTime'>
    readonly posicion: FieldRef<"Tarea", 'Int'>
    readonly createdAt: FieldRef<"Tarea", 'DateTime'>
    readonly proyectoId: FieldRef<"Tarea", 'String'>
    readonly estadoId: FieldRef<"Tarea", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Tarea findUnique
   */
  export type TareaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter, which Tarea to fetch.
     */
    where: TareaWhereUniqueInput
  }

  /**
   * Tarea findUniqueOrThrow
   */
  export type TareaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter, which Tarea to fetch.
     */
    where: TareaWhereUniqueInput
  }

  /**
   * Tarea findFirst
   */
  export type TareaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter, which Tarea to fetch.
     */
    where?: TareaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tareas to fetch.
     */
    orderBy?: TareaOrderByWithRelationInput | TareaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tareas.
     */
    cursor?: TareaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tareas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tareas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tareas.
     */
    distinct?: TareaScalarFieldEnum | TareaScalarFieldEnum[]
  }

  /**
   * Tarea findFirstOrThrow
   */
  export type TareaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter, which Tarea to fetch.
     */
    where?: TareaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tareas to fetch.
     */
    orderBy?: TareaOrderByWithRelationInput | TareaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tareas.
     */
    cursor?: TareaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tareas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tareas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tareas.
     */
    distinct?: TareaScalarFieldEnum | TareaScalarFieldEnum[]
  }

  /**
   * Tarea findMany
   */
  export type TareaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter, which Tareas to fetch.
     */
    where?: TareaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tareas to fetch.
     */
    orderBy?: TareaOrderByWithRelationInput | TareaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tareas.
     */
    cursor?: TareaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tareas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tareas.
     */
    skip?: number
    distinct?: TareaScalarFieldEnum | TareaScalarFieldEnum[]
  }

  /**
   * Tarea create
   */
  export type TareaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * The data needed to create a Tarea.
     */
    data: XOR<TareaCreateInput, TareaUncheckedCreateInput>
  }

  /**
   * Tarea createMany
   */
  export type TareaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tareas.
     */
    data: TareaCreateManyInput | TareaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tarea createManyAndReturn
   */
  export type TareaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * The data used to create many Tareas.
     */
    data: TareaCreateManyInput | TareaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tarea update
   */
  export type TareaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * The data needed to update a Tarea.
     */
    data: XOR<TareaUpdateInput, TareaUncheckedUpdateInput>
    /**
     * Choose, which Tarea to update.
     */
    where: TareaWhereUniqueInput
  }

  /**
   * Tarea updateMany
   */
  export type TareaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tareas.
     */
    data: XOR<TareaUpdateManyMutationInput, TareaUncheckedUpdateManyInput>
    /**
     * Filter which Tareas to update
     */
    where?: TareaWhereInput
    /**
     * Limit how many Tareas to update.
     */
    limit?: number
  }

  /**
   * Tarea updateManyAndReturn
   */
  export type TareaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * The data used to update Tareas.
     */
    data: XOR<TareaUpdateManyMutationInput, TareaUncheckedUpdateManyInput>
    /**
     * Filter which Tareas to update
     */
    where?: TareaWhereInput
    /**
     * Limit how many Tareas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tarea upsert
   */
  export type TareaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * The filter to search for the Tarea to update in case it exists.
     */
    where: TareaWhereUniqueInput
    /**
     * In case the Tarea found by the `where` argument doesn't exist, create a new Tarea with this data.
     */
    create: XOR<TareaCreateInput, TareaUncheckedCreateInput>
    /**
     * In case the Tarea was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TareaUpdateInput, TareaUncheckedUpdateInput>
  }

  /**
   * Tarea delete
   */
  export type TareaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter which Tarea to delete.
     */
    where: TareaWhereUniqueInput
  }

  /**
   * Tarea deleteMany
   */
  export type TareaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tareas to delete
     */
    where?: TareaWhereInput
    /**
     * Limit how many Tareas to delete.
     */
    limit?: number
  }

  /**
   * Tarea.responsables
   */
  export type Tarea$responsablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
    where?: ResponsableWhereInput
    orderBy?: ResponsableOrderByWithRelationInput | ResponsableOrderByWithRelationInput[]
    cursor?: ResponsableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResponsableScalarFieldEnum | ResponsableScalarFieldEnum[]
  }

  /**
   * Tarea.comentarios
   */
  export type Tarea$comentariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
    where?: ComentarioWhereInput
    orderBy?: ComentarioOrderByWithRelationInput | ComentarioOrderByWithRelationInput[]
    cursor?: ComentarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComentarioScalarFieldEnum | ComentarioScalarFieldEnum[]
  }

  /**
   * Tarea.notificaciones
   */
  export type Tarea$notificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    where?: NotificacionWhereInput
    orderBy?: NotificacionOrderByWithRelationInput | NotificacionOrderByWithRelationInput[]
    cursor?: NotificacionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificacionScalarFieldEnum | NotificacionScalarFieldEnum[]
  }

  /**
   * Tarea.etiquetas
   */
  export type Tarea$etiquetasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
    where?: TareasEtiquetasWhereInput
    orderBy?: TareasEtiquetasOrderByWithRelationInput | TareasEtiquetasOrderByWithRelationInput[]
    cursor?: TareasEtiquetasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TareasEtiquetasScalarFieldEnum | TareasEtiquetasScalarFieldEnum[]
  }

  /**
   * Tarea.BloqueContenido
   */
  export type Tarea$BloqueContenidoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoInclude<ExtArgs> | null
    where?: BloqueContenidoWhereInput
    orderBy?: BloqueContenidoOrderByWithRelationInput | BloqueContenidoOrderByWithRelationInput[]
    cursor?: BloqueContenidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BloqueContenidoScalarFieldEnum | BloqueContenidoScalarFieldEnum[]
  }

  /**
   * Tarea without action
   */
  export type TareaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
  }


  /**
   * Model BloqueContenido
   */

  export type AggregateBloqueContenido = {
    _count: BloqueContenidoCountAggregateOutputType | null
    _avg: BloqueContenidoAvgAggregateOutputType | null
    _sum: BloqueContenidoSumAggregateOutputType | null
    _min: BloqueContenidoMinAggregateOutputType | null
    _max: BloqueContenidoMaxAggregateOutputType | null
  }

  export type BloqueContenidoAvgAggregateOutputType = {
    posicion: number | null
  }

  export type BloqueContenidoSumAggregateOutputType = {
    posicion: number | null
  }

  export type BloqueContenidoMinAggregateOutputType = {
    id: string | null
    tareaId: string | null
    tipo: $Enums.TipoDeBloque | null
    contenido: string | null
    posicion: number | null
  }

  export type BloqueContenidoMaxAggregateOutputType = {
    id: string | null
    tareaId: string | null
    tipo: $Enums.TipoDeBloque | null
    contenido: string | null
    posicion: number | null
  }

  export type BloqueContenidoCountAggregateOutputType = {
    id: number
    tareaId: number
    tipo: number
    contenido: number
    posicion: number
    _all: number
  }


  export type BloqueContenidoAvgAggregateInputType = {
    posicion?: true
  }

  export type BloqueContenidoSumAggregateInputType = {
    posicion?: true
  }

  export type BloqueContenidoMinAggregateInputType = {
    id?: true
    tareaId?: true
    tipo?: true
    contenido?: true
    posicion?: true
  }

  export type BloqueContenidoMaxAggregateInputType = {
    id?: true
    tareaId?: true
    tipo?: true
    contenido?: true
    posicion?: true
  }

  export type BloqueContenidoCountAggregateInputType = {
    id?: true
    tareaId?: true
    tipo?: true
    contenido?: true
    posicion?: true
    _all?: true
  }

  export type BloqueContenidoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BloqueContenido to aggregate.
     */
    where?: BloqueContenidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BloqueContenidos to fetch.
     */
    orderBy?: BloqueContenidoOrderByWithRelationInput | BloqueContenidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BloqueContenidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BloqueContenidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BloqueContenidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BloqueContenidos
    **/
    _count?: true | BloqueContenidoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BloqueContenidoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BloqueContenidoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BloqueContenidoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BloqueContenidoMaxAggregateInputType
  }

  export type GetBloqueContenidoAggregateType<T extends BloqueContenidoAggregateArgs> = {
        [P in keyof T & keyof AggregateBloqueContenido]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBloqueContenido[P]>
      : GetScalarType<T[P], AggregateBloqueContenido[P]>
  }




  export type BloqueContenidoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BloqueContenidoWhereInput
    orderBy?: BloqueContenidoOrderByWithAggregationInput | BloqueContenidoOrderByWithAggregationInput[]
    by: BloqueContenidoScalarFieldEnum[] | BloqueContenidoScalarFieldEnum
    having?: BloqueContenidoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BloqueContenidoCountAggregateInputType | true
    _avg?: BloqueContenidoAvgAggregateInputType
    _sum?: BloqueContenidoSumAggregateInputType
    _min?: BloqueContenidoMinAggregateInputType
    _max?: BloqueContenidoMaxAggregateInputType
  }

  export type BloqueContenidoGroupByOutputType = {
    id: string
    tareaId: string
    tipo: $Enums.TipoDeBloque
    contenido: string
    posicion: number
    _count: BloqueContenidoCountAggregateOutputType | null
    _avg: BloqueContenidoAvgAggregateOutputType | null
    _sum: BloqueContenidoSumAggregateOutputType | null
    _min: BloqueContenidoMinAggregateOutputType | null
    _max: BloqueContenidoMaxAggregateOutputType | null
  }

  type GetBloqueContenidoGroupByPayload<T extends BloqueContenidoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BloqueContenidoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BloqueContenidoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BloqueContenidoGroupByOutputType[P]>
            : GetScalarType<T[P], BloqueContenidoGroupByOutputType[P]>
        }
      >
    >


  export type BloqueContenidoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tareaId?: boolean
    tipo?: boolean
    contenido?: boolean
    posicion?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bloqueContenido"]>

  export type BloqueContenidoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tareaId?: boolean
    tipo?: boolean
    contenido?: boolean
    posicion?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bloqueContenido"]>

  export type BloqueContenidoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tareaId?: boolean
    tipo?: boolean
    contenido?: boolean
    posicion?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bloqueContenido"]>

  export type BloqueContenidoSelectScalar = {
    id?: boolean
    tareaId?: boolean
    tipo?: boolean
    contenido?: boolean
    posicion?: boolean
  }

  export type BloqueContenidoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tareaId" | "tipo" | "contenido" | "posicion", ExtArgs["result"]["bloqueContenido"]>
  export type BloqueContenidoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
  }
  export type BloqueContenidoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
  }
  export type BloqueContenidoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
  }

  export type $BloqueContenidoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BloqueContenido"
    objects: {
      tarea: Prisma.$TareaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tareaId: string
      tipo: $Enums.TipoDeBloque
      contenido: string
      posicion: number
    }, ExtArgs["result"]["bloqueContenido"]>
    composites: {}
  }

  type BloqueContenidoGetPayload<S extends boolean | null | undefined | BloqueContenidoDefaultArgs> = $Result.GetResult<Prisma.$BloqueContenidoPayload, S>

  type BloqueContenidoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BloqueContenidoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BloqueContenidoCountAggregateInputType | true
    }

  export interface BloqueContenidoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BloqueContenido'], meta: { name: 'BloqueContenido' } }
    /**
     * Find zero or one BloqueContenido that matches the filter.
     * @param {BloqueContenidoFindUniqueArgs} args - Arguments to find a BloqueContenido
     * @example
     * // Get one BloqueContenido
     * const bloqueContenido = await prisma.bloqueContenido.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BloqueContenidoFindUniqueArgs>(args: SelectSubset<T, BloqueContenidoFindUniqueArgs<ExtArgs>>): Prisma__BloqueContenidoClient<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BloqueContenido that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BloqueContenidoFindUniqueOrThrowArgs} args - Arguments to find a BloqueContenido
     * @example
     * // Get one BloqueContenido
     * const bloqueContenido = await prisma.bloqueContenido.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BloqueContenidoFindUniqueOrThrowArgs>(args: SelectSubset<T, BloqueContenidoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BloqueContenidoClient<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BloqueContenido that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BloqueContenidoFindFirstArgs} args - Arguments to find a BloqueContenido
     * @example
     * // Get one BloqueContenido
     * const bloqueContenido = await prisma.bloqueContenido.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BloqueContenidoFindFirstArgs>(args?: SelectSubset<T, BloqueContenidoFindFirstArgs<ExtArgs>>): Prisma__BloqueContenidoClient<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BloqueContenido that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BloqueContenidoFindFirstOrThrowArgs} args - Arguments to find a BloqueContenido
     * @example
     * // Get one BloqueContenido
     * const bloqueContenido = await prisma.bloqueContenido.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BloqueContenidoFindFirstOrThrowArgs>(args?: SelectSubset<T, BloqueContenidoFindFirstOrThrowArgs<ExtArgs>>): Prisma__BloqueContenidoClient<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BloqueContenidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BloqueContenidoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BloqueContenidos
     * const bloqueContenidos = await prisma.bloqueContenido.findMany()
     * 
     * // Get first 10 BloqueContenidos
     * const bloqueContenidos = await prisma.bloqueContenido.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bloqueContenidoWithIdOnly = await prisma.bloqueContenido.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BloqueContenidoFindManyArgs>(args?: SelectSubset<T, BloqueContenidoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BloqueContenido.
     * @param {BloqueContenidoCreateArgs} args - Arguments to create a BloqueContenido.
     * @example
     * // Create one BloqueContenido
     * const BloqueContenido = await prisma.bloqueContenido.create({
     *   data: {
     *     // ... data to create a BloqueContenido
     *   }
     * })
     * 
     */
    create<T extends BloqueContenidoCreateArgs>(args: SelectSubset<T, BloqueContenidoCreateArgs<ExtArgs>>): Prisma__BloqueContenidoClient<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BloqueContenidos.
     * @param {BloqueContenidoCreateManyArgs} args - Arguments to create many BloqueContenidos.
     * @example
     * // Create many BloqueContenidos
     * const bloqueContenido = await prisma.bloqueContenido.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BloqueContenidoCreateManyArgs>(args?: SelectSubset<T, BloqueContenidoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BloqueContenidos and returns the data saved in the database.
     * @param {BloqueContenidoCreateManyAndReturnArgs} args - Arguments to create many BloqueContenidos.
     * @example
     * // Create many BloqueContenidos
     * const bloqueContenido = await prisma.bloqueContenido.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BloqueContenidos and only return the `id`
     * const bloqueContenidoWithIdOnly = await prisma.bloqueContenido.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BloqueContenidoCreateManyAndReturnArgs>(args?: SelectSubset<T, BloqueContenidoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BloqueContenido.
     * @param {BloqueContenidoDeleteArgs} args - Arguments to delete one BloqueContenido.
     * @example
     * // Delete one BloqueContenido
     * const BloqueContenido = await prisma.bloqueContenido.delete({
     *   where: {
     *     // ... filter to delete one BloqueContenido
     *   }
     * })
     * 
     */
    delete<T extends BloqueContenidoDeleteArgs>(args: SelectSubset<T, BloqueContenidoDeleteArgs<ExtArgs>>): Prisma__BloqueContenidoClient<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BloqueContenido.
     * @param {BloqueContenidoUpdateArgs} args - Arguments to update one BloqueContenido.
     * @example
     * // Update one BloqueContenido
     * const bloqueContenido = await prisma.bloqueContenido.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BloqueContenidoUpdateArgs>(args: SelectSubset<T, BloqueContenidoUpdateArgs<ExtArgs>>): Prisma__BloqueContenidoClient<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BloqueContenidos.
     * @param {BloqueContenidoDeleteManyArgs} args - Arguments to filter BloqueContenidos to delete.
     * @example
     * // Delete a few BloqueContenidos
     * const { count } = await prisma.bloqueContenido.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BloqueContenidoDeleteManyArgs>(args?: SelectSubset<T, BloqueContenidoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BloqueContenidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BloqueContenidoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BloqueContenidos
     * const bloqueContenido = await prisma.bloqueContenido.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BloqueContenidoUpdateManyArgs>(args: SelectSubset<T, BloqueContenidoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BloqueContenidos and returns the data updated in the database.
     * @param {BloqueContenidoUpdateManyAndReturnArgs} args - Arguments to update many BloqueContenidos.
     * @example
     * // Update many BloqueContenidos
     * const bloqueContenido = await prisma.bloqueContenido.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BloqueContenidos and only return the `id`
     * const bloqueContenidoWithIdOnly = await prisma.bloqueContenido.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BloqueContenidoUpdateManyAndReturnArgs>(args: SelectSubset<T, BloqueContenidoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BloqueContenido.
     * @param {BloqueContenidoUpsertArgs} args - Arguments to update or create a BloqueContenido.
     * @example
     * // Update or create a BloqueContenido
     * const bloqueContenido = await prisma.bloqueContenido.upsert({
     *   create: {
     *     // ... data to create a BloqueContenido
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BloqueContenido we want to update
     *   }
     * })
     */
    upsert<T extends BloqueContenidoUpsertArgs>(args: SelectSubset<T, BloqueContenidoUpsertArgs<ExtArgs>>): Prisma__BloqueContenidoClient<$Result.GetResult<Prisma.$BloqueContenidoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BloqueContenidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BloqueContenidoCountArgs} args - Arguments to filter BloqueContenidos to count.
     * @example
     * // Count the number of BloqueContenidos
     * const count = await prisma.bloqueContenido.count({
     *   where: {
     *     // ... the filter for the BloqueContenidos we want to count
     *   }
     * })
    **/
    count<T extends BloqueContenidoCountArgs>(
      args?: Subset<T, BloqueContenidoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BloqueContenidoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BloqueContenido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BloqueContenidoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BloqueContenidoAggregateArgs>(args: Subset<T, BloqueContenidoAggregateArgs>): Prisma.PrismaPromise<GetBloqueContenidoAggregateType<T>>

    /**
     * Group by BloqueContenido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BloqueContenidoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BloqueContenidoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BloqueContenidoGroupByArgs['orderBy'] }
        : { orderBy?: BloqueContenidoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BloqueContenidoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBloqueContenidoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BloqueContenido model
   */
  readonly fields: BloqueContenidoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BloqueContenido.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BloqueContenidoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tarea<T extends TareaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TareaDefaultArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BloqueContenido model
   */
  interface BloqueContenidoFieldRefs {
    readonly id: FieldRef<"BloqueContenido", 'String'>
    readonly tareaId: FieldRef<"BloqueContenido", 'String'>
    readonly tipo: FieldRef<"BloqueContenido", 'TipoDeBloque'>
    readonly contenido: FieldRef<"BloqueContenido", 'String'>
    readonly posicion: FieldRef<"BloqueContenido", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BloqueContenido findUnique
   */
  export type BloqueContenidoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoInclude<ExtArgs> | null
    /**
     * Filter, which BloqueContenido to fetch.
     */
    where: BloqueContenidoWhereUniqueInput
  }

  /**
   * BloqueContenido findUniqueOrThrow
   */
  export type BloqueContenidoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoInclude<ExtArgs> | null
    /**
     * Filter, which BloqueContenido to fetch.
     */
    where: BloqueContenidoWhereUniqueInput
  }

  /**
   * BloqueContenido findFirst
   */
  export type BloqueContenidoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoInclude<ExtArgs> | null
    /**
     * Filter, which BloqueContenido to fetch.
     */
    where?: BloqueContenidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BloqueContenidos to fetch.
     */
    orderBy?: BloqueContenidoOrderByWithRelationInput | BloqueContenidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BloqueContenidos.
     */
    cursor?: BloqueContenidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BloqueContenidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BloqueContenidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BloqueContenidos.
     */
    distinct?: BloqueContenidoScalarFieldEnum | BloqueContenidoScalarFieldEnum[]
  }

  /**
   * BloqueContenido findFirstOrThrow
   */
  export type BloqueContenidoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoInclude<ExtArgs> | null
    /**
     * Filter, which BloqueContenido to fetch.
     */
    where?: BloqueContenidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BloqueContenidos to fetch.
     */
    orderBy?: BloqueContenidoOrderByWithRelationInput | BloqueContenidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BloqueContenidos.
     */
    cursor?: BloqueContenidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BloqueContenidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BloqueContenidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BloqueContenidos.
     */
    distinct?: BloqueContenidoScalarFieldEnum | BloqueContenidoScalarFieldEnum[]
  }

  /**
   * BloqueContenido findMany
   */
  export type BloqueContenidoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoInclude<ExtArgs> | null
    /**
     * Filter, which BloqueContenidos to fetch.
     */
    where?: BloqueContenidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BloqueContenidos to fetch.
     */
    orderBy?: BloqueContenidoOrderByWithRelationInput | BloqueContenidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BloqueContenidos.
     */
    cursor?: BloqueContenidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BloqueContenidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BloqueContenidos.
     */
    skip?: number
    distinct?: BloqueContenidoScalarFieldEnum | BloqueContenidoScalarFieldEnum[]
  }

  /**
   * BloqueContenido create
   */
  export type BloqueContenidoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoInclude<ExtArgs> | null
    /**
     * The data needed to create a BloqueContenido.
     */
    data: XOR<BloqueContenidoCreateInput, BloqueContenidoUncheckedCreateInput>
  }

  /**
   * BloqueContenido createMany
   */
  export type BloqueContenidoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BloqueContenidos.
     */
    data: BloqueContenidoCreateManyInput | BloqueContenidoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BloqueContenido createManyAndReturn
   */
  export type BloqueContenidoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * The data used to create many BloqueContenidos.
     */
    data: BloqueContenidoCreateManyInput | BloqueContenidoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BloqueContenido update
   */
  export type BloqueContenidoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoInclude<ExtArgs> | null
    /**
     * The data needed to update a BloqueContenido.
     */
    data: XOR<BloqueContenidoUpdateInput, BloqueContenidoUncheckedUpdateInput>
    /**
     * Choose, which BloqueContenido to update.
     */
    where: BloqueContenidoWhereUniqueInput
  }

  /**
   * BloqueContenido updateMany
   */
  export type BloqueContenidoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BloqueContenidos.
     */
    data: XOR<BloqueContenidoUpdateManyMutationInput, BloqueContenidoUncheckedUpdateManyInput>
    /**
     * Filter which BloqueContenidos to update
     */
    where?: BloqueContenidoWhereInput
    /**
     * Limit how many BloqueContenidos to update.
     */
    limit?: number
  }

  /**
   * BloqueContenido updateManyAndReturn
   */
  export type BloqueContenidoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * The data used to update BloqueContenidos.
     */
    data: XOR<BloqueContenidoUpdateManyMutationInput, BloqueContenidoUncheckedUpdateManyInput>
    /**
     * Filter which BloqueContenidos to update
     */
    where?: BloqueContenidoWhereInput
    /**
     * Limit how many BloqueContenidos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BloqueContenido upsert
   */
  export type BloqueContenidoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoInclude<ExtArgs> | null
    /**
     * The filter to search for the BloqueContenido to update in case it exists.
     */
    where: BloqueContenidoWhereUniqueInput
    /**
     * In case the BloqueContenido found by the `where` argument doesn't exist, create a new BloqueContenido with this data.
     */
    create: XOR<BloqueContenidoCreateInput, BloqueContenidoUncheckedCreateInput>
    /**
     * In case the BloqueContenido was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BloqueContenidoUpdateInput, BloqueContenidoUncheckedUpdateInput>
  }

  /**
   * BloqueContenido delete
   */
  export type BloqueContenidoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoInclude<ExtArgs> | null
    /**
     * Filter which BloqueContenido to delete.
     */
    where: BloqueContenidoWhereUniqueInput
  }

  /**
   * BloqueContenido deleteMany
   */
  export type BloqueContenidoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BloqueContenidos to delete
     */
    where?: BloqueContenidoWhereInput
    /**
     * Limit how many BloqueContenidos to delete.
     */
    limit?: number
  }

  /**
   * BloqueContenido without action
   */
  export type BloqueContenidoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BloqueContenido
     */
    select?: BloqueContenidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BloqueContenido
     */
    omit?: BloqueContenidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BloqueContenidoInclude<ExtArgs> | null
  }


  /**
   * Model Roles
   */

  export type AggregateRoles = {
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  export type RolesAvgAggregateOutputType = {
    id: number | null
  }

  export type RolesSumAggregateOutputType = {
    id: number | null
  }

  export type RolesMinAggregateOutputType = {
    id: number | null
    nombre: string | null
  }

  export type RolesMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
  }

  export type RolesCountAggregateOutputType = {
    id: number
    nombre: number
    _all: number
  }


  export type RolesAvgAggregateInputType = {
    id?: true
  }

  export type RolesSumAggregateInputType = {
    id?: true
  }

  export type RolesMinAggregateInputType = {
    id?: true
    nombre?: true
  }

  export type RolesMaxAggregateInputType = {
    id?: true
    nombre?: true
  }

  export type RolesCountAggregateInputType = {
    id?: true
    nombre?: true
    _all?: true
  }

  export type RolesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to aggregate.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RolesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RolesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolesMaxAggregateInputType
  }

  export type GetRolesAggregateType<T extends RolesAggregateArgs> = {
        [P in keyof T & keyof AggregateRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoles[P]>
      : GetScalarType<T[P], AggregateRoles[P]>
  }




  export type RolesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolesWhereInput
    orderBy?: RolesOrderByWithAggregationInput | RolesOrderByWithAggregationInput[]
    by: RolesScalarFieldEnum[] | RolesScalarFieldEnum
    having?: RolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolesCountAggregateInputType | true
    _avg?: RolesAvgAggregateInputType
    _sum?: RolesSumAggregateInputType
    _min?: RolesMinAggregateInputType
    _max?: RolesMaxAggregateInputType
  }

  export type RolesGroupByOutputType = {
    id: number
    nombre: string
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  type GetRolesGroupByPayload<T extends RolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolesGroupByOutputType[P]>
            : GetScalarType<T[P], RolesGroupByOutputType[P]>
        }
      >
    >


  export type RolesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    miembros?: boolean | Roles$miembrosArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roles"]>

  export type RolesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["roles"]>

  export type RolesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["roles"]>

  export type RolesSelectScalar = {
    id?: boolean
    nombre?: boolean
  }

  export type RolesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre", ExtArgs["result"]["roles"]>
  export type RolesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    miembros?: boolean | Roles$miembrosArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RolesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RolesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Roles"
    objects: {
      miembros: Prisma.$MiembroPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
    }, ExtArgs["result"]["roles"]>
    composites: {}
  }

  type RolesGetPayload<S extends boolean | null | undefined | RolesDefaultArgs> = $Result.GetResult<Prisma.$RolesPayload, S>

  type RolesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolesCountAggregateInputType | true
    }

  export interface RolesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Roles'], meta: { name: 'Roles' } }
    /**
     * Find zero or one Roles that matches the filter.
     * @param {RolesFindUniqueArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolesFindUniqueArgs>(args: SelectSubset<T, RolesFindUniqueArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Roles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolesFindUniqueOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolesFindUniqueOrThrowArgs>(args: SelectSubset<T, RolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindFirstArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolesFindFirstArgs>(args?: SelectSubset<T, RolesFindFirstArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindFirstOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolesFindFirstOrThrowArgs>(args?: SelectSubset<T, RolesFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.roles.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.roles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolesWithIdOnly = await prisma.roles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RolesFindManyArgs>(args?: SelectSubset<T, RolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Roles.
     * @param {RolesCreateArgs} args - Arguments to create a Roles.
     * @example
     * // Create one Roles
     * const Roles = await prisma.roles.create({
     *   data: {
     *     // ... data to create a Roles
     *   }
     * })
     * 
     */
    create<T extends RolesCreateArgs>(args: SelectSubset<T, RolesCreateArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RolesCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const roles = await prisma.roles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolesCreateManyArgs>(args?: SelectSubset<T, RolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RolesCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const roles = await prisma.roles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const rolesWithIdOnly = await prisma.roles.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RolesCreateManyAndReturnArgs>(args?: SelectSubset<T, RolesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Roles.
     * @param {RolesDeleteArgs} args - Arguments to delete one Roles.
     * @example
     * // Delete one Roles
     * const Roles = await prisma.roles.delete({
     *   where: {
     *     // ... filter to delete one Roles
     *   }
     * })
     * 
     */
    delete<T extends RolesDeleteArgs>(args: SelectSubset<T, RolesDeleteArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Roles.
     * @param {RolesUpdateArgs} args - Arguments to update one Roles.
     * @example
     * // Update one Roles
     * const roles = await prisma.roles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolesUpdateArgs>(args: SelectSubset<T, RolesUpdateArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RolesDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.roles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolesDeleteManyArgs>(args?: SelectSubset<T, RolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolesUpdateManyArgs>(args: SelectSubset<T, RolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RolesUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const rolesWithIdOnly = await prisma.roles.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RolesUpdateManyAndReturnArgs>(args: SelectSubset<T, RolesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Roles.
     * @param {RolesUpsertArgs} args - Arguments to update or create a Roles.
     * @example
     * // Update or create a Roles
     * const roles = await prisma.roles.upsert({
     *   create: {
     *     // ... data to create a Roles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Roles we want to update
     *   }
     * })
     */
    upsert<T extends RolesUpsertArgs>(args: SelectSubset<T, RolesUpsertArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.roles.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RolesCountArgs>(
      args?: Subset<T, RolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolesAggregateArgs>(args: Subset<T, RolesAggregateArgs>): Prisma.PrismaPromise<GetRolesAggregateType<T>>

    /**
     * Group by Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolesGroupByArgs['orderBy'] }
        : { orderBy?: RolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Roles model
   */
  readonly fields: RolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Roles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    miembros<T extends Roles$miembrosArgs<ExtArgs> = {}>(args?: Subset<T, Roles$miembrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Roles model
   */
  interface RolesFieldRefs {
    readonly id: FieldRef<"Roles", 'Int'>
    readonly nombre: FieldRef<"Roles", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Roles findUnique
   */
  export type RolesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles findUniqueOrThrow
   */
  export type RolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles findFirst
   */
  export type RolesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * Roles findFirstOrThrow
   */
  export type RolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * Roles findMany
   */
  export type RolesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * Roles create
   */
  export type RolesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The data needed to create a Roles.
     */
    data: XOR<RolesCreateInput, RolesUncheckedCreateInput>
  }

  /**
   * Roles createMany
   */
  export type RolesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RolesCreateManyInput | RolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Roles createManyAndReturn
   */
  export type RolesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RolesCreateManyInput | RolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Roles update
   */
  export type RolesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The data needed to update a Roles.
     */
    data: XOR<RolesUpdateInput, RolesUncheckedUpdateInput>
    /**
     * Choose, which Roles to update.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles updateMany
   */
  export type RolesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RolesUpdateManyMutationInput, RolesUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RolesWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Roles updateManyAndReturn
   */
  export type RolesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RolesUpdateManyMutationInput, RolesUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RolesWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Roles upsert
   */
  export type RolesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The filter to search for the Roles to update in case it exists.
     */
    where: RolesWhereUniqueInput
    /**
     * In case the Roles found by the `where` argument doesn't exist, create a new Roles with this data.
     */
    create: XOR<RolesCreateInput, RolesUncheckedCreateInput>
    /**
     * In case the Roles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolesUpdateInput, RolesUncheckedUpdateInput>
  }

  /**
   * Roles delete
   */
  export type RolesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter which Roles to delete.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles deleteMany
   */
  export type RolesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RolesWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Roles.miembros
   */
  export type Roles$miembrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    where?: MiembroWhereInput
    orderBy?: MiembroOrderByWithRelationInput | MiembroOrderByWithRelationInput[]
    cursor?: MiembroWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MiembroScalarFieldEnum | MiembroScalarFieldEnum[]
  }

  /**
   * Roles without action
   */
  export type RolesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
  }


  /**
   * Model Miembro
   */

  export type AggregateMiembro = {
    _count: MiembroCountAggregateOutputType | null
    _avg: MiembroAvgAggregateOutputType | null
    _sum: MiembroSumAggregateOutputType | null
    _min: MiembroMinAggregateOutputType | null
    _max: MiembroMaxAggregateOutputType | null
  }

  export type MiembroAvgAggregateOutputType = {
    id: number | null
    rolId: number | null
  }

  export type MiembroSumAggregateOutputType = {
    id: number | null
    rolId: number | null
  }

  export type MiembroMinAggregateOutputType = {
    id: number | null
    usuarioId: string | null
    proyectoId: string | null
    rolId: number | null
  }

  export type MiembroMaxAggregateOutputType = {
    id: number | null
    usuarioId: string | null
    proyectoId: string | null
    rolId: number | null
  }

  export type MiembroCountAggregateOutputType = {
    id: number
    usuarioId: number
    proyectoId: number
    rolId: number
    _all: number
  }


  export type MiembroAvgAggregateInputType = {
    id?: true
    rolId?: true
  }

  export type MiembroSumAggregateInputType = {
    id?: true
    rolId?: true
  }

  export type MiembroMinAggregateInputType = {
    id?: true
    usuarioId?: true
    proyectoId?: true
    rolId?: true
  }

  export type MiembroMaxAggregateInputType = {
    id?: true
    usuarioId?: true
    proyectoId?: true
    rolId?: true
  }

  export type MiembroCountAggregateInputType = {
    id?: true
    usuarioId?: true
    proyectoId?: true
    rolId?: true
    _all?: true
  }

  export type MiembroAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Miembro to aggregate.
     */
    where?: MiembroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Miembros to fetch.
     */
    orderBy?: MiembroOrderByWithRelationInput | MiembroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MiembroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Miembros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Miembros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Miembros
    **/
    _count?: true | MiembroCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MiembroAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MiembroSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MiembroMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MiembroMaxAggregateInputType
  }

  export type GetMiembroAggregateType<T extends MiembroAggregateArgs> = {
        [P in keyof T & keyof AggregateMiembro]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMiembro[P]>
      : GetScalarType<T[P], AggregateMiembro[P]>
  }




  export type MiembroGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MiembroWhereInput
    orderBy?: MiembroOrderByWithAggregationInput | MiembroOrderByWithAggregationInput[]
    by: MiembroScalarFieldEnum[] | MiembroScalarFieldEnum
    having?: MiembroScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MiembroCountAggregateInputType | true
    _avg?: MiembroAvgAggregateInputType
    _sum?: MiembroSumAggregateInputType
    _min?: MiembroMinAggregateInputType
    _max?: MiembroMaxAggregateInputType
  }

  export type MiembroGroupByOutputType = {
    id: number
    usuarioId: string
    proyectoId: string
    rolId: number
    _count: MiembroCountAggregateOutputType | null
    _avg: MiembroAvgAggregateOutputType | null
    _sum: MiembroSumAggregateOutputType | null
    _min: MiembroMinAggregateOutputType | null
    _max: MiembroMaxAggregateOutputType | null
  }

  type GetMiembroGroupByPayload<T extends MiembroGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MiembroGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MiembroGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MiembroGroupByOutputType[P]>
            : GetScalarType<T[P], MiembroGroupByOutputType[P]>
        }
      >
    >


  export type MiembroSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    proyectoId?: boolean
    rolId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    rol?: boolean | RolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["miembro"]>

  export type MiembroSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    proyectoId?: boolean
    rolId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    rol?: boolean | RolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["miembro"]>

  export type MiembroSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    proyectoId?: boolean
    rolId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    rol?: boolean | RolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["miembro"]>

  export type MiembroSelectScalar = {
    id?: boolean
    usuarioId?: boolean
    proyectoId?: boolean
    rolId?: boolean
  }

  export type MiembroOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "usuarioId" | "proyectoId" | "rolId", ExtArgs["result"]["miembro"]>
  export type MiembroInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    rol?: boolean | RolesDefaultArgs<ExtArgs>
  }
  export type MiembroIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    rol?: boolean | RolesDefaultArgs<ExtArgs>
  }
  export type MiembroIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    rol?: boolean | RolesDefaultArgs<ExtArgs>
  }

  export type $MiembroPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Miembro"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      proyecto: Prisma.$ProyectosPayload<ExtArgs>
      rol: Prisma.$RolesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      usuarioId: string
      proyectoId: string
      rolId: number
    }, ExtArgs["result"]["miembro"]>
    composites: {}
  }

  type MiembroGetPayload<S extends boolean | null | undefined | MiembroDefaultArgs> = $Result.GetResult<Prisma.$MiembroPayload, S>

  type MiembroCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MiembroFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MiembroCountAggregateInputType | true
    }

  export interface MiembroDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Miembro'], meta: { name: 'Miembro' } }
    /**
     * Find zero or one Miembro that matches the filter.
     * @param {MiembroFindUniqueArgs} args - Arguments to find a Miembro
     * @example
     * // Get one Miembro
     * const miembro = await prisma.miembro.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MiembroFindUniqueArgs>(args: SelectSubset<T, MiembroFindUniqueArgs<ExtArgs>>): Prisma__MiembroClient<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Miembro that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MiembroFindUniqueOrThrowArgs} args - Arguments to find a Miembro
     * @example
     * // Get one Miembro
     * const miembro = await prisma.miembro.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MiembroFindUniqueOrThrowArgs>(args: SelectSubset<T, MiembroFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MiembroClient<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Miembro that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MiembroFindFirstArgs} args - Arguments to find a Miembro
     * @example
     * // Get one Miembro
     * const miembro = await prisma.miembro.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MiembroFindFirstArgs>(args?: SelectSubset<T, MiembroFindFirstArgs<ExtArgs>>): Prisma__MiembroClient<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Miembro that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MiembroFindFirstOrThrowArgs} args - Arguments to find a Miembro
     * @example
     * // Get one Miembro
     * const miembro = await prisma.miembro.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MiembroFindFirstOrThrowArgs>(args?: SelectSubset<T, MiembroFindFirstOrThrowArgs<ExtArgs>>): Prisma__MiembroClient<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Miembros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MiembroFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Miembros
     * const miembros = await prisma.miembro.findMany()
     * 
     * // Get first 10 Miembros
     * const miembros = await prisma.miembro.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const miembroWithIdOnly = await prisma.miembro.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MiembroFindManyArgs>(args?: SelectSubset<T, MiembroFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Miembro.
     * @param {MiembroCreateArgs} args - Arguments to create a Miembro.
     * @example
     * // Create one Miembro
     * const Miembro = await prisma.miembro.create({
     *   data: {
     *     // ... data to create a Miembro
     *   }
     * })
     * 
     */
    create<T extends MiembroCreateArgs>(args: SelectSubset<T, MiembroCreateArgs<ExtArgs>>): Prisma__MiembroClient<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Miembros.
     * @param {MiembroCreateManyArgs} args - Arguments to create many Miembros.
     * @example
     * // Create many Miembros
     * const miembro = await prisma.miembro.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MiembroCreateManyArgs>(args?: SelectSubset<T, MiembroCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Miembros and returns the data saved in the database.
     * @param {MiembroCreateManyAndReturnArgs} args - Arguments to create many Miembros.
     * @example
     * // Create many Miembros
     * const miembro = await prisma.miembro.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Miembros and only return the `id`
     * const miembroWithIdOnly = await prisma.miembro.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MiembroCreateManyAndReturnArgs>(args?: SelectSubset<T, MiembroCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Miembro.
     * @param {MiembroDeleteArgs} args - Arguments to delete one Miembro.
     * @example
     * // Delete one Miembro
     * const Miembro = await prisma.miembro.delete({
     *   where: {
     *     // ... filter to delete one Miembro
     *   }
     * })
     * 
     */
    delete<T extends MiembroDeleteArgs>(args: SelectSubset<T, MiembroDeleteArgs<ExtArgs>>): Prisma__MiembroClient<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Miembro.
     * @param {MiembroUpdateArgs} args - Arguments to update one Miembro.
     * @example
     * // Update one Miembro
     * const miembro = await prisma.miembro.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MiembroUpdateArgs>(args: SelectSubset<T, MiembroUpdateArgs<ExtArgs>>): Prisma__MiembroClient<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Miembros.
     * @param {MiembroDeleteManyArgs} args - Arguments to filter Miembros to delete.
     * @example
     * // Delete a few Miembros
     * const { count } = await prisma.miembro.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MiembroDeleteManyArgs>(args?: SelectSubset<T, MiembroDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Miembros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MiembroUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Miembros
     * const miembro = await prisma.miembro.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MiembroUpdateManyArgs>(args: SelectSubset<T, MiembroUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Miembros and returns the data updated in the database.
     * @param {MiembroUpdateManyAndReturnArgs} args - Arguments to update many Miembros.
     * @example
     * // Update many Miembros
     * const miembro = await prisma.miembro.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Miembros and only return the `id`
     * const miembroWithIdOnly = await prisma.miembro.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MiembroUpdateManyAndReturnArgs>(args: SelectSubset<T, MiembroUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Miembro.
     * @param {MiembroUpsertArgs} args - Arguments to update or create a Miembro.
     * @example
     * // Update or create a Miembro
     * const miembro = await prisma.miembro.upsert({
     *   create: {
     *     // ... data to create a Miembro
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Miembro we want to update
     *   }
     * })
     */
    upsert<T extends MiembroUpsertArgs>(args: SelectSubset<T, MiembroUpsertArgs<ExtArgs>>): Prisma__MiembroClient<$Result.GetResult<Prisma.$MiembroPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Miembros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MiembroCountArgs} args - Arguments to filter Miembros to count.
     * @example
     * // Count the number of Miembros
     * const count = await prisma.miembro.count({
     *   where: {
     *     // ... the filter for the Miembros we want to count
     *   }
     * })
    **/
    count<T extends MiembroCountArgs>(
      args?: Subset<T, MiembroCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MiembroCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Miembro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MiembroAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MiembroAggregateArgs>(args: Subset<T, MiembroAggregateArgs>): Prisma.PrismaPromise<GetMiembroAggregateType<T>>

    /**
     * Group by Miembro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MiembroGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MiembroGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MiembroGroupByArgs['orderBy'] }
        : { orderBy?: MiembroGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MiembroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMiembroGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Miembro model
   */
  readonly fields: MiembroFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Miembro.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MiembroClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    proyecto<T extends ProyectosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProyectosDefaultArgs<ExtArgs>>): Prisma__ProyectosClient<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rol<T extends RolesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RolesDefaultArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Miembro model
   */
  interface MiembroFieldRefs {
    readonly id: FieldRef<"Miembro", 'Int'>
    readonly usuarioId: FieldRef<"Miembro", 'String'>
    readonly proyectoId: FieldRef<"Miembro", 'String'>
    readonly rolId: FieldRef<"Miembro", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Miembro findUnique
   */
  export type MiembroFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    /**
     * Filter, which Miembro to fetch.
     */
    where: MiembroWhereUniqueInput
  }

  /**
   * Miembro findUniqueOrThrow
   */
  export type MiembroFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    /**
     * Filter, which Miembro to fetch.
     */
    where: MiembroWhereUniqueInput
  }

  /**
   * Miembro findFirst
   */
  export type MiembroFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    /**
     * Filter, which Miembro to fetch.
     */
    where?: MiembroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Miembros to fetch.
     */
    orderBy?: MiembroOrderByWithRelationInput | MiembroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Miembros.
     */
    cursor?: MiembroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Miembros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Miembros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Miembros.
     */
    distinct?: MiembroScalarFieldEnum | MiembroScalarFieldEnum[]
  }

  /**
   * Miembro findFirstOrThrow
   */
  export type MiembroFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    /**
     * Filter, which Miembro to fetch.
     */
    where?: MiembroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Miembros to fetch.
     */
    orderBy?: MiembroOrderByWithRelationInput | MiembroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Miembros.
     */
    cursor?: MiembroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Miembros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Miembros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Miembros.
     */
    distinct?: MiembroScalarFieldEnum | MiembroScalarFieldEnum[]
  }

  /**
   * Miembro findMany
   */
  export type MiembroFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    /**
     * Filter, which Miembros to fetch.
     */
    where?: MiembroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Miembros to fetch.
     */
    orderBy?: MiembroOrderByWithRelationInput | MiembroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Miembros.
     */
    cursor?: MiembroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Miembros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Miembros.
     */
    skip?: number
    distinct?: MiembroScalarFieldEnum | MiembroScalarFieldEnum[]
  }

  /**
   * Miembro create
   */
  export type MiembroCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    /**
     * The data needed to create a Miembro.
     */
    data: XOR<MiembroCreateInput, MiembroUncheckedCreateInput>
  }

  /**
   * Miembro createMany
   */
  export type MiembroCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Miembros.
     */
    data: MiembroCreateManyInput | MiembroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Miembro createManyAndReturn
   */
  export type MiembroCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * The data used to create many Miembros.
     */
    data: MiembroCreateManyInput | MiembroCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Miembro update
   */
  export type MiembroUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    /**
     * The data needed to update a Miembro.
     */
    data: XOR<MiembroUpdateInput, MiembroUncheckedUpdateInput>
    /**
     * Choose, which Miembro to update.
     */
    where: MiembroWhereUniqueInput
  }

  /**
   * Miembro updateMany
   */
  export type MiembroUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Miembros.
     */
    data: XOR<MiembroUpdateManyMutationInput, MiembroUncheckedUpdateManyInput>
    /**
     * Filter which Miembros to update
     */
    where?: MiembroWhereInput
    /**
     * Limit how many Miembros to update.
     */
    limit?: number
  }

  /**
   * Miembro updateManyAndReturn
   */
  export type MiembroUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * The data used to update Miembros.
     */
    data: XOR<MiembroUpdateManyMutationInput, MiembroUncheckedUpdateManyInput>
    /**
     * Filter which Miembros to update
     */
    where?: MiembroWhereInput
    /**
     * Limit how many Miembros to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Miembro upsert
   */
  export type MiembroUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    /**
     * The filter to search for the Miembro to update in case it exists.
     */
    where: MiembroWhereUniqueInput
    /**
     * In case the Miembro found by the `where` argument doesn't exist, create a new Miembro with this data.
     */
    create: XOR<MiembroCreateInput, MiembroUncheckedCreateInput>
    /**
     * In case the Miembro was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MiembroUpdateInput, MiembroUncheckedUpdateInput>
  }

  /**
   * Miembro delete
   */
  export type MiembroDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
    /**
     * Filter which Miembro to delete.
     */
    where: MiembroWhereUniqueInput
  }

  /**
   * Miembro deleteMany
   */
  export type MiembroDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Miembros to delete
     */
    where?: MiembroWhereInput
    /**
     * Limit how many Miembros to delete.
     */
    limit?: number
  }

  /**
   * Miembro without action
   */
  export type MiembroDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Miembro
     */
    select?: MiembroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Miembro
     */
    omit?: MiembroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MiembroInclude<ExtArgs> | null
  }


  /**
   * Model Estado
   */

  export type AggregateEstado = {
    _count: EstadoCountAggregateOutputType | null
    _avg: EstadoAvgAggregateOutputType | null
    _sum: EstadoSumAggregateOutputType | null
    _min: EstadoMinAggregateOutputType | null
    _max: EstadoMaxAggregateOutputType | null
  }

  export type EstadoAvgAggregateOutputType = {
    id: number | null
    posicion: number | null
  }

  export type EstadoSumAggregateOutputType = {
    id: number | null
    posicion: number | null
  }

  export type EstadoMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    posicion: number | null
    proyectoId: string | null
  }

  export type EstadoMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    posicion: number | null
    proyectoId: string | null
  }

  export type EstadoCountAggregateOutputType = {
    id: number
    nombre: number
    posicion: number
    proyectoId: number
    _all: number
  }


  export type EstadoAvgAggregateInputType = {
    id?: true
    posicion?: true
  }

  export type EstadoSumAggregateInputType = {
    id?: true
    posicion?: true
  }

  export type EstadoMinAggregateInputType = {
    id?: true
    nombre?: true
    posicion?: true
    proyectoId?: true
  }

  export type EstadoMaxAggregateInputType = {
    id?: true
    nombre?: true
    posicion?: true
    proyectoId?: true
  }

  export type EstadoCountAggregateInputType = {
    id?: true
    nombre?: true
    posicion?: true
    proyectoId?: true
    _all?: true
  }

  export type EstadoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Estado to aggregate.
     */
    where?: EstadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estados to fetch.
     */
    orderBy?: EstadoOrderByWithRelationInput | EstadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EstadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Estados
    **/
    _count?: true | EstadoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EstadoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EstadoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EstadoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EstadoMaxAggregateInputType
  }

  export type GetEstadoAggregateType<T extends EstadoAggregateArgs> = {
        [P in keyof T & keyof AggregateEstado]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEstado[P]>
      : GetScalarType<T[P], AggregateEstado[P]>
  }




  export type EstadoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EstadoWhereInput
    orderBy?: EstadoOrderByWithAggregationInput | EstadoOrderByWithAggregationInput[]
    by: EstadoScalarFieldEnum[] | EstadoScalarFieldEnum
    having?: EstadoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EstadoCountAggregateInputType | true
    _avg?: EstadoAvgAggregateInputType
    _sum?: EstadoSumAggregateInputType
    _min?: EstadoMinAggregateInputType
    _max?: EstadoMaxAggregateInputType
  }

  export type EstadoGroupByOutputType = {
    id: number
    nombre: string
    posicion: number
    proyectoId: string
    _count: EstadoCountAggregateOutputType | null
    _avg: EstadoAvgAggregateOutputType | null
    _sum: EstadoSumAggregateOutputType | null
    _min: EstadoMinAggregateOutputType | null
    _max: EstadoMaxAggregateOutputType | null
  }

  type GetEstadoGroupByPayload<T extends EstadoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EstadoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EstadoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EstadoGroupByOutputType[P]>
            : GetScalarType<T[P], EstadoGroupByOutputType[P]>
        }
      >
    >


  export type EstadoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    posicion?: boolean
    proyectoId?: boolean
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    tareas?: boolean | Estado$tareasArgs<ExtArgs>
    _count?: boolean | EstadoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["estado"]>

  export type EstadoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    posicion?: boolean
    proyectoId?: boolean
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["estado"]>

  export type EstadoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    posicion?: boolean
    proyectoId?: boolean
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["estado"]>

  export type EstadoSelectScalar = {
    id?: boolean
    nombre?: boolean
    posicion?: boolean
    proyectoId?: boolean
  }

  export type EstadoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "posicion" | "proyectoId", ExtArgs["result"]["estado"]>
  export type EstadoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
    tareas?: boolean | Estado$tareasArgs<ExtArgs>
    _count?: boolean | EstadoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EstadoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
  }
  export type EstadoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proyecto?: boolean | ProyectosDefaultArgs<ExtArgs>
  }

  export type $EstadoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Estado"
    objects: {
      proyecto: Prisma.$ProyectosPayload<ExtArgs>
      tareas: Prisma.$TareaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      /**
       * POSICIÓN EN EL ARRAY
       */
      posicion: number
      proyectoId: string
    }, ExtArgs["result"]["estado"]>
    composites: {}
  }

  type EstadoGetPayload<S extends boolean | null | undefined | EstadoDefaultArgs> = $Result.GetResult<Prisma.$EstadoPayload, S>

  type EstadoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EstadoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EstadoCountAggregateInputType | true
    }

  export interface EstadoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Estado'], meta: { name: 'Estado' } }
    /**
     * Find zero or one Estado that matches the filter.
     * @param {EstadoFindUniqueArgs} args - Arguments to find a Estado
     * @example
     * // Get one Estado
     * const estado = await prisma.estado.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EstadoFindUniqueArgs>(args: SelectSubset<T, EstadoFindUniqueArgs<ExtArgs>>): Prisma__EstadoClient<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Estado that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EstadoFindUniqueOrThrowArgs} args - Arguments to find a Estado
     * @example
     * // Get one Estado
     * const estado = await prisma.estado.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EstadoFindUniqueOrThrowArgs>(args: SelectSubset<T, EstadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EstadoClient<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Estado that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstadoFindFirstArgs} args - Arguments to find a Estado
     * @example
     * // Get one Estado
     * const estado = await prisma.estado.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EstadoFindFirstArgs>(args?: SelectSubset<T, EstadoFindFirstArgs<ExtArgs>>): Prisma__EstadoClient<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Estado that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstadoFindFirstOrThrowArgs} args - Arguments to find a Estado
     * @example
     * // Get one Estado
     * const estado = await prisma.estado.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EstadoFindFirstOrThrowArgs>(args?: SelectSubset<T, EstadoFindFirstOrThrowArgs<ExtArgs>>): Prisma__EstadoClient<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Estados that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstadoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Estados
     * const estados = await prisma.estado.findMany()
     * 
     * // Get first 10 Estados
     * const estados = await prisma.estado.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const estadoWithIdOnly = await prisma.estado.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EstadoFindManyArgs>(args?: SelectSubset<T, EstadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Estado.
     * @param {EstadoCreateArgs} args - Arguments to create a Estado.
     * @example
     * // Create one Estado
     * const Estado = await prisma.estado.create({
     *   data: {
     *     // ... data to create a Estado
     *   }
     * })
     * 
     */
    create<T extends EstadoCreateArgs>(args: SelectSubset<T, EstadoCreateArgs<ExtArgs>>): Prisma__EstadoClient<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Estados.
     * @param {EstadoCreateManyArgs} args - Arguments to create many Estados.
     * @example
     * // Create many Estados
     * const estado = await prisma.estado.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EstadoCreateManyArgs>(args?: SelectSubset<T, EstadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Estados and returns the data saved in the database.
     * @param {EstadoCreateManyAndReturnArgs} args - Arguments to create many Estados.
     * @example
     * // Create many Estados
     * const estado = await prisma.estado.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Estados and only return the `id`
     * const estadoWithIdOnly = await prisma.estado.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EstadoCreateManyAndReturnArgs>(args?: SelectSubset<T, EstadoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Estado.
     * @param {EstadoDeleteArgs} args - Arguments to delete one Estado.
     * @example
     * // Delete one Estado
     * const Estado = await prisma.estado.delete({
     *   where: {
     *     // ... filter to delete one Estado
     *   }
     * })
     * 
     */
    delete<T extends EstadoDeleteArgs>(args: SelectSubset<T, EstadoDeleteArgs<ExtArgs>>): Prisma__EstadoClient<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Estado.
     * @param {EstadoUpdateArgs} args - Arguments to update one Estado.
     * @example
     * // Update one Estado
     * const estado = await prisma.estado.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EstadoUpdateArgs>(args: SelectSubset<T, EstadoUpdateArgs<ExtArgs>>): Prisma__EstadoClient<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Estados.
     * @param {EstadoDeleteManyArgs} args - Arguments to filter Estados to delete.
     * @example
     * // Delete a few Estados
     * const { count } = await prisma.estado.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EstadoDeleteManyArgs>(args?: SelectSubset<T, EstadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Estados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstadoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Estados
     * const estado = await prisma.estado.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EstadoUpdateManyArgs>(args: SelectSubset<T, EstadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Estados and returns the data updated in the database.
     * @param {EstadoUpdateManyAndReturnArgs} args - Arguments to update many Estados.
     * @example
     * // Update many Estados
     * const estado = await prisma.estado.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Estados and only return the `id`
     * const estadoWithIdOnly = await prisma.estado.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EstadoUpdateManyAndReturnArgs>(args: SelectSubset<T, EstadoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Estado.
     * @param {EstadoUpsertArgs} args - Arguments to update or create a Estado.
     * @example
     * // Update or create a Estado
     * const estado = await prisma.estado.upsert({
     *   create: {
     *     // ... data to create a Estado
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Estado we want to update
     *   }
     * })
     */
    upsert<T extends EstadoUpsertArgs>(args: SelectSubset<T, EstadoUpsertArgs<ExtArgs>>): Prisma__EstadoClient<$Result.GetResult<Prisma.$EstadoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Estados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstadoCountArgs} args - Arguments to filter Estados to count.
     * @example
     * // Count the number of Estados
     * const count = await prisma.estado.count({
     *   where: {
     *     // ... the filter for the Estados we want to count
     *   }
     * })
    **/
    count<T extends EstadoCountArgs>(
      args?: Subset<T, EstadoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EstadoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Estado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstadoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EstadoAggregateArgs>(args: Subset<T, EstadoAggregateArgs>): Prisma.PrismaPromise<GetEstadoAggregateType<T>>

    /**
     * Group by Estado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstadoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EstadoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EstadoGroupByArgs['orderBy'] }
        : { orderBy?: EstadoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EstadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEstadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Estado model
   */
  readonly fields: EstadoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Estado.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EstadoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    proyecto<T extends ProyectosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProyectosDefaultArgs<ExtArgs>>): Prisma__ProyectosClient<$Result.GetResult<Prisma.$ProyectosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tareas<T extends Estado$tareasArgs<ExtArgs> = {}>(args?: Subset<T, Estado$tareasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Estado model
   */
  interface EstadoFieldRefs {
    readonly id: FieldRef<"Estado", 'Int'>
    readonly nombre: FieldRef<"Estado", 'String'>
    readonly posicion: FieldRef<"Estado", 'Int'>
    readonly proyectoId: FieldRef<"Estado", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Estado findUnique
   */
  export type EstadoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoInclude<ExtArgs> | null
    /**
     * Filter, which Estado to fetch.
     */
    where: EstadoWhereUniqueInput
  }

  /**
   * Estado findUniqueOrThrow
   */
  export type EstadoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoInclude<ExtArgs> | null
    /**
     * Filter, which Estado to fetch.
     */
    where: EstadoWhereUniqueInput
  }

  /**
   * Estado findFirst
   */
  export type EstadoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoInclude<ExtArgs> | null
    /**
     * Filter, which Estado to fetch.
     */
    where?: EstadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estados to fetch.
     */
    orderBy?: EstadoOrderByWithRelationInput | EstadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Estados.
     */
    cursor?: EstadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Estados.
     */
    distinct?: EstadoScalarFieldEnum | EstadoScalarFieldEnum[]
  }

  /**
   * Estado findFirstOrThrow
   */
  export type EstadoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoInclude<ExtArgs> | null
    /**
     * Filter, which Estado to fetch.
     */
    where?: EstadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estados to fetch.
     */
    orderBy?: EstadoOrderByWithRelationInput | EstadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Estados.
     */
    cursor?: EstadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Estados.
     */
    distinct?: EstadoScalarFieldEnum | EstadoScalarFieldEnum[]
  }

  /**
   * Estado findMany
   */
  export type EstadoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoInclude<ExtArgs> | null
    /**
     * Filter, which Estados to fetch.
     */
    where?: EstadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estados to fetch.
     */
    orderBy?: EstadoOrderByWithRelationInput | EstadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Estados.
     */
    cursor?: EstadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estados.
     */
    skip?: number
    distinct?: EstadoScalarFieldEnum | EstadoScalarFieldEnum[]
  }

  /**
   * Estado create
   */
  export type EstadoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoInclude<ExtArgs> | null
    /**
     * The data needed to create a Estado.
     */
    data: XOR<EstadoCreateInput, EstadoUncheckedCreateInput>
  }

  /**
   * Estado createMany
   */
  export type EstadoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Estados.
     */
    data: EstadoCreateManyInput | EstadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Estado createManyAndReturn
   */
  export type EstadoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * The data used to create many Estados.
     */
    data: EstadoCreateManyInput | EstadoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Estado update
   */
  export type EstadoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoInclude<ExtArgs> | null
    /**
     * The data needed to update a Estado.
     */
    data: XOR<EstadoUpdateInput, EstadoUncheckedUpdateInput>
    /**
     * Choose, which Estado to update.
     */
    where: EstadoWhereUniqueInput
  }

  /**
   * Estado updateMany
   */
  export type EstadoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Estados.
     */
    data: XOR<EstadoUpdateManyMutationInput, EstadoUncheckedUpdateManyInput>
    /**
     * Filter which Estados to update
     */
    where?: EstadoWhereInput
    /**
     * Limit how many Estados to update.
     */
    limit?: number
  }

  /**
   * Estado updateManyAndReturn
   */
  export type EstadoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * The data used to update Estados.
     */
    data: XOR<EstadoUpdateManyMutationInput, EstadoUncheckedUpdateManyInput>
    /**
     * Filter which Estados to update
     */
    where?: EstadoWhereInput
    /**
     * Limit how many Estados to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Estado upsert
   */
  export type EstadoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoInclude<ExtArgs> | null
    /**
     * The filter to search for the Estado to update in case it exists.
     */
    where: EstadoWhereUniqueInput
    /**
     * In case the Estado found by the `where` argument doesn't exist, create a new Estado with this data.
     */
    create: XOR<EstadoCreateInput, EstadoUncheckedCreateInput>
    /**
     * In case the Estado was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EstadoUpdateInput, EstadoUncheckedUpdateInput>
  }

  /**
   * Estado delete
   */
  export type EstadoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoInclude<ExtArgs> | null
    /**
     * Filter which Estado to delete.
     */
    where: EstadoWhereUniqueInput
  }

  /**
   * Estado deleteMany
   */
  export type EstadoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Estados to delete
     */
    where?: EstadoWhereInput
    /**
     * Limit how many Estados to delete.
     */
    limit?: number
  }

  /**
   * Estado.tareas
   */
  export type Estado$tareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    where?: TareaWhereInput
    orderBy?: TareaOrderByWithRelationInput | TareaOrderByWithRelationInput[]
    cursor?: TareaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TareaScalarFieldEnum | TareaScalarFieldEnum[]
  }

  /**
   * Estado without action
   */
  export type EstadoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estado
     */
    select?: EstadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estado
     */
    omit?: EstadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstadoInclude<ExtArgs> | null
  }


  /**
   * Model Responsable
   */

  export type AggregateResponsable = {
    _count: ResponsableCountAggregateOutputType | null
    _avg: ResponsableAvgAggregateOutputType | null
    _sum: ResponsableSumAggregateOutputType | null
    _min: ResponsableMinAggregateOutputType | null
    _max: ResponsableMaxAggregateOutputType | null
  }

  export type ResponsableAvgAggregateOutputType = {
    id: number | null
  }

  export type ResponsableSumAggregateOutputType = {
    id: number | null
  }

  export type ResponsableMinAggregateOutputType = {
    id: number | null
    tareaId: string | null
    usuarioId: string | null
  }

  export type ResponsableMaxAggregateOutputType = {
    id: number | null
    tareaId: string | null
    usuarioId: string | null
  }

  export type ResponsableCountAggregateOutputType = {
    id: number
    tareaId: number
    usuarioId: number
    _all: number
  }


  export type ResponsableAvgAggregateInputType = {
    id?: true
  }

  export type ResponsableSumAggregateInputType = {
    id?: true
  }

  export type ResponsableMinAggregateInputType = {
    id?: true
    tareaId?: true
    usuarioId?: true
  }

  export type ResponsableMaxAggregateInputType = {
    id?: true
    tareaId?: true
    usuarioId?: true
  }

  export type ResponsableCountAggregateInputType = {
    id?: true
    tareaId?: true
    usuarioId?: true
    _all?: true
  }

  export type ResponsableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Responsable to aggregate.
     */
    where?: ResponsableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responsables to fetch.
     */
    orderBy?: ResponsableOrderByWithRelationInput | ResponsableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResponsableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responsables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responsables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Responsables
    **/
    _count?: true | ResponsableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResponsableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResponsableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResponsableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResponsableMaxAggregateInputType
  }

  export type GetResponsableAggregateType<T extends ResponsableAggregateArgs> = {
        [P in keyof T & keyof AggregateResponsable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResponsable[P]>
      : GetScalarType<T[P], AggregateResponsable[P]>
  }




  export type ResponsableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponsableWhereInput
    orderBy?: ResponsableOrderByWithAggregationInput | ResponsableOrderByWithAggregationInput[]
    by: ResponsableScalarFieldEnum[] | ResponsableScalarFieldEnum
    having?: ResponsableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResponsableCountAggregateInputType | true
    _avg?: ResponsableAvgAggregateInputType
    _sum?: ResponsableSumAggregateInputType
    _min?: ResponsableMinAggregateInputType
    _max?: ResponsableMaxAggregateInputType
  }

  export type ResponsableGroupByOutputType = {
    id: number
    tareaId: string
    usuarioId: string
    _count: ResponsableCountAggregateOutputType | null
    _avg: ResponsableAvgAggregateOutputType | null
    _sum: ResponsableSumAggregateOutputType | null
    _min: ResponsableMinAggregateOutputType | null
    _max: ResponsableMaxAggregateOutputType | null
  }

  type GetResponsableGroupByPayload<T extends ResponsableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResponsableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResponsableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResponsableGroupByOutputType[P]>
            : GetScalarType<T[P], ResponsableGroupByOutputType[P]>
        }
      >
    >


  export type ResponsableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tareaId?: boolean
    usuarioId?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["responsable"]>

  export type ResponsableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tareaId?: boolean
    usuarioId?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["responsable"]>

  export type ResponsableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tareaId?: boolean
    usuarioId?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["responsable"]>

  export type ResponsableSelectScalar = {
    id?: boolean
    tareaId?: boolean
    usuarioId?: boolean
  }

  export type ResponsableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tareaId" | "usuarioId", ExtArgs["result"]["responsable"]>
  export type ResponsableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ResponsableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ResponsableIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $ResponsablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Responsable"
    objects: {
      tarea: Prisma.$TareaPayload<ExtArgs>
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tareaId: string
      usuarioId: string
    }, ExtArgs["result"]["responsable"]>
    composites: {}
  }

  type ResponsableGetPayload<S extends boolean | null | undefined | ResponsableDefaultArgs> = $Result.GetResult<Prisma.$ResponsablePayload, S>

  type ResponsableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResponsableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResponsableCountAggregateInputType | true
    }

  export interface ResponsableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Responsable'], meta: { name: 'Responsable' } }
    /**
     * Find zero or one Responsable that matches the filter.
     * @param {ResponsableFindUniqueArgs} args - Arguments to find a Responsable
     * @example
     * // Get one Responsable
     * const responsable = await prisma.responsable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResponsableFindUniqueArgs>(args: SelectSubset<T, ResponsableFindUniqueArgs<ExtArgs>>): Prisma__ResponsableClient<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Responsable that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResponsableFindUniqueOrThrowArgs} args - Arguments to find a Responsable
     * @example
     * // Get one Responsable
     * const responsable = await prisma.responsable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResponsableFindUniqueOrThrowArgs>(args: SelectSubset<T, ResponsableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResponsableClient<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Responsable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponsableFindFirstArgs} args - Arguments to find a Responsable
     * @example
     * // Get one Responsable
     * const responsable = await prisma.responsable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResponsableFindFirstArgs>(args?: SelectSubset<T, ResponsableFindFirstArgs<ExtArgs>>): Prisma__ResponsableClient<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Responsable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponsableFindFirstOrThrowArgs} args - Arguments to find a Responsable
     * @example
     * // Get one Responsable
     * const responsable = await prisma.responsable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResponsableFindFirstOrThrowArgs>(args?: SelectSubset<T, ResponsableFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResponsableClient<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Responsables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponsableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Responsables
     * const responsables = await prisma.responsable.findMany()
     * 
     * // Get first 10 Responsables
     * const responsables = await prisma.responsable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const responsableWithIdOnly = await prisma.responsable.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResponsableFindManyArgs>(args?: SelectSubset<T, ResponsableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Responsable.
     * @param {ResponsableCreateArgs} args - Arguments to create a Responsable.
     * @example
     * // Create one Responsable
     * const Responsable = await prisma.responsable.create({
     *   data: {
     *     // ... data to create a Responsable
     *   }
     * })
     * 
     */
    create<T extends ResponsableCreateArgs>(args: SelectSubset<T, ResponsableCreateArgs<ExtArgs>>): Prisma__ResponsableClient<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Responsables.
     * @param {ResponsableCreateManyArgs} args - Arguments to create many Responsables.
     * @example
     * // Create many Responsables
     * const responsable = await prisma.responsable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResponsableCreateManyArgs>(args?: SelectSubset<T, ResponsableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Responsables and returns the data saved in the database.
     * @param {ResponsableCreateManyAndReturnArgs} args - Arguments to create many Responsables.
     * @example
     * // Create many Responsables
     * const responsable = await prisma.responsable.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Responsables and only return the `id`
     * const responsableWithIdOnly = await prisma.responsable.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResponsableCreateManyAndReturnArgs>(args?: SelectSubset<T, ResponsableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Responsable.
     * @param {ResponsableDeleteArgs} args - Arguments to delete one Responsable.
     * @example
     * // Delete one Responsable
     * const Responsable = await prisma.responsable.delete({
     *   where: {
     *     // ... filter to delete one Responsable
     *   }
     * })
     * 
     */
    delete<T extends ResponsableDeleteArgs>(args: SelectSubset<T, ResponsableDeleteArgs<ExtArgs>>): Prisma__ResponsableClient<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Responsable.
     * @param {ResponsableUpdateArgs} args - Arguments to update one Responsable.
     * @example
     * // Update one Responsable
     * const responsable = await prisma.responsable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResponsableUpdateArgs>(args: SelectSubset<T, ResponsableUpdateArgs<ExtArgs>>): Prisma__ResponsableClient<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Responsables.
     * @param {ResponsableDeleteManyArgs} args - Arguments to filter Responsables to delete.
     * @example
     * // Delete a few Responsables
     * const { count } = await prisma.responsable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResponsableDeleteManyArgs>(args?: SelectSubset<T, ResponsableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Responsables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponsableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Responsables
     * const responsable = await prisma.responsable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResponsableUpdateManyArgs>(args: SelectSubset<T, ResponsableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Responsables and returns the data updated in the database.
     * @param {ResponsableUpdateManyAndReturnArgs} args - Arguments to update many Responsables.
     * @example
     * // Update many Responsables
     * const responsable = await prisma.responsable.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Responsables and only return the `id`
     * const responsableWithIdOnly = await prisma.responsable.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResponsableUpdateManyAndReturnArgs>(args: SelectSubset<T, ResponsableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Responsable.
     * @param {ResponsableUpsertArgs} args - Arguments to update or create a Responsable.
     * @example
     * // Update or create a Responsable
     * const responsable = await prisma.responsable.upsert({
     *   create: {
     *     // ... data to create a Responsable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Responsable we want to update
     *   }
     * })
     */
    upsert<T extends ResponsableUpsertArgs>(args: SelectSubset<T, ResponsableUpsertArgs<ExtArgs>>): Prisma__ResponsableClient<$Result.GetResult<Prisma.$ResponsablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Responsables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponsableCountArgs} args - Arguments to filter Responsables to count.
     * @example
     * // Count the number of Responsables
     * const count = await prisma.responsable.count({
     *   where: {
     *     // ... the filter for the Responsables we want to count
     *   }
     * })
    **/
    count<T extends ResponsableCountArgs>(
      args?: Subset<T, ResponsableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResponsableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Responsable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponsableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResponsableAggregateArgs>(args: Subset<T, ResponsableAggregateArgs>): Prisma.PrismaPromise<GetResponsableAggregateType<T>>

    /**
     * Group by Responsable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponsableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResponsableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResponsableGroupByArgs['orderBy'] }
        : { orderBy?: ResponsableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResponsableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResponsableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Responsable model
   */
  readonly fields: ResponsableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Responsable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResponsableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tarea<T extends TareaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TareaDefaultArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Responsable model
   */
  interface ResponsableFieldRefs {
    readonly id: FieldRef<"Responsable", 'Int'>
    readonly tareaId: FieldRef<"Responsable", 'String'>
    readonly usuarioId: FieldRef<"Responsable", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Responsable findUnique
   */
  export type ResponsableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
    /**
     * Filter, which Responsable to fetch.
     */
    where: ResponsableWhereUniqueInput
  }

  /**
   * Responsable findUniqueOrThrow
   */
  export type ResponsableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
    /**
     * Filter, which Responsable to fetch.
     */
    where: ResponsableWhereUniqueInput
  }

  /**
   * Responsable findFirst
   */
  export type ResponsableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
    /**
     * Filter, which Responsable to fetch.
     */
    where?: ResponsableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responsables to fetch.
     */
    orderBy?: ResponsableOrderByWithRelationInput | ResponsableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responsables.
     */
    cursor?: ResponsableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responsables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responsables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responsables.
     */
    distinct?: ResponsableScalarFieldEnum | ResponsableScalarFieldEnum[]
  }

  /**
   * Responsable findFirstOrThrow
   */
  export type ResponsableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
    /**
     * Filter, which Responsable to fetch.
     */
    where?: ResponsableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responsables to fetch.
     */
    orderBy?: ResponsableOrderByWithRelationInput | ResponsableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responsables.
     */
    cursor?: ResponsableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responsables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responsables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responsables.
     */
    distinct?: ResponsableScalarFieldEnum | ResponsableScalarFieldEnum[]
  }

  /**
   * Responsable findMany
   */
  export type ResponsableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
    /**
     * Filter, which Responsables to fetch.
     */
    where?: ResponsableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responsables to fetch.
     */
    orderBy?: ResponsableOrderByWithRelationInput | ResponsableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Responsables.
     */
    cursor?: ResponsableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responsables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responsables.
     */
    skip?: number
    distinct?: ResponsableScalarFieldEnum | ResponsableScalarFieldEnum[]
  }

  /**
   * Responsable create
   */
  export type ResponsableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
    /**
     * The data needed to create a Responsable.
     */
    data: XOR<ResponsableCreateInput, ResponsableUncheckedCreateInput>
  }

  /**
   * Responsable createMany
   */
  export type ResponsableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Responsables.
     */
    data: ResponsableCreateManyInput | ResponsableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Responsable createManyAndReturn
   */
  export type ResponsableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * The data used to create many Responsables.
     */
    data: ResponsableCreateManyInput | ResponsableCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Responsable update
   */
  export type ResponsableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
    /**
     * The data needed to update a Responsable.
     */
    data: XOR<ResponsableUpdateInput, ResponsableUncheckedUpdateInput>
    /**
     * Choose, which Responsable to update.
     */
    where: ResponsableWhereUniqueInput
  }

  /**
   * Responsable updateMany
   */
  export type ResponsableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Responsables.
     */
    data: XOR<ResponsableUpdateManyMutationInput, ResponsableUncheckedUpdateManyInput>
    /**
     * Filter which Responsables to update
     */
    where?: ResponsableWhereInput
    /**
     * Limit how many Responsables to update.
     */
    limit?: number
  }

  /**
   * Responsable updateManyAndReturn
   */
  export type ResponsableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * The data used to update Responsables.
     */
    data: XOR<ResponsableUpdateManyMutationInput, ResponsableUncheckedUpdateManyInput>
    /**
     * Filter which Responsables to update
     */
    where?: ResponsableWhereInput
    /**
     * Limit how many Responsables to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Responsable upsert
   */
  export type ResponsableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
    /**
     * The filter to search for the Responsable to update in case it exists.
     */
    where: ResponsableWhereUniqueInput
    /**
     * In case the Responsable found by the `where` argument doesn't exist, create a new Responsable with this data.
     */
    create: XOR<ResponsableCreateInput, ResponsableUncheckedCreateInput>
    /**
     * In case the Responsable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResponsableUpdateInput, ResponsableUncheckedUpdateInput>
  }

  /**
   * Responsable delete
   */
  export type ResponsableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
    /**
     * Filter which Responsable to delete.
     */
    where: ResponsableWhereUniqueInput
  }

  /**
   * Responsable deleteMany
   */
  export type ResponsableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Responsables to delete
     */
    where?: ResponsableWhereInput
    /**
     * Limit how many Responsables to delete.
     */
    limit?: number
  }

  /**
   * Responsable without action
   */
  export type ResponsableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Responsable
     */
    select?: ResponsableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Responsable
     */
    omit?: ResponsableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponsableInclude<ExtArgs> | null
  }


  /**
   * Model Comentario
   */

  export type AggregateComentario = {
    _count: ComentarioCountAggregateOutputType | null
    _avg: ComentarioAvgAggregateOutputType | null
    _sum: ComentarioSumAggregateOutputType | null
    _min: ComentarioMinAggregateOutputType | null
    _max: ComentarioMaxAggregateOutputType | null
  }

  export type ComentarioAvgAggregateOutputType = {
    id: number | null
  }

  export type ComentarioSumAggregateOutputType = {
    id: number | null
  }

  export type ComentarioMinAggregateOutputType = {
    id: number | null
    contenido: string | null
    createdAt: Date | null
    tareaId: string | null
    usuarioId: string | null
  }

  export type ComentarioMaxAggregateOutputType = {
    id: number | null
    contenido: string | null
    createdAt: Date | null
    tareaId: string | null
    usuarioId: string | null
  }

  export type ComentarioCountAggregateOutputType = {
    id: number
    contenido: number
    createdAt: number
    tareaId: number
    usuarioId: number
    _all: number
  }


  export type ComentarioAvgAggregateInputType = {
    id?: true
  }

  export type ComentarioSumAggregateInputType = {
    id?: true
  }

  export type ComentarioMinAggregateInputType = {
    id?: true
    contenido?: true
    createdAt?: true
    tareaId?: true
    usuarioId?: true
  }

  export type ComentarioMaxAggregateInputType = {
    id?: true
    contenido?: true
    createdAt?: true
    tareaId?: true
    usuarioId?: true
  }

  export type ComentarioCountAggregateInputType = {
    id?: true
    contenido?: true
    createdAt?: true
    tareaId?: true
    usuarioId?: true
    _all?: true
  }

  export type ComentarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comentario to aggregate.
     */
    where?: ComentarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comentarios to fetch.
     */
    orderBy?: ComentarioOrderByWithRelationInput | ComentarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComentarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comentarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comentarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comentarios
    **/
    _count?: true | ComentarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComentarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComentarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComentarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComentarioMaxAggregateInputType
  }

  export type GetComentarioAggregateType<T extends ComentarioAggregateArgs> = {
        [P in keyof T & keyof AggregateComentario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComentario[P]>
      : GetScalarType<T[P], AggregateComentario[P]>
  }




  export type ComentarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComentarioWhereInput
    orderBy?: ComentarioOrderByWithAggregationInput | ComentarioOrderByWithAggregationInput[]
    by: ComentarioScalarFieldEnum[] | ComentarioScalarFieldEnum
    having?: ComentarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComentarioCountAggregateInputType | true
    _avg?: ComentarioAvgAggregateInputType
    _sum?: ComentarioSumAggregateInputType
    _min?: ComentarioMinAggregateInputType
    _max?: ComentarioMaxAggregateInputType
  }

  export type ComentarioGroupByOutputType = {
    id: number
    contenido: string
    createdAt: Date
    tareaId: string
    usuarioId: string
    _count: ComentarioCountAggregateOutputType | null
    _avg: ComentarioAvgAggregateOutputType | null
    _sum: ComentarioSumAggregateOutputType | null
    _min: ComentarioMinAggregateOutputType | null
    _max: ComentarioMaxAggregateOutputType | null
  }

  type GetComentarioGroupByPayload<T extends ComentarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComentarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComentarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComentarioGroupByOutputType[P]>
            : GetScalarType<T[P], ComentarioGroupByOutputType[P]>
        }
      >
    >


  export type ComentarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contenido?: boolean
    createdAt?: boolean
    tareaId?: boolean
    usuarioId?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    autor?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comentario"]>

  export type ComentarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contenido?: boolean
    createdAt?: boolean
    tareaId?: boolean
    usuarioId?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    autor?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comentario"]>

  export type ComentarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contenido?: boolean
    createdAt?: boolean
    tareaId?: boolean
    usuarioId?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    autor?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comentario"]>

  export type ComentarioSelectScalar = {
    id?: boolean
    contenido?: boolean
    createdAt?: boolean
    tareaId?: boolean
    usuarioId?: boolean
  }

  export type ComentarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contenido" | "createdAt" | "tareaId" | "usuarioId", ExtArgs["result"]["comentario"]>
  export type ComentarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    autor?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ComentarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    autor?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ComentarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    autor?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $ComentarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comentario"
    objects: {
      tarea: Prisma.$TareaPayload<ExtArgs>
      autor: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      contenido: string
      createdAt: Date
      tareaId: string
      usuarioId: string
    }, ExtArgs["result"]["comentario"]>
    composites: {}
  }

  type ComentarioGetPayload<S extends boolean | null | undefined | ComentarioDefaultArgs> = $Result.GetResult<Prisma.$ComentarioPayload, S>

  type ComentarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComentarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComentarioCountAggregateInputType | true
    }

  export interface ComentarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comentario'], meta: { name: 'Comentario' } }
    /**
     * Find zero or one Comentario that matches the filter.
     * @param {ComentarioFindUniqueArgs} args - Arguments to find a Comentario
     * @example
     * // Get one Comentario
     * const comentario = await prisma.comentario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComentarioFindUniqueArgs>(args: SelectSubset<T, ComentarioFindUniqueArgs<ExtArgs>>): Prisma__ComentarioClient<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comentario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComentarioFindUniqueOrThrowArgs} args - Arguments to find a Comentario
     * @example
     * // Get one Comentario
     * const comentario = await prisma.comentario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComentarioFindUniqueOrThrowArgs>(args: SelectSubset<T, ComentarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComentarioClient<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comentario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComentarioFindFirstArgs} args - Arguments to find a Comentario
     * @example
     * // Get one Comentario
     * const comentario = await prisma.comentario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComentarioFindFirstArgs>(args?: SelectSubset<T, ComentarioFindFirstArgs<ExtArgs>>): Prisma__ComentarioClient<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comentario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComentarioFindFirstOrThrowArgs} args - Arguments to find a Comentario
     * @example
     * // Get one Comentario
     * const comentario = await prisma.comentario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComentarioFindFirstOrThrowArgs>(args?: SelectSubset<T, ComentarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComentarioClient<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comentarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComentarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comentarios
     * const comentarios = await prisma.comentario.findMany()
     * 
     * // Get first 10 Comentarios
     * const comentarios = await prisma.comentario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const comentarioWithIdOnly = await prisma.comentario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComentarioFindManyArgs>(args?: SelectSubset<T, ComentarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comentario.
     * @param {ComentarioCreateArgs} args - Arguments to create a Comentario.
     * @example
     * // Create one Comentario
     * const Comentario = await prisma.comentario.create({
     *   data: {
     *     // ... data to create a Comentario
     *   }
     * })
     * 
     */
    create<T extends ComentarioCreateArgs>(args: SelectSubset<T, ComentarioCreateArgs<ExtArgs>>): Prisma__ComentarioClient<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comentarios.
     * @param {ComentarioCreateManyArgs} args - Arguments to create many Comentarios.
     * @example
     * // Create many Comentarios
     * const comentario = await prisma.comentario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComentarioCreateManyArgs>(args?: SelectSubset<T, ComentarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comentarios and returns the data saved in the database.
     * @param {ComentarioCreateManyAndReturnArgs} args - Arguments to create many Comentarios.
     * @example
     * // Create many Comentarios
     * const comentario = await prisma.comentario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comentarios and only return the `id`
     * const comentarioWithIdOnly = await prisma.comentario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComentarioCreateManyAndReturnArgs>(args?: SelectSubset<T, ComentarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comentario.
     * @param {ComentarioDeleteArgs} args - Arguments to delete one Comentario.
     * @example
     * // Delete one Comentario
     * const Comentario = await prisma.comentario.delete({
     *   where: {
     *     // ... filter to delete one Comentario
     *   }
     * })
     * 
     */
    delete<T extends ComentarioDeleteArgs>(args: SelectSubset<T, ComentarioDeleteArgs<ExtArgs>>): Prisma__ComentarioClient<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comentario.
     * @param {ComentarioUpdateArgs} args - Arguments to update one Comentario.
     * @example
     * // Update one Comentario
     * const comentario = await prisma.comentario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComentarioUpdateArgs>(args: SelectSubset<T, ComentarioUpdateArgs<ExtArgs>>): Prisma__ComentarioClient<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comentarios.
     * @param {ComentarioDeleteManyArgs} args - Arguments to filter Comentarios to delete.
     * @example
     * // Delete a few Comentarios
     * const { count } = await prisma.comentario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComentarioDeleteManyArgs>(args?: SelectSubset<T, ComentarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comentarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComentarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comentarios
     * const comentario = await prisma.comentario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComentarioUpdateManyArgs>(args: SelectSubset<T, ComentarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comentarios and returns the data updated in the database.
     * @param {ComentarioUpdateManyAndReturnArgs} args - Arguments to update many Comentarios.
     * @example
     * // Update many Comentarios
     * const comentario = await prisma.comentario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comentarios and only return the `id`
     * const comentarioWithIdOnly = await prisma.comentario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComentarioUpdateManyAndReturnArgs>(args: SelectSubset<T, ComentarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comentario.
     * @param {ComentarioUpsertArgs} args - Arguments to update or create a Comentario.
     * @example
     * // Update or create a Comentario
     * const comentario = await prisma.comentario.upsert({
     *   create: {
     *     // ... data to create a Comentario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comentario we want to update
     *   }
     * })
     */
    upsert<T extends ComentarioUpsertArgs>(args: SelectSubset<T, ComentarioUpsertArgs<ExtArgs>>): Prisma__ComentarioClient<$Result.GetResult<Prisma.$ComentarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comentarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComentarioCountArgs} args - Arguments to filter Comentarios to count.
     * @example
     * // Count the number of Comentarios
     * const count = await prisma.comentario.count({
     *   where: {
     *     // ... the filter for the Comentarios we want to count
     *   }
     * })
    **/
    count<T extends ComentarioCountArgs>(
      args?: Subset<T, ComentarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComentarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comentario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComentarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComentarioAggregateArgs>(args: Subset<T, ComentarioAggregateArgs>): Prisma.PrismaPromise<GetComentarioAggregateType<T>>

    /**
     * Group by Comentario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComentarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComentarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComentarioGroupByArgs['orderBy'] }
        : { orderBy?: ComentarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComentarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComentarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comentario model
   */
  readonly fields: ComentarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comentario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComentarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tarea<T extends TareaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TareaDefaultArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    autor<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comentario model
   */
  interface ComentarioFieldRefs {
    readonly id: FieldRef<"Comentario", 'Int'>
    readonly contenido: FieldRef<"Comentario", 'String'>
    readonly createdAt: FieldRef<"Comentario", 'DateTime'>
    readonly tareaId: FieldRef<"Comentario", 'String'>
    readonly usuarioId: FieldRef<"Comentario", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Comentario findUnique
   */
  export type ComentarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
    /**
     * Filter, which Comentario to fetch.
     */
    where: ComentarioWhereUniqueInput
  }

  /**
   * Comentario findUniqueOrThrow
   */
  export type ComentarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
    /**
     * Filter, which Comentario to fetch.
     */
    where: ComentarioWhereUniqueInput
  }

  /**
   * Comentario findFirst
   */
  export type ComentarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
    /**
     * Filter, which Comentario to fetch.
     */
    where?: ComentarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comentarios to fetch.
     */
    orderBy?: ComentarioOrderByWithRelationInput | ComentarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comentarios.
     */
    cursor?: ComentarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comentarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comentarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comentarios.
     */
    distinct?: ComentarioScalarFieldEnum | ComentarioScalarFieldEnum[]
  }

  /**
   * Comentario findFirstOrThrow
   */
  export type ComentarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
    /**
     * Filter, which Comentario to fetch.
     */
    where?: ComentarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comentarios to fetch.
     */
    orderBy?: ComentarioOrderByWithRelationInput | ComentarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comentarios.
     */
    cursor?: ComentarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comentarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comentarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comentarios.
     */
    distinct?: ComentarioScalarFieldEnum | ComentarioScalarFieldEnum[]
  }

  /**
   * Comentario findMany
   */
  export type ComentarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
    /**
     * Filter, which Comentarios to fetch.
     */
    where?: ComentarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comentarios to fetch.
     */
    orderBy?: ComentarioOrderByWithRelationInput | ComentarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comentarios.
     */
    cursor?: ComentarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comentarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comentarios.
     */
    skip?: number
    distinct?: ComentarioScalarFieldEnum | ComentarioScalarFieldEnum[]
  }

  /**
   * Comentario create
   */
  export type ComentarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Comentario.
     */
    data: XOR<ComentarioCreateInput, ComentarioUncheckedCreateInput>
  }

  /**
   * Comentario createMany
   */
  export type ComentarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comentarios.
     */
    data: ComentarioCreateManyInput | ComentarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comentario createManyAndReturn
   */
  export type ComentarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * The data used to create many Comentarios.
     */
    data: ComentarioCreateManyInput | ComentarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comentario update
   */
  export type ComentarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Comentario.
     */
    data: XOR<ComentarioUpdateInput, ComentarioUncheckedUpdateInput>
    /**
     * Choose, which Comentario to update.
     */
    where: ComentarioWhereUniqueInput
  }

  /**
   * Comentario updateMany
   */
  export type ComentarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comentarios.
     */
    data: XOR<ComentarioUpdateManyMutationInput, ComentarioUncheckedUpdateManyInput>
    /**
     * Filter which Comentarios to update
     */
    where?: ComentarioWhereInput
    /**
     * Limit how many Comentarios to update.
     */
    limit?: number
  }

  /**
   * Comentario updateManyAndReturn
   */
  export type ComentarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * The data used to update Comentarios.
     */
    data: XOR<ComentarioUpdateManyMutationInput, ComentarioUncheckedUpdateManyInput>
    /**
     * Filter which Comentarios to update
     */
    where?: ComentarioWhereInput
    /**
     * Limit how many Comentarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comentario upsert
   */
  export type ComentarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Comentario to update in case it exists.
     */
    where: ComentarioWhereUniqueInput
    /**
     * In case the Comentario found by the `where` argument doesn't exist, create a new Comentario with this data.
     */
    create: XOR<ComentarioCreateInput, ComentarioUncheckedCreateInput>
    /**
     * In case the Comentario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComentarioUpdateInput, ComentarioUncheckedUpdateInput>
  }

  /**
   * Comentario delete
   */
  export type ComentarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
    /**
     * Filter which Comentario to delete.
     */
    where: ComentarioWhereUniqueInput
  }

  /**
   * Comentario deleteMany
   */
  export type ComentarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comentarios to delete
     */
    where?: ComentarioWhereInput
    /**
     * Limit how many Comentarios to delete.
     */
    limit?: number
  }

  /**
   * Comentario without action
   */
  export type ComentarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comentario
     */
    select?: ComentarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comentario
     */
    omit?: ComentarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComentarioInclude<ExtArgs> | null
  }


  /**
   * Model Notificacion
   */

  export type AggregateNotificacion = {
    _count: NotificacionCountAggregateOutputType | null
    _avg: NotificacionAvgAggregateOutputType | null
    _sum: NotificacionSumAggregateOutputType | null
    _min: NotificacionMinAggregateOutputType | null
    _max: NotificacionMaxAggregateOutputType | null
  }

  export type NotificacionAvgAggregateOutputType = {
    id: number | null
  }

  export type NotificacionSumAggregateOutputType = {
    id: number | null
  }

  export type NotificacionMinAggregateOutputType = {
    id: number | null
    tipo: string | null
    mensaje: string | null
    leida: boolean | null
    createdAt: Date | null
    usuarioId: string | null
    tareaId: string | null
  }

  export type NotificacionMaxAggregateOutputType = {
    id: number | null
    tipo: string | null
    mensaje: string | null
    leida: boolean | null
    createdAt: Date | null
    usuarioId: string | null
    tareaId: string | null
  }

  export type NotificacionCountAggregateOutputType = {
    id: number
    tipo: number
    mensaje: number
    leida: number
    createdAt: number
    usuarioId: number
    tareaId: number
    _all: number
  }


  export type NotificacionAvgAggregateInputType = {
    id?: true
  }

  export type NotificacionSumAggregateInputType = {
    id?: true
  }

  export type NotificacionMinAggregateInputType = {
    id?: true
    tipo?: true
    mensaje?: true
    leida?: true
    createdAt?: true
    usuarioId?: true
    tareaId?: true
  }

  export type NotificacionMaxAggregateInputType = {
    id?: true
    tipo?: true
    mensaje?: true
    leida?: true
    createdAt?: true
    usuarioId?: true
    tareaId?: true
  }

  export type NotificacionCountAggregateInputType = {
    id?: true
    tipo?: true
    mensaje?: true
    leida?: true
    createdAt?: true
    usuarioId?: true
    tareaId?: true
    _all?: true
  }

  export type NotificacionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notificacion to aggregate.
     */
    where?: NotificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacions to fetch.
     */
    orderBy?: NotificacionOrderByWithRelationInput | NotificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notificacions
    **/
    _count?: true | NotificacionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificacionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificacionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificacionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificacionMaxAggregateInputType
  }

  export type GetNotificacionAggregateType<T extends NotificacionAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificacion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificacion[P]>
      : GetScalarType<T[P], AggregateNotificacion[P]>
  }




  export type NotificacionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificacionWhereInput
    orderBy?: NotificacionOrderByWithAggregationInput | NotificacionOrderByWithAggregationInput[]
    by: NotificacionScalarFieldEnum[] | NotificacionScalarFieldEnum
    having?: NotificacionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificacionCountAggregateInputType | true
    _avg?: NotificacionAvgAggregateInputType
    _sum?: NotificacionSumAggregateInputType
    _min?: NotificacionMinAggregateInputType
    _max?: NotificacionMaxAggregateInputType
  }

  export type NotificacionGroupByOutputType = {
    id: number
    tipo: string
    mensaje: string
    leida: boolean
    createdAt: Date
    usuarioId: string
    tareaId: string | null
    _count: NotificacionCountAggregateOutputType | null
    _avg: NotificacionAvgAggregateOutputType | null
    _sum: NotificacionSumAggregateOutputType | null
    _min: NotificacionMinAggregateOutputType | null
    _max: NotificacionMaxAggregateOutputType | null
  }

  type GetNotificacionGroupByPayload<T extends NotificacionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificacionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificacionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificacionGroupByOutputType[P]>
            : GetScalarType<T[P], NotificacionGroupByOutputType[P]>
        }
      >
    >


  export type NotificacionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    mensaje?: boolean
    leida?: boolean
    createdAt?: boolean
    usuarioId?: boolean
    tareaId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    tarea?: boolean | Notificacion$tareaArgs<ExtArgs>
  }, ExtArgs["result"]["notificacion"]>

  export type NotificacionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    mensaje?: boolean
    leida?: boolean
    createdAt?: boolean
    usuarioId?: boolean
    tareaId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    tarea?: boolean | Notificacion$tareaArgs<ExtArgs>
  }, ExtArgs["result"]["notificacion"]>

  export type NotificacionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    mensaje?: boolean
    leida?: boolean
    createdAt?: boolean
    usuarioId?: boolean
    tareaId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    tarea?: boolean | Notificacion$tareaArgs<ExtArgs>
  }, ExtArgs["result"]["notificacion"]>

  export type NotificacionSelectScalar = {
    id?: boolean
    tipo?: boolean
    mensaje?: boolean
    leida?: boolean
    createdAt?: boolean
    usuarioId?: boolean
    tareaId?: boolean
  }

  export type NotificacionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipo" | "mensaje" | "leida" | "createdAt" | "usuarioId" | "tareaId", ExtArgs["result"]["notificacion"]>
  export type NotificacionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    tarea?: boolean | Notificacion$tareaArgs<ExtArgs>
  }
  export type NotificacionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    tarea?: boolean | Notificacion$tareaArgs<ExtArgs>
  }
  export type NotificacionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    tarea?: boolean | Notificacion$tareaArgs<ExtArgs>
  }

  export type $NotificacionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notificacion"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      tarea: Prisma.$TareaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tipo: string
      mensaje: string
      leida: boolean
      createdAt: Date
      usuarioId: string
      tareaId: string | null
    }, ExtArgs["result"]["notificacion"]>
    composites: {}
  }

  type NotificacionGetPayload<S extends boolean | null | undefined | NotificacionDefaultArgs> = $Result.GetResult<Prisma.$NotificacionPayload, S>

  type NotificacionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificacionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificacionCountAggregateInputType | true
    }

  export interface NotificacionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notificacion'], meta: { name: 'Notificacion' } }
    /**
     * Find zero or one Notificacion that matches the filter.
     * @param {NotificacionFindUniqueArgs} args - Arguments to find a Notificacion
     * @example
     * // Get one Notificacion
     * const notificacion = await prisma.notificacion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificacionFindUniqueArgs>(args: SelectSubset<T, NotificacionFindUniqueArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notificacion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificacionFindUniqueOrThrowArgs} args - Arguments to find a Notificacion
     * @example
     * // Get one Notificacion
     * const notificacion = await prisma.notificacion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificacionFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificacionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notificacion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionFindFirstArgs} args - Arguments to find a Notificacion
     * @example
     * // Get one Notificacion
     * const notificacion = await prisma.notificacion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificacionFindFirstArgs>(args?: SelectSubset<T, NotificacionFindFirstArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notificacion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionFindFirstOrThrowArgs} args - Arguments to find a Notificacion
     * @example
     * // Get one Notificacion
     * const notificacion = await prisma.notificacion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificacionFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificacionFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notificacions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notificacions
     * const notificacions = await prisma.notificacion.findMany()
     * 
     * // Get first 10 Notificacions
     * const notificacions = await prisma.notificacion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificacionWithIdOnly = await prisma.notificacion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificacionFindManyArgs>(args?: SelectSubset<T, NotificacionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notificacion.
     * @param {NotificacionCreateArgs} args - Arguments to create a Notificacion.
     * @example
     * // Create one Notificacion
     * const Notificacion = await prisma.notificacion.create({
     *   data: {
     *     // ... data to create a Notificacion
     *   }
     * })
     * 
     */
    create<T extends NotificacionCreateArgs>(args: SelectSubset<T, NotificacionCreateArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notificacions.
     * @param {NotificacionCreateManyArgs} args - Arguments to create many Notificacions.
     * @example
     * // Create many Notificacions
     * const notificacion = await prisma.notificacion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificacionCreateManyArgs>(args?: SelectSubset<T, NotificacionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notificacions and returns the data saved in the database.
     * @param {NotificacionCreateManyAndReturnArgs} args - Arguments to create many Notificacions.
     * @example
     * // Create many Notificacions
     * const notificacion = await prisma.notificacion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notificacions and only return the `id`
     * const notificacionWithIdOnly = await prisma.notificacion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificacionCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificacionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notificacion.
     * @param {NotificacionDeleteArgs} args - Arguments to delete one Notificacion.
     * @example
     * // Delete one Notificacion
     * const Notificacion = await prisma.notificacion.delete({
     *   where: {
     *     // ... filter to delete one Notificacion
     *   }
     * })
     * 
     */
    delete<T extends NotificacionDeleteArgs>(args: SelectSubset<T, NotificacionDeleteArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notificacion.
     * @param {NotificacionUpdateArgs} args - Arguments to update one Notificacion.
     * @example
     * // Update one Notificacion
     * const notificacion = await prisma.notificacion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificacionUpdateArgs>(args: SelectSubset<T, NotificacionUpdateArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notificacions.
     * @param {NotificacionDeleteManyArgs} args - Arguments to filter Notificacions to delete.
     * @example
     * // Delete a few Notificacions
     * const { count } = await prisma.notificacion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificacionDeleteManyArgs>(args?: SelectSubset<T, NotificacionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notificacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notificacions
     * const notificacion = await prisma.notificacion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificacionUpdateManyArgs>(args: SelectSubset<T, NotificacionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notificacions and returns the data updated in the database.
     * @param {NotificacionUpdateManyAndReturnArgs} args - Arguments to update many Notificacions.
     * @example
     * // Update many Notificacions
     * const notificacion = await prisma.notificacion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notificacions and only return the `id`
     * const notificacionWithIdOnly = await prisma.notificacion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificacionUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificacionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notificacion.
     * @param {NotificacionUpsertArgs} args - Arguments to update or create a Notificacion.
     * @example
     * // Update or create a Notificacion
     * const notificacion = await prisma.notificacion.upsert({
     *   create: {
     *     // ... data to create a Notificacion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notificacion we want to update
     *   }
     * })
     */
    upsert<T extends NotificacionUpsertArgs>(args: SelectSubset<T, NotificacionUpsertArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notificacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionCountArgs} args - Arguments to filter Notificacions to count.
     * @example
     * // Count the number of Notificacions
     * const count = await prisma.notificacion.count({
     *   where: {
     *     // ... the filter for the Notificacions we want to count
     *   }
     * })
    **/
    count<T extends NotificacionCountArgs>(
      args?: Subset<T, NotificacionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificacionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notificacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificacionAggregateArgs>(args: Subset<T, NotificacionAggregateArgs>): Prisma.PrismaPromise<GetNotificacionAggregateType<T>>

    /**
     * Group by Notificacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificacionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificacionGroupByArgs['orderBy'] }
        : { orderBy?: NotificacionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificacionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificacionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notificacion model
   */
  readonly fields: NotificacionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notificacion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificacionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tarea<T extends Notificacion$tareaArgs<ExtArgs> = {}>(args?: Subset<T, Notificacion$tareaArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notificacion model
   */
  interface NotificacionFieldRefs {
    readonly id: FieldRef<"Notificacion", 'Int'>
    readonly tipo: FieldRef<"Notificacion", 'String'>
    readonly mensaje: FieldRef<"Notificacion", 'String'>
    readonly leida: FieldRef<"Notificacion", 'Boolean'>
    readonly createdAt: FieldRef<"Notificacion", 'DateTime'>
    readonly usuarioId: FieldRef<"Notificacion", 'String'>
    readonly tareaId: FieldRef<"Notificacion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Notificacion findUnique
   */
  export type NotificacionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter, which Notificacion to fetch.
     */
    where: NotificacionWhereUniqueInput
  }

  /**
   * Notificacion findUniqueOrThrow
   */
  export type NotificacionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter, which Notificacion to fetch.
     */
    where: NotificacionWhereUniqueInput
  }

  /**
   * Notificacion findFirst
   */
  export type NotificacionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter, which Notificacion to fetch.
     */
    where?: NotificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacions to fetch.
     */
    orderBy?: NotificacionOrderByWithRelationInput | NotificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notificacions.
     */
    cursor?: NotificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notificacions.
     */
    distinct?: NotificacionScalarFieldEnum | NotificacionScalarFieldEnum[]
  }

  /**
   * Notificacion findFirstOrThrow
   */
  export type NotificacionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter, which Notificacion to fetch.
     */
    where?: NotificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacions to fetch.
     */
    orderBy?: NotificacionOrderByWithRelationInput | NotificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notificacions.
     */
    cursor?: NotificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notificacions.
     */
    distinct?: NotificacionScalarFieldEnum | NotificacionScalarFieldEnum[]
  }

  /**
   * Notificacion findMany
   */
  export type NotificacionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter, which Notificacions to fetch.
     */
    where?: NotificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacions to fetch.
     */
    orderBy?: NotificacionOrderByWithRelationInput | NotificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notificacions.
     */
    cursor?: NotificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacions.
     */
    skip?: number
    distinct?: NotificacionScalarFieldEnum | NotificacionScalarFieldEnum[]
  }

  /**
   * Notificacion create
   */
  export type NotificacionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * The data needed to create a Notificacion.
     */
    data: XOR<NotificacionCreateInput, NotificacionUncheckedCreateInput>
  }

  /**
   * Notificacion createMany
   */
  export type NotificacionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notificacions.
     */
    data: NotificacionCreateManyInput | NotificacionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notificacion createManyAndReturn
   */
  export type NotificacionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * The data used to create many Notificacions.
     */
    data: NotificacionCreateManyInput | NotificacionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notificacion update
   */
  export type NotificacionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * The data needed to update a Notificacion.
     */
    data: XOR<NotificacionUpdateInput, NotificacionUncheckedUpdateInput>
    /**
     * Choose, which Notificacion to update.
     */
    where: NotificacionWhereUniqueInput
  }

  /**
   * Notificacion updateMany
   */
  export type NotificacionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notificacions.
     */
    data: XOR<NotificacionUpdateManyMutationInput, NotificacionUncheckedUpdateManyInput>
    /**
     * Filter which Notificacions to update
     */
    where?: NotificacionWhereInput
    /**
     * Limit how many Notificacions to update.
     */
    limit?: number
  }

  /**
   * Notificacion updateManyAndReturn
   */
  export type NotificacionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * The data used to update Notificacions.
     */
    data: XOR<NotificacionUpdateManyMutationInput, NotificacionUncheckedUpdateManyInput>
    /**
     * Filter which Notificacions to update
     */
    where?: NotificacionWhereInput
    /**
     * Limit how many Notificacions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notificacion upsert
   */
  export type NotificacionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * The filter to search for the Notificacion to update in case it exists.
     */
    where: NotificacionWhereUniqueInput
    /**
     * In case the Notificacion found by the `where` argument doesn't exist, create a new Notificacion with this data.
     */
    create: XOR<NotificacionCreateInput, NotificacionUncheckedCreateInput>
    /**
     * In case the Notificacion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificacionUpdateInput, NotificacionUncheckedUpdateInput>
  }

  /**
   * Notificacion delete
   */
  export type NotificacionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter which Notificacion to delete.
     */
    where: NotificacionWhereUniqueInput
  }

  /**
   * Notificacion deleteMany
   */
  export type NotificacionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notificacions to delete
     */
    where?: NotificacionWhereInput
    /**
     * Limit how many Notificacions to delete.
     */
    limit?: number
  }

  /**
   * Notificacion.tarea
   */
  export type Notificacion$tareaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    where?: TareaWhereInput
  }

  /**
   * Notificacion without action
   */
  export type NotificacionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
  }


  /**
   * Model Etiqueta
   */

  export type AggregateEtiqueta = {
    _count: EtiquetaCountAggregateOutputType | null
    _avg: EtiquetaAvgAggregateOutputType | null
    _sum: EtiquetaSumAggregateOutputType | null
    _min: EtiquetaMinAggregateOutputType | null
    _max: EtiquetaMaxAggregateOutputType | null
  }

  export type EtiquetaAvgAggregateOutputType = {
    id: number | null
  }

  export type EtiquetaSumAggregateOutputType = {
    id: number | null
  }

  export type EtiquetaMinAggregateOutputType = {
    id: number | null
    nombre: string | null
  }

  export type EtiquetaMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
  }

  export type EtiquetaCountAggregateOutputType = {
    id: number
    nombre: number
    _all: number
  }


  export type EtiquetaAvgAggregateInputType = {
    id?: true
  }

  export type EtiquetaSumAggregateInputType = {
    id?: true
  }

  export type EtiquetaMinAggregateInputType = {
    id?: true
    nombre?: true
  }

  export type EtiquetaMaxAggregateInputType = {
    id?: true
    nombre?: true
  }

  export type EtiquetaCountAggregateInputType = {
    id?: true
    nombre?: true
    _all?: true
  }

  export type EtiquetaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Etiqueta to aggregate.
     */
    where?: EtiquetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Etiquetas to fetch.
     */
    orderBy?: EtiquetaOrderByWithRelationInput | EtiquetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EtiquetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Etiquetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Etiquetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Etiquetas
    **/
    _count?: true | EtiquetaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EtiquetaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EtiquetaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EtiquetaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EtiquetaMaxAggregateInputType
  }

  export type GetEtiquetaAggregateType<T extends EtiquetaAggregateArgs> = {
        [P in keyof T & keyof AggregateEtiqueta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEtiqueta[P]>
      : GetScalarType<T[P], AggregateEtiqueta[P]>
  }




  export type EtiquetaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EtiquetaWhereInput
    orderBy?: EtiquetaOrderByWithAggregationInput | EtiquetaOrderByWithAggregationInput[]
    by: EtiquetaScalarFieldEnum[] | EtiquetaScalarFieldEnum
    having?: EtiquetaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EtiquetaCountAggregateInputType | true
    _avg?: EtiquetaAvgAggregateInputType
    _sum?: EtiquetaSumAggregateInputType
    _min?: EtiquetaMinAggregateInputType
    _max?: EtiquetaMaxAggregateInputType
  }

  export type EtiquetaGroupByOutputType = {
    id: number
    nombre: string
    _count: EtiquetaCountAggregateOutputType | null
    _avg: EtiquetaAvgAggregateOutputType | null
    _sum: EtiquetaSumAggregateOutputType | null
    _min: EtiquetaMinAggregateOutputType | null
    _max: EtiquetaMaxAggregateOutputType | null
  }

  type GetEtiquetaGroupByPayload<T extends EtiquetaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EtiquetaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EtiquetaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EtiquetaGroupByOutputType[P]>
            : GetScalarType<T[P], EtiquetaGroupByOutputType[P]>
        }
      >
    >


  export type EtiquetaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tareas?: boolean | Etiqueta$tareasArgs<ExtArgs>
    _count?: boolean | EtiquetaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["etiqueta"]>

  export type EtiquetaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["etiqueta"]>

  export type EtiquetaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["etiqueta"]>

  export type EtiquetaSelectScalar = {
    id?: boolean
    nombre?: boolean
  }

  export type EtiquetaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre", ExtArgs["result"]["etiqueta"]>
  export type EtiquetaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tareas?: boolean | Etiqueta$tareasArgs<ExtArgs>
    _count?: boolean | EtiquetaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EtiquetaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EtiquetaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EtiquetaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Etiqueta"
    objects: {
      tareas: Prisma.$TareasEtiquetasPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
    }, ExtArgs["result"]["etiqueta"]>
    composites: {}
  }

  type EtiquetaGetPayload<S extends boolean | null | undefined | EtiquetaDefaultArgs> = $Result.GetResult<Prisma.$EtiquetaPayload, S>

  type EtiquetaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EtiquetaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EtiquetaCountAggregateInputType | true
    }

  export interface EtiquetaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Etiqueta'], meta: { name: 'Etiqueta' } }
    /**
     * Find zero or one Etiqueta that matches the filter.
     * @param {EtiquetaFindUniqueArgs} args - Arguments to find a Etiqueta
     * @example
     * // Get one Etiqueta
     * const etiqueta = await prisma.etiqueta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EtiquetaFindUniqueArgs>(args: SelectSubset<T, EtiquetaFindUniqueArgs<ExtArgs>>): Prisma__EtiquetaClient<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Etiqueta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EtiquetaFindUniqueOrThrowArgs} args - Arguments to find a Etiqueta
     * @example
     * // Get one Etiqueta
     * const etiqueta = await prisma.etiqueta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EtiquetaFindUniqueOrThrowArgs>(args: SelectSubset<T, EtiquetaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EtiquetaClient<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Etiqueta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtiquetaFindFirstArgs} args - Arguments to find a Etiqueta
     * @example
     * // Get one Etiqueta
     * const etiqueta = await prisma.etiqueta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EtiquetaFindFirstArgs>(args?: SelectSubset<T, EtiquetaFindFirstArgs<ExtArgs>>): Prisma__EtiquetaClient<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Etiqueta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtiquetaFindFirstOrThrowArgs} args - Arguments to find a Etiqueta
     * @example
     * // Get one Etiqueta
     * const etiqueta = await prisma.etiqueta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EtiquetaFindFirstOrThrowArgs>(args?: SelectSubset<T, EtiquetaFindFirstOrThrowArgs<ExtArgs>>): Prisma__EtiquetaClient<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Etiquetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtiquetaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Etiquetas
     * const etiquetas = await prisma.etiqueta.findMany()
     * 
     * // Get first 10 Etiquetas
     * const etiquetas = await prisma.etiqueta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const etiquetaWithIdOnly = await prisma.etiqueta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EtiquetaFindManyArgs>(args?: SelectSubset<T, EtiquetaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Etiqueta.
     * @param {EtiquetaCreateArgs} args - Arguments to create a Etiqueta.
     * @example
     * // Create one Etiqueta
     * const Etiqueta = await prisma.etiqueta.create({
     *   data: {
     *     // ... data to create a Etiqueta
     *   }
     * })
     * 
     */
    create<T extends EtiquetaCreateArgs>(args: SelectSubset<T, EtiquetaCreateArgs<ExtArgs>>): Prisma__EtiquetaClient<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Etiquetas.
     * @param {EtiquetaCreateManyArgs} args - Arguments to create many Etiquetas.
     * @example
     * // Create many Etiquetas
     * const etiqueta = await prisma.etiqueta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EtiquetaCreateManyArgs>(args?: SelectSubset<T, EtiquetaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Etiquetas and returns the data saved in the database.
     * @param {EtiquetaCreateManyAndReturnArgs} args - Arguments to create many Etiquetas.
     * @example
     * // Create many Etiquetas
     * const etiqueta = await prisma.etiqueta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Etiquetas and only return the `id`
     * const etiquetaWithIdOnly = await prisma.etiqueta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EtiquetaCreateManyAndReturnArgs>(args?: SelectSubset<T, EtiquetaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Etiqueta.
     * @param {EtiquetaDeleteArgs} args - Arguments to delete one Etiqueta.
     * @example
     * // Delete one Etiqueta
     * const Etiqueta = await prisma.etiqueta.delete({
     *   where: {
     *     // ... filter to delete one Etiqueta
     *   }
     * })
     * 
     */
    delete<T extends EtiquetaDeleteArgs>(args: SelectSubset<T, EtiquetaDeleteArgs<ExtArgs>>): Prisma__EtiquetaClient<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Etiqueta.
     * @param {EtiquetaUpdateArgs} args - Arguments to update one Etiqueta.
     * @example
     * // Update one Etiqueta
     * const etiqueta = await prisma.etiqueta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EtiquetaUpdateArgs>(args: SelectSubset<T, EtiquetaUpdateArgs<ExtArgs>>): Prisma__EtiquetaClient<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Etiquetas.
     * @param {EtiquetaDeleteManyArgs} args - Arguments to filter Etiquetas to delete.
     * @example
     * // Delete a few Etiquetas
     * const { count } = await prisma.etiqueta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EtiquetaDeleteManyArgs>(args?: SelectSubset<T, EtiquetaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Etiquetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtiquetaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Etiquetas
     * const etiqueta = await prisma.etiqueta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EtiquetaUpdateManyArgs>(args: SelectSubset<T, EtiquetaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Etiquetas and returns the data updated in the database.
     * @param {EtiquetaUpdateManyAndReturnArgs} args - Arguments to update many Etiquetas.
     * @example
     * // Update many Etiquetas
     * const etiqueta = await prisma.etiqueta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Etiquetas and only return the `id`
     * const etiquetaWithIdOnly = await prisma.etiqueta.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EtiquetaUpdateManyAndReturnArgs>(args: SelectSubset<T, EtiquetaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Etiqueta.
     * @param {EtiquetaUpsertArgs} args - Arguments to update or create a Etiqueta.
     * @example
     * // Update or create a Etiqueta
     * const etiqueta = await prisma.etiqueta.upsert({
     *   create: {
     *     // ... data to create a Etiqueta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Etiqueta we want to update
     *   }
     * })
     */
    upsert<T extends EtiquetaUpsertArgs>(args: SelectSubset<T, EtiquetaUpsertArgs<ExtArgs>>): Prisma__EtiquetaClient<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Etiquetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtiquetaCountArgs} args - Arguments to filter Etiquetas to count.
     * @example
     * // Count the number of Etiquetas
     * const count = await prisma.etiqueta.count({
     *   where: {
     *     // ... the filter for the Etiquetas we want to count
     *   }
     * })
    **/
    count<T extends EtiquetaCountArgs>(
      args?: Subset<T, EtiquetaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EtiquetaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Etiqueta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtiquetaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EtiquetaAggregateArgs>(args: Subset<T, EtiquetaAggregateArgs>): Prisma.PrismaPromise<GetEtiquetaAggregateType<T>>

    /**
     * Group by Etiqueta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtiquetaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EtiquetaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EtiquetaGroupByArgs['orderBy'] }
        : { orderBy?: EtiquetaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EtiquetaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEtiquetaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Etiqueta model
   */
  readonly fields: EtiquetaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Etiqueta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EtiquetaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tareas<T extends Etiqueta$tareasArgs<ExtArgs> = {}>(args?: Subset<T, Etiqueta$tareasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Etiqueta model
   */
  interface EtiquetaFieldRefs {
    readonly id: FieldRef<"Etiqueta", 'Int'>
    readonly nombre: FieldRef<"Etiqueta", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Etiqueta findUnique
   */
  export type EtiquetaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtiquetaInclude<ExtArgs> | null
    /**
     * Filter, which Etiqueta to fetch.
     */
    where: EtiquetaWhereUniqueInput
  }

  /**
   * Etiqueta findUniqueOrThrow
   */
  export type EtiquetaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtiquetaInclude<ExtArgs> | null
    /**
     * Filter, which Etiqueta to fetch.
     */
    where: EtiquetaWhereUniqueInput
  }

  /**
   * Etiqueta findFirst
   */
  export type EtiquetaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtiquetaInclude<ExtArgs> | null
    /**
     * Filter, which Etiqueta to fetch.
     */
    where?: EtiquetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Etiquetas to fetch.
     */
    orderBy?: EtiquetaOrderByWithRelationInput | EtiquetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Etiquetas.
     */
    cursor?: EtiquetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Etiquetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Etiquetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Etiquetas.
     */
    distinct?: EtiquetaScalarFieldEnum | EtiquetaScalarFieldEnum[]
  }

  /**
   * Etiqueta findFirstOrThrow
   */
  export type EtiquetaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtiquetaInclude<ExtArgs> | null
    /**
     * Filter, which Etiqueta to fetch.
     */
    where?: EtiquetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Etiquetas to fetch.
     */
    orderBy?: EtiquetaOrderByWithRelationInput | EtiquetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Etiquetas.
     */
    cursor?: EtiquetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Etiquetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Etiquetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Etiquetas.
     */
    distinct?: EtiquetaScalarFieldEnum | EtiquetaScalarFieldEnum[]
  }

  /**
   * Etiqueta findMany
   */
  export type EtiquetaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtiquetaInclude<ExtArgs> | null
    /**
     * Filter, which Etiquetas to fetch.
     */
    where?: EtiquetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Etiquetas to fetch.
     */
    orderBy?: EtiquetaOrderByWithRelationInput | EtiquetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Etiquetas.
     */
    cursor?: EtiquetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Etiquetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Etiquetas.
     */
    skip?: number
    distinct?: EtiquetaScalarFieldEnum | EtiquetaScalarFieldEnum[]
  }

  /**
   * Etiqueta create
   */
  export type EtiquetaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtiquetaInclude<ExtArgs> | null
    /**
     * The data needed to create a Etiqueta.
     */
    data: XOR<EtiquetaCreateInput, EtiquetaUncheckedCreateInput>
  }

  /**
   * Etiqueta createMany
   */
  export type EtiquetaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Etiquetas.
     */
    data: EtiquetaCreateManyInput | EtiquetaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Etiqueta createManyAndReturn
   */
  export type EtiquetaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * The data used to create many Etiquetas.
     */
    data: EtiquetaCreateManyInput | EtiquetaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Etiqueta update
   */
  export type EtiquetaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtiquetaInclude<ExtArgs> | null
    /**
     * The data needed to update a Etiqueta.
     */
    data: XOR<EtiquetaUpdateInput, EtiquetaUncheckedUpdateInput>
    /**
     * Choose, which Etiqueta to update.
     */
    where: EtiquetaWhereUniqueInput
  }

  /**
   * Etiqueta updateMany
   */
  export type EtiquetaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Etiquetas.
     */
    data: XOR<EtiquetaUpdateManyMutationInput, EtiquetaUncheckedUpdateManyInput>
    /**
     * Filter which Etiquetas to update
     */
    where?: EtiquetaWhereInput
    /**
     * Limit how many Etiquetas to update.
     */
    limit?: number
  }

  /**
   * Etiqueta updateManyAndReturn
   */
  export type EtiquetaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * The data used to update Etiquetas.
     */
    data: XOR<EtiquetaUpdateManyMutationInput, EtiquetaUncheckedUpdateManyInput>
    /**
     * Filter which Etiquetas to update
     */
    where?: EtiquetaWhereInput
    /**
     * Limit how many Etiquetas to update.
     */
    limit?: number
  }

  /**
   * Etiqueta upsert
   */
  export type EtiquetaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtiquetaInclude<ExtArgs> | null
    /**
     * The filter to search for the Etiqueta to update in case it exists.
     */
    where: EtiquetaWhereUniqueInput
    /**
     * In case the Etiqueta found by the `where` argument doesn't exist, create a new Etiqueta with this data.
     */
    create: XOR<EtiquetaCreateInput, EtiquetaUncheckedCreateInput>
    /**
     * In case the Etiqueta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EtiquetaUpdateInput, EtiquetaUncheckedUpdateInput>
  }

  /**
   * Etiqueta delete
   */
  export type EtiquetaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtiquetaInclude<ExtArgs> | null
    /**
     * Filter which Etiqueta to delete.
     */
    where: EtiquetaWhereUniqueInput
  }

  /**
   * Etiqueta deleteMany
   */
  export type EtiquetaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Etiquetas to delete
     */
    where?: EtiquetaWhereInput
    /**
     * Limit how many Etiquetas to delete.
     */
    limit?: number
  }

  /**
   * Etiqueta.tareas
   */
  export type Etiqueta$tareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
    where?: TareasEtiquetasWhereInput
    orderBy?: TareasEtiquetasOrderByWithRelationInput | TareasEtiquetasOrderByWithRelationInput[]
    cursor?: TareasEtiquetasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TareasEtiquetasScalarFieldEnum | TareasEtiquetasScalarFieldEnum[]
  }

  /**
   * Etiqueta without action
   */
  export type EtiquetaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etiqueta
     */
    select?: EtiquetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etiqueta
     */
    omit?: EtiquetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtiquetaInclude<ExtArgs> | null
  }


  /**
   * Model TareasEtiquetas
   */

  export type AggregateTareasEtiquetas = {
    _count: TareasEtiquetasCountAggregateOutputType | null
    _avg: TareasEtiquetasAvgAggregateOutputType | null
    _sum: TareasEtiquetasSumAggregateOutputType | null
    _min: TareasEtiquetasMinAggregateOutputType | null
    _max: TareasEtiquetasMaxAggregateOutputType | null
  }

  export type TareasEtiquetasAvgAggregateOutputType = {
    etiquetaId: number | null
  }

  export type TareasEtiquetasSumAggregateOutputType = {
    etiquetaId: number | null
  }

  export type TareasEtiquetasMinAggregateOutputType = {
    tareaId: string | null
    etiquetaId: number | null
  }

  export type TareasEtiquetasMaxAggregateOutputType = {
    tareaId: string | null
    etiquetaId: number | null
  }

  export type TareasEtiquetasCountAggregateOutputType = {
    tareaId: number
    etiquetaId: number
    _all: number
  }


  export type TareasEtiquetasAvgAggregateInputType = {
    etiquetaId?: true
  }

  export type TareasEtiquetasSumAggregateInputType = {
    etiquetaId?: true
  }

  export type TareasEtiquetasMinAggregateInputType = {
    tareaId?: true
    etiquetaId?: true
  }

  export type TareasEtiquetasMaxAggregateInputType = {
    tareaId?: true
    etiquetaId?: true
  }

  export type TareasEtiquetasCountAggregateInputType = {
    tareaId?: true
    etiquetaId?: true
    _all?: true
  }

  export type TareasEtiquetasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TareasEtiquetas to aggregate.
     */
    where?: TareasEtiquetasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TareasEtiquetas to fetch.
     */
    orderBy?: TareasEtiquetasOrderByWithRelationInput | TareasEtiquetasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TareasEtiquetasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TareasEtiquetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TareasEtiquetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TareasEtiquetas
    **/
    _count?: true | TareasEtiquetasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TareasEtiquetasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TareasEtiquetasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TareasEtiquetasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TareasEtiquetasMaxAggregateInputType
  }

  export type GetTareasEtiquetasAggregateType<T extends TareasEtiquetasAggregateArgs> = {
        [P in keyof T & keyof AggregateTareasEtiquetas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTareasEtiquetas[P]>
      : GetScalarType<T[P], AggregateTareasEtiquetas[P]>
  }




  export type TareasEtiquetasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TareasEtiquetasWhereInput
    orderBy?: TareasEtiquetasOrderByWithAggregationInput | TareasEtiquetasOrderByWithAggregationInput[]
    by: TareasEtiquetasScalarFieldEnum[] | TareasEtiquetasScalarFieldEnum
    having?: TareasEtiquetasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TareasEtiquetasCountAggregateInputType | true
    _avg?: TareasEtiquetasAvgAggregateInputType
    _sum?: TareasEtiquetasSumAggregateInputType
    _min?: TareasEtiquetasMinAggregateInputType
    _max?: TareasEtiquetasMaxAggregateInputType
  }

  export type TareasEtiquetasGroupByOutputType = {
    tareaId: string
    etiquetaId: number
    _count: TareasEtiquetasCountAggregateOutputType | null
    _avg: TareasEtiquetasAvgAggregateOutputType | null
    _sum: TareasEtiquetasSumAggregateOutputType | null
    _min: TareasEtiquetasMinAggregateOutputType | null
    _max: TareasEtiquetasMaxAggregateOutputType | null
  }

  type GetTareasEtiquetasGroupByPayload<T extends TareasEtiquetasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TareasEtiquetasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TareasEtiquetasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TareasEtiquetasGroupByOutputType[P]>
            : GetScalarType<T[P], TareasEtiquetasGroupByOutputType[P]>
        }
      >
    >


  export type TareasEtiquetasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tareaId?: boolean
    etiquetaId?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    etiqueta?: boolean | EtiquetaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tareasEtiquetas"]>

  export type TareasEtiquetasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tareaId?: boolean
    etiquetaId?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    etiqueta?: boolean | EtiquetaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tareasEtiquetas"]>

  export type TareasEtiquetasSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tareaId?: boolean
    etiquetaId?: boolean
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    etiqueta?: boolean | EtiquetaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tareasEtiquetas"]>

  export type TareasEtiquetasSelectScalar = {
    tareaId?: boolean
    etiquetaId?: boolean
  }

  export type TareasEtiquetasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"tareaId" | "etiquetaId", ExtArgs["result"]["tareasEtiquetas"]>
  export type TareasEtiquetasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    etiqueta?: boolean | EtiquetaDefaultArgs<ExtArgs>
  }
  export type TareasEtiquetasIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    etiqueta?: boolean | EtiquetaDefaultArgs<ExtArgs>
  }
  export type TareasEtiquetasIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tarea?: boolean | TareaDefaultArgs<ExtArgs>
    etiqueta?: boolean | EtiquetaDefaultArgs<ExtArgs>
  }

  export type $TareasEtiquetasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TareasEtiquetas"
    objects: {
      tarea: Prisma.$TareaPayload<ExtArgs>
      etiqueta: Prisma.$EtiquetaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      tareaId: string
      etiquetaId: number
    }, ExtArgs["result"]["tareasEtiquetas"]>
    composites: {}
  }

  type TareasEtiquetasGetPayload<S extends boolean | null | undefined | TareasEtiquetasDefaultArgs> = $Result.GetResult<Prisma.$TareasEtiquetasPayload, S>

  type TareasEtiquetasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TareasEtiquetasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TareasEtiquetasCountAggregateInputType | true
    }

  export interface TareasEtiquetasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TareasEtiquetas'], meta: { name: 'TareasEtiquetas' } }
    /**
     * Find zero or one TareasEtiquetas that matches the filter.
     * @param {TareasEtiquetasFindUniqueArgs} args - Arguments to find a TareasEtiquetas
     * @example
     * // Get one TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TareasEtiquetasFindUniqueArgs>(args: SelectSubset<T, TareasEtiquetasFindUniqueArgs<ExtArgs>>): Prisma__TareasEtiquetasClient<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TareasEtiquetas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TareasEtiquetasFindUniqueOrThrowArgs} args - Arguments to find a TareasEtiquetas
     * @example
     * // Get one TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TareasEtiquetasFindUniqueOrThrowArgs>(args: SelectSubset<T, TareasEtiquetasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TareasEtiquetasClient<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TareasEtiquetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareasEtiquetasFindFirstArgs} args - Arguments to find a TareasEtiquetas
     * @example
     * // Get one TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TareasEtiquetasFindFirstArgs>(args?: SelectSubset<T, TareasEtiquetasFindFirstArgs<ExtArgs>>): Prisma__TareasEtiquetasClient<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TareasEtiquetas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareasEtiquetasFindFirstOrThrowArgs} args - Arguments to find a TareasEtiquetas
     * @example
     * // Get one TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TareasEtiquetasFindFirstOrThrowArgs>(args?: SelectSubset<T, TareasEtiquetasFindFirstOrThrowArgs<ExtArgs>>): Prisma__TareasEtiquetasClient<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TareasEtiquetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareasEtiquetasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.findMany()
     * 
     * // Get first 10 TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.findMany({ take: 10 })
     * 
     * // Only select the `tareaId`
     * const tareasEtiquetasWithTareaIdOnly = await prisma.tareasEtiquetas.findMany({ select: { tareaId: true } })
     * 
     */
    findMany<T extends TareasEtiquetasFindManyArgs>(args?: SelectSubset<T, TareasEtiquetasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TareasEtiquetas.
     * @param {TareasEtiquetasCreateArgs} args - Arguments to create a TareasEtiquetas.
     * @example
     * // Create one TareasEtiquetas
     * const TareasEtiquetas = await prisma.tareasEtiquetas.create({
     *   data: {
     *     // ... data to create a TareasEtiquetas
     *   }
     * })
     * 
     */
    create<T extends TareasEtiquetasCreateArgs>(args: SelectSubset<T, TareasEtiquetasCreateArgs<ExtArgs>>): Prisma__TareasEtiquetasClient<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TareasEtiquetas.
     * @param {TareasEtiquetasCreateManyArgs} args - Arguments to create many TareasEtiquetas.
     * @example
     * // Create many TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TareasEtiquetasCreateManyArgs>(args?: SelectSubset<T, TareasEtiquetasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TareasEtiquetas and returns the data saved in the database.
     * @param {TareasEtiquetasCreateManyAndReturnArgs} args - Arguments to create many TareasEtiquetas.
     * @example
     * // Create many TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TareasEtiquetas and only return the `tareaId`
     * const tareasEtiquetasWithTareaIdOnly = await prisma.tareasEtiquetas.createManyAndReturn({
     *   select: { tareaId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TareasEtiquetasCreateManyAndReturnArgs>(args?: SelectSubset<T, TareasEtiquetasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TareasEtiquetas.
     * @param {TareasEtiquetasDeleteArgs} args - Arguments to delete one TareasEtiquetas.
     * @example
     * // Delete one TareasEtiquetas
     * const TareasEtiquetas = await prisma.tareasEtiquetas.delete({
     *   where: {
     *     // ... filter to delete one TareasEtiquetas
     *   }
     * })
     * 
     */
    delete<T extends TareasEtiquetasDeleteArgs>(args: SelectSubset<T, TareasEtiquetasDeleteArgs<ExtArgs>>): Prisma__TareasEtiquetasClient<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TareasEtiquetas.
     * @param {TareasEtiquetasUpdateArgs} args - Arguments to update one TareasEtiquetas.
     * @example
     * // Update one TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TareasEtiquetasUpdateArgs>(args: SelectSubset<T, TareasEtiquetasUpdateArgs<ExtArgs>>): Prisma__TareasEtiquetasClient<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TareasEtiquetas.
     * @param {TareasEtiquetasDeleteManyArgs} args - Arguments to filter TareasEtiquetas to delete.
     * @example
     * // Delete a few TareasEtiquetas
     * const { count } = await prisma.tareasEtiquetas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TareasEtiquetasDeleteManyArgs>(args?: SelectSubset<T, TareasEtiquetasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TareasEtiquetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareasEtiquetasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TareasEtiquetasUpdateManyArgs>(args: SelectSubset<T, TareasEtiquetasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TareasEtiquetas and returns the data updated in the database.
     * @param {TareasEtiquetasUpdateManyAndReturnArgs} args - Arguments to update many TareasEtiquetas.
     * @example
     * // Update many TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TareasEtiquetas and only return the `tareaId`
     * const tareasEtiquetasWithTareaIdOnly = await prisma.tareasEtiquetas.updateManyAndReturn({
     *   select: { tareaId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TareasEtiquetasUpdateManyAndReturnArgs>(args: SelectSubset<T, TareasEtiquetasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TareasEtiquetas.
     * @param {TareasEtiquetasUpsertArgs} args - Arguments to update or create a TareasEtiquetas.
     * @example
     * // Update or create a TareasEtiquetas
     * const tareasEtiquetas = await prisma.tareasEtiquetas.upsert({
     *   create: {
     *     // ... data to create a TareasEtiquetas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TareasEtiquetas we want to update
     *   }
     * })
     */
    upsert<T extends TareasEtiquetasUpsertArgs>(args: SelectSubset<T, TareasEtiquetasUpsertArgs<ExtArgs>>): Prisma__TareasEtiquetasClient<$Result.GetResult<Prisma.$TareasEtiquetasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TareasEtiquetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareasEtiquetasCountArgs} args - Arguments to filter TareasEtiquetas to count.
     * @example
     * // Count the number of TareasEtiquetas
     * const count = await prisma.tareasEtiquetas.count({
     *   where: {
     *     // ... the filter for the TareasEtiquetas we want to count
     *   }
     * })
    **/
    count<T extends TareasEtiquetasCountArgs>(
      args?: Subset<T, TareasEtiquetasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TareasEtiquetasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TareasEtiquetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareasEtiquetasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TareasEtiquetasAggregateArgs>(args: Subset<T, TareasEtiquetasAggregateArgs>): Prisma.PrismaPromise<GetTareasEtiquetasAggregateType<T>>

    /**
     * Group by TareasEtiquetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareasEtiquetasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TareasEtiquetasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TareasEtiquetasGroupByArgs['orderBy'] }
        : { orderBy?: TareasEtiquetasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TareasEtiquetasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTareasEtiquetasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TareasEtiquetas model
   */
  readonly fields: TareasEtiquetasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TareasEtiquetas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TareasEtiquetasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tarea<T extends TareaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TareaDefaultArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    etiqueta<T extends EtiquetaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EtiquetaDefaultArgs<ExtArgs>>): Prisma__EtiquetaClient<$Result.GetResult<Prisma.$EtiquetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TareasEtiquetas model
   */
  interface TareasEtiquetasFieldRefs {
    readonly tareaId: FieldRef<"TareasEtiquetas", 'String'>
    readonly etiquetaId: FieldRef<"TareasEtiquetas", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TareasEtiquetas findUnique
   */
  export type TareasEtiquetasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
    /**
     * Filter, which TareasEtiquetas to fetch.
     */
    where: TareasEtiquetasWhereUniqueInput
  }

  /**
   * TareasEtiquetas findUniqueOrThrow
   */
  export type TareasEtiquetasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
    /**
     * Filter, which TareasEtiquetas to fetch.
     */
    where: TareasEtiquetasWhereUniqueInput
  }

  /**
   * TareasEtiquetas findFirst
   */
  export type TareasEtiquetasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
    /**
     * Filter, which TareasEtiquetas to fetch.
     */
    where?: TareasEtiquetasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TareasEtiquetas to fetch.
     */
    orderBy?: TareasEtiquetasOrderByWithRelationInput | TareasEtiquetasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TareasEtiquetas.
     */
    cursor?: TareasEtiquetasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TareasEtiquetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TareasEtiquetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TareasEtiquetas.
     */
    distinct?: TareasEtiquetasScalarFieldEnum | TareasEtiquetasScalarFieldEnum[]
  }

  /**
   * TareasEtiquetas findFirstOrThrow
   */
  export type TareasEtiquetasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
    /**
     * Filter, which TareasEtiquetas to fetch.
     */
    where?: TareasEtiquetasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TareasEtiquetas to fetch.
     */
    orderBy?: TareasEtiquetasOrderByWithRelationInput | TareasEtiquetasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TareasEtiquetas.
     */
    cursor?: TareasEtiquetasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TareasEtiquetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TareasEtiquetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TareasEtiquetas.
     */
    distinct?: TareasEtiquetasScalarFieldEnum | TareasEtiquetasScalarFieldEnum[]
  }

  /**
   * TareasEtiquetas findMany
   */
  export type TareasEtiquetasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
    /**
     * Filter, which TareasEtiquetas to fetch.
     */
    where?: TareasEtiquetasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TareasEtiquetas to fetch.
     */
    orderBy?: TareasEtiquetasOrderByWithRelationInput | TareasEtiquetasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TareasEtiquetas.
     */
    cursor?: TareasEtiquetasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TareasEtiquetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TareasEtiquetas.
     */
    skip?: number
    distinct?: TareasEtiquetasScalarFieldEnum | TareasEtiquetasScalarFieldEnum[]
  }

  /**
   * TareasEtiquetas create
   */
  export type TareasEtiquetasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
    /**
     * The data needed to create a TareasEtiquetas.
     */
    data: XOR<TareasEtiquetasCreateInput, TareasEtiquetasUncheckedCreateInput>
  }

  /**
   * TareasEtiquetas createMany
   */
  export type TareasEtiquetasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TareasEtiquetas.
     */
    data: TareasEtiquetasCreateManyInput | TareasEtiquetasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TareasEtiquetas createManyAndReturn
   */
  export type TareasEtiquetasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * The data used to create many TareasEtiquetas.
     */
    data: TareasEtiquetasCreateManyInput | TareasEtiquetasCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TareasEtiquetas update
   */
  export type TareasEtiquetasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
    /**
     * The data needed to update a TareasEtiquetas.
     */
    data: XOR<TareasEtiquetasUpdateInput, TareasEtiquetasUncheckedUpdateInput>
    /**
     * Choose, which TareasEtiquetas to update.
     */
    where: TareasEtiquetasWhereUniqueInput
  }

  /**
   * TareasEtiquetas updateMany
   */
  export type TareasEtiquetasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TareasEtiquetas.
     */
    data: XOR<TareasEtiquetasUpdateManyMutationInput, TareasEtiquetasUncheckedUpdateManyInput>
    /**
     * Filter which TareasEtiquetas to update
     */
    where?: TareasEtiquetasWhereInput
    /**
     * Limit how many TareasEtiquetas to update.
     */
    limit?: number
  }

  /**
   * TareasEtiquetas updateManyAndReturn
   */
  export type TareasEtiquetasUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * The data used to update TareasEtiquetas.
     */
    data: XOR<TareasEtiquetasUpdateManyMutationInput, TareasEtiquetasUncheckedUpdateManyInput>
    /**
     * Filter which TareasEtiquetas to update
     */
    where?: TareasEtiquetasWhereInput
    /**
     * Limit how many TareasEtiquetas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TareasEtiquetas upsert
   */
  export type TareasEtiquetasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
    /**
     * The filter to search for the TareasEtiquetas to update in case it exists.
     */
    where: TareasEtiquetasWhereUniqueInput
    /**
     * In case the TareasEtiquetas found by the `where` argument doesn't exist, create a new TareasEtiquetas with this data.
     */
    create: XOR<TareasEtiquetasCreateInput, TareasEtiquetasUncheckedCreateInput>
    /**
     * In case the TareasEtiquetas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TareasEtiquetasUpdateInput, TareasEtiquetasUncheckedUpdateInput>
  }

  /**
   * TareasEtiquetas delete
   */
  export type TareasEtiquetasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
    /**
     * Filter which TareasEtiquetas to delete.
     */
    where: TareasEtiquetasWhereUniqueInput
  }

  /**
   * TareasEtiquetas deleteMany
   */
  export type TareasEtiquetasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TareasEtiquetas to delete
     */
    where?: TareasEtiquetasWhereInput
    /**
     * Limit how many TareasEtiquetas to delete.
     */
    limit?: number
  }

  /**
   * TareasEtiquetas without action
   */
  export type TareasEtiquetasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareasEtiquetas
     */
    select?: TareasEtiquetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TareasEtiquetas
     */
    omit?: TareasEtiquetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareasEtiquetasInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    apellido: 'apellido',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const ProyectosScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    createdAt: 'createdAt',
    creadoPorId: 'creadoPorId'
  };

  export type ProyectosScalarFieldEnum = (typeof ProyectosScalarFieldEnum)[keyof typeof ProyectosScalarFieldEnum]


  export const TareaScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    fechaLimite: 'fechaLimite',
    posicion: 'posicion',
    createdAt: 'createdAt',
    proyectoId: 'proyectoId',
    estadoId: 'estadoId'
  };

  export type TareaScalarFieldEnum = (typeof TareaScalarFieldEnum)[keyof typeof TareaScalarFieldEnum]


  export const BloqueContenidoScalarFieldEnum: {
    id: 'id',
    tareaId: 'tareaId',
    tipo: 'tipo',
    contenido: 'contenido',
    posicion: 'posicion'
  };

  export type BloqueContenidoScalarFieldEnum = (typeof BloqueContenidoScalarFieldEnum)[keyof typeof BloqueContenidoScalarFieldEnum]


  export const RolesScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre'
  };

  export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum]


  export const MiembroScalarFieldEnum: {
    id: 'id',
    usuarioId: 'usuarioId',
    proyectoId: 'proyectoId',
    rolId: 'rolId'
  };

  export type MiembroScalarFieldEnum = (typeof MiembroScalarFieldEnum)[keyof typeof MiembroScalarFieldEnum]


  export const EstadoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    posicion: 'posicion',
    proyectoId: 'proyectoId'
  };

  export type EstadoScalarFieldEnum = (typeof EstadoScalarFieldEnum)[keyof typeof EstadoScalarFieldEnum]


  export const ResponsableScalarFieldEnum: {
    id: 'id',
    tareaId: 'tareaId',
    usuarioId: 'usuarioId'
  };

  export type ResponsableScalarFieldEnum = (typeof ResponsableScalarFieldEnum)[keyof typeof ResponsableScalarFieldEnum]


  export const ComentarioScalarFieldEnum: {
    id: 'id',
    contenido: 'contenido',
    createdAt: 'createdAt',
    tareaId: 'tareaId',
    usuarioId: 'usuarioId'
  };

  export type ComentarioScalarFieldEnum = (typeof ComentarioScalarFieldEnum)[keyof typeof ComentarioScalarFieldEnum]


  export const NotificacionScalarFieldEnum: {
    id: 'id',
    tipo: 'tipo',
    mensaje: 'mensaje',
    leida: 'leida',
    createdAt: 'createdAt',
    usuarioId: 'usuarioId',
    tareaId: 'tareaId'
  };

  export type NotificacionScalarFieldEnum = (typeof NotificacionScalarFieldEnum)[keyof typeof NotificacionScalarFieldEnum]


  export const EtiquetaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre'
  };

  export type EtiquetaScalarFieldEnum = (typeof EtiquetaScalarFieldEnum)[keyof typeof EtiquetaScalarFieldEnum]


  export const TareasEtiquetasScalarFieldEnum: {
    tareaId: 'tareaId',
    etiquetaId: 'etiquetaId'
  };

  export type TareasEtiquetasScalarFieldEnum = (typeof TareasEtiquetasScalarFieldEnum)[keyof typeof TareasEtiquetasScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TipoDeBloque'
   */
  export type EnumTipoDeBloqueFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoDeBloque'>
    


  /**
   * Reference to a field of type 'TipoDeBloque[]'
   */
  export type ListEnumTipoDeBloqueFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoDeBloque[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    apellido?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    proyectosCreados?: ProyectosListRelationFilter
    miembroDe?: MiembroListRelationFilter
    responsableDe?: ResponsableListRelationFilter
    comentarios?: ComentarioListRelationFilter
    notificaciones?: NotificacionListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    proyectosCreados?: ProyectosOrderByRelationAggregateInput
    miembroDe?: MiembroOrderByRelationAggregateInput
    responsableDe?: ResponsableOrderByRelationAggregateInput
    comentarios?: ComentarioOrderByRelationAggregateInput
    notificaciones?: NotificacionOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nombre?: StringFilter<"Usuario"> | string
    apellido?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    proyectosCreados?: ProyectosListRelationFilter
    miembroDe?: MiembroListRelationFilter
    responsableDe?: ResponsableListRelationFilter
    comentarios?: ComentarioListRelationFilter
    notificaciones?: NotificacionListRelationFilter
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    apellido?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    password?: StringWithAggregatesFilter<"Usuario"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type ProyectosWhereInput = {
    AND?: ProyectosWhereInput | ProyectosWhereInput[]
    OR?: ProyectosWhereInput[]
    NOT?: ProyectosWhereInput | ProyectosWhereInput[]
    id?: StringFilter<"Proyectos"> | string
    nombre?: StringFilter<"Proyectos"> | string
    descripcion?: StringNullableFilter<"Proyectos"> | string | null
    createdAt?: DateTimeFilter<"Proyectos"> | Date | string
    creadoPorId?: StringFilter<"Proyectos"> | string
    creadoPor?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    miembros?: MiembroListRelationFilter
    estados?: EstadoListRelationFilter
    tareas?: TareaListRelationFilter
  }

  export type ProyectosOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    creadoPorId?: SortOrder
    creadoPor?: UsuarioOrderByWithRelationInput
    miembros?: MiembroOrderByRelationAggregateInput
    estados?: EstadoOrderByRelationAggregateInput
    tareas?: TareaOrderByRelationAggregateInput
  }

  export type ProyectosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProyectosWhereInput | ProyectosWhereInput[]
    OR?: ProyectosWhereInput[]
    NOT?: ProyectosWhereInput | ProyectosWhereInput[]
    nombre?: StringFilter<"Proyectos"> | string
    descripcion?: StringNullableFilter<"Proyectos"> | string | null
    createdAt?: DateTimeFilter<"Proyectos"> | Date | string
    creadoPorId?: StringFilter<"Proyectos"> | string
    creadoPor?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    miembros?: MiembroListRelationFilter
    estados?: EstadoListRelationFilter
    tareas?: TareaListRelationFilter
  }, "id">

  export type ProyectosOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    creadoPorId?: SortOrder
    _count?: ProyectosCountOrderByAggregateInput
    _max?: ProyectosMaxOrderByAggregateInput
    _min?: ProyectosMinOrderByAggregateInput
  }

  export type ProyectosScalarWhereWithAggregatesInput = {
    AND?: ProyectosScalarWhereWithAggregatesInput | ProyectosScalarWhereWithAggregatesInput[]
    OR?: ProyectosScalarWhereWithAggregatesInput[]
    NOT?: ProyectosScalarWhereWithAggregatesInput | ProyectosScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Proyectos"> | string
    nombre?: StringWithAggregatesFilter<"Proyectos"> | string
    descripcion?: StringNullableWithAggregatesFilter<"Proyectos"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Proyectos"> | Date | string
    creadoPorId?: StringWithAggregatesFilter<"Proyectos"> | string
  }

  export type TareaWhereInput = {
    AND?: TareaWhereInput | TareaWhereInput[]
    OR?: TareaWhereInput[]
    NOT?: TareaWhereInput | TareaWhereInput[]
    id?: StringFilter<"Tarea"> | string
    titulo?: StringNullableFilter<"Tarea"> | string | null
    fechaLimite?: DateTimeNullableFilter<"Tarea"> | Date | string | null
    posicion?: IntFilter<"Tarea"> | number
    createdAt?: DateTimeFilter<"Tarea"> | Date | string
    proyectoId?: StringFilter<"Tarea"> | string
    estadoId?: IntFilter<"Tarea"> | number
    proyecto?: XOR<ProyectosScalarRelationFilter, ProyectosWhereInput>
    estado?: XOR<EstadoScalarRelationFilter, EstadoWhereInput>
    responsables?: ResponsableListRelationFilter
    comentarios?: ComentarioListRelationFilter
    notificaciones?: NotificacionListRelationFilter
    etiquetas?: TareasEtiquetasListRelationFilter
    BloqueContenido?: BloqueContenidoListRelationFilter
  }

  export type TareaOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrderInput | SortOrder
    fechaLimite?: SortOrderInput | SortOrder
    posicion?: SortOrder
    createdAt?: SortOrder
    proyectoId?: SortOrder
    estadoId?: SortOrder
    proyecto?: ProyectosOrderByWithRelationInput
    estado?: EstadoOrderByWithRelationInput
    responsables?: ResponsableOrderByRelationAggregateInput
    comentarios?: ComentarioOrderByRelationAggregateInput
    notificaciones?: NotificacionOrderByRelationAggregateInput
    etiquetas?: TareasEtiquetasOrderByRelationAggregateInput
    BloqueContenido?: BloqueContenidoOrderByRelationAggregateInput
  }

  export type TareaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TareaWhereInput | TareaWhereInput[]
    OR?: TareaWhereInput[]
    NOT?: TareaWhereInput | TareaWhereInput[]
    titulo?: StringNullableFilter<"Tarea"> | string | null
    fechaLimite?: DateTimeNullableFilter<"Tarea"> | Date | string | null
    posicion?: IntFilter<"Tarea"> | number
    createdAt?: DateTimeFilter<"Tarea"> | Date | string
    proyectoId?: StringFilter<"Tarea"> | string
    estadoId?: IntFilter<"Tarea"> | number
    proyecto?: XOR<ProyectosScalarRelationFilter, ProyectosWhereInput>
    estado?: XOR<EstadoScalarRelationFilter, EstadoWhereInput>
    responsables?: ResponsableListRelationFilter
    comentarios?: ComentarioListRelationFilter
    notificaciones?: NotificacionListRelationFilter
    etiquetas?: TareasEtiquetasListRelationFilter
    BloqueContenido?: BloqueContenidoListRelationFilter
  }, "id">

  export type TareaOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrderInput | SortOrder
    fechaLimite?: SortOrderInput | SortOrder
    posicion?: SortOrder
    createdAt?: SortOrder
    proyectoId?: SortOrder
    estadoId?: SortOrder
    _count?: TareaCountOrderByAggregateInput
    _avg?: TareaAvgOrderByAggregateInput
    _max?: TareaMaxOrderByAggregateInput
    _min?: TareaMinOrderByAggregateInput
    _sum?: TareaSumOrderByAggregateInput
  }

  export type TareaScalarWhereWithAggregatesInput = {
    AND?: TareaScalarWhereWithAggregatesInput | TareaScalarWhereWithAggregatesInput[]
    OR?: TareaScalarWhereWithAggregatesInput[]
    NOT?: TareaScalarWhereWithAggregatesInput | TareaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tarea"> | string
    titulo?: StringNullableWithAggregatesFilter<"Tarea"> | string | null
    fechaLimite?: DateTimeNullableWithAggregatesFilter<"Tarea"> | Date | string | null
    posicion?: IntWithAggregatesFilter<"Tarea"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Tarea"> | Date | string
    proyectoId?: StringWithAggregatesFilter<"Tarea"> | string
    estadoId?: IntWithAggregatesFilter<"Tarea"> | number
  }

  export type BloqueContenidoWhereInput = {
    AND?: BloqueContenidoWhereInput | BloqueContenidoWhereInput[]
    OR?: BloqueContenidoWhereInput[]
    NOT?: BloqueContenidoWhereInput | BloqueContenidoWhereInput[]
    id?: StringFilter<"BloqueContenido"> | string
    tareaId?: StringFilter<"BloqueContenido"> | string
    tipo?: EnumTipoDeBloqueFilter<"BloqueContenido"> | $Enums.TipoDeBloque
    contenido?: StringFilter<"BloqueContenido"> | string
    posicion?: IntFilter<"BloqueContenido"> | number
    tarea?: XOR<TareaScalarRelationFilter, TareaWhereInput>
  }

  export type BloqueContenidoOrderByWithRelationInput = {
    id?: SortOrder
    tareaId?: SortOrder
    tipo?: SortOrder
    contenido?: SortOrder
    posicion?: SortOrder
    tarea?: TareaOrderByWithRelationInput
  }

  export type BloqueContenidoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BloqueContenidoWhereInput | BloqueContenidoWhereInput[]
    OR?: BloqueContenidoWhereInput[]
    NOT?: BloqueContenidoWhereInput | BloqueContenidoWhereInput[]
    tareaId?: StringFilter<"BloqueContenido"> | string
    tipo?: EnumTipoDeBloqueFilter<"BloqueContenido"> | $Enums.TipoDeBloque
    contenido?: StringFilter<"BloqueContenido"> | string
    posicion?: IntFilter<"BloqueContenido"> | number
    tarea?: XOR<TareaScalarRelationFilter, TareaWhereInput>
  }, "id">

  export type BloqueContenidoOrderByWithAggregationInput = {
    id?: SortOrder
    tareaId?: SortOrder
    tipo?: SortOrder
    contenido?: SortOrder
    posicion?: SortOrder
    _count?: BloqueContenidoCountOrderByAggregateInput
    _avg?: BloqueContenidoAvgOrderByAggregateInput
    _max?: BloqueContenidoMaxOrderByAggregateInput
    _min?: BloqueContenidoMinOrderByAggregateInput
    _sum?: BloqueContenidoSumOrderByAggregateInput
  }

  export type BloqueContenidoScalarWhereWithAggregatesInput = {
    AND?: BloqueContenidoScalarWhereWithAggregatesInput | BloqueContenidoScalarWhereWithAggregatesInput[]
    OR?: BloqueContenidoScalarWhereWithAggregatesInput[]
    NOT?: BloqueContenidoScalarWhereWithAggregatesInput | BloqueContenidoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BloqueContenido"> | string
    tareaId?: StringWithAggregatesFilter<"BloqueContenido"> | string
    tipo?: EnumTipoDeBloqueWithAggregatesFilter<"BloqueContenido"> | $Enums.TipoDeBloque
    contenido?: StringWithAggregatesFilter<"BloqueContenido"> | string
    posicion?: IntWithAggregatesFilter<"BloqueContenido"> | number
  }

  export type RolesWhereInput = {
    AND?: RolesWhereInput | RolesWhereInput[]
    OR?: RolesWhereInput[]
    NOT?: RolesWhereInput | RolesWhereInput[]
    id?: IntFilter<"Roles"> | number
    nombre?: StringFilter<"Roles"> | string
    miembros?: MiembroListRelationFilter
  }

  export type RolesOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    miembros?: MiembroOrderByRelationAggregateInput
  }

  export type RolesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre?: string
    AND?: RolesWhereInput | RolesWhereInput[]
    OR?: RolesWhereInput[]
    NOT?: RolesWhereInput | RolesWhereInput[]
    miembros?: MiembroListRelationFilter
  }, "id" | "nombre">

  export type RolesOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    _count?: RolesCountOrderByAggregateInput
    _avg?: RolesAvgOrderByAggregateInput
    _max?: RolesMaxOrderByAggregateInput
    _min?: RolesMinOrderByAggregateInput
    _sum?: RolesSumOrderByAggregateInput
  }

  export type RolesScalarWhereWithAggregatesInput = {
    AND?: RolesScalarWhereWithAggregatesInput | RolesScalarWhereWithAggregatesInput[]
    OR?: RolesScalarWhereWithAggregatesInput[]
    NOT?: RolesScalarWhereWithAggregatesInput | RolesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Roles"> | number
    nombre?: StringWithAggregatesFilter<"Roles"> | string
  }

  export type MiembroWhereInput = {
    AND?: MiembroWhereInput | MiembroWhereInput[]
    OR?: MiembroWhereInput[]
    NOT?: MiembroWhereInput | MiembroWhereInput[]
    id?: IntFilter<"Miembro"> | number
    usuarioId?: StringFilter<"Miembro"> | string
    proyectoId?: StringFilter<"Miembro"> | string
    rolId?: IntFilter<"Miembro"> | number
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    proyecto?: XOR<ProyectosScalarRelationFilter, ProyectosWhereInput>
    rol?: XOR<RolesScalarRelationFilter, RolesWhereInput>
  }

  export type MiembroOrderByWithRelationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    proyectoId?: SortOrder
    rolId?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    proyecto?: ProyectosOrderByWithRelationInput
    rol?: RolesOrderByWithRelationInput
  }

  export type MiembroWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    usuarioId_proyectoId?: MiembroUsuarioIdProyectoIdCompoundUniqueInput
    AND?: MiembroWhereInput | MiembroWhereInput[]
    OR?: MiembroWhereInput[]
    NOT?: MiembroWhereInput | MiembroWhereInput[]
    usuarioId?: StringFilter<"Miembro"> | string
    proyectoId?: StringFilter<"Miembro"> | string
    rolId?: IntFilter<"Miembro"> | number
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    proyecto?: XOR<ProyectosScalarRelationFilter, ProyectosWhereInput>
    rol?: XOR<RolesScalarRelationFilter, RolesWhereInput>
  }, "id" | "usuarioId_proyectoId">

  export type MiembroOrderByWithAggregationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    proyectoId?: SortOrder
    rolId?: SortOrder
    _count?: MiembroCountOrderByAggregateInput
    _avg?: MiembroAvgOrderByAggregateInput
    _max?: MiembroMaxOrderByAggregateInput
    _min?: MiembroMinOrderByAggregateInput
    _sum?: MiembroSumOrderByAggregateInput
  }

  export type MiembroScalarWhereWithAggregatesInput = {
    AND?: MiembroScalarWhereWithAggregatesInput | MiembroScalarWhereWithAggregatesInput[]
    OR?: MiembroScalarWhereWithAggregatesInput[]
    NOT?: MiembroScalarWhereWithAggregatesInput | MiembroScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Miembro"> | number
    usuarioId?: StringWithAggregatesFilter<"Miembro"> | string
    proyectoId?: StringWithAggregatesFilter<"Miembro"> | string
    rolId?: IntWithAggregatesFilter<"Miembro"> | number
  }

  export type EstadoWhereInput = {
    AND?: EstadoWhereInput | EstadoWhereInput[]
    OR?: EstadoWhereInput[]
    NOT?: EstadoWhereInput | EstadoWhereInput[]
    id?: IntFilter<"Estado"> | number
    nombre?: StringFilter<"Estado"> | string
    posicion?: IntFilter<"Estado"> | number
    proyectoId?: StringFilter<"Estado"> | string
    proyecto?: XOR<ProyectosScalarRelationFilter, ProyectosWhereInput>
    tareas?: TareaListRelationFilter
  }

  export type EstadoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    posicion?: SortOrder
    proyectoId?: SortOrder
    proyecto?: ProyectosOrderByWithRelationInput
    tareas?: TareaOrderByRelationAggregateInput
  }

  export type EstadoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EstadoWhereInput | EstadoWhereInput[]
    OR?: EstadoWhereInput[]
    NOT?: EstadoWhereInput | EstadoWhereInput[]
    nombre?: StringFilter<"Estado"> | string
    posicion?: IntFilter<"Estado"> | number
    proyectoId?: StringFilter<"Estado"> | string
    proyecto?: XOR<ProyectosScalarRelationFilter, ProyectosWhereInput>
    tareas?: TareaListRelationFilter
  }, "id">

  export type EstadoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    posicion?: SortOrder
    proyectoId?: SortOrder
    _count?: EstadoCountOrderByAggregateInput
    _avg?: EstadoAvgOrderByAggregateInput
    _max?: EstadoMaxOrderByAggregateInput
    _min?: EstadoMinOrderByAggregateInput
    _sum?: EstadoSumOrderByAggregateInput
  }

  export type EstadoScalarWhereWithAggregatesInput = {
    AND?: EstadoScalarWhereWithAggregatesInput | EstadoScalarWhereWithAggregatesInput[]
    OR?: EstadoScalarWhereWithAggregatesInput[]
    NOT?: EstadoScalarWhereWithAggregatesInput | EstadoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Estado"> | number
    nombre?: StringWithAggregatesFilter<"Estado"> | string
    posicion?: IntWithAggregatesFilter<"Estado"> | number
    proyectoId?: StringWithAggregatesFilter<"Estado"> | string
  }

  export type ResponsableWhereInput = {
    AND?: ResponsableWhereInput | ResponsableWhereInput[]
    OR?: ResponsableWhereInput[]
    NOT?: ResponsableWhereInput | ResponsableWhereInput[]
    id?: IntFilter<"Responsable"> | number
    tareaId?: StringFilter<"Responsable"> | string
    usuarioId?: StringFilter<"Responsable"> | string
    tarea?: XOR<TareaScalarRelationFilter, TareaWhereInput>
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type ResponsableOrderByWithRelationInput = {
    id?: SortOrder
    tareaId?: SortOrder
    usuarioId?: SortOrder
    tarea?: TareaOrderByWithRelationInput
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type ResponsableWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    tareaId_usuarioId?: ResponsableTareaIdUsuarioIdCompoundUniqueInput
    AND?: ResponsableWhereInput | ResponsableWhereInput[]
    OR?: ResponsableWhereInput[]
    NOT?: ResponsableWhereInput | ResponsableWhereInput[]
    tareaId?: StringFilter<"Responsable"> | string
    usuarioId?: StringFilter<"Responsable"> | string
    tarea?: XOR<TareaScalarRelationFilter, TareaWhereInput>
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id" | "tareaId_usuarioId">

  export type ResponsableOrderByWithAggregationInput = {
    id?: SortOrder
    tareaId?: SortOrder
    usuarioId?: SortOrder
    _count?: ResponsableCountOrderByAggregateInput
    _avg?: ResponsableAvgOrderByAggregateInput
    _max?: ResponsableMaxOrderByAggregateInput
    _min?: ResponsableMinOrderByAggregateInput
    _sum?: ResponsableSumOrderByAggregateInput
  }

  export type ResponsableScalarWhereWithAggregatesInput = {
    AND?: ResponsableScalarWhereWithAggregatesInput | ResponsableScalarWhereWithAggregatesInput[]
    OR?: ResponsableScalarWhereWithAggregatesInput[]
    NOT?: ResponsableScalarWhereWithAggregatesInput | ResponsableScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Responsable"> | number
    tareaId?: StringWithAggregatesFilter<"Responsable"> | string
    usuarioId?: StringWithAggregatesFilter<"Responsable"> | string
  }

  export type ComentarioWhereInput = {
    AND?: ComentarioWhereInput | ComentarioWhereInput[]
    OR?: ComentarioWhereInput[]
    NOT?: ComentarioWhereInput | ComentarioWhereInput[]
    id?: IntFilter<"Comentario"> | number
    contenido?: StringFilter<"Comentario"> | string
    createdAt?: DateTimeFilter<"Comentario"> | Date | string
    tareaId?: StringFilter<"Comentario"> | string
    usuarioId?: StringFilter<"Comentario"> | string
    tarea?: XOR<TareaScalarRelationFilter, TareaWhereInput>
    autor?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type ComentarioOrderByWithRelationInput = {
    id?: SortOrder
    contenido?: SortOrder
    createdAt?: SortOrder
    tareaId?: SortOrder
    usuarioId?: SortOrder
    tarea?: TareaOrderByWithRelationInput
    autor?: UsuarioOrderByWithRelationInput
  }

  export type ComentarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ComentarioWhereInput | ComentarioWhereInput[]
    OR?: ComentarioWhereInput[]
    NOT?: ComentarioWhereInput | ComentarioWhereInput[]
    contenido?: StringFilter<"Comentario"> | string
    createdAt?: DateTimeFilter<"Comentario"> | Date | string
    tareaId?: StringFilter<"Comentario"> | string
    usuarioId?: StringFilter<"Comentario"> | string
    tarea?: XOR<TareaScalarRelationFilter, TareaWhereInput>
    autor?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type ComentarioOrderByWithAggregationInput = {
    id?: SortOrder
    contenido?: SortOrder
    createdAt?: SortOrder
    tareaId?: SortOrder
    usuarioId?: SortOrder
    _count?: ComentarioCountOrderByAggregateInput
    _avg?: ComentarioAvgOrderByAggregateInput
    _max?: ComentarioMaxOrderByAggregateInput
    _min?: ComentarioMinOrderByAggregateInput
    _sum?: ComentarioSumOrderByAggregateInput
  }

  export type ComentarioScalarWhereWithAggregatesInput = {
    AND?: ComentarioScalarWhereWithAggregatesInput | ComentarioScalarWhereWithAggregatesInput[]
    OR?: ComentarioScalarWhereWithAggregatesInput[]
    NOT?: ComentarioScalarWhereWithAggregatesInput | ComentarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Comentario"> | number
    contenido?: StringWithAggregatesFilter<"Comentario"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Comentario"> | Date | string
    tareaId?: StringWithAggregatesFilter<"Comentario"> | string
    usuarioId?: StringWithAggregatesFilter<"Comentario"> | string
  }

  export type NotificacionWhereInput = {
    AND?: NotificacionWhereInput | NotificacionWhereInput[]
    OR?: NotificacionWhereInput[]
    NOT?: NotificacionWhereInput | NotificacionWhereInput[]
    id?: IntFilter<"Notificacion"> | number
    tipo?: StringFilter<"Notificacion"> | string
    mensaje?: StringFilter<"Notificacion"> | string
    leida?: BoolFilter<"Notificacion"> | boolean
    createdAt?: DateTimeFilter<"Notificacion"> | Date | string
    usuarioId?: StringFilter<"Notificacion"> | string
    tareaId?: StringNullableFilter<"Notificacion"> | string | null
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    tarea?: XOR<TareaNullableScalarRelationFilter, TareaWhereInput> | null
  }

  export type NotificacionOrderByWithRelationInput = {
    id?: SortOrder
    tipo?: SortOrder
    mensaje?: SortOrder
    leida?: SortOrder
    createdAt?: SortOrder
    usuarioId?: SortOrder
    tareaId?: SortOrderInput | SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    tarea?: TareaOrderByWithRelationInput
  }

  export type NotificacionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificacionWhereInput | NotificacionWhereInput[]
    OR?: NotificacionWhereInput[]
    NOT?: NotificacionWhereInput | NotificacionWhereInput[]
    tipo?: StringFilter<"Notificacion"> | string
    mensaje?: StringFilter<"Notificacion"> | string
    leida?: BoolFilter<"Notificacion"> | boolean
    createdAt?: DateTimeFilter<"Notificacion"> | Date | string
    usuarioId?: StringFilter<"Notificacion"> | string
    tareaId?: StringNullableFilter<"Notificacion"> | string | null
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    tarea?: XOR<TareaNullableScalarRelationFilter, TareaWhereInput> | null
  }, "id">

  export type NotificacionOrderByWithAggregationInput = {
    id?: SortOrder
    tipo?: SortOrder
    mensaje?: SortOrder
    leida?: SortOrder
    createdAt?: SortOrder
    usuarioId?: SortOrder
    tareaId?: SortOrderInput | SortOrder
    _count?: NotificacionCountOrderByAggregateInput
    _avg?: NotificacionAvgOrderByAggregateInput
    _max?: NotificacionMaxOrderByAggregateInput
    _min?: NotificacionMinOrderByAggregateInput
    _sum?: NotificacionSumOrderByAggregateInput
  }

  export type NotificacionScalarWhereWithAggregatesInput = {
    AND?: NotificacionScalarWhereWithAggregatesInput | NotificacionScalarWhereWithAggregatesInput[]
    OR?: NotificacionScalarWhereWithAggregatesInput[]
    NOT?: NotificacionScalarWhereWithAggregatesInput | NotificacionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notificacion"> | number
    tipo?: StringWithAggregatesFilter<"Notificacion"> | string
    mensaje?: StringWithAggregatesFilter<"Notificacion"> | string
    leida?: BoolWithAggregatesFilter<"Notificacion"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notificacion"> | Date | string
    usuarioId?: StringWithAggregatesFilter<"Notificacion"> | string
    tareaId?: StringNullableWithAggregatesFilter<"Notificacion"> | string | null
  }

  export type EtiquetaWhereInput = {
    AND?: EtiquetaWhereInput | EtiquetaWhereInput[]
    OR?: EtiquetaWhereInput[]
    NOT?: EtiquetaWhereInput | EtiquetaWhereInput[]
    id?: IntFilter<"Etiqueta"> | number
    nombre?: StringFilter<"Etiqueta"> | string
    tareas?: TareasEtiquetasListRelationFilter
  }

  export type EtiquetaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    tareas?: TareasEtiquetasOrderByRelationAggregateInput
  }

  export type EtiquetaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre?: string
    AND?: EtiquetaWhereInput | EtiquetaWhereInput[]
    OR?: EtiquetaWhereInput[]
    NOT?: EtiquetaWhereInput | EtiquetaWhereInput[]
    tareas?: TareasEtiquetasListRelationFilter
  }, "id" | "nombre">

  export type EtiquetaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    _count?: EtiquetaCountOrderByAggregateInput
    _avg?: EtiquetaAvgOrderByAggregateInput
    _max?: EtiquetaMaxOrderByAggregateInput
    _min?: EtiquetaMinOrderByAggregateInput
    _sum?: EtiquetaSumOrderByAggregateInput
  }

  export type EtiquetaScalarWhereWithAggregatesInput = {
    AND?: EtiquetaScalarWhereWithAggregatesInput | EtiquetaScalarWhereWithAggregatesInput[]
    OR?: EtiquetaScalarWhereWithAggregatesInput[]
    NOT?: EtiquetaScalarWhereWithAggregatesInput | EtiquetaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Etiqueta"> | number
    nombre?: StringWithAggregatesFilter<"Etiqueta"> | string
  }

  export type TareasEtiquetasWhereInput = {
    AND?: TareasEtiquetasWhereInput | TareasEtiquetasWhereInput[]
    OR?: TareasEtiquetasWhereInput[]
    NOT?: TareasEtiquetasWhereInput | TareasEtiquetasWhereInput[]
    tareaId?: StringFilter<"TareasEtiquetas"> | string
    etiquetaId?: IntFilter<"TareasEtiquetas"> | number
    tarea?: XOR<TareaScalarRelationFilter, TareaWhereInput>
    etiqueta?: XOR<EtiquetaScalarRelationFilter, EtiquetaWhereInput>
  }

  export type TareasEtiquetasOrderByWithRelationInput = {
    tareaId?: SortOrder
    etiquetaId?: SortOrder
    tarea?: TareaOrderByWithRelationInput
    etiqueta?: EtiquetaOrderByWithRelationInput
  }

  export type TareasEtiquetasWhereUniqueInput = Prisma.AtLeast<{
    tareaId_etiquetaId?: TareasEtiquetasTareaIdEtiquetaIdCompoundUniqueInput
    AND?: TareasEtiquetasWhereInput | TareasEtiquetasWhereInput[]
    OR?: TareasEtiquetasWhereInput[]
    NOT?: TareasEtiquetasWhereInput | TareasEtiquetasWhereInput[]
    tareaId?: StringFilter<"TareasEtiquetas"> | string
    etiquetaId?: IntFilter<"TareasEtiquetas"> | number
    tarea?: XOR<TareaScalarRelationFilter, TareaWhereInput>
    etiqueta?: XOR<EtiquetaScalarRelationFilter, EtiquetaWhereInput>
  }, "tareaId_etiquetaId">

  export type TareasEtiquetasOrderByWithAggregationInput = {
    tareaId?: SortOrder
    etiquetaId?: SortOrder
    _count?: TareasEtiquetasCountOrderByAggregateInput
    _avg?: TareasEtiquetasAvgOrderByAggregateInput
    _max?: TareasEtiquetasMaxOrderByAggregateInput
    _min?: TareasEtiquetasMinOrderByAggregateInput
    _sum?: TareasEtiquetasSumOrderByAggregateInput
  }

  export type TareasEtiquetasScalarWhereWithAggregatesInput = {
    AND?: TareasEtiquetasScalarWhereWithAggregatesInput | TareasEtiquetasScalarWhereWithAggregatesInput[]
    OR?: TareasEtiquetasScalarWhereWithAggregatesInput[]
    NOT?: TareasEtiquetasScalarWhereWithAggregatesInput | TareasEtiquetasScalarWhereWithAggregatesInput[]
    tareaId?: StringWithAggregatesFilter<"TareasEtiquetas"> | string
    etiquetaId?: IntWithAggregatesFilter<"TareasEtiquetas"> | number
  }

  export type UsuarioCreateInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    proyectosCreados?: ProyectosCreateNestedManyWithoutCreadoPorInput
    miembroDe?: MiembroCreateNestedManyWithoutUsuarioInput
    responsableDe?: ResponsableCreateNestedManyWithoutUsuarioInput
    comentarios?: ComentarioCreateNestedManyWithoutAutorInput
    notificaciones?: NotificacionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    proyectosCreados?: ProyectosUncheckedCreateNestedManyWithoutCreadoPorInput
    miembroDe?: MiembroUncheckedCreateNestedManyWithoutUsuarioInput
    responsableDe?: ResponsableUncheckedCreateNestedManyWithoutUsuarioInput
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutAutorInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectosCreados?: ProyectosUpdateManyWithoutCreadoPorNestedInput
    miembroDe?: MiembroUpdateManyWithoutUsuarioNestedInput
    responsableDe?: ResponsableUpdateManyWithoutUsuarioNestedInput
    comentarios?: ComentarioUpdateManyWithoutAutorNestedInput
    notificaciones?: NotificacionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectosCreados?: ProyectosUncheckedUpdateManyWithoutCreadoPorNestedInput
    miembroDe?: MiembroUncheckedUpdateManyWithoutUsuarioNestedInput
    responsableDe?: ResponsableUncheckedUpdateManyWithoutUsuarioNestedInput
    comentarios?: ComentarioUncheckedUpdateManyWithoutAutorNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProyectosCreateInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    creadoPor: UsuarioCreateNestedOneWithoutProyectosCreadosInput
    miembros?: MiembroCreateNestedManyWithoutProyectoInput
    estados?: EstadoCreateNestedManyWithoutProyectoInput
    tareas?: TareaCreateNestedManyWithoutProyectoInput
  }

  export type ProyectosUncheckedCreateInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    creadoPorId: string
    miembros?: MiembroUncheckedCreateNestedManyWithoutProyectoInput
    estados?: EstadoUncheckedCreateNestedManyWithoutProyectoInput
    tareas?: TareaUncheckedCreateNestedManyWithoutProyectoInput
  }

  export type ProyectosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creadoPor?: UsuarioUpdateOneRequiredWithoutProyectosCreadosNestedInput
    miembros?: MiembroUpdateManyWithoutProyectoNestedInput
    estados?: EstadoUpdateManyWithoutProyectoNestedInput
    tareas?: TareaUpdateManyWithoutProyectoNestedInput
  }

  export type ProyectosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creadoPorId?: StringFieldUpdateOperationsInput | string
    miembros?: MiembroUncheckedUpdateManyWithoutProyectoNestedInput
    estados?: EstadoUncheckedUpdateManyWithoutProyectoNestedInput
    tareas?: TareaUncheckedUpdateManyWithoutProyectoNestedInput
  }

  export type ProyectosCreateManyInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    creadoPorId: string
  }

  export type ProyectosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProyectosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creadoPorId?: StringFieldUpdateOperationsInput | string
  }

  export type TareaCreateInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyecto: ProyectosCreateNestedOneWithoutTareasInput
    estado: EstadoCreateNestedOneWithoutTareasInput
    responsables?: ResponsableCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoCreateNestedManyWithoutTareaInput
  }

  export type TareaUncheckedCreateInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyectoId: string
    estadoId: number
    responsables?: ResponsableUncheckedCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasUncheckedCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoUncheckedCreateNestedManyWithoutTareaInput
  }

  export type TareaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyecto?: ProyectosUpdateOneRequiredWithoutTareasNestedInput
    estado?: EstadoUpdateOneRequiredWithoutTareasNestedInput
    responsables?: ResponsableUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUpdateManyWithoutTareaNestedInput
  }

  export type TareaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    estadoId?: IntFieldUpdateOperationsInput | number
    responsables?: ResponsableUncheckedUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUncheckedUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUncheckedUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUncheckedUpdateManyWithoutTareaNestedInput
  }

  export type TareaCreateManyInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyectoId: string
    estadoId: number
  }

  export type TareaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TareaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    estadoId?: IntFieldUpdateOperationsInput | number
  }

  export type BloqueContenidoCreateInput = {
    id?: string
    tipo: $Enums.TipoDeBloque
    contenido: string
    posicion: number
    tarea: TareaCreateNestedOneWithoutBloqueContenidoInput
  }

  export type BloqueContenidoUncheckedCreateInput = {
    id?: string
    tareaId: string
    tipo: $Enums.TipoDeBloque
    contenido: string
    posicion: number
  }

  export type BloqueContenidoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDeBloqueFieldUpdateOperationsInput | $Enums.TipoDeBloque
    contenido?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
    tarea?: TareaUpdateOneRequiredWithoutBloqueContenidoNestedInput
  }

  export type BloqueContenidoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tareaId?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDeBloqueFieldUpdateOperationsInput | $Enums.TipoDeBloque
    contenido?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
  }

  export type BloqueContenidoCreateManyInput = {
    id?: string
    tareaId: string
    tipo: $Enums.TipoDeBloque
    contenido: string
    posicion: number
  }

  export type BloqueContenidoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDeBloqueFieldUpdateOperationsInput | $Enums.TipoDeBloque
    contenido?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
  }

  export type BloqueContenidoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tareaId?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDeBloqueFieldUpdateOperationsInput | $Enums.TipoDeBloque
    contenido?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
  }

  export type RolesCreateInput = {
    nombre: string
    miembros?: MiembroCreateNestedManyWithoutRolInput
  }

  export type RolesUncheckedCreateInput = {
    id?: number
    nombre: string
    miembros?: MiembroUncheckedCreateNestedManyWithoutRolInput
  }

  export type RolesUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    miembros?: MiembroUpdateManyWithoutRolNestedInput
  }

  export type RolesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    miembros?: MiembroUncheckedUpdateManyWithoutRolNestedInput
  }

  export type RolesCreateManyInput = {
    id?: number
    nombre: string
  }

  export type RolesUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type RolesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type MiembroCreateInput = {
    usuario: UsuarioCreateNestedOneWithoutMiembroDeInput
    proyecto: ProyectosCreateNestedOneWithoutMiembrosInput
    rol: RolesCreateNestedOneWithoutMiembrosInput
  }

  export type MiembroUncheckedCreateInput = {
    id?: number
    usuarioId: string
    proyectoId: string
    rolId: number
  }

  export type MiembroUpdateInput = {
    usuario?: UsuarioUpdateOneRequiredWithoutMiembroDeNestedInput
    proyecto?: ProyectosUpdateOneRequiredWithoutMiembrosNestedInput
    rol?: RolesUpdateOneRequiredWithoutMiembrosNestedInput
  }

  export type MiembroUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    rolId?: IntFieldUpdateOperationsInput | number
  }

  export type MiembroCreateManyInput = {
    id?: number
    usuarioId: string
    proyectoId: string
    rolId: number
  }

  export type MiembroUpdateManyMutationInput = {

  }

  export type MiembroUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    rolId?: IntFieldUpdateOperationsInput | number
  }

  export type EstadoCreateInput = {
    nombre: string
    posicion: number
    proyecto: ProyectosCreateNestedOneWithoutEstadosInput
    tareas?: TareaCreateNestedManyWithoutEstadoInput
  }

  export type EstadoUncheckedCreateInput = {
    id?: number
    nombre: string
    posicion: number
    proyectoId: string
    tareas?: TareaUncheckedCreateNestedManyWithoutEstadoInput
  }

  export type EstadoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
    proyecto?: ProyectosUpdateOneRequiredWithoutEstadosNestedInput
    tareas?: TareaUpdateManyWithoutEstadoNestedInput
  }

  export type EstadoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
    proyectoId?: StringFieldUpdateOperationsInput | string
    tareas?: TareaUncheckedUpdateManyWithoutEstadoNestedInput
  }

  export type EstadoCreateManyInput = {
    id?: number
    nombre: string
    posicion: number
    proyectoId: string
  }

  export type EstadoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
  }

  export type EstadoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
    proyectoId?: StringFieldUpdateOperationsInput | string
  }

  export type ResponsableCreateInput = {
    tarea: TareaCreateNestedOneWithoutResponsablesInput
    usuario: UsuarioCreateNestedOneWithoutResponsableDeInput
  }

  export type ResponsableUncheckedCreateInput = {
    id?: number
    tareaId: string
    usuarioId: string
  }

  export type ResponsableUpdateInput = {
    tarea?: TareaUpdateOneRequiredWithoutResponsablesNestedInput
    usuario?: UsuarioUpdateOneRequiredWithoutResponsableDeNestedInput
  }

  export type ResponsableUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tareaId?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type ResponsableCreateManyInput = {
    id?: number
    tareaId: string
    usuarioId: string
  }

  export type ResponsableUpdateManyMutationInput = {

  }

  export type ResponsableUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tareaId?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type ComentarioCreateInput = {
    contenido: string
    createdAt?: Date | string
    tarea: TareaCreateNestedOneWithoutComentariosInput
    autor: UsuarioCreateNestedOneWithoutComentariosInput
  }

  export type ComentarioUncheckedCreateInput = {
    id?: number
    contenido: string
    createdAt?: Date | string
    tareaId: string
    usuarioId: string
  }

  export type ComentarioUpdateInput = {
    contenido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tarea?: TareaUpdateOneRequiredWithoutComentariosNestedInput
    autor?: UsuarioUpdateOneRequiredWithoutComentariosNestedInput
  }

  export type ComentarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    contenido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tareaId?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type ComentarioCreateManyInput = {
    id?: number
    contenido: string
    createdAt?: Date | string
    tareaId: string
    usuarioId: string
  }

  export type ComentarioUpdateManyMutationInput = {
    contenido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComentarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    contenido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tareaId?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificacionCreateInput = {
    tipo: string
    mensaje: string
    leida?: boolean
    createdAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutNotificacionesInput
    tarea?: TareaCreateNestedOneWithoutNotificacionesInput
  }

  export type NotificacionUncheckedCreateInput = {
    id?: number
    tipo: string
    mensaje: string
    leida?: boolean
    createdAt?: Date | string
    usuarioId: string
    tareaId?: string | null
  }

  export type NotificacionUpdateInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutNotificacionesNestedInput
    tarea?: TareaUpdateOneWithoutNotificacionesNestedInput
  }

  export type NotificacionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: StringFieldUpdateOperationsInput | string
    tareaId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NotificacionCreateManyInput = {
    id?: number
    tipo: string
    mensaje: string
    leida?: boolean
    createdAt?: Date | string
    usuarioId: string
    tareaId?: string | null
  }

  export type NotificacionUpdateManyMutationInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificacionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: StringFieldUpdateOperationsInput | string
    tareaId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EtiquetaCreateInput = {
    nombre: string
    tareas?: TareasEtiquetasCreateNestedManyWithoutEtiquetaInput
  }

  export type EtiquetaUncheckedCreateInput = {
    id?: number
    nombre: string
    tareas?: TareasEtiquetasUncheckedCreateNestedManyWithoutEtiquetaInput
  }

  export type EtiquetaUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    tareas?: TareasEtiquetasUpdateManyWithoutEtiquetaNestedInput
  }

  export type EtiquetaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    tareas?: TareasEtiquetasUncheckedUpdateManyWithoutEtiquetaNestedInput
  }

  export type EtiquetaCreateManyInput = {
    id?: number
    nombre: string
  }

  export type EtiquetaUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type EtiquetaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type TareasEtiquetasCreateInput = {
    tarea: TareaCreateNestedOneWithoutEtiquetasInput
    etiqueta: EtiquetaCreateNestedOneWithoutTareasInput
  }

  export type TareasEtiquetasUncheckedCreateInput = {
    tareaId: string
    etiquetaId: number
  }

  export type TareasEtiquetasUpdateInput = {
    tarea?: TareaUpdateOneRequiredWithoutEtiquetasNestedInput
    etiqueta?: EtiquetaUpdateOneRequiredWithoutTareasNestedInput
  }

  export type TareasEtiquetasUncheckedUpdateInput = {
    tareaId?: StringFieldUpdateOperationsInput | string
    etiquetaId?: IntFieldUpdateOperationsInput | number
  }

  export type TareasEtiquetasCreateManyInput = {
    tareaId: string
    etiquetaId: number
  }

  export type TareasEtiquetasUpdateManyMutationInput = {

  }

  export type TareasEtiquetasUncheckedUpdateManyInput = {
    tareaId?: StringFieldUpdateOperationsInput | string
    etiquetaId?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProyectosListRelationFilter = {
    every?: ProyectosWhereInput
    some?: ProyectosWhereInput
    none?: ProyectosWhereInput
  }

  export type MiembroListRelationFilter = {
    every?: MiembroWhereInput
    some?: MiembroWhereInput
    none?: MiembroWhereInput
  }

  export type ResponsableListRelationFilter = {
    every?: ResponsableWhereInput
    some?: ResponsableWhereInput
    none?: ResponsableWhereInput
  }

  export type ComentarioListRelationFilter = {
    every?: ComentarioWhereInput
    some?: ComentarioWhereInput
    none?: ComentarioWhereInput
  }

  export type NotificacionListRelationFilter = {
    every?: NotificacionWhereInput
    some?: NotificacionWhereInput
    none?: NotificacionWhereInput
  }

  export type ProyectosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MiembroOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResponsableOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComentarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificacionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type EstadoListRelationFilter = {
    every?: EstadoWhereInput
    some?: EstadoWhereInput
    none?: EstadoWhereInput
  }

  export type TareaListRelationFilter = {
    every?: TareaWhereInput
    some?: TareaWhereInput
    none?: TareaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EstadoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TareaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProyectosCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
    creadoPorId?: SortOrder
  }

  export type ProyectosMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
    creadoPorId?: SortOrder
  }

  export type ProyectosMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
    creadoPorId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProyectosScalarRelationFilter = {
    is?: ProyectosWhereInput
    isNot?: ProyectosWhereInput
  }

  export type EstadoScalarRelationFilter = {
    is?: EstadoWhereInput
    isNot?: EstadoWhereInput
  }

  export type TareasEtiquetasListRelationFilter = {
    every?: TareasEtiquetasWhereInput
    some?: TareasEtiquetasWhereInput
    none?: TareasEtiquetasWhereInput
  }

  export type BloqueContenidoListRelationFilter = {
    every?: BloqueContenidoWhereInput
    some?: BloqueContenidoWhereInput
    none?: BloqueContenidoWhereInput
  }

  export type TareasEtiquetasOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BloqueContenidoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TareaCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    fechaLimite?: SortOrder
    posicion?: SortOrder
    createdAt?: SortOrder
    proyectoId?: SortOrder
    estadoId?: SortOrder
  }

  export type TareaAvgOrderByAggregateInput = {
    posicion?: SortOrder
    estadoId?: SortOrder
  }

  export type TareaMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    fechaLimite?: SortOrder
    posicion?: SortOrder
    createdAt?: SortOrder
    proyectoId?: SortOrder
    estadoId?: SortOrder
  }

  export type TareaMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    fechaLimite?: SortOrder
    posicion?: SortOrder
    createdAt?: SortOrder
    proyectoId?: SortOrder
    estadoId?: SortOrder
  }

  export type TareaSumOrderByAggregateInput = {
    posicion?: SortOrder
    estadoId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTipoDeBloqueFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDeBloque | EnumTipoDeBloqueFieldRefInput<$PrismaModel>
    in?: $Enums.TipoDeBloque[] | ListEnumTipoDeBloqueFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoDeBloque[] | ListEnumTipoDeBloqueFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoDeBloqueFilter<$PrismaModel> | $Enums.TipoDeBloque
  }

  export type TareaScalarRelationFilter = {
    is?: TareaWhereInput
    isNot?: TareaWhereInput
  }

  export type BloqueContenidoCountOrderByAggregateInput = {
    id?: SortOrder
    tareaId?: SortOrder
    tipo?: SortOrder
    contenido?: SortOrder
    posicion?: SortOrder
  }

  export type BloqueContenidoAvgOrderByAggregateInput = {
    posicion?: SortOrder
  }

  export type BloqueContenidoMaxOrderByAggregateInput = {
    id?: SortOrder
    tareaId?: SortOrder
    tipo?: SortOrder
    contenido?: SortOrder
    posicion?: SortOrder
  }

  export type BloqueContenidoMinOrderByAggregateInput = {
    id?: SortOrder
    tareaId?: SortOrder
    tipo?: SortOrder
    contenido?: SortOrder
    posicion?: SortOrder
  }

  export type BloqueContenidoSumOrderByAggregateInput = {
    posicion?: SortOrder
  }

  export type EnumTipoDeBloqueWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDeBloque | EnumTipoDeBloqueFieldRefInput<$PrismaModel>
    in?: $Enums.TipoDeBloque[] | ListEnumTipoDeBloqueFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoDeBloque[] | ListEnumTipoDeBloqueFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoDeBloqueWithAggregatesFilter<$PrismaModel> | $Enums.TipoDeBloque
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoDeBloqueFilter<$PrismaModel>
    _max?: NestedEnumTipoDeBloqueFilter<$PrismaModel>
  }

  export type RolesCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type RolesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RolesMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type RolesMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type RolesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RolesScalarRelationFilter = {
    is?: RolesWhereInput
    isNot?: RolesWhereInput
  }

  export type MiembroUsuarioIdProyectoIdCompoundUniqueInput = {
    usuarioId: string
    proyectoId: string
  }

  export type MiembroCountOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    proyectoId?: SortOrder
    rolId?: SortOrder
  }

  export type MiembroAvgOrderByAggregateInput = {
    id?: SortOrder
    rolId?: SortOrder
  }

  export type MiembroMaxOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    proyectoId?: SortOrder
    rolId?: SortOrder
  }

  export type MiembroMinOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    proyectoId?: SortOrder
    rolId?: SortOrder
  }

  export type MiembroSumOrderByAggregateInput = {
    id?: SortOrder
    rolId?: SortOrder
  }

  export type EstadoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    posicion?: SortOrder
    proyectoId?: SortOrder
  }

  export type EstadoAvgOrderByAggregateInput = {
    id?: SortOrder
    posicion?: SortOrder
  }

  export type EstadoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    posicion?: SortOrder
    proyectoId?: SortOrder
  }

  export type EstadoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    posicion?: SortOrder
    proyectoId?: SortOrder
  }

  export type EstadoSumOrderByAggregateInput = {
    id?: SortOrder
    posicion?: SortOrder
  }

  export type ResponsableTareaIdUsuarioIdCompoundUniqueInput = {
    tareaId: string
    usuarioId: string
  }

  export type ResponsableCountOrderByAggregateInput = {
    id?: SortOrder
    tareaId?: SortOrder
    usuarioId?: SortOrder
  }

  export type ResponsableAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ResponsableMaxOrderByAggregateInput = {
    id?: SortOrder
    tareaId?: SortOrder
    usuarioId?: SortOrder
  }

  export type ResponsableMinOrderByAggregateInput = {
    id?: SortOrder
    tareaId?: SortOrder
    usuarioId?: SortOrder
  }

  export type ResponsableSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ComentarioCountOrderByAggregateInput = {
    id?: SortOrder
    contenido?: SortOrder
    createdAt?: SortOrder
    tareaId?: SortOrder
    usuarioId?: SortOrder
  }

  export type ComentarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ComentarioMaxOrderByAggregateInput = {
    id?: SortOrder
    contenido?: SortOrder
    createdAt?: SortOrder
    tareaId?: SortOrder
    usuarioId?: SortOrder
  }

  export type ComentarioMinOrderByAggregateInput = {
    id?: SortOrder
    contenido?: SortOrder
    createdAt?: SortOrder
    tareaId?: SortOrder
    usuarioId?: SortOrder
  }

  export type ComentarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TareaNullableScalarRelationFilter = {
    is?: TareaWhereInput | null
    isNot?: TareaWhereInput | null
  }

  export type NotificacionCountOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    mensaje?: SortOrder
    leida?: SortOrder
    createdAt?: SortOrder
    usuarioId?: SortOrder
    tareaId?: SortOrder
  }

  export type NotificacionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NotificacionMaxOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    mensaje?: SortOrder
    leida?: SortOrder
    createdAt?: SortOrder
    usuarioId?: SortOrder
    tareaId?: SortOrder
  }

  export type NotificacionMinOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    mensaje?: SortOrder
    leida?: SortOrder
    createdAt?: SortOrder
    usuarioId?: SortOrder
    tareaId?: SortOrder
  }

  export type NotificacionSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EtiquetaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type EtiquetaAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EtiquetaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type EtiquetaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type EtiquetaSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EtiquetaScalarRelationFilter = {
    is?: EtiquetaWhereInput
    isNot?: EtiquetaWhereInput
  }

  export type TareasEtiquetasTareaIdEtiquetaIdCompoundUniqueInput = {
    tareaId: string
    etiquetaId: number
  }

  export type TareasEtiquetasCountOrderByAggregateInput = {
    tareaId?: SortOrder
    etiquetaId?: SortOrder
  }

  export type TareasEtiquetasAvgOrderByAggregateInput = {
    etiquetaId?: SortOrder
  }

  export type TareasEtiquetasMaxOrderByAggregateInput = {
    tareaId?: SortOrder
    etiquetaId?: SortOrder
  }

  export type TareasEtiquetasMinOrderByAggregateInput = {
    tareaId?: SortOrder
    etiquetaId?: SortOrder
  }

  export type TareasEtiquetasSumOrderByAggregateInput = {
    etiquetaId?: SortOrder
  }

  export type ProyectosCreateNestedManyWithoutCreadoPorInput = {
    create?: XOR<ProyectosCreateWithoutCreadoPorInput, ProyectosUncheckedCreateWithoutCreadoPorInput> | ProyectosCreateWithoutCreadoPorInput[] | ProyectosUncheckedCreateWithoutCreadoPorInput[]
    connectOrCreate?: ProyectosCreateOrConnectWithoutCreadoPorInput | ProyectosCreateOrConnectWithoutCreadoPorInput[]
    createMany?: ProyectosCreateManyCreadoPorInputEnvelope
    connect?: ProyectosWhereUniqueInput | ProyectosWhereUniqueInput[]
  }

  export type MiembroCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<MiembroCreateWithoutUsuarioInput, MiembroUncheckedCreateWithoutUsuarioInput> | MiembroCreateWithoutUsuarioInput[] | MiembroUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutUsuarioInput | MiembroCreateOrConnectWithoutUsuarioInput[]
    createMany?: MiembroCreateManyUsuarioInputEnvelope
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
  }

  export type ResponsableCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<ResponsableCreateWithoutUsuarioInput, ResponsableUncheckedCreateWithoutUsuarioInput> | ResponsableCreateWithoutUsuarioInput[] | ResponsableUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ResponsableCreateOrConnectWithoutUsuarioInput | ResponsableCreateOrConnectWithoutUsuarioInput[]
    createMany?: ResponsableCreateManyUsuarioInputEnvelope
    connect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
  }

  export type ComentarioCreateNestedManyWithoutAutorInput = {
    create?: XOR<ComentarioCreateWithoutAutorInput, ComentarioUncheckedCreateWithoutAutorInput> | ComentarioCreateWithoutAutorInput[] | ComentarioUncheckedCreateWithoutAutorInput[]
    connectOrCreate?: ComentarioCreateOrConnectWithoutAutorInput | ComentarioCreateOrConnectWithoutAutorInput[]
    createMany?: ComentarioCreateManyAutorInputEnvelope
    connect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
  }

  export type NotificacionCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<NotificacionCreateWithoutUsuarioInput, NotificacionUncheckedCreateWithoutUsuarioInput> | NotificacionCreateWithoutUsuarioInput[] | NotificacionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutUsuarioInput | NotificacionCreateOrConnectWithoutUsuarioInput[]
    createMany?: NotificacionCreateManyUsuarioInputEnvelope
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
  }

  export type ProyectosUncheckedCreateNestedManyWithoutCreadoPorInput = {
    create?: XOR<ProyectosCreateWithoutCreadoPorInput, ProyectosUncheckedCreateWithoutCreadoPorInput> | ProyectosCreateWithoutCreadoPorInput[] | ProyectosUncheckedCreateWithoutCreadoPorInput[]
    connectOrCreate?: ProyectosCreateOrConnectWithoutCreadoPorInput | ProyectosCreateOrConnectWithoutCreadoPorInput[]
    createMany?: ProyectosCreateManyCreadoPorInputEnvelope
    connect?: ProyectosWhereUniqueInput | ProyectosWhereUniqueInput[]
  }

  export type MiembroUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<MiembroCreateWithoutUsuarioInput, MiembroUncheckedCreateWithoutUsuarioInput> | MiembroCreateWithoutUsuarioInput[] | MiembroUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutUsuarioInput | MiembroCreateOrConnectWithoutUsuarioInput[]
    createMany?: MiembroCreateManyUsuarioInputEnvelope
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
  }

  export type ResponsableUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<ResponsableCreateWithoutUsuarioInput, ResponsableUncheckedCreateWithoutUsuarioInput> | ResponsableCreateWithoutUsuarioInput[] | ResponsableUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ResponsableCreateOrConnectWithoutUsuarioInput | ResponsableCreateOrConnectWithoutUsuarioInput[]
    createMany?: ResponsableCreateManyUsuarioInputEnvelope
    connect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
  }

  export type ComentarioUncheckedCreateNestedManyWithoutAutorInput = {
    create?: XOR<ComentarioCreateWithoutAutorInput, ComentarioUncheckedCreateWithoutAutorInput> | ComentarioCreateWithoutAutorInput[] | ComentarioUncheckedCreateWithoutAutorInput[]
    connectOrCreate?: ComentarioCreateOrConnectWithoutAutorInput | ComentarioCreateOrConnectWithoutAutorInput[]
    createMany?: ComentarioCreateManyAutorInputEnvelope
    connect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
  }

  export type NotificacionUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<NotificacionCreateWithoutUsuarioInput, NotificacionUncheckedCreateWithoutUsuarioInput> | NotificacionCreateWithoutUsuarioInput[] | NotificacionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutUsuarioInput | NotificacionCreateOrConnectWithoutUsuarioInput[]
    createMany?: NotificacionCreateManyUsuarioInputEnvelope
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProyectosUpdateManyWithoutCreadoPorNestedInput = {
    create?: XOR<ProyectosCreateWithoutCreadoPorInput, ProyectosUncheckedCreateWithoutCreadoPorInput> | ProyectosCreateWithoutCreadoPorInput[] | ProyectosUncheckedCreateWithoutCreadoPorInput[]
    connectOrCreate?: ProyectosCreateOrConnectWithoutCreadoPorInput | ProyectosCreateOrConnectWithoutCreadoPorInput[]
    upsert?: ProyectosUpsertWithWhereUniqueWithoutCreadoPorInput | ProyectosUpsertWithWhereUniqueWithoutCreadoPorInput[]
    createMany?: ProyectosCreateManyCreadoPorInputEnvelope
    set?: ProyectosWhereUniqueInput | ProyectosWhereUniqueInput[]
    disconnect?: ProyectosWhereUniqueInput | ProyectosWhereUniqueInput[]
    delete?: ProyectosWhereUniqueInput | ProyectosWhereUniqueInput[]
    connect?: ProyectosWhereUniqueInput | ProyectosWhereUniqueInput[]
    update?: ProyectosUpdateWithWhereUniqueWithoutCreadoPorInput | ProyectosUpdateWithWhereUniqueWithoutCreadoPorInput[]
    updateMany?: ProyectosUpdateManyWithWhereWithoutCreadoPorInput | ProyectosUpdateManyWithWhereWithoutCreadoPorInput[]
    deleteMany?: ProyectosScalarWhereInput | ProyectosScalarWhereInput[]
  }

  export type MiembroUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<MiembroCreateWithoutUsuarioInput, MiembroUncheckedCreateWithoutUsuarioInput> | MiembroCreateWithoutUsuarioInput[] | MiembroUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutUsuarioInput | MiembroCreateOrConnectWithoutUsuarioInput[]
    upsert?: MiembroUpsertWithWhereUniqueWithoutUsuarioInput | MiembroUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: MiembroCreateManyUsuarioInputEnvelope
    set?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    disconnect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    delete?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    update?: MiembroUpdateWithWhereUniqueWithoutUsuarioInput | MiembroUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: MiembroUpdateManyWithWhereWithoutUsuarioInput | MiembroUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: MiembroScalarWhereInput | MiembroScalarWhereInput[]
  }

  export type ResponsableUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<ResponsableCreateWithoutUsuarioInput, ResponsableUncheckedCreateWithoutUsuarioInput> | ResponsableCreateWithoutUsuarioInput[] | ResponsableUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ResponsableCreateOrConnectWithoutUsuarioInput | ResponsableCreateOrConnectWithoutUsuarioInput[]
    upsert?: ResponsableUpsertWithWhereUniqueWithoutUsuarioInput | ResponsableUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: ResponsableCreateManyUsuarioInputEnvelope
    set?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    disconnect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    delete?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    connect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    update?: ResponsableUpdateWithWhereUniqueWithoutUsuarioInput | ResponsableUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: ResponsableUpdateManyWithWhereWithoutUsuarioInput | ResponsableUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: ResponsableScalarWhereInput | ResponsableScalarWhereInput[]
  }

  export type ComentarioUpdateManyWithoutAutorNestedInput = {
    create?: XOR<ComentarioCreateWithoutAutorInput, ComentarioUncheckedCreateWithoutAutorInput> | ComentarioCreateWithoutAutorInput[] | ComentarioUncheckedCreateWithoutAutorInput[]
    connectOrCreate?: ComentarioCreateOrConnectWithoutAutorInput | ComentarioCreateOrConnectWithoutAutorInput[]
    upsert?: ComentarioUpsertWithWhereUniqueWithoutAutorInput | ComentarioUpsertWithWhereUniqueWithoutAutorInput[]
    createMany?: ComentarioCreateManyAutorInputEnvelope
    set?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    disconnect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    delete?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    connect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    update?: ComentarioUpdateWithWhereUniqueWithoutAutorInput | ComentarioUpdateWithWhereUniqueWithoutAutorInput[]
    updateMany?: ComentarioUpdateManyWithWhereWithoutAutorInput | ComentarioUpdateManyWithWhereWithoutAutorInput[]
    deleteMany?: ComentarioScalarWhereInput | ComentarioScalarWhereInput[]
  }

  export type NotificacionUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<NotificacionCreateWithoutUsuarioInput, NotificacionUncheckedCreateWithoutUsuarioInput> | NotificacionCreateWithoutUsuarioInput[] | NotificacionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutUsuarioInput | NotificacionCreateOrConnectWithoutUsuarioInput[]
    upsert?: NotificacionUpsertWithWhereUniqueWithoutUsuarioInput | NotificacionUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: NotificacionCreateManyUsuarioInputEnvelope
    set?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    disconnect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    delete?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    update?: NotificacionUpdateWithWhereUniqueWithoutUsuarioInput | NotificacionUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: NotificacionUpdateManyWithWhereWithoutUsuarioInput | NotificacionUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: NotificacionScalarWhereInput | NotificacionScalarWhereInput[]
  }

  export type ProyectosUncheckedUpdateManyWithoutCreadoPorNestedInput = {
    create?: XOR<ProyectosCreateWithoutCreadoPorInput, ProyectosUncheckedCreateWithoutCreadoPorInput> | ProyectosCreateWithoutCreadoPorInput[] | ProyectosUncheckedCreateWithoutCreadoPorInput[]
    connectOrCreate?: ProyectosCreateOrConnectWithoutCreadoPorInput | ProyectosCreateOrConnectWithoutCreadoPorInput[]
    upsert?: ProyectosUpsertWithWhereUniqueWithoutCreadoPorInput | ProyectosUpsertWithWhereUniqueWithoutCreadoPorInput[]
    createMany?: ProyectosCreateManyCreadoPorInputEnvelope
    set?: ProyectosWhereUniqueInput | ProyectosWhereUniqueInput[]
    disconnect?: ProyectosWhereUniqueInput | ProyectosWhereUniqueInput[]
    delete?: ProyectosWhereUniqueInput | ProyectosWhereUniqueInput[]
    connect?: ProyectosWhereUniqueInput | ProyectosWhereUniqueInput[]
    update?: ProyectosUpdateWithWhereUniqueWithoutCreadoPorInput | ProyectosUpdateWithWhereUniqueWithoutCreadoPorInput[]
    updateMany?: ProyectosUpdateManyWithWhereWithoutCreadoPorInput | ProyectosUpdateManyWithWhereWithoutCreadoPorInput[]
    deleteMany?: ProyectosScalarWhereInput | ProyectosScalarWhereInput[]
  }

  export type MiembroUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<MiembroCreateWithoutUsuarioInput, MiembroUncheckedCreateWithoutUsuarioInput> | MiembroCreateWithoutUsuarioInput[] | MiembroUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutUsuarioInput | MiembroCreateOrConnectWithoutUsuarioInput[]
    upsert?: MiembroUpsertWithWhereUniqueWithoutUsuarioInput | MiembroUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: MiembroCreateManyUsuarioInputEnvelope
    set?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    disconnect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    delete?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    update?: MiembroUpdateWithWhereUniqueWithoutUsuarioInput | MiembroUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: MiembroUpdateManyWithWhereWithoutUsuarioInput | MiembroUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: MiembroScalarWhereInput | MiembroScalarWhereInput[]
  }

  export type ResponsableUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<ResponsableCreateWithoutUsuarioInput, ResponsableUncheckedCreateWithoutUsuarioInput> | ResponsableCreateWithoutUsuarioInput[] | ResponsableUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ResponsableCreateOrConnectWithoutUsuarioInput | ResponsableCreateOrConnectWithoutUsuarioInput[]
    upsert?: ResponsableUpsertWithWhereUniqueWithoutUsuarioInput | ResponsableUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: ResponsableCreateManyUsuarioInputEnvelope
    set?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    disconnect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    delete?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    connect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    update?: ResponsableUpdateWithWhereUniqueWithoutUsuarioInput | ResponsableUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: ResponsableUpdateManyWithWhereWithoutUsuarioInput | ResponsableUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: ResponsableScalarWhereInput | ResponsableScalarWhereInput[]
  }

  export type ComentarioUncheckedUpdateManyWithoutAutorNestedInput = {
    create?: XOR<ComentarioCreateWithoutAutorInput, ComentarioUncheckedCreateWithoutAutorInput> | ComentarioCreateWithoutAutorInput[] | ComentarioUncheckedCreateWithoutAutorInput[]
    connectOrCreate?: ComentarioCreateOrConnectWithoutAutorInput | ComentarioCreateOrConnectWithoutAutorInput[]
    upsert?: ComentarioUpsertWithWhereUniqueWithoutAutorInput | ComentarioUpsertWithWhereUniqueWithoutAutorInput[]
    createMany?: ComentarioCreateManyAutorInputEnvelope
    set?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    disconnect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    delete?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    connect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    update?: ComentarioUpdateWithWhereUniqueWithoutAutorInput | ComentarioUpdateWithWhereUniqueWithoutAutorInput[]
    updateMany?: ComentarioUpdateManyWithWhereWithoutAutorInput | ComentarioUpdateManyWithWhereWithoutAutorInput[]
    deleteMany?: ComentarioScalarWhereInput | ComentarioScalarWhereInput[]
  }

  export type NotificacionUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<NotificacionCreateWithoutUsuarioInput, NotificacionUncheckedCreateWithoutUsuarioInput> | NotificacionCreateWithoutUsuarioInput[] | NotificacionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutUsuarioInput | NotificacionCreateOrConnectWithoutUsuarioInput[]
    upsert?: NotificacionUpsertWithWhereUniqueWithoutUsuarioInput | NotificacionUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: NotificacionCreateManyUsuarioInputEnvelope
    set?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    disconnect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    delete?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    update?: NotificacionUpdateWithWhereUniqueWithoutUsuarioInput | NotificacionUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: NotificacionUpdateManyWithWhereWithoutUsuarioInput | NotificacionUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: NotificacionScalarWhereInput | NotificacionScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutProyectosCreadosInput = {
    create?: XOR<UsuarioCreateWithoutProyectosCreadosInput, UsuarioUncheckedCreateWithoutProyectosCreadosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutProyectosCreadosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type MiembroCreateNestedManyWithoutProyectoInput = {
    create?: XOR<MiembroCreateWithoutProyectoInput, MiembroUncheckedCreateWithoutProyectoInput> | MiembroCreateWithoutProyectoInput[] | MiembroUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutProyectoInput | MiembroCreateOrConnectWithoutProyectoInput[]
    createMany?: MiembroCreateManyProyectoInputEnvelope
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
  }

  export type EstadoCreateNestedManyWithoutProyectoInput = {
    create?: XOR<EstadoCreateWithoutProyectoInput, EstadoUncheckedCreateWithoutProyectoInput> | EstadoCreateWithoutProyectoInput[] | EstadoUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: EstadoCreateOrConnectWithoutProyectoInput | EstadoCreateOrConnectWithoutProyectoInput[]
    createMany?: EstadoCreateManyProyectoInputEnvelope
    connect?: EstadoWhereUniqueInput | EstadoWhereUniqueInput[]
  }

  export type TareaCreateNestedManyWithoutProyectoInput = {
    create?: XOR<TareaCreateWithoutProyectoInput, TareaUncheckedCreateWithoutProyectoInput> | TareaCreateWithoutProyectoInput[] | TareaUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutProyectoInput | TareaCreateOrConnectWithoutProyectoInput[]
    createMany?: TareaCreateManyProyectoInputEnvelope
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
  }

  export type MiembroUncheckedCreateNestedManyWithoutProyectoInput = {
    create?: XOR<MiembroCreateWithoutProyectoInput, MiembroUncheckedCreateWithoutProyectoInput> | MiembroCreateWithoutProyectoInput[] | MiembroUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutProyectoInput | MiembroCreateOrConnectWithoutProyectoInput[]
    createMany?: MiembroCreateManyProyectoInputEnvelope
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
  }

  export type EstadoUncheckedCreateNestedManyWithoutProyectoInput = {
    create?: XOR<EstadoCreateWithoutProyectoInput, EstadoUncheckedCreateWithoutProyectoInput> | EstadoCreateWithoutProyectoInput[] | EstadoUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: EstadoCreateOrConnectWithoutProyectoInput | EstadoCreateOrConnectWithoutProyectoInput[]
    createMany?: EstadoCreateManyProyectoInputEnvelope
    connect?: EstadoWhereUniqueInput | EstadoWhereUniqueInput[]
  }

  export type TareaUncheckedCreateNestedManyWithoutProyectoInput = {
    create?: XOR<TareaCreateWithoutProyectoInput, TareaUncheckedCreateWithoutProyectoInput> | TareaCreateWithoutProyectoInput[] | TareaUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutProyectoInput | TareaCreateOrConnectWithoutProyectoInput[]
    createMany?: TareaCreateManyProyectoInputEnvelope
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UsuarioUpdateOneRequiredWithoutProyectosCreadosNestedInput = {
    create?: XOR<UsuarioCreateWithoutProyectosCreadosInput, UsuarioUncheckedCreateWithoutProyectosCreadosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutProyectosCreadosInput
    upsert?: UsuarioUpsertWithoutProyectosCreadosInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutProyectosCreadosInput, UsuarioUpdateWithoutProyectosCreadosInput>, UsuarioUncheckedUpdateWithoutProyectosCreadosInput>
  }

  export type MiembroUpdateManyWithoutProyectoNestedInput = {
    create?: XOR<MiembroCreateWithoutProyectoInput, MiembroUncheckedCreateWithoutProyectoInput> | MiembroCreateWithoutProyectoInput[] | MiembroUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutProyectoInput | MiembroCreateOrConnectWithoutProyectoInput[]
    upsert?: MiembroUpsertWithWhereUniqueWithoutProyectoInput | MiembroUpsertWithWhereUniqueWithoutProyectoInput[]
    createMany?: MiembroCreateManyProyectoInputEnvelope
    set?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    disconnect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    delete?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    update?: MiembroUpdateWithWhereUniqueWithoutProyectoInput | MiembroUpdateWithWhereUniqueWithoutProyectoInput[]
    updateMany?: MiembroUpdateManyWithWhereWithoutProyectoInput | MiembroUpdateManyWithWhereWithoutProyectoInput[]
    deleteMany?: MiembroScalarWhereInput | MiembroScalarWhereInput[]
  }

  export type EstadoUpdateManyWithoutProyectoNestedInput = {
    create?: XOR<EstadoCreateWithoutProyectoInput, EstadoUncheckedCreateWithoutProyectoInput> | EstadoCreateWithoutProyectoInput[] | EstadoUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: EstadoCreateOrConnectWithoutProyectoInput | EstadoCreateOrConnectWithoutProyectoInput[]
    upsert?: EstadoUpsertWithWhereUniqueWithoutProyectoInput | EstadoUpsertWithWhereUniqueWithoutProyectoInput[]
    createMany?: EstadoCreateManyProyectoInputEnvelope
    set?: EstadoWhereUniqueInput | EstadoWhereUniqueInput[]
    disconnect?: EstadoWhereUniqueInput | EstadoWhereUniqueInput[]
    delete?: EstadoWhereUniqueInput | EstadoWhereUniqueInput[]
    connect?: EstadoWhereUniqueInput | EstadoWhereUniqueInput[]
    update?: EstadoUpdateWithWhereUniqueWithoutProyectoInput | EstadoUpdateWithWhereUniqueWithoutProyectoInput[]
    updateMany?: EstadoUpdateManyWithWhereWithoutProyectoInput | EstadoUpdateManyWithWhereWithoutProyectoInput[]
    deleteMany?: EstadoScalarWhereInput | EstadoScalarWhereInput[]
  }

  export type TareaUpdateManyWithoutProyectoNestedInput = {
    create?: XOR<TareaCreateWithoutProyectoInput, TareaUncheckedCreateWithoutProyectoInput> | TareaCreateWithoutProyectoInput[] | TareaUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutProyectoInput | TareaCreateOrConnectWithoutProyectoInput[]
    upsert?: TareaUpsertWithWhereUniqueWithoutProyectoInput | TareaUpsertWithWhereUniqueWithoutProyectoInput[]
    createMany?: TareaCreateManyProyectoInputEnvelope
    set?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    disconnect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    delete?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    update?: TareaUpdateWithWhereUniqueWithoutProyectoInput | TareaUpdateWithWhereUniqueWithoutProyectoInput[]
    updateMany?: TareaUpdateManyWithWhereWithoutProyectoInput | TareaUpdateManyWithWhereWithoutProyectoInput[]
    deleteMany?: TareaScalarWhereInput | TareaScalarWhereInput[]
  }

  export type MiembroUncheckedUpdateManyWithoutProyectoNestedInput = {
    create?: XOR<MiembroCreateWithoutProyectoInput, MiembroUncheckedCreateWithoutProyectoInput> | MiembroCreateWithoutProyectoInput[] | MiembroUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutProyectoInput | MiembroCreateOrConnectWithoutProyectoInput[]
    upsert?: MiembroUpsertWithWhereUniqueWithoutProyectoInput | MiembroUpsertWithWhereUniqueWithoutProyectoInput[]
    createMany?: MiembroCreateManyProyectoInputEnvelope
    set?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    disconnect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    delete?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    update?: MiembroUpdateWithWhereUniqueWithoutProyectoInput | MiembroUpdateWithWhereUniqueWithoutProyectoInput[]
    updateMany?: MiembroUpdateManyWithWhereWithoutProyectoInput | MiembroUpdateManyWithWhereWithoutProyectoInput[]
    deleteMany?: MiembroScalarWhereInput | MiembroScalarWhereInput[]
  }

  export type EstadoUncheckedUpdateManyWithoutProyectoNestedInput = {
    create?: XOR<EstadoCreateWithoutProyectoInput, EstadoUncheckedCreateWithoutProyectoInput> | EstadoCreateWithoutProyectoInput[] | EstadoUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: EstadoCreateOrConnectWithoutProyectoInput | EstadoCreateOrConnectWithoutProyectoInput[]
    upsert?: EstadoUpsertWithWhereUniqueWithoutProyectoInput | EstadoUpsertWithWhereUniqueWithoutProyectoInput[]
    createMany?: EstadoCreateManyProyectoInputEnvelope
    set?: EstadoWhereUniqueInput | EstadoWhereUniqueInput[]
    disconnect?: EstadoWhereUniqueInput | EstadoWhereUniqueInput[]
    delete?: EstadoWhereUniqueInput | EstadoWhereUniqueInput[]
    connect?: EstadoWhereUniqueInput | EstadoWhereUniqueInput[]
    update?: EstadoUpdateWithWhereUniqueWithoutProyectoInput | EstadoUpdateWithWhereUniqueWithoutProyectoInput[]
    updateMany?: EstadoUpdateManyWithWhereWithoutProyectoInput | EstadoUpdateManyWithWhereWithoutProyectoInput[]
    deleteMany?: EstadoScalarWhereInput | EstadoScalarWhereInput[]
  }

  export type TareaUncheckedUpdateManyWithoutProyectoNestedInput = {
    create?: XOR<TareaCreateWithoutProyectoInput, TareaUncheckedCreateWithoutProyectoInput> | TareaCreateWithoutProyectoInput[] | TareaUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutProyectoInput | TareaCreateOrConnectWithoutProyectoInput[]
    upsert?: TareaUpsertWithWhereUniqueWithoutProyectoInput | TareaUpsertWithWhereUniqueWithoutProyectoInput[]
    createMany?: TareaCreateManyProyectoInputEnvelope
    set?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    disconnect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    delete?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    update?: TareaUpdateWithWhereUniqueWithoutProyectoInput | TareaUpdateWithWhereUniqueWithoutProyectoInput[]
    updateMany?: TareaUpdateManyWithWhereWithoutProyectoInput | TareaUpdateManyWithWhereWithoutProyectoInput[]
    deleteMany?: TareaScalarWhereInput | TareaScalarWhereInput[]
  }

  export type ProyectosCreateNestedOneWithoutTareasInput = {
    create?: XOR<ProyectosCreateWithoutTareasInput, ProyectosUncheckedCreateWithoutTareasInput>
    connectOrCreate?: ProyectosCreateOrConnectWithoutTareasInput
    connect?: ProyectosWhereUniqueInput
  }

  export type EstadoCreateNestedOneWithoutTareasInput = {
    create?: XOR<EstadoCreateWithoutTareasInput, EstadoUncheckedCreateWithoutTareasInput>
    connectOrCreate?: EstadoCreateOrConnectWithoutTareasInput
    connect?: EstadoWhereUniqueInput
  }

  export type ResponsableCreateNestedManyWithoutTareaInput = {
    create?: XOR<ResponsableCreateWithoutTareaInput, ResponsableUncheckedCreateWithoutTareaInput> | ResponsableCreateWithoutTareaInput[] | ResponsableUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: ResponsableCreateOrConnectWithoutTareaInput | ResponsableCreateOrConnectWithoutTareaInput[]
    createMany?: ResponsableCreateManyTareaInputEnvelope
    connect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
  }

  export type ComentarioCreateNestedManyWithoutTareaInput = {
    create?: XOR<ComentarioCreateWithoutTareaInput, ComentarioUncheckedCreateWithoutTareaInput> | ComentarioCreateWithoutTareaInput[] | ComentarioUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: ComentarioCreateOrConnectWithoutTareaInput | ComentarioCreateOrConnectWithoutTareaInput[]
    createMany?: ComentarioCreateManyTareaInputEnvelope
    connect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
  }

  export type NotificacionCreateNestedManyWithoutTareaInput = {
    create?: XOR<NotificacionCreateWithoutTareaInput, NotificacionUncheckedCreateWithoutTareaInput> | NotificacionCreateWithoutTareaInput[] | NotificacionUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutTareaInput | NotificacionCreateOrConnectWithoutTareaInput[]
    createMany?: NotificacionCreateManyTareaInputEnvelope
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
  }

  export type TareasEtiquetasCreateNestedManyWithoutTareaInput = {
    create?: XOR<TareasEtiquetasCreateWithoutTareaInput, TareasEtiquetasUncheckedCreateWithoutTareaInput> | TareasEtiquetasCreateWithoutTareaInput[] | TareasEtiquetasUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: TareasEtiquetasCreateOrConnectWithoutTareaInput | TareasEtiquetasCreateOrConnectWithoutTareaInput[]
    createMany?: TareasEtiquetasCreateManyTareaInputEnvelope
    connect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
  }

  export type BloqueContenidoCreateNestedManyWithoutTareaInput = {
    create?: XOR<BloqueContenidoCreateWithoutTareaInput, BloqueContenidoUncheckedCreateWithoutTareaInput> | BloqueContenidoCreateWithoutTareaInput[] | BloqueContenidoUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: BloqueContenidoCreateOrConnectWithoutTareaInput | BloqueContenidoCreateOrConnectWithoutTareaInput[]
    createMany?: BloqueContenidoCreateManyTareaInputEnvelope
    connect?: BloqueContenidoWhereUniqueInput | BloqueContenidoWhereUniqueInput[]
  }

  export type ResponsableUncheckedCreateNestedManyWithoutTareaInput = {
    create?: XOR<ResponsableCreateWithoutTareaInput, ResponsableUncheckedCreateWithoutTareaInput> | ResponsableCreateWithoutTareaInput[] | ResponsableUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: ResponsableCreateOrConnectWithoutTareaInput | ResponsableCreateOrConnectWithoutTareaInput[]
    createMany?: ResponsableCreateManyTareaInputEnvelope
    connect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
  }

  export type ComentarioUncheckedCreateNestedManyWithoutTareaInput = {
    create?: XOR<ComentarioCreateWithoutTareaInput, ComentarioUncheckedCreateWithoutTareaInput> | ComentarioCreateWithoutTareaInput[] | ComentarioUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: ComentarioCreateOrConnectWithoutTareaInput | ComentarioCreateOrConnectWithoutTareaInput[]
    createMany?: ComentarioCreateManyTareaInputEnvelope
    connect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
  }

  export type NotificacionUncheckedCreateNestedManyWithoutTareaInput = {
    create?: XOR<NotificacionCreateWithoutTareaInput, NotificacionUncheckedCreateWithoutTareaInput> | NotificacionCreateWithoutTareaInput[] | NotificacionUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutTareaInput | NotificacionCreateOrConnectWithoutTareaInput[]
    createMany?: NotificacionCreateManyTareaInputEnvelope
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
  }

  export type TareasEtiquetasUncheckedCreateNestedManyWithoutTareaInput = {
    create?: XOR<TareasEtiquetasCreateWithoutTareaInput, TareasEtiquetasUncheckedCreateWithoutTareaInput> | TareasEtiquetasCreateWithoutTareaInput[] | TareasEtiquetasUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: TareasEtiquetasCreateOrConnectWithoutTareaInput | TareasEtiquetasCreateOrConnectWithoutTareaInput[]
    createMany?: TareasEtiquetasCreateManyTareaInputEnvelope
    connect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
  }

  export type BloqueContenidoUncheckedCreateNestedManyWithoutTareaInput = {
    create?: XOR<BloqueContenidoCreateWithoutTareaInput, BloqueContenidoUncheckedCreateWithoutTareaInput> | BloqueContenidoCreateWithoutTareaInput[] | BloqueContenidoUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: BloqueContenidoCreateOrConnectWithoutTareaInput | BloqueContenidoCreateOrConnectWithoutTareaInput[]
    createMany?: BloqueContenidoCreateManyTareaInputEnvelope
    connect?: BloqueContenidoWhereUniqueInput | BloqueContenidoWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProyectosUpdateOneRequiredWithoutTareasNestedInput = {
    create?: XOR<ProyectosCreateWithoutTareasInput, ProyectosUncheckedCreateWithoutTareasInput>
    connectOrCreate?: ProyectosCreateOrConnectWithoutTareasInput
    upsert?: ProyectosUpsertWithoutTareasInput
    connect?: ProyectosWhereUniqueInput
    update?: XOR<XOR<ProyectosUpdateToOneWithWhereWithoutTareasInput, ProyectosUpdateWithoutTareasInput>, ProyectosUncheckedUpdateWithoutTareasInput>
  }

  export type EstadoUpdateOneRequiredWithoutTareasNestedInput = {
    create?: XOR<EstadoCreateWithoutTareasInput, EstadoUncheckedCreateWithoutTareasInput>
    connectOrCreate?: EstadoCreateOrConnectWithoutTareasInput
    upsert?: EstadoUpsertWithoutTareasInput
    connect?: EstadoWhereUniqueInput
    update?: XOR<XOR<EstadoUpdateToOneWithWhereWithoutTareasInput, EstadoUpdateWithoutTareasInput>, EstadoUncheckedUpdateWithoutTareasInput>
  }

  export type ResponsableUpdateManyWithoutTareaNestedInput = {
    create?: XOR<ResponsableCreateWithoutTareaInput, ResponsableUncheckedCreateWithoutTareaInput> | ResponsableCreateWithoutTareaInput[] | ResponsableUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: ResponsableCreateOrConnectWithoutTareaInput | ResponsableCreateOrConnectWithoutTareaInput[]
    upsert?: ResponsableUpsertWithWhereUniqueWithoutTareaInput | ResponsableUpsertWithWhereUniqueWithoutTareaInput[]
    createMany?: ResponsableCreateManyTareaInputEnvelope
    set?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    disconnect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    delete?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    connect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    update?: ResponsableUpdateWithWhereUniqueWithoutTareaInput | ResponsableUpdateWithWhereUniqueWithoutTareaInput[]
    updateMany?: ResponsableUpdateManyWithWhereWithoutTareaInput | ResponsableUpdateManyWithWhereWithoutTareaInput[]
    deleteMany?: ResponsableScalarWhereInput | ResponsableScalarWhereInput[]
  }

  export type ComentarioUpdateManyWithoutTareaNestedInput = {
    create?: XOR<ComentarioCreateWithoutTareaInput, ComentarioUncheckedCreateWithoutTareaInput> | ComentarioCreateWithoutTareaInput[] | ComentarioUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: ComentarioCreateOrConnectWithoutTareaInput | ComentarioCreateOrConnectWithoutTareaInput[]
    upsert?: ComentarioUpsertWithWhereUniqueWithoutTareaInput | ComentarioUpsertWithWhereUniqueWithoutTareaInput[]
    createMany?: ComentarioCreateManyTareaInputEnvelope
    set?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    disconnect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    delete?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    connect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    update?: ComentarioUpdateWithWhereUniqueWithoutTareaInput | ComentarioUpdateWithWhereUniqueWithoutTareaInput[]
    updateMany?: ComentarioUpdateManyWithWhereWithoutTareaInput | ComentarioUpdateManyWithWhereWithoutTareaInput[]
    deleteMany?: ComentarioScalarWhereInput | ComentarioScalarWhereInput[]
  }

  export type NotificacionUpdateManyWithoutTareaNestedInput = {
    create?: XOR<NotificacionCreateWithoutTareaInput, NotificacionUncheckedCreateWithoutTareaInput> | NotificacionCreateWithoutTareaInput[] | NotificacionUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutTareaInput | NotificacionCreateOrConnectWithoutTareaInput[]
    upsert?: NotificacionUpsertWithWhereUniqueWithoutTareaInput | NotificacionUpsertWithWhereUniqueWithoutTareaInput[]
    createMany?: NotificacionCreateManyTareaInputEnvelope
    set?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    disconnect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    delete?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    update?: NotificacionUpdateWithWhereUniqueWithoutTareaInput | NotificacionUpdateWithWhereUniqueWithoutTareaInput[]
    updateMany?: NotificacionUpdateManyWithWhereWithoutTareaInput | NotificacionUpdateManyWithWhereWithoutTareaInput[]
    deleteMany?: NotificacionScalarWhereInput | NotificacionScalarWhereInput[]
  }

  export type TareasEtiquetasUpdateManyWithoutTareaNestedInput = {
    create?: XOR<TareasEtiquetasCreateWithoutTareaInput, TareasEtiquetasUncheckedCreateWithoutTareaInput> | TareasEtiquetasCreateWithoutTareaInput[] | TareasEtiquetasUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: TareasEtiquetasCreateOrConnectWithoutTareaInput | TareasEtiquetasCreateOrConnectWithoutTareaInput[]
    upsert?: TareasEtiquetasUpsertWithWhereUniqueWithoutTareaInput | TareasEtiquetasUpsertWithWhereUniqueWithoutTareaInput[]
    createMany?: TareasEtiquetasCreateManyTareaInputEnvelope
    set?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    disconnect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    delete?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    connect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    update?: TareasEtiquetasUpdateWithWhereUniqueWithoutTareaInput | TareasEtiquetasUpdateWithWhereUniqueWithoutTareaInput[]
    updateMany?: TareasEtiquetasUpdateManyWithWhereWithoutTareaInput | TareasEtiquetasUpdateManyWithWhereWithoutTareaInput[]
    deleteMany?: TareasEtiquetasScalarWhereInput | TareasEtiquetasScalarWhereInput[]
  }

  export type BloqueContenidoUpdateManyWithoutTareaNestedInput = {
    create?: XOR<BloqueContenidoCreateWithoutTareaInput, BloqueContenidoUncheckedCreateWithoutTareaInput> | BloqueContenidoCreateWithoutTareaInput[] | BloqueContenidoUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: BloqueContenidoCreateOrConnectWithoutTareaInput | BloqueContenidoCreateOrConnectWithoutTareaInput[]
    upsert?: BloqueContenidoUpsertWithWhereUniqueWithoutTareaInput | BloqueContenidoUpsertWithWhereUniqueWithoutTareaInput[]
    createMany?: BloqueContenidoCreateManyTareaInputEnvelope
    set?: BloqueContenidoWhereUniqueInput | BloqueContenidoWhereUniqueInput[]
    disconnect?: BloqueContenidoWhereUniqueInput | BloqueContenidoWhereUniqueInput[]
    delete?: BloqueContenidoWhereUniqueInput | BloqueContenidoWhereUniqueInput[]
    connect?: BloqueContenidoWhereUniqueInput | BloqueContenidoWhereUniqueInput[]
    update?: BloqueContenidoUpdateWithWhereUniqueWithoutTareaInput | BloqueContenidoUpdateWithWhereUniqueWithoutTareaInput[]
    updateMany?: BloqueContenidoUpdateManyWithWhereWithoutTareaInput | BloqueContenidoUpdateManyWithWhereWithoutTareaInput[]
    deleteMany?: BloqueContenidoScalarWhereInput | BloqueContenidoScalarWhereInput[]
  }

  export type ResponsableUncheckedUpdateManyWithoutTareaNestedInput = {
    create?: XOR<ResponsableCreateWithoutTareaInput, ResponsableUncheckedCreateWithoutTareaInput> | ResponsableCreateWithoutTareaInput[] | ResponsableUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: ResponsableCreateOrConnectWithoutTareaInput | ResponsableCreateOrConnectWithoutTareaInput[]
    upsert?: ResponsableUpsertWithWhereUniqueWithoutTareaInput | ResponsableUpsertWithWhereUniqueWithoutTareaInput[]
    createMany?: ResponsableCreateManyTareaInputEnvelope
    set?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    disconnect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    delete?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    connect?: ResponsableWhereUniqueInput | ResponsableWhereUniqueInput[]
    update?: ResponsableUpdateWithWhereUniqueWithoutTareaInput | ResponsableUpdateWithWhereUniqueWithoutTareaInput[]
    updateMany?: ResponsableUpdateManyWithWhereWithoutTareaInput | ResponsableUpdateManyWithWhereWithoutTareaInput[]
    deleteMany?: ResponsableScalarWhereInput | ResponsableScalarWhereInput[]
  }

  export type ComentarioUncheckedUpdateManyWithoutTareaNestedInput = {
    create?: XOR<ComentarioCreateWithoutTareaInput, ComentarioUncheckedCreateWithoutTareaInput> | ComentarioCreateWithoutTareaInput[] | ComentarioUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: ComentarioCreateOrConnectWithoutTareaInput | ComentarioCreateOrConnectWithoutTareaInput[]
    upsert?: ComentarioUpsertWithWhereUniqueWithoutTareaInput | ComentarioUpsertWithWhereUniqueWithoutTareaInput[]
    createMany?: ComentarioCreateManyTareaInputEnvelope
    set?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    disconnect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    delete?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    connect?: ComentarioWhereUniqueInput | ComentarioWhereUniqueInput[]
    update?: ComentarioUpdateWithWhereUniqueWithoutTareaInput | ComentarioUpdateWithWhereUniqueWithoutTareaInput[]
    updateMany?: ComentarioUpdateManyWithWhereWithoutTareaInput | ComentarioUpdateManyWithWhereWithoutTareaInput[]
    deleteMany?: ComentarioScalarWhereInput | ComentarioScalarWhereInput[]
  }

  export type NotificacionUncheckedUpdateManyWithoutTareaNestedInput = {
    create?: XOR<NotificacionCreateWithoutTareaInput, NotificacionUncheckedCreateWithoutTareaInput> | NotificacionCreateWithoutTareaInput[] | NotificacionUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutTareaInput | NotificacionCreateOrConnectWithoutTareaInput[]
    upsert?: NotificacionUpsertWithWhereUniqueWithoutTareaInput | NotificacionUpsertWithWhereUniqueWithoutTareaInput[]
    createMany?: NotificacionCreateManyTareaInputEnvelope
    set?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    disconnect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    delete?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    update?: NotificacionUpdateWithWhereUniqueWithoutTareaInput | NotificacionUpdateWithWhereUniqueWithoutTareaInput[]
    updateMany?: NotificacionUpdateManyWithWhereWithoutTareaInput | NotificacionUpdateManyWithWhereWithoutTareaInput[]
    deleteMany?: NotificacionScalarWhereInput | NotificacionScalarWhereInput[]
  }

  export type TareasEtiquetasUncheckedUpdateManyWithoutTareaNestedInput = {
    create?: XOR<TareasEtiquetasCreateWithoutTareaInput, TareasEtiquetasUncheckedCreateWithoutTareaInput> | TareasEtiquetasCreateWithoutTareaInput[] | TareasEtiquetasUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: TareasEtiquetasCreateOrConnectWithoutTareaInput | TareasEtiquetasCreateOrConnectWithoutTareaInput[]
    upsert?: TareasEtiquetasUpsertWithWhereUniqueWithoutTareaInput | TareasEtiquetasUpsertWithWhereUniqueWithoutTareaInput[]
    createMany?: TareasEtiquetasCreateManyTareaInputEnvelope
    set?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    disconnect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    delete?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    connect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    update?: TareasEtiquetasUpdateWithWhereUniqueWithoutTareaInput | TareasEtiquetasUpdateWithWhereUniqueWithoutTareaInput[]
    updateMany?: TareasEtiquetasUpdateManyWithWhereWithoutTareaInput | TareasEtiquetasUpdateManyWithWhereWithoutTareaInput[]
    deleteMany?: TareasEtiquetasScalarWhereInput | TareasEtiquetasScalarWhereInput[]
  }

  export type BloqueContenidoUncheckedUpdateManyWithoutTareaNestedInput = {
    create?: XOR<BloqueContenidoCreateWithoutTareaInput, BloqueContenidoUncheckedCreateWithoutTareaInput> | BloqueContenidoCreateWithoutTareaInput[] | BloqueContenidoUncheckedCreateWithoutTareaInput[]
    connectOrCreate?: BloqueContenidoCreateOrConnectWithoutTareaInput | BloqueContenidoCreateOrConnectWithoutTareaInput[]
    upsert?: BloqueContenidoUpsertWithWhereUniqueWithoutTareaInput | BloqueContenidoUpsertWithWhereUniqueWithoutTareaInput[]
    createMany?: BloqueContenidoCreateManyTareaInputEnvelope
    set?: BloqueContenidoWhereUniqueInput | BloqueContenidoWhereUniqueInput[]
    disconnect?: BloqueContenidoWhereUniqueInput | BloqueContenidoWhereUniqueInput[]
    delete?: BloqueContenidoWhereUniqueInput | BloqueContenidoWhereUniqueInput[]
    connect?: BloqueContenidoWhereUniqueInput | BloqueContenidoWhereUniqueInput[]
    update?: BloqueContenidoUpdateWithWhereUniqueWithoutTareaInput | BloqueContenidoUpdateWithWhereUniqueWithoutTareaInput[]
    updateMany?: BloqueContenidoUpdateManyWithWhereWithoutTareaInput | BloqueContenidoUpdateManyWithWhereWithoutTareaInput[]
    deleteMany?: BloqueContenidoScalarWhereInput | BloqueContenidoScalarWhereInput[]
  }

  export type TareaCreateNestedOneWithoutBloqueContenidoInput = {
    create?: XOR<TareaCreateWithoutBloqueContenidoInput, TareaUncheckedCreateWithoutBloqueContenidoInput>
    connectOrCreate?: TareaCreateOrConnectWithoutBloqueContenidoInput
    connect?: TareaWhereUniqueInput
  }

  export type EnumTipoDeBloqueFieldUpdateOperationsInput = {
    set?: $Enums.TipoDeBloque
  }

  export type TareaUpdateOneRequiredWithoutBloqueContenidoNestedInput = {
    create?: XOR<TareaCreateWithoutBloqueContenidoInput, TareaUncheckedCreateWithoutBloqueContenidoInput>
    connectOrCreate?: TareaCreateOrConnectWithoutBloqueContenidoInput
    upsert?: TareaUpsertWithoutBloqueContenidoInput
    connect?: TareaWhereUniqueInput
    update?: XOR<XOR<TareaUpdateToOneWithWhereWithoutBloqueContenidoInput, TareaUpdateWithoutBloqueContenidoInput>, TareaUncheckedUpdateWithoutBloqueContenidoInput>
  }

  export type MiembroCreateNestedManyWithoutRolInput = {
    create?: XOR<MiembroCreateWithoutRolInput, MiembroUncheckedCreateWithoutRolInput> | MiembroCreateWithoutRolInput[] | MiembroUncheckedCreateWithoutRolInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutRolInput | MiembroCreateOrConnectWithoutRolInput[]
    createMany?: MiembroCreateManyRolInputEnvelope
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
  }

  export type MiembroUncheckedCreateNestedManyWithoutRolInput = {
    create?: XOR<MiembroCreateWithoutRolInput, MiembroUncheckedCreateWithoutRolInput> | MiembroCreateWithoutRolInput[] | MiembroUncheckedCreateWithoutRolInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutRolInput | MiembroCreateOrConnectWithoutRolInput[]
    createMany?: MiembroCreateManyRolInputEnvelope
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
  }

  export type MiembroUpdateManyWithoutRolNestedInput = {
    create?: XOR<MiembroCreateWithoutRolInput, MiembroUncheckedCreateWithoutRolInput> | MiembroCreateWithoutRolInput[] | MiembroUncheckedCreateWithoutRolInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutRolInput | MiembroCreateOrConnectWithoutRolInput[]
    upsert?: MiembroUpsertWithWhereUniqueWithoutRolInput | MiembroUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: MiembroCreateManyRolInputEnvelope
    set?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    disconnect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    delete?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    update?: MiembroUpdateWithWhereUniqueWithoutRolInput | MiembroUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: MiembroUpdateManyWithWhereWithoutRolInput | MiembroUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: MiembroScalarWhereInput | MiembroScalarWhereInput[]
  }

  export type MiembroUncheckedUpdateManyWithoutRolNestedInput = {
    create?: XOR<MiembroCreateWithoutRolInput, MiembroUncheckedCreateWithoutRolInput> | MiembroCreateWithoutRolInput[] | MiembroUncheckedCreateWithoutRolInput[]
    connectOrCreate?: MiembroCreateOrConnectWithoutRolInput | MiembroCreateOrConnectWithoutRolInput[]
    upsert?: MiembroUpsertWithWhereUniqueWithoutRolInput | MiembroUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: MiembroCreateManyRolInputEnvelope
    set?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    disconnect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    delete?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    connect?: MiembroWhereUniqueInput | MiembroWhereUniqueInput[]
    update?: MiembroUpdateWithWhereUniqueWithoutRolInput | MiembroUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: MiembroUpdateManyWithWhereWithoutRolInput | MiembroUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: MiembroScalarWhereInput | MiembroScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutMiembroDeInput = {
    create?: XOR<UsuarioCreateWithoutMiembroDeInput, UsuarioUncheckedCreateWithoutMiembroDeInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutMiembroDeInput
    connect?: UsuarioWhereUniqueInput
  }

  export type ProyectosCreateNestedOneWithoutMiembrosInput = {
    create?: XOR<ProyectosCreateWithoutMiembrosInput, ProyectosUncheckedCreateWithoutMiembrosInput>
    connectOrCreate?: ProyectosCreateOrConnectWithoutMiembrosInput
    connect?: ProyectosWhereUniqueInput
  }

  export type RolesCreateNestedOneWithoutMiembrosInput = {
    create?: XOR<RolesCreateWithoutMiembrosInput, RolesUncheckedCreateWithoutMiembrosInput>
    connectOrCreate?: RolesCreateOrConnectWithoutMiembrosInput
    connect?: RolesWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutMiembroDeNestedInput = {
    create?: XOR<UsuarioCreateWithoutMiembroDeInput, UsuarioUncheckedCreateWithoutMiembroDeInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutMiembroDeInput
    upsert?: UsuarioUpsertWithoutMiembroDeInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutMiembroDeInput, UsuarioUpdateWithoutMiembroDeInput>, UsuarioUncheckedUpdateWithoutMiembroDeInput>
  }

  export type ProyectosUpdateOneRequiredWithoutMiembrosNestedInput = {
    create?: XOR<ProyectosCreateWithoutMiembrosInput, ProyectosUncheckedCreateWithoutMiembrosInput>
    connectOrCreate?: ProyectosCreateOrConnectWithoutMiembrosInput
    upsert?: ProyectosUpsertWithoutMiembrosInput
    connect?: ProyectosWhereUniqueInput
    update?: XOR<XOR<ProyectosUpdateToOneWithWhereWithoutMiembrosInput, ProyectosUpdateWithoutMiembrosInput>, ProyectosUncheckedUpdateWithoutMiembrosInput>
  }

  export type RolesUpdateOneRequiredWithoutMiembrosNestedInput = {
    create?: XOR<RolesCreateWithoutMiembrosInput, RolesUncheckedCreateWithoutMiembrosInput>
    connectOrCreate?: RolesCreateOrConnectWithoutMiembrosInput
    upsert?: RolesUpsertWithoutMiembrosInput
    connect?: RolesWhereUniqueInput
    update?: XOR<XOR<RolesUpdateToOneWithWhereWithoutMiembrosInput, RolesUpdateWithoutMiembrosInput>, RolesUncheckedUpdateWithoutMiembrosInput>
  }

  export type ProyectosCreateNestedOneWithoutEstadosInput = {
    create?: XOR<ProyectosCreateWithoutEstadosInput, ProyectosUncheckedCreateWithoutEstadosInput>
    connectOrCreate?: ProyectosCreateOrConnectWithoutEstadosInput
    connect?: ProyectosWhereUniqueInput
  }

  export type TareaCreateNestedManyWithoutEstadoInput = {
    create?: XOR<TareaCreateWithoutEstadoInput, TareaUncheckedCreateWithoutEstadoInput> | TareaCreateWithoutEstadoInput[] | TareaUncheckedCreateWithoutEstadoInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutEstadoInput | TareaCreateOrConnectWithoutEstadoInput[]
    createMany?: TareaCreateManyEstadoInputEnvelope
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
  }

  export type TareaUncheckedCreateNestedManyWithoutEstadoInput = {
    create?: XOR<TareaCreateWithoutEstadoInput, TareaUncheckedCreateWithoutEstadoInput> | TareaCreateWithoutEstadoInput[] | TareaUncheckedCreateWithoutEstadoInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutEstadoInput | TareaCreateOrConnectWithoutEstadoInput[]
    createMany?: TareaCreateManyEstadoInputEnvelope
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
  }

  export type ProyectosUpdateOneRequiredWithoutEstadosNestedInput = {
    create?: XOR<ProyectosCreateWithoutEstadosInput, ProyectosUncheckedCreateWithoutEstadosInput>
    connectOrCreate?: ProyectosCreateOrConnectWithoutEstadosInput
    upsert?: ProyectosUpsertWithoutEstadosInput
    connect?: ProyectosWhereUniqueInput
    update?: XOR<XOR<ProyectosUpdateToOneWithWhereWithoutEstadosInput, ProyectosUpdateWithoutEstadosInput>, ProyectosUncheckedUpdateWithoutEstadosInput>
  }

  export type TareaUpdateManyWithoutEstadoNestedInput = {
    create?: XOR<TareaCreateWithoutEstadoInput, TareaUncheckedCreateWithoutEstadoInput> | TareaCreateWithoutEstadoInput[] | TareaUncheckedCreateWithoutEstadoInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutEstadoInput | TareaCreateOrConnectWithoutEstadoInput[]
    upsert?: TareaUpsertWithWhereUniqueWithoutEstadoInput | TareaUpsertWithWhereUniqueWithoutEstadoInput[]
    createMany?: TareaCreateManyEstadoInputEnvelope
    set?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    disconnect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    delete?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    update?: TareaUpdateWithWhereUniqueWithoutEstadoInput | TareaUpdateWithWhereUniqueWithoutEstadoInput[]
    updateMany?: TareaUpdateManyWithWhereWithoutEstadoInput | TareaUpdateManyWithWhereWithoutEstadoInput[]
    deleteMany?: TareaScalarWhereInput | TareaScalarWhereInput[]
  }

  export type TareaUncheckedUpdateManyWithoutEstadoNestedInput = {
    create?: XOR<TareaCreateWithoutEstadoInput, TareaUncheckedCreateWithoutEstadoInput> | TareaCreateWithoutEstadoInput[] | TareaUncheckedCreateWithoutEstadoInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutEstadoInput | TareaCreateOrConnectWithoutEstadoInput[]
    upsert?: TareaUpsertWithWhereUniqueWithoutEstadoInput | TareaUpsertWithWhereUniqueWithoutEstadoInput[]
    createMany?: TareaCreateManyEstadoInputEnvelope
    set?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    disconnect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    delete?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    update?: TareaUpdateWithWhereUniqueWithoutEstadoInput | TareaUpdateWithWhereUniqueWithoutEstadoInput[]
    updateMany?: TareaUpdateManyWithWhereWithoutEstadoInput | TareaUpdateManyWithWhereWithoutEstadoInput[]
    deleteMany?: TareaScalarWhereInput | TareaScalarWhereInput[]
  }

  export type TareaCreateNestedOneWithoutResponsablesInput = {
    create?: XOR<TareaCreateWithoutResponsablesInput, TareaUncheckedCreateWithoutResponsablesInput>
    connectOrCreate?: TareaCreateOrConnectWithoutResponsablesInput
    connect?: TareaWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutResponsableDeInput = {
    create?: XOR<UsuarioCreateWithoutResponsableDeInput, UsuarioUncheckedCreateWithoutResponsableDeInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutResponsableDeInput
    connect?: UsuarioWhereUniqueInput
  }

  export type TareaUpdateOneRequiredWithoutResponsablesNestedInput = {
    create?: XOR<TareaCreateWithoutResponsablesInput, TareaUncheckedCreateWithoutResponsablesInput>
    connectOrCreate?: TareaCreateOrConnectWithoutResponsablesInput
    upsert?: TareaUpsertWithoutResponsablesInput
    connect?: TareaWhereUniqueInput
    update?: XOR<XOR<TareaUpdateToOneWithWhereWithoutResponsablesInput, TareaUpdateWithoutResponsablesInput>, TareaUncheckedUpdateWithoutResponsablesInput>
  }

  export type UsuarioUpdateOneRequiredWithoutResponsableDeNestedInput = {
    create?: XOR<UsuarioCreateWithoutResponsableDeInput, UsuarioUncheckedCreateWithoutResponsableDeInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutResponsableDeInput
    upsert?: UsuarioUpsertWithoutResponsableDeInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutResponsableDeInput, UsuarioUpdateWithoutResponsableDeInput>, UsuarioUncheckedUpdateWithoutResponsableDeInput>
  }

  export type TareaCreateNestedOneWithoutComentariosInput = {
    create?: XOR<TareaCreateWithoutComentariosInput, TareaUncheckedCreateWithoutComentariosInput>
    connectOrCreate?: TareaCreateOrConnectWithoutComentariosInput
    connect?: TareaWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutComentariosInput = {
    create?: XOR<UsuarioCreateWithoutComentariosInput, UsuarioUncheckedCreateWithoutComentariosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutComentariosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type TareaUpdateOneRequiredWithoutComentariosNestedInput = {
    create?: XOR<TareaCreateWithoutComentariosInput, TareaUncheckedCreateWithoutComentariosInput>
    connectOrCreate?: TareaCreateOrConnectWithoutComentariosInput
    upsert?: TareaUpsertWithoutComentariosInput
    connect?: TareaWhereUniqueInput
    update?: XOR<XOR<TareaUpdateToOneWithWhereWithoutComentariosInput, TareaUpdateWithoutComentariosInput>, TareaUncheckedUpdateWithoutComentariosInput>
  }

  export type UsuarioUpdateOneRequiredWithoutComentariosNestedInput = {
    create?: XOR<UsuarioCreateWithoutComentariosInput, UsuarioUncheckedCreateWithoutComentariosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutComentariosInput
    upsert?: UsuarioUpsertWithoutComentariosInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutComentariosInput, UsuarioUpdateWithoutComentariosInput>, UsuarioUncheckedUpdateWithoutComentariosInput>
  }

  export type UsuarioCreateNestedOneWithoutNotificacionesInput = {
    create?: XOR<UsuarioCreateWithoutNotificacionesInput, UsuarioUncheckedCreateWithoutNotificacionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutNotificacionesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type TareaCreateNestedOneWithoutNotificacionesInput = {
    create?: XOR<TareaCreateWithoutNotificacionesInput, TareaUncheckedCreateWithoutNotificacionesInput>
    connectOrCreate?: TareaCreateOrConnectWithoutNotificacionesInput
    connect?: TareaWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UsuarioUpdateOneRequiredWithoutNotificacionesNestedInput = {
    create?: XOR<UsuarioCreateWithoutNotificacionesInput, UsuarioUncheckedCreateWithoutNotificacionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutNotificacionesInput
    upsert?: UsuarioUpsertWithoutNotificacionesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutNotificacionesInput, UsuarioUpdateWithoutNotificacionesInput>, UsuarioUncheckedUpdateWithoutNotificacionesInput>
  }

  export type TareaUpdateOneWithoutNotificacionesNestedInput = {
    create?: XOR<TareaCreateWithoutNotificacionesInput, TareaUncheckedCreateWithoutNotificacionesInput>
    connectOrCreate?: TareaCreateOrConnectWithoutNotificacionesInput
    upsert?: TareaUpsertWithoutNotificacionesInput
    disconnect?: TareaWhereInput | boolean
    delete?: TareaWhereInput | boolean
    connect?: TareaWhereUniqueInput
    update?: XOR<XOR<TareaUpdateToOneWithWhereWithoutNotificacionesInput, TareaUpdateWithoutNotificacionesInput>, TareaUncheckedUpdateWithoutNotificacionesInput>
  }

  export type TareasEtiquetasCreateNestedManyWithoutEtiquetaInput = {
    create?: XOR<TareasEtiquetasCreateWithoutEtiquetaInput, TareasEtiquetasUncheckedCreateWithoutEtiquetaInput> | TareasEtiquetasCreateWithoutEtiquetaInput[] | TareasEtiquetasUncheckedCreateWithoutEtiquetaInput[]
    connectOrCreate?: TareasEtiquetasCreateOrConnectWithoutEtiquetaInput | TareasEtiquetasCreateOrConnectWithoutEtiquetaInput[]
    createMany?: TareasEtiquetasCreateManyEtiquetaInputEnvelope
    connect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
  }

  export type TareasEtiquetasUncheckedCreateNestedManyWithoutEtiquetaInput = {
    create?: XOR<TareasEtiquetasCreateWithoutEtiquetaInput, TareasEtiquetasUncheckedCreateWithoutEtiquetaInput> | TareasEtiquetasCreateWithoutEtiquetaInput[] | TareasEtiquetasUncheckedCreateWithoutEtiquetaInput[]
    connectOrCreate?: TareasEtiquetasCreateOrConnectWithoutEtiquetaInput | TareasEtiquetasCreateOrConnectWithoutEtiquetaInput[]
    createMany?: TareasEtiquetasCreateManyEtiquetaInputEnvelope
    connect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
  }

  export type TareasEtiquetasUpdateManyWithoutEtiquetaNestedInput = {
    create?: XOR<TareasEtiquetasCreateWithoutEtiquetaInput, TareasEtiquetasUncheckedCreateWithoutEtiquetaInput> | TareasEtiquetasCreateWithoutEtiquetaInput[] | TareasEtiquetasUncheckedCreateWithoutEtiquetaInput[]
    connectOrCreate?: TareasEtiquetasCreateOrConnectWithoutEtiquetaInput | TareasEtiquetasCreateOrConnectWithoutEtiquetaInput[]
    upsert?: TareasEtiquetasUpsertWithWhereUniqueWithoutEtiquetaInput | TareasEtiquetasUpsertWithWhereUniqueWithoutEtiquetaInput[]
    createMany?: TareasEtiquetasCreateManyEtiquetaInputEnvelope
    set?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    disconnect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    delete?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    connect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    update?: TareasEtiquetasUpdateWithWhereUniqueWithoutEtiquetaInput | TareasEtiquetasUpdateWithWhereUniqueWithoutEtiquetaInput[]
    updateMany?: TareasEtiquetasUpdateManyWithWhereWithoutEtiquetaInput | TareasEtiquetasUpdateManyWithWhereWithoutEtiquetaInput[]
    deleteMany?: TareasEtiquetasScalarWhereInput | TareasEtiquetasScalarWhereInput[]
  }

  export type TareasEtiquetasUncheckedUpdateManyWithoutEtiquetaNestedInput = {
    create?: XOR<TareasEtiquetasCreateWithoutEtiquetaInput, TareasEtiquetasUncheckedCreateWithoutEtiquetaInput> | TareasEtiquetasCreateWithoutEtiquetaInput[] | TareasEtiquetasUncheckedCreateWithoutEtiquetaInput[]
    connectOrCreate?: TareasEtiquetasCreateOrConnectWithoutEtiquetaInput | TareasEtiquetasCreateOrConnectWithoutEtiquetaInput[]
    upsert?: TareasEtiquetasUpsertWithWhereUniqueWithoutEtiquetaInput | TareasEtiquetasUpsertWithWhereUniqueWithoutEtiquetaInput[]
    createMany?: TareasEtiquetasCreateManyEtiquetaInputEnvelope
    set?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    disconnect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    delete?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    connect?: TareasEtiquetasWhereUniqueInput | TareasEtiquetasWhereUniqueInput[]
    update?: TareasEtiquetasUpdateWithWhereUniqueWithoutEtiquetaInput | TareasEtiquetasUpdateWithWhereUniqueWithoutEtiquetaInput[]
    updateMany?: TareasEtiquetasUpdateManyWithWhereWithoutEtiquetaInput | TareasEtiquetasUpdateManyWithWhereWithoutEtiquetaInput[]
    deleteMany?: TareasEtiquetasScalarWhereInput | TareasEtiquetasScalarWhereInput[]
  }

  export type TareaCreateNestedOneWithoutEtiquetasInput = {
    create?: XOR<TareaCreateWithoutEtiquetasInput, TareaUncheckedCreateWithoutEtiquetasInput>
    connectOrCreate?: TareaCreateOrConnectWithoutEtiquetasInput
    connect?: TareaWhereUniqueInput
  }

  export type EtiquetaCreateNestedOneWithoutTareasInput = {
    create?: XOR<EtiquetaCreateWithoutTareasInput, EtiquetaUncheckedCreateWithoutTareasInput>
    connectOrCreate?: EtiquetaCreateOrConnectWithoutTareasInput
    connect?: EtiquetaWhereUniqueInput
  }

  export type TareaUpdateOneRequiredWithoutEtiquetasNestedInput = {
    create?: XOR<TareaCreateWithoutEtiquetasInput, TareaUncheckedCreateWithoutEtiquetasInput>
    connectOrCreate?: TareaCreateOrConnectWithoutEtiquetasInput
    upsert?: TareaUpsertWithoutEtiquetasInput
    connect?: TareaWhereUniqueInput
    update?: XOR<XOR<TareaUpdateToOneWithWhereWithoutEtiquetasInput, TareaUpdateWithoutEtiquetasInput>, TareaUncheckedUpdateWithoutEtiquetasInput>
  }

  export type EtiquetaUpdateOneRequiredWithoutTareasNestedInput = {
    create?: XOR<EtiquetaCreateWithoutTareasInput, EtiquetaUncheckedCreateWithoutTareasInput>
    connectOrCreate?: EtiquetaCreateOrConnectWithoutTareasInput
    upsert?: EtiquetaUpsertWithoutTareasInput
    connect?: EtiquetaWhereUniqueInput
    update?: XOR<XOR<EtiquetaUpdateToOneWithWhereWithoutTareasInput, EtiquetaUpdateWithoutTareasInput>, EtiquetaUncheckedUpdateWithoutTareasInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTipoDeBloqueFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDeBloque | EnumTipoDeBloqueFieldRefInput<$PrismaModel>
    in?: $Enums.TipoDeBloque[] | ListEnumTipoDeBloqueFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoDeBloque[] | ListEnumTipoDeBloqueFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoDeBloqueFilter<$PrismaModel> | $Enums.TipoDeBloque
  }

  export type NestedEnumTipoDeBloqueWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDeBloque | EnumTipoDeBloqueFieldRefInput<$PrismaModel>
    in?: $Enums.TipoDeBloque[] | ListEnumTipoDeBloqueFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoDeBloque[] | ListEnumTipoDeBloqueFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoDeBloqueWithAggregatesFilter<$PrismaModel> | $Enums.TipoDeBloque
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoDeBloqueFilter<$PrismaModel>
    _max?: NestedEnumTipoDeBloqueFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProyectosCreateWithoutCreadoPorInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    miembros?: MiembroCreateNestedManyWithoutProyectoInput
    estados?: EstadoCreateNestedManyWithoutProyectoInput
    tareas?: TareaCreateNestedManyWithoutProyectoInput
  }

  export type ProyectosUncheckedCreateWithoutCreadoPorInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    miembros?: MiembroUncheckedCreateNestedManyWithoutProyectoInput
    estados?: EstadoUncheckedCreateNestedManyWithoutProyectoInput
    tareas?: TareaUncheckedCreateNestedManyWithoutProyectoInput
  }

  export type ProyectosCreateOrConnectWithoutCreadoPorInput = {
    where: ProyectosWhereUniqueInput
    create: XOR<ProyectosCreateWithoutCreadoPorInput, ProyectosUncheckedCreateWithoutCreadoPorInput>
  }

  export type ProyectosCreateManyCreadoPorInputEnvelope = {
    data: ProyectosCreateManyCreadoPorInput | ProyectosCreateManyCreadoPorInput[]
    skipDuplicates?: boolean
  }

  export type MiembroCreateWithoutUsuarioInput = {
    proyecto: ProyectosCreateNestedOneWithoutMiembrosInput
    rol: RolesCreateNestedOneWithoutMiembrosInput
  }

  export type MiembroUncheckedCreateWithoutUsuarioInput = {
    id?: number
    proyectoId: string
    rolId: number
  }

  export type MiembroCreateOrConnectWithoutUsuarioInput = {
    where: MiembroWhereUniqueInput
    create: XOR<MiembroCreateWithoutUsuarioInput, MiembroUncheckedCreateWithoutUsuarioInput>
  }

  export type MiembroCreateManyUsuarioInputEnvelope = {
    data: MiembroCreateManyUsuarioInput | MiembroCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type ResponsableCreateWithoutUsuarioInput = {
    tarea: TareaCreateNestedOneWithoutResponsablesInput
  }

  export type ResponsableUncheckedCreateWithoutUsuarioInput = {
    id?: number
    tareaId: string
  }

  export type ResponsableCreateOrConnectWithoutUsuarioInput = {
    where: ResponsableWhereUniqueInput
    create: XOR<ResponsableCreateWithoutUsuarioInput, ResponsableUncheckedCreateWithoutUsuarioInput>
  }

  export type ResponsableCreateManyUsuarioInputEnvelope = {
    data: ResponsableCreateManyUsuarioInput | ResponsableCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type ComentarioCreateWithoutAutorInput = {
    contenido: string
    createdAt?: Date | string
    tarea: TareaCreateNestedOneWithoutComentariosInput
  }

  export type ComentarioUncheckedCreateWithoutAutorInput = {
    id?: number
    contenido: string
    createdAt?: Date | string
    tareaId: string
  }

  export type ComentarioCreateOrConnectWithoutAutorInput = {
    where: ComentarioWhereUniqueInput
    create: XOR<ComentarioCreateWithoutAutorInput, ComentarioUncheckedCreateWithoutAutorInput>
  }

  export type ComentarioCreateManyAutorInputEnvelope = {
    data: ComentarioCreateManyAutorInput | ComentarioCreateManyAutorInput[]
    skipDuplicates?: boolean
  }

  export type NotificacionCreateWithoutUsuarioInput = {
    tipo: string
    mensaje: string
    leida?: boolean
    createdAt?: Date | string
    tarea?: TareaCreateNestedOneWithoutNotificacionesInput
  }

  export type NotificacionUncheckedCreateWithoutUsuarioInput = {
    id?: number
    tipo: string
    mensaje: string
    leida?: boolean
    createdAt?: Date | string
    tareaId?: string | null
  }

  export type NotificacionCreateOrConnectWithoutUsuarioInput = {
    where: NotificacionWhereUniqueInput
    create: XOR<NotificacionCreateWithoutUsuarioInput, NotificacionUncheckedCreateWithoutUsuarioInput>
  }

  export type NotificacionCreateManyUsuarioInputEnvelope = {
    data: NotificacionCreateManyUsuarioInput | NotificacionCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type ProyectosUpsertWithWhereUniqueWithoutCreadoPorInput = {
    where: ProyectosWhereUniqueInput
    update: XOR<ProyectosUpdateWithoutCreadoPorInput, ProyectosUncheckedUpdateWithoutCreadoPorInput>
    create: XOR<ProyectosCreateWithoutCreadoPorInput, ProyectosUncheckedCreateWithoutCreadoPorInput>
  }

  export type ProyectosUpdateWithWhereUniqueWithoutCreadoPorInput = {
    where: ProyectosWhereUniqueInput
    data: XOR<ProyectosUpdateWithoutCreadoPorInput, ProyectosUncheckedUpdateWithoutCreadoPorInput>
  }

  export type ProyectosUpdateManyWithWhereWithoutCreadoPorInput = {
    where: ProyectosScalarWhereInput
    data: XOR<ProyectosUpdateManyMutationInput, ProyectosUncheckedUpdateManyWithoutCreadoPorInput>
  }

  export type ProyectosScalarWhereInput = {
    AND?: ProyectosScalarWhereInput | ProyectosScalarWhereInput[]
    OR?: ProyectosScalarWhereInput[]
    NOT?: ProyectosScalarWhereInput | ProyectosScalarWhereInput[]
    id?: StringFilter<"Proyectos"> | string
    nombre?: StringFilter<"Proyectos"> | string
    descripcion?: StringNullableFilter<"Proyectos"> | string | null
    createdAt?: DateTimeFilter<"Proyectos"> | Date | string
    creadoPorId?: StringFilter<"Proyectos"> | string
  }

  export type MiembroUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: MiembroWhereUniqueInput
    update: XOR<MiembroUpdateWithoutUsuarioInput, MiembroUncheckedUpdateWithoutUsuarioInput>
    create: XOR<MiembroCreateWithoutUsuarioInput, MiembroUncheckedCreateWithoutUsuarioInput>
  }

  export type MiembroUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: MiembroWhereUniqueInput
    data: XOR<MiembroUpdateWithoutUsuarioInput, MiembroUncheckedUpdateWithoutUsuarioInput>
  }

  export type MiembroUpdateManyWithWhereWithoutUsuarioInput = {
    where: MiembroScalarWhereInput
    data: XOR<MiembroUpdateManyMutationInput, MiembroUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type MiembroScalarWhereInput = {
    AND?: MiembroScalarWhereInput | MiembroScalarWhereInput[]
    OR?: MiembroScalarWhereInput[]
    NOT?: MiembroScalarWhereInput | MiembroScalarWhereInput[]
    id?: IntFilter<"Miembro"> | number
    usuarioId?: StringFilter<"Miembro"> | string
    proyectoId?: StringFilter<"Miembro"> | string
    rolId?: IntFilter<"Miembro"> | number
  }

  export type ResponsableUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: ResponsableWhereUniqueInput
    update: XOR<ResponsableUpdateWithoutUsuarioInput, ResponsableUncheckedUpdateWithoutUsuarioInput>
    create: XOR<ResponsableCreateWithoutUsuarioInput, ResponsableUncheckedCreateWithoutUsuarioInput>
  }

  export type ResponsableUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: ResponsableWhereUniqueInput
    data: XOR<ResponsableUpdateWithoutUsuarioInput, ResponsableUncheckedUpdateWithoutUsuarioInput>
  }

  export type ResponsableUpdateManyWithWhereWithoutUsuarioInput = {
    where: ResponsableScalarWhereInput
    data: XOR<ResponsableUpdateManyMutationInput, ResponsableUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type ResponsableScalarWhereInput = {
    AND?: ResponsableScalarWhereInput | ResponsableScalarWhereInput[]
    OR?: ResponsableScalarWhereInput[]
    NOT?: ResponsableScalarWhereInput | ResponsableScalarWhereInput[]
    id?: IntFilter<"Responsable"> | number
    tareaId?: StringFilter<"Responsable"> | string
    usuarioId?: StringFilter<"Responsable"> | string
  }

  export type ComentarioUpsertWithWhereUniqueWithoutAutorInput = {
    where: ComentarioWhereUniqueInput
    update: XOR<ComentarioUpdateWithoutAutorInput, ComentarioUncheckedUpdateWithoutAutorInput>
    create: XOR<ComentarioCreateWithoutAutorInput, ComentarioUncheckedCreateWithoutAutorInput>
  }

  export type ComentarioUpdateWithWhereUniqueWithoutAutorInput = {
    where: ComentarioWhereUniqueInput
    data: XOR<ComentarioUpdateWithoutAutorInput, ComentarioUncheckedUpdateWithoutAutorInput>
  }

  export type ComentarioUpdateManyWithWhereWithoutAutorInput = {
    where: ComentarioScalarWhereInput
    data: XOR<ComentarioUpdateManyMutationInput, ComentarioUncheckedUpdateManyWithoutAutorInput>
  }

  export type ComentarioScalarWhereInput = {
    AND?: ComentarioScalarWhereInput | ComentarioScalarWhereInput[]
    OR?: ComentarioScalarWhereInput[]
    NOT?: ComentarioScalarWhereInput | ComentarioScalarWhereInput[]
    id?: IntFilter<"Comentario"> | number
    contenido?: StringFilter<"Comentario"> | string
    createdAt?: DateTimeFilter<"Comentario"> | Date | string
    tareaId?: StringFilter<"Comentario"> | string
    usuarioId?: StringFilter<"Comentario"> | string
  }

  export type NotificacionUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: NotificacionWhereUniqueInput
    update: XOR<NotificacionUpdateWithoutUsuarioInput, NotificacionUncheckedUpdateWithoutUsuarioInput>
    create: XOR<NotificacionCreateWithoutUsuarioInput, NotificacionUncheckedCreateWithoutUsuarioInput>
  }

  export type NotificacionUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: NotificacionWhereUniqueInput
    data: XOR<NotificacionUpdateWithoutUsuarioInput, NotificacionUncheckedUpdateWithoutUsuarioInput>
  }

  export type NotificacionUpdateManyWithWhereWithoutUsuarioInput = {
    where: NotificacionScalarWhereInput
    data: XOR<NotificacionUpdateManyMutationInput, NotificacionUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type NotificacionScalarWhereInput = {
    AND?: NotificacionScalarWhereInput | NotificacionScalarWhereInput[]
    OR?: NotificacionScalarWhereInput[]
    NOT?: NotificacionScalarWhereInput | NotificacionScalarWhereInput[]
    id?: IntFilter<"Notificacion"> | number
    tipo?: StringFilter<"Notificacion"> | string
    mensaje?: StringFilter<"Notificacion"> | string
    leida?: BoolFilter<"Notificacion"> | boolean
    createdAt?: DateTimeFilter<"Notificacion"> | Date | string
    usuarioId?: StringFilter<"Notificacion"> | string
    tareaId?: StringNullableFilter<"Notificacion"> | string | null
  }

  export type UsuarioCreateWithoutProyectosCreadosInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    miembroDe?: MiembroCreateNestedManyWithoutUsuarioInput
    responsableDe?: ResponsableCreateNestedManyWithoutUsuarioInput
    comentarios?: ComentarioCreateNestedManyWithoutAutorInput
    notificaciones?: NotificacionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutProyectosCreadosInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    miembroDe?: MiembroUncheckedCreateNestedManyWithoutUsuarioInput
    responsableDe?: ResponsableUncheckedCreateNestedManyWithoutUsuarioInput
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutAutorInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutProyectosCreadosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutProyectosCreadosInput, UsuarioUncheckedCreateWithoutProyectosCreadosInput>
  }

  export type MiembroCreateWithoutProyectoInput = {
    usuario: UsuarioCreateNestedOneWithoutMiembroDeInput
    rol: RolesCreateNestedOneWithoutMiembrosInput
  }

  export type MiembroUncheckedCreateWithoutProyectoInput = {
    id?: number
    usuarioId: string
    rolId: number
  }

  export type MiembroCreateOrConnectWithoutProyectoInput = {
    where: MiembroWhereUniqueInput
    create: XOR<MiembroCreateWithoutProyectoInput, MiembroUncheckedCreateWithoutProyectoInput>
  }

  export type MiembroCreateManyProyectoInputEnvelope = {
    data: MiembroCreateManyProyectoInput | MiembroCreateManyProyectoInput[]
    skipDuplicates?: boolean
  }

  export type EstadoCreateWithoutProyectoInput = {
    nombre: string
    posicion: number
    tareas?: TareaCreateNestedManyWithoutEstadoInput
  }

  export type EstadoUncheckedCreateWithoutProyectoInput = {
    id?: number
    nombre: string
    posicion: number
    tareas?: TareaUncheckedCreateNestedManyWithoutEstadoInput
  }

  export type EstadoCreateOrConnectWithoutProyectoInput = {
    where: EstadoWhereUniqueInput
    create: XOR<EstadoCreateWithoutProyectoInput, EstadoUncheckedCreateWithoutProyectoInput>
  }

  export type EstadoCreateManyProyectoInputEnvelope = {
    data: EstadoCreateManyProyectoInput | EstadoCreateManyProyectoInput[]
    skipDuplicates?: boolean
  }

  export type TareaCreateWithoutProyectoInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    estado: EstadoCreateNestedOneWithoutTareasInput
    responsables?: ResponsableCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoCreateNestedManyWithoutTareaInput
  }

  export type TareaUncheckedCreateWithoutProyectoInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    estadoId: number
    responsables?: ResponsableUncheckedCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasUncheckedCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoUncheckedCreateNestedManyWithoutTareaInput
  }

  export type TareaCreateOrConnectWithoutProyectoInput = {
    where: TareaWhereUniqueInput
    create: XOR<TareaCreateWithoutProyectoInput, TareaUncheckedCreateWithoutProyectoInput>
  }

  export type TareaCreateManyProyectoInputEnvelope = {
    data: TareaCreateManyProyectoInput | TareaCreateManyProyectoInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutProyectosCreadosInput = {
    update: XOR<UsuarioUpdateWithoutProyectosCreadosInput, UsuarioUncheckedUpdateWithoutProyectosCreadosInput>
    create: XOR<UsuarioCreateWithoutProyectosCreadosInput, UsuarioUncheckedCreateWithoutProyectosCreadosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutProyectosCreadosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutProyectosCreadosInput, UsuarioUncheckedUpdateWithoutProyectosCreadosInput>
  }

  export type UsuarioUpdateWithoutProyectosCreadosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    miembroDe?: MiembroUpdateManyWithoutUsuarioNestedInput
    responsableDe?: ResponsableUpdateManyWithoutUsuarioNestedInput
    comentarios?: ComentarioUpdateManyWithoutAutorNestedInput
    notificaciones?: NotificacionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutProyectosCreadosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    miembroDe?: MiembroUncheckedUpdateManyWithoutUsuarioNestedInput
    responsableDe?: ResponsableUncheckedUpdateManyWithoutUsuarioNestedInput
    comentarios?: ComentarioUncheckedUpdateManyWithoutAutorNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type MiembroUpsertWithWhereUniqueWithoutProyectoInput = {
    where: MiembroWhereUniqueInput
    update: XOR<MiembroUpdateWithoutProyectoInput, MiembroUncheckedUpdateWithoutProyectoInput>
    create: XOR<MiembroCreateWithoutProyectoInput, MiembroUncheckedCreateWithoutProyectoInput>
  }

  export type MiembroUpdateWithWhereUniqueWithoutProyectoInput = {
    where: MiembroWhereUniqueInput
    data: XOR<MiembroUpdateWithoutProyectoInput, MiembroUncheckedUpdateWithoutProyectoInput>
  }

  export type MiembroUpdateManyWithWhereWithoutProyectoInput = {
    where: MiembroScalarWhereInput
    data: XOR<MiembroUpdateManyMutationInput, MiembroUncheckedUpdateManyWithoutProyectoInput>
  }

  export type EstadoUpsertWithWhereUniqueWithoutProyectoInput = {
    where: EstadoWhereUniqueInput
    update: XOR<EstadoUpdateWithoutProyectoInput, EstadoUncheckedUpdateWithoutProyectoInput>
    create: XOR<EstadoCreateWithoutProyectoInput, EstadoUncheckedCreateWithoutProyectoInput>
  }

  export type EstadoUpdateWithWhereUniqueWithoutProyectoInput = {
    where: EstadoWhereUniqueInput
    data: XOR<EstadoUpdateWithoutProyectoInput, EstadoUncheckedUpdateWithoutProyectoInput>
  }

  export type EstadoUpdateManyWithWhereWithoutProyectoInput = {
    where: EstadoScalarWhereInput
    data: XOR<EstadoUpdateManyMutationInput, EstadoUncheckedUpdateManyWithoutProyectoInput>
  }

  export type EstadoScalarWhereInput = {
    AND?: EstadoScalarWhereInput | EstadoScalarWhereInput[]
    OR?: EstadoScalarWhereInput[]
    NOT?: EstadoScalarWhereInput | EstadoScalarWhereInput[]
    id?: IntFilter<"Estado"> | number
    nombre?: StringFilter<"Estado"> | string
    posicion?: IntFilter<"Estado"> | number
    proyectoId?: StringFilter<"Estado"> | string
  }

  export type TareaUpsertWithWhereUniqueWithoutProyectoInput = {
    where: TareaWhereUniqueInput
    update: XOR<TareaUpdateWithoutProyectoInput, TareaUncheckedUpdateWithoutProyectoInput>
    create: XOR<TareaCreateWithoutProyectoInput, TareaUncheckedCreateWithoutProyectoInput>
  }

  export type TareaUpdateWithWhereUniqueWithoutProyectoInput = {
    where: TareaWhereUniqueInput
    data: XOR<TareaUpdateWithoutProyectoInput, TareaUncheckedUpdateWithoutProyectoInput>
  }

  export type TareaUpdateManyWithWhereWithoutProyectoInput = {
    where: TareaScalarWhereInput
    data: XOR<TareaUpdateManyMutationInput, TareaUncheckedUpdateManyWithoutProyectoInput>
  }

  export type TareaScalarWhereInput = {
    AND?: TareaScalarWhereInput | TareaScalarWhereInput[]
    OR?: TareaScalarWhereInput[]
    NOT?: TareaScalarWhereInput | TareaScalarWhereInput[]
    id?: StringFilter<"Tarea"> | string
    titulo?: StringNullableFilter<"Tarea"> | string | null
    fechaLimite?: DateTimeNullableFilter<"Tarea"> | Date | string | null
    posicion?: IntFilter<"Tarea"> | number
    createdAt?: DateTimeFilter<"Tarea"> | Date | string
    proyectoId?: StringFilter<"Tarea"> | string
    estadoId?: IntFilter<"Tarea"> | number
  }

  export type ProyectosCreateWithoutTareasInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    creadoPor: UsuarioCreateNestedOneWithoutProyectosCreadosInput
    miembros?: MiembroCreateNestedManyWithoutProyectoInput
    estados?: EstadoCreateNestedManyWithoutProyectoInput
  }

  export type ProyectosUncheckedCreateWithoutTareasInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    creadoPorId: string
    miembros?: MiembroUncheckedCreateNestedManyWithoutProyectoInput
    estados?: EstadoUncheckedCreateNestedManyWithoutProyectoInput
  }

  export type ProyectosCreateOrConnectWithoutTareasInput = {
    where: ProyectosWhereUniqueInput
    create: XOR<ProyectosCreateWithoutTareasInput, ProyectosUncheckedCreateWithoutTareasInput>
  }

  export type EstadoCreateWithoutTareasInput = {
    nombre: string
    posicion: number
    proyecto: ProyectosCreateNestedOneWithoutEstadosInput
  }

  export type EstadoUncheckedCreateWithoutTareasInput = {
    id?: number
    nombre: string
    posicion: number
    proyectoId: string
  }

  export type EstadoCreateOrConnectWithoutTareasInput = {
    where: EstadoWhereUniqueInput
    create: XOR<EstadoCreateWithoutTareasInput, EstadoUncheckedCreateWithoutTareasInput>
  }

  export type ResponsableCreateWithoutTareaInput = {
    usuario: UsuarioCreateNestedOneWithoutResponsableDeInput
  }

  export type ResponsableUncheckedCreateWithoutTareaInput = {
    id?: number
    usuarioId: string
  }

  export type ResponsableCreateOrConnectWithoutTareaInput = {
    where: ResponsableWhereUniqueInput
    create: XOR<ResponsableCreateWithoutTareaInput, ResponsableUncheckedCreateWithoutTareaInput>
  }

  export type ResponsableCreateManyTareaInputEnvelope = {
    data: ResponsableCreateManyTareaInput | ResponsableCreateManyTareaInput[]
    skipDuplicates?: boolean
  }

  export type ComentarioCreateWithoutTareaInput = {
    contenido: string
    createdAt?: Date | string
    autor: UsuarioCreateNestedOneWithoutComentariosInput
  }

  export type ComentarioUncheckedCreateWithoutTareaInput = {
    id?: number
    contenido: string
    createdAt?: Date | string
    usuarioId: string
  }

  export type ComentarioCreateOrConnectWithoutTareaInput = {
    where: ComentarioWhereUniqueInput
    create: XOR<ComentarioCreateWithoutTareaInput, ComentarioUncheckedCreateWithoutTareaInput>
  }

  export type ComentarioCreateManyTareaInputEnvelope = {
    data: ComentarioCreateManyTareaInput | ComentarioCreateManyTareaInput[]
    skipDuplicates?: boolean
  }

  export type NotificacionCreateWithoutTareaInput = {
    tipo: string
    mensaje: string
    leida?: boolean
    createdAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutNotificacionesInput
  }

  export type NotificacionUncheckedCreateWithoutTareaInput = {
    id?: number
    tipo: string
    mensaje: string
    leida?: boolean
    createdAt?: Date | string
    usuarioId: string
  }

  export type NotificacionCreateOrConnectWithoutTareaInput = {
    where: NotificacionWhereUniqueInput
    create: XOR<NotificacionCreateWithoutTareaInput, NotificacionUncheckedCreateWithoutTareaInput>
  }

  export type NotificacionCreateManyTareaInputEnvelope = {
    data: NotificacionCreateManyTareaInput | NotificacionCreateManyTareaInput[]
    skipDuplicates?: boolean
  }

  export type TareasEtiquetasCreateWithoutTareaInput = {
    etiqueta: EtiquetaCreateNestedOneWithoutTareasInput
  }

  export type TareasEtiquetasUncheckedCreateWithoutTareaInput = {
    etiquetaId: number
  }

  export type TareasEtiquetasCreateOrConnectWithoutTareaInput = {
    where: TareasEtiquetasWhereUniqueInput
    create: XOR<TareasEtiquetasCreateWithoutTareaInput, TareasEtiquetasUncheckedCreateWithoutTareaInput>
  }

  export type TareasEtiquetasCreateManyTareaInputEnvelope = {
    data: TareasEtiquetasCreateManyTareaInput | TareasEtiquetasCreateManyTareaInput[]
    skipDuplicates?: boolean
  }

  export type BloqueContenidoCreateWithoutTareaInput = {
    id?: string
    tipo: $Enums.TipoDeBloque
    contenido: string
    posicion: number
  }

  export type BloqueContenidoUncheckedCreateWithoutTareaInput = {
    id?: string
    tipo: $Enums.TipoDeBloque
    contenido: string
    posicion: number
  }

  export type BloqueContenidoCreateOrConnectWithoutTareaInput = {
    where: BloqueContenidoWhereUniqueInput
    create: XOR<BloqueContenidoCreateWithoutTareaInput, BloqueContenidoUncheckedCreateWithoutTareaInput>
  }

  export type BloqueContenidoCreateManyTareaInputEnvelope = {
    data: BloqueContenidoCreateManyTareaInput | BloqueContenidoCreateManyTareaInput[]
    skipDuplicates?: boolean
  }

  export type ProyectosUpsertWithoutTareasInput = {
    update: XOR<ProyectosUpdateWithoutTareasInput, ProyectosUncheckedUpdateWithoutTareasInput>
    create: XOR<ProyectosCreateWithoutTareasInput, ProyectosUncheckedCreateWithoutTareasInput>
    where?: ProyectosWhereInput
  }

  export type ProyectosUpdateToOneWithWhereWithoutTareasInput = {
    where?: ProyectosWhereInput
    data: XOR<ProyectosUpdateWithoutTareasInput, ProyectosUncheckedUpdateWithoutTareasInput>
  }

  export type ProyectosUpdateWithoutTareasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creadoPor?: UsuarioUpdateOneRequiredWithoutProyectosCreadosNestedInput
    miembros?: MiembroUpdateManyWithoutProyectoNestedInput
    estados?: EstadoUpdateManyWithoutProyectoNestedInput
  }

  export type ProyectosUncheckedUpdateWithoutTareasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creadoPorId?: StringFieldUpdateOperationsInput | string
    miembros?: MiembroUncheckedUpdateManyWithoutProyectoNestedInput
    estados?: EstadoUncheckedUpdateManyWithoutProyectoNestedInput
  }

  export type EstadoUpsertWithoutTareasInput = {
    update: XOR<EstadoUpdateWithoutTareasInput, EstadoUncheckedUpdateWithoutTareasInput>
    create: XOR<EstadoCreateWithoutTareasInput, EstadoUncheckedCreateWithoutTareasInput>
    where?: EstadoWhereInput
  }

  export type EstadoUpdateToOneWithWhereWithoutTareasInput = {
    where?: EstadoWhereInput
    data: XOR<EstadoUpdateWithoutTareasInput, EstadoUncheckedUpdateWithoutTareasInput>
  }

  export type EstadoUpdateWithoutTareasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
    proyecto?: ProyectosUpdateOneRequiredWithoutEstadosNestedInput
  }

  export type EstadoUncheckedUpdateWithoutTareasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
    proyectoId?: StringFieldUpdateOperationsInput | string
  }

  export type ResponsableUpsertWithWhereUniqueWithoutTareaInput = {
    where: ResponsableWhereUniqueInput
    update: XOR<ResponsableUpdateWithoutTareaInput, ResponsableUncheckedUpdateWithoutTareaInput>
    create: XOR<ResponsableCreateWithoutTareaInput, ResponsableUncheckedCreateWithoutTareaInput>
  }

  export type ResponsableUpdateWithWhereUniqueWithoutTareaInput = {
    where: ResponsableWhereUniqueInput
    data: XOR<ResponsableUpdateWithoutTareaInput, ResponsableUncheckedUpdateWithoutTareaInput>
  }

  export type ResponsableUpdateManyWithWhereWithoutTareaInput = {
    where: ResponsableScalarWhereInput
    data: XOR<ResponsableUpdateManyMutationInput, ResponsableUncheckedUpdateManyWithoutTareaInput>
  }

  export type ComentarioUpsertWithWhereUniqueWithoutTareaInput = {
    where: ComentarioWhereUniqueInput
    update: XOR<ComentarioUpdateWithoutTareaInput, ComentarioUncheckedUpdateWithoutTareaInput>
    create: XOR<ComentarioCreateWithoutTareaInput, ComentarioUncheckedCreateWithoutTareaInput>
  }

  export type ComentarioUpdateWithWhereUniqueWithoutTareaInput = {
    where: ComentarioWhereUniqueInput
    data: XOR<ComentarioUpdateWithoutTareaInput, ComentarioUncheckedUpdateWithoutTareaInput>
  }

  export type ComentarioUpdateManyWithWhereWithoutTareaInput = {
    where: ComentarioScalarWhereInput
    data: XOR<ComentarioUpdateManyMutationInput, ComentarioUncheckedUpdateManyWithoutTareaInput>
  }

  export type NotificacionUpsertWithWhereUniqueWithoutTareaInput = {
    where: NotificacionWhereUniqueInput
    update: XOR<NotificacionUpdateWithoutTareaInput, NotificacionUncheckedUpdateWithoutTareaInput>
    create: XOR<NotificacionCreateWithoutTareaInput, NotificacionUncheckedCreateWithoutTareaInput>
  }

  export type NotificacionUpdateWithWhereUniqueWithoutTareaInput = {
    where: NotificacionWhereUniqueInput
    data: XOR<NotificacionUpdateWithoutTareaInput, NotificacionUncheckedUpdateWithoutTareaInput>
  }

  export type NotificacionUpdateManyWithWhereWithoutTareaInput = {
    where: NotificacionScalarWhereInput
    data: XOR<NotificacionUpdateManyMutationInput, NotificacionUncheckedUpdateManyWithoutTareaInput>
  }

  export type TareasEtiquetasUpsertWithWhereUniqueWithoutTareaInput = {
    where: TareasEtiquetasWhereUniqueInput
    update: XOR<TareasEtiquetasUpdateWithoutTareaInput, TareasEtiquetasUncheckedUpdateWithoutTareaInput>
    create: XOR<TareasEtiquetasCreateWithoutTareaInput, TareasEtiquetasUncheckedCreateWithoutTareaInput>
  }

  export type TareasEtiquetasUpdateWithWhereUniqueWithoutTareaInput = {
    where: TareasEtiquetasWhereUniqueInput
    data: XOR<TareasEtiquetasUpdateWithoutTareaInput, TareasEtiquetasUncheckedUpdateWithoutTareaInput>
  }

  export type TareasEtiquetasUpdateManyWithWhereWithoutTareaInput = {
    where: TareasEtiquetasScalarWhereInput
    data: XOR<TareasEtiquetasUpdateManyMutationInput, TareasEtiquetasUncheckedUpdateManyWithoutTareaInput>
  }

  export type TareasEtiquetasScalarWhereInput = {
    AND?: TareasEtiquetasScalarWhereInput | TareasEtiquetasScalarWhereInput[]
    OR?: TareasEtiquetasScalarWhereInput[]
    NOT?: TareasEtiquetasScalarWhereInput | TareasEtiquetasScalarWhereInput[]
    tareaId?: StringFilter<"TareasEtiquetas"> | string
    etiquetaId?: IntFilter<"TareasEtiquetas"> | number
  }

  export type BloqueContenidoUpsertWithWhereUniqueWithoutTareaInput = {
    where: BloqueContenidoWhereUniqueInput
    update: XOR<BloqueContenidoUpdateWithoutTareaInput, BloqueContenidoUncheckedUpdateWithoutTareaInput>
    create: XOR<BloqueContenidoCreateWithoutTareaInput, BloqueContenidoUncheckedCreateWithoutTareaInput>
  }

  export type BloqueContenidoUpdateWithWhereUniqueWithoutTareaInput = {
    where: BloqueContenidoWhereUniqueInput
    data: XOR<BloqueContenidoUpdateWithoutTareaInput, BloqueContenidoUncheckedUpdateWithoutTareaInput>
  }

  export type BloqueContenidoUpdateManyWithWhereWithoutTareaInput = {
    where: BloqueContenidoScalarWhereInput
    data: XOR<BloqueContenidoUpdateManyMutationInput, BloqueContenidoUncheckedUpdateManyWithoutTareaInput>
  }

  export type BloqueContenidoScalarWhereInput = {
    AND?: BloqueContenidoScalarWhereInput | BloqueContenidoScalarWhereInput[]
    OR?: BloqueContenidoScalarWhereInput[]
    NOT?: BloqueContenidoScalarWhereInput | BloqueContenidoScalarWhereInput[]
    id?: StringFilter<"BloqueContenido"> | string
    tareaId?: StringFilter<"BloqueContenido"> | string
    tipo?: EnumTipoDeBloqueFilter<"BloqueContenido"> | $Enums.TipoDeBloque
    contenido?: StringFilter<"BloqueContenido"> | string
    posicion?: IntFilter<"BloqueContenido"> | number
  }

  export type TareaCreateWithoutBloqueContenidoInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyecto: ProyectosCreateNestedOneWithoutTareasInput
    estado: EstadoCreateNestedOneWithoutTareasInput
    responsables?: ResponsableCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasCreateNestedManyWithoutTareaInput
  }

  export type TareaUncheckedCreateWithoutBloqueContenidoInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyectoId: string
    estadoId: number
    responsables?: ResponsableUncheckedCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasUncheckedCreateNestedManyWithoutTareaInput
  }

  export type TareaCreateOrConnectWithoutBloqueContenidoInput = {
    where: TareaWhereUniqueInput
    create: XOR<TareaCreateWithoutBloqueContenidoInput, TareaUncheckedCreateWithoutBloqueContenidoInput>
  }

  export type TareaUpsertWithoutBloqueContenidoInput = {
    update: XOR<TareaUpdateWithoutBloqueContenidoInput, TareaUncheckedUpdateWithoutBloqueContenidoInput>
    create: XOR<TareaCreateWithoutBloqueContenidoInput, TareaUncheckedCreateWithoutBloqueContenidoInput>
    where?: TareaWhereInput
  }

  export type TareaUpdateToOneWithWhereWithoutBloqueContenidoInput = {
    where?: TareaWhereInput
    data: XOR<TareaUpdateWithoutBloqueContenidoInput, TareaUncheckedUpdateWithoutBloqueContenidoInput>
  }

  export type TareaUpdateWithoutBloqueContenidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyecto?: ProyectosUpdateOneRequiredWithoutTareasNestedInput
    estado?: EstadoUpdateOneRequiredWithoutTareasNestedInput
    responsables?: ResponsableUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUpdateManyWithoutTareaNestedInput
  }

  export type TareaUncheckedUpdateWithoutBloqueContenidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    estadoId?: IntFieldUpdateOperationsInput | number
    responsables?: ResponsableUncheckedUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUncheckedUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUncheckedUpdateManyWithoutTareaNestedInput
  }

  export type MiembroCreateWithoutRolInput = {
    usuario: UsuarioCreateNestedOneWithoutMiembroDeInput
    proyecto: ProyectosCreateNestedOneWithoutMiembrosInput
  }

  export type MiembroUncheckedCreateWithoutRolInput = {
    id?: number
    usuarioId: string
    proyectoId: string
  }

  export type MiembroCreateOrConnectWithoutRolInput = {
    where: MiembroWhereUniqueInput
    create: XOR<MiembroCreateWithoutRolInput, MiembroUncheckedCreateWithoutRolInput>
  }

  export type MiembroCreateManyRolInputEnvelope = {
    data: MiembroCreateManyRolInput | MiembroCreateManyRolInput[]
    skipDuplicates?: boolean
  }

  export type MiembroUpsertWithWhereUniqueWithoutRolInput = {
    where: MiembroWhereUniqueInput
    update: XOR<MiembroUpdateWithoutRolInput, MiembroUncheckedUpdateWithoutRolInput>
    create: XOR<MiembroCreateWithoutRolInput, MiembroUncheckedCreateWithoutRolInput>
  }

  export type MiembroUpdateWithWhereUniqueWithoutRolInput = {
    where: MiembroWhereUniqueInput
    data: XOR<MiembroUpdateWithoutRolInput, MiembroUncheckedUpdateWithoutRolInput>
  }

  export type MiembroUpdateManyWithWhereWithoutRolInput = {
    where: MiembroScalarWhereInput
    data: XOR<MiembroUpdateManyMutationInput, MiembroUncheckedUpdateManyWithoutRolInput>
  }

  export type UsuarioCreateWithoutMiembroDeInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    proyectosCreados?: ProyectosCreateNestedManyWithoutCreadoPorInput
    responsableDe?: ResponsableCreateNestedManyWithoutUsuarioInput
    comentarios?: ComentarioCreateNestedManyWithoutAutorInput
    notificaciones?: NotificacionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutMiembroDeInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    proyectosCreados?: ProyectosUncheckedCreateNestedManyWithoutCreadoPorInput
    responsableDe?: ResponsableUncheckedCreateNestedManyWithoutUsuarioInput
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutAutorInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutMiembroDeInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutMiembroDeInput, UsuarioUncheckedCreateWithoutMiembroDeInput>
  }

  export type ProyectosCreateWithoutMiembrosInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    creadoPor: UsuarioCreateNestedOneWithoutProyectosCreadosInput
    estados?: EstadoCreateNestedManyWithoutProyectoInput
    tareas?: TareaCreateNestedManyWithoutProyectoInput
  }

  export type ProyectosUncheckedCreateWithoutMiembrosInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    creadoPorId: string
    estados?: EstadoUncheckedCreateNestedManyWithoutProyectoInput
    tareas?: TareaUncheckedCreateNestedManyWithoutProyectoInput
  }

  export type ProyectosCreateOrConnectWithoutMiembrosInput = {
    where: ProyectosWhereUniqueInput
    create: XOR<ProyectosCreateWithoutMiembrosInput, ProyectosUncheckedCreateWithoutMiembrosInput>
  }

  export type RolesCreateWithoutMiembrosInput = {
    nombre: string
  }

  export type RolesUncheckedCreateWithoutMiembrosInput = {
    id?: number
    nombre: string
  }

  export type RolesCreateOrConnectWithoutMiembrosInput = {
    where: RolesWhereUniqueInput
    create: XOR<RolesCreateWithoutMiembrosInput, RolesUncheckedCreateWithoutMiembrosInput>
  }

  export type UsuarioUpsertWithoutMiembroDeInput = {
    update: XOR<UsuarioUpdateWithoutMiembroDeInput, UsuarioUncheckedUpdateWithoutMiembroDeInput>
    create: XOR<UsuarioCreateWithoutMiembroDeInput, UsuarioUncheckedCreateWithoutMiembroDeInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutMiembroDeInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutMiembroDeInput, UsuarioUncheckedUpdateWithoutMiembroDeInput>
  }

  export type UsuarioUpdateWithoutMiembroDeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectosCreados?: ProyectosUpdateManyWithoutCreadoPorNestedInput
    responsableDe?: ResponsableUpdateManyWithoutUsuarioNestedInput
    comentarios?: ComentarioUpdateManyWithoutAutorNestedInput
    notificaciones?: NotificacionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutMiembroDeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectosCreados?: ProyectosUncheckedUpdateManyWithoutCreadoPorNestedInput
    responsableDe?: ResponsableUncheckedUpdateManyWithoutUsuarioNestedInput
    comentarios?: ComentarioUncheckedUpdateManyWithoutAutorNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type ProyectosUpsertWithoutMiembrosInput = {
    update: XOR<ProyectosUpdateWithoutMiembrosInput, ProyectosUncheckedUpdateWithoutMiembrosInput>
    create: XOR<ProyectosCreateWithoutMiembrosInput, ProyectosUncheckedCreateWithoutMiembrosInput>
    where?: ProyectosWhereInput
  }

  export type ProyectosUpdateToOneWithWhereWithoutMiembrosInput = {
    where?: ProyectosWhereInput
    data: XOR<ProyectosUpdateWithoutMiembrosInput, ProyectosUncheckedUpdateWithoutMiembrosInput>
  }

  export type ProyectosUpdateWithoutMiembrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creadoPor?: UsuarioUpdateOneRequiredWithoutProyectosCreadosNestedInput
    estados?: EstadoUpdateManyWithoutProyectoNestedInput
    tareas?: TareaUpdateManyWithoutProyectoNestedInput
  }

  export type ProyectosUncheckedUpdateWithoutMiembrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creadoPorId?: StringFieldUpdateOperationsInput | string
    estados?: EstadoUncheckedUpdateManyWithoutProyectoNestedInput
    tareas?: TareaUncheckedUpdateManyWithoutProyectoNestedInput
  }

  export type RolesUpsertWithoutMiembrosInput = {
    update: XOR<RolesUpdateWithoutMiembrosInput, RolesUncheckedUpdateWithoutMiembrosInput>
    create: XOR<RolesCreateWithoutMiembrosInput, RolesUncheckedCreateWithoutMiembrosInput>
    where?: RolesWhereInput
  }

  export type RolesUpdateToOneWithWhereWithoutMiembrosInput = {
    where?: RolesWhereInput
    data: XOR<RolesUpdateWithoutMiembrosInput, RolesUncheckedUpdateWithoutMiembrosInput>
  }

  export type RolesUpdateWithoutMiembrosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type RolesUncheckedUpdateWithoutMiembrosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type ProyectosCreateWithoutEstadosInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    creadoPor: UsuarioCreateNestedOneWithoutProyectosCreadosInput
    miembros?: MiembroCreateNestedManyWithoutProyectoInput
    tareas?: TareaCreateNestedManyWithoutProyectoInput
  }

  export type ProyectosUncheckedCreateWithoutEstadosInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    creadoPorId: string
    miembros?: MiembroUncheckedCreateNestedManyWithoutProyectoInput
    tareas?: TareaUncheckedCreateNestedManyWithoutProyectoInput
  }

  export type ProyectosCreateOrConnectWithoutEstadosInput = {
    where: ProyectosWhereUniqueInput
    create: XOR<ProyectosCreateWithoutEstadosInput, ProyectosUncheckedCreateWithoutEstadosInput>
  }

  export type TareaCreateWithoutEstadoInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyecto: ProyectosCreateNestedOneWithoutTareasInput
    responsables?: ResponsableCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoCreateNestedManyWithoutTareaInput
  }

  export type TareaUncheckedCreateWithoutEstadoInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyectoId: string
    responsables?: ResponsableUncheckedCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasUncheckedCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoUncheckedCreateNestedManyWithoutTareaInput
  }

  export type TareaCreateOrConnectWithoutEstadoInput = {
    where: TareaWhereUniqueInput
    create: XOR<TareaCreateWithoutEstadoInput, TareaUncheckedCreateWithoutEstadoInput>
  }

  export type TareaCreateManyEstadoInputEnvelope = {
    data: TareaCreateManyEstadoInput | TareaCreateManyEstadoInput[]
    skipDuplicates?: boolean
  }

  export type ProyectosUpsertWithoutEstadosInput = {
    update: XOR<ProyectosUpdateWithoutEstadosInput, ProyectosUncheckedUpdateWithoutEstadosInput>
    create: XOR<ProyectosCreateWithoutEstadosInput, ProyectosUncheckedCreateWithoutEstadosInput>
    where?: ProyectosWhereInput
  }

  export type ProyectosUpdateToOneWithWhereWithoutEstadosInput = {
    where?: ProyectosWhereInput
    data: XOR<ProyectosUpdateWithoutEstadosInput, ProyectosUncheckedUpdateWithoutEstadosInput>
  }

  export type ProyectosUpdateWithoutEstadosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creadoPor?: UsuarioUpdateOneRequiredWithoutProyectosCreadosNestedInput
    miembros?: MiembroUpdateManyWithoutProyectoNestedInput
    tareas?: TareaUpdateManyWithoutProyectoNestedInput
  }

  export type ProyectosUncheckedUpdateWithoutEstadosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creadoPorId?: StringFieldUpdateOperationsInput | string
    miembros?: MiembroUncheckedUpdateManyWithoutProyectoNestedInput
    tareas?: TareaUncheckedUpdateManyWithoutProyectoNestedInput
  }

  export type TareaUpsertWithWhereUniqueWithoutEstadoInput = {
    where: TareaWhereUniqueInput
    update: XOR<TareaUpdateWithoutEstadoInput, TareaUncheckedUpdateWithoutEstadoInput>
    create: XOR<TareaCreateWithoutEstadoInput, TareaUncheckedCreateWithoutEstadoInput>
  }

  export type TareaUpdateWithWhereUniqueWithoutEstadoInput = {
    where: TareaWhereUniqueInput
    data: XOR<TareaUpdateWithoutEstadoInput, TareaUncheckedUpdateWithoutEstadoInput>
  }

  export type TareaUpdateManyWithWhereWithoutEstadoInput = {
    where: TareaScalarWhereInput
    data: XOR<TareaUpdateManyMutationInput, TareaUncheckedUpdateManyWithoutEstadoInput>
  }

  export type TareaCreateWithoutResponsablesInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyecto: ProyectosCreateNestedOneWithoutTareasInput
    estado: EstadoCreateNestedOneWithoutTareasInput
    comentarios?: ComentarioCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoCreateNestedManyWithoutTareaInput
  }

  export type TareaUncheckedCreateWithoutResponsablesInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyectoId: string
    estadoId: number
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasUncheckedCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoUncheckedCreateNestedManyWithoutTareaInput
  }

  export type TareaCreateOrConnectWithoutResponsablesInput = {
    where: TareaWhereUniqueInput
    create: XOR<TareaCreateWithoutResponsablesInput, TareaUncheckedCreateWithoutResponsablesInput>
  }

  export type UsuarioCreateWithoutResponsableDeInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    proyectosCreados?: ProyectosCreateNestedManyWithoutCreadoPorInput
    miembroDe?: MiembroCreateNestedManyWithoutUsuarioInput
    comentarios?: ComentarioCreateNestedManyWithoutAutorInput
    notificaciones?: NotificacionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutResponsableDeInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    proyectosCreados?: ProyectosUncheckedCreateNestedManyWithoutCreadoPorInput
    miembroDe?: MiembroUncheckedCreateNestedManyWithoutUsuarioInput
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutAutorInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutResponsableDeInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutResponsableDeInput, UsuarioUncheckedCreateWithoutResponsableDeInput>
  }

  export type TareaUpsertWithoutResponsablesInput = {
    update: XOR<TareaUpdateWithoutResponsablesInput, TareaUncheckedUpdateWithoutResponsablesInput>
    create: XOR<TareaCreateWithoutResponsablesInput, TareaUncheckedCreateWithoutResponsablesInput>
    where?: TareaWhereInput
  }

  export type TareaUpdateToOneWithWhereWithoutResponsablesInput = {
    where?: TareaWhereInput
    data: XOR<TareaUpdateWithoutResponsablesInput, TareaUncheckedUpdateWithoutResponsablesInput>
  }

  export type TareaUpdateWithoutResponsablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyecto?: ProyectosUpdateOneRequiredWithoutTareasNestedInput
    estado?: EstadoUpdateOneRequiredWithoutTareasNestedInput
    comentarios?: ComentarioUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUpdateManyWithoutTareaNestedInput
  }

  export type TareaUncheckedUpdateWithoutResponsablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    estadoId?: IntFieldUpdateOperationsInput | number
    comentarios?: ComentarioUncheckedUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUncheckedUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUncheckedUpdateManyWithoutTareaNestedInput
  }

  export type UsuarioUpsertWithoutResponsableDeInput = {
    update: XOR<UsuarioUpdateWithoutResponsableDeInput, UsuarioUncheckedUpdateWithoutResponsableDeInput>
    create: XOR<UsuarioCreateWithoutResponsableDeInput, UsuarioUncheckedCreateWithoutResponsableDeInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutResponsableDeInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutResponsableDeInput, UsuarioUncheckedUpdateWithoutResponsableDeInput>
  }

  export type UsuarioUpdateWithoutResponsableDeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectosCreados?: ProyectosUpdateManyWithoutCreadoPorNestedInput
    miembroDe?: MiembroUpdateManyWithoutUsuarioNestedInput
    comentarios?: ComentarioUpdateManyWithoutAutorNestedInput
    notificaciones?: NotificacionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutResponsableDeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectosCreados?: ProyectosUncheckedUpdateManyWithoutCreadoPorNestedInput
    miembroDe?: MiembroUncheckedUpdateManyWithoutUsuarioNestedInput
    comentarios?: ComentarioUncheckedUpdateManyWithoutAutorNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type TareaCreateWithoutComentariosInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyecto: ProyectosCreateNestedOneWithoutTareasInput
    estado: EstadoCreateNestedOneWithoutTareasInput
    responsables?: ResponsableCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoCreateNestedManyWithoutTareaInput
  }

  export type TareaUncheckedCreateWithoutComentariosInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyectoId: string
    estadoId: number
    responsables?: ResponsableUncheckedCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasUncheckedCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoUncheckedCreateNestedManyWithoutTareaInput
  }

  export type TareaCreateOrConnectWithoutComentariosInput = {
    where: TareaWhereUniqueInput
    create: XOR<TareaCreateWithoutComentariosInput, TareaUncheckedCreateWithoutComentariosInput>
  }

  export type UsuarioCreateWithoutComentariosInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    proyectosCreados?: ProyectosCreateNestedManyWithoutCreadoPorInput
    miembroDe?: MiembroCreateNestedManyWithoutUsuarioInput
    responsableDe?: ResponsableCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutComentariosInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    proyectosCreados?: ProyectosUncheckedCreateNestedManyWithoutCreadoPorInput
    miembroDe?: MiembroUncheckedCreateNestedManyWithoutUsuarioInput
    responsableDe?: ResponsableUncheckedCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutComentariosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutComentariosInput, UsuarioUncheckedCreateWithoutComentariosInput>
  }

  export type TareaUpsertWithoutComentariosInput = {
    update: XOR<TareaUpdateWithoutComentariosInput, TareaUncheckedUpdateWithoutComentariosInput>
    create: XOR<TareaCreateWithoutComentariosInput, TareaUncheckedCreateWithoutComentariosInput>
    where?: TareaWhereInput
  }

  export type TareaUpdateToOneWithWhereWithoutComentariosInput = {
    where?: TareaWhereInput
    data: XOR<TareaUpdateWithoutComentariosInput, TareaUncheckedUpdateWithoutComentariosInput>
  }

  export type TareaUpdateWithoutComentariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyecto?: ProyectosUpdateOneRequiredWithoutTareasNestedInput
    estado?: EstadoUpdateOneRequiredWithoutTareasNestedInput
    responsables?: ResponsableUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUpdateManyWithoutTareaNestedInput
  }

  export type TareaUncheckedUpdateWithoutComentariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    estadoId?: IntFieldUpdateOperationsInput | number
    responsables?: ResponsableUncheckedUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUncheckedUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUncheckedUpdateManyWithoutTareaNestedInput
  }

  export type UsuarioUpsertWithoutComentariosInput = {
    update: XOR<UsuarioUpdateWithoutComentariosInput, UsuarioUncheckedUpdateWithoutComentariosInput>
    create: XOR<UsuarioCreateWithoutComentariosInput, UsuarioUncheckedCreateWithoutComentariosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutComentariosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutComentariosInput, UsuarioUncheckedUpdateWithoutComentariosInput>
  }

  export type UsuarioUpdateWithoutComentariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectosCreados?: ProyectosUpdateManyWithoutCreadoPorNestedInput
    miembroDe?: MiembroUpdateManyWithoutUsuarioNestedInput
    responsableDe?: ResponsableUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutComentariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectosCreados?: ProyectosUncheckedUpdateManyWithoutCreadoPorNestedInput
    miembroDe?: MiembroUncheckedUpdateManyWithoutUsuarioNestedInput
    responsableDe?: ResponsableUncheckedUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateWithoutNotificacionesInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    proyectosCreados?: ProyectosCreateNestedManyWithoutCreadoPorInput
    miembroDe?: MiembroCreateNestedManyWithoutUsuarioInput
    responsableDe?: ResponsableCreateNestedManyWithoutUsuarioInput
    comentarios?: ComentarioCreateNestedManyWithoutAutorInput
  }

  export type UsuarioUncheckedCreateWithoutNotificacionesInput = {
    id?: string
    nombre: string
    apellido: string
    email: string
    password: string
    createdAt?: Date | string
    proyectosCreados?: ProyectosUncheckedCreateNestedManyWithoutCreadoPorInput
    miembroDe?: MiembroUncheckedCreateNestedManyWithoutUsuarioInput
    responsableDe?: ResponsableUncheckedCreateNestedManyWithoutUsuarioInput
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutAutorInput
  }

  export type UsuarioCreateOrConnectWithoutNotificacionesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutNotificacionesInput, UsuarioUncheckedCreateWithoutNotificacionesInput>
  }

  export type TareaCreateWithoutNotificacionesInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyecto: ProyectosCreateNestedOneWithoutTareasInput
    estado: EstadoCreateNestedOneWithoutTareasInput
    responsables?: ResponsableCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoCreateNestedManyWithoutTareaInput
  }

  export type TareaUncheckedCreateWithoutNotificacionesInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyectoId: string
    estadoId: number
    responsables?: ResponsableUncheckedCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutTareaInput
    etiquetas?: TareasEtiquetasUncheckedCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoUncheckedCreateNestedManyWithoutTareaInput
  }

  export type TareaCreateOrConnectWithoutNotificacionesInput = {
    where: TareaWhereUniqueInput
    create: XOR<TareaCreateWithoutNotificacionesInput, TareaUncheckedCreateWithoutNotificacionesInput>
  }

  export type UsuarioUpsertWithoutNotificacionesInput = {
    update: XOR<UsuarioUpdateWithoutNotificacionesInput, UsuarioUncheckedUpdateWithoutNotificacionesInput>
    create: XOR<UsuarioCreateWithoutNotificacionesInput, UsuarioUncheckedCreateWithoutNotificacionesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutNotificacionesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutNotificacionesInput, UsuarioUncheckedUpdateWithoutNotificacionesInput>
  }

  export type UsuarioUpdateWithoutNotificacionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectosCreados?: ProyectosUpdateManyWithoutCreadoPorNestedInput
    miembroDe?: MiembroUpdateManyWithoutUsuarioNestedInput
    responsableDe?: ResponsableUpdateManyWithoutUsuarioNestedInput
    comentarios?: ComentarioUpdateManyWithoutAutorNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutNotificacionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectosCreados?: ProyectosUncheckedUpdateManyWithoutCreadoPorNestedInput
    miembroDe?: MiembroUncheckedUpdateManyWithoutUsuarioNestedInput
    responsableDe?: ResponsableUncheckedUpdateManyWithoutUsuarioNestedInput
    comentarios?: ComentarioUncheckedUpdateManyWithoutAutorNestedInput
  }

  export type TareaUpsertWithoutNotificacionesInput = {
    update: XOR<TareaUpdateWithoutNotificacionesInput, TareaUncheckedUpdateWithoutNotificacionesInput>
    create: XOR<TareaCreateWithoutNotificacionesInput, TareaUncheckedCreateWithoutNotificacionesInput>
    where?: TareaWhereInput
  }

  export type TareaUpdateToOneWithWhereWithoutNotificacionesInput = {
    where?: TareaWhereInput
    data: XOR<TareaUpdateWithoutNotificacionesInput, TareaUncheckedUpdateWithoutNotificacionesInput>
  }

  export type TareaUpdateWithoutNotificacionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyecto?: ProyectosUpdateOneRequiredWithoutTareasNestedInput
    estado?: EstadoUpdateOneRequiredWithoutTareasNestedInput
    responsables?: ResponsableUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUpdateManyWithoutTareaNestedInput
  }

  export type TareaUncheckedUpdateWithoutNotificacionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    estadoId?: IntFieldUpdateOperationsInput | number
    responsables?: ResponsableUncheckedUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUncheckedUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUncheckedUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUncheckedUpdateManyWithoutTareaNestedInput
  }

  export type TareasEtiquetasCreateWithoutEtiquetaInput = {
    tarea: TareaCreateNestedOneWithoutEtiquetasInput
  }

  export type TareasEtiquetasUncheckedCreateWithoutEtiquetaInput = {
    tareaId: string
  }

  export type TareasEtiquetasCreateOrConnectWithoutEtiquetaInput = {
    where: TareasEtiquetasWhereUniqueInput
    create: XOR<TareasEtiquetasCreateWithoutEtiquetaInput, TareasEtiquetasUncheckedCreateWithoutEtiquetaInput>
  }

  export type TareasEtiquetasCreateManyEtiquetaInputEnvelope = {
    data: TareasEtiquetasCreateManyEtiquetaInput | TareasEtiquetasCreateManyEtiquetaInput[]
    skipDuplicates?: boolean
  }

  export type TareasEtiquetasUpsertWithWhereUniqueWithoutEtiquetaInput = {
    where: TareasEtiquetasWhereUniqueInput
    update: XOR<TareasEtiquetasUpdateWithoutEtiquetaInput, TareasEtiquetasUncheckedUpdateWithoutEtiquetaInput>
    create: XOR<TareasEtiquetasCreateWithoutEtiquetaInput, TareasEtiquetasUncheckedCreateWithoutEtiquetaInput>
  }

  export type TareasEtiquetasUpdateWithWhereUniqueWithoutEtiquetaInput = {
    where: TareasEtiquetasWhereUniqueInput
    data: XOR<TareasEtiquetasUpdateWithoutEtiquetaInput, TareasEtiquetasUncheckedUpdateWithoutEtiquetaInput>
  }

  export type TareasEtiquetasUpdateManyWithWhereWithoutEtiquetaInput = {
    where: TareasEtiquetasScalarWhereInput
    data: XOR<TareasEtiquetasUpdateManyMutationInput, TareasEtiquetasUncheckedUpdateManyWithoutEtiquetaInput>
  }

  export type TareaCreateWithoutEtiquetasInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyecto: ProyectosCreateNestedOneWithoutTareasInput
    estado: EstadoCreateNestedOneWithoutTareasInput
    responsables?: ResponsableCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoCreateNestedManyWithoutTareaInput
  }

  export type TareaUncheckedCreateWithoutEtiquetasInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyectoId: string
    estadoId: number
    responsables?: ResponsableUncheckedCreateNestedManyWithoutTareaInput
    comentarios?: ComentarioUncheckedCreateNestedManyWithoutTareaInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutTareaInput
    BloqueContenido?: BloqueContenidoUncheckedCreateNestedManyWithoutTareaInput
  }

  export type TareaCreateOrConnectWithoutEtiquetasInput = {
    where: TareaWhereUniqueInput
    create: XOR<TareaCreateWithoutEtiquetasInput, TareaUncheckedCreateWithoutEtiquetasInput>
  }

  export type EtiquetaCreateWithoutTareasInput = {
    nombre: string
  }

  export type EtiquetaUncheckedCreateWithoutTareasInput = {
    id?: number
    nombre: string
  }

  export type EtiquetaCreateOrConnectWithoutTareasInput = {
    where: EtiquetaWhereUniqueInput
    create: XOR<EtiquetaCreateWithoutTareasInput, EtiquetaUncheckedCreateWithoutTareasInput>
  }

  export type TareaUpsertWithoutEtiquetasInput = {
    update: XOR<TareaUpdateWithoutEtiquetasInput, TareaUncheckedUpdateWithoutEtiquetasInput>
    create: XOR<TareaCreateWithoutEtiquetasInput, TareaUncheckedCreateWithoutEtiquetasInput>
    where?: TareaWhereInput
  }

  export type TareaUpdateToOneWithWhereWithoutEtiquetasInput = {
    where?: TareaWhereInput
    data: XOR<TareaUpdateWithoutEtiquetasInput, TareaUncheckedUpdateWithoutEtiquetasInput>
  }

  export type TareaUpdateWithoutEtiquetasInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyecto?: ProyectosUpdateOneRequiredWithoutTareasNestedInput
    estado?: EstadoUpdateOneRequiredWithoutTareasNestedInput
    responsables?: ResponsableUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUpdateManyWithoutTareaNestedInput
  }

  export type TareaUncheckedUpdateWithoutEtiquetasInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    estadoId?: IntFieldUpdateOperationsInput | number
    responsables?: ResponsableUncheckedUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUncheckedUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUncheckedUpdateManyWithoutTareaNestedInput
  }

  export type EtiquetaUpsertWithoutTareasInput = {
    update: XOR<EtiquetaUpdateWithoutTareasInput, EtiquetaUncheckedUpdateWithoutTareasInput>
    create: XOR<EtiquetaCreateWithoutTareasInput, EtiquetaUncheckedCreateWithoutTareasInput>
    where?: EtiquetaWhereInput
  }

  export type EtiquetaUpdateToOneWithWhereWithoutTareasInput = {
    where?: EtiquetaWhereInput
    data: XOR<EtiquetaUpdateWithoutTareasInput, EtiquetaUncheckedUpdateWithoutTareasInput>
  }

  export type EtiquetaUpdateWithoutTareasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type EtiquetaUncheckedUpdateWithoutTareasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type ProyectosCreateManyCreadoPorInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
  }

  export type MiembroCreateManyUsuarioInput = {
    id?: number
    proyectoId: string
    rolId: number
  }

  export type ResponsableCreateManyUsuarioInput = {
    id?: number
    tareaId: string
  }

  export type ComentarioCreateManyAutorInput = {
    id?: number
    contenido: string
    createdAt?: Date | string
    tareaId: string
  }

  export type NotificacionCreateManyUsuarioInput = {
    id?: number
    tipo: string
    mensaje: string
    leida?: boolean
    createdAt?: Date | string
    tareaId?: string | null
  }

  export type ProyectosUpdateWithoutCreadoPorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    miembros?: MiembroUpdateManyWithoutProyectoNestedInput
    estados?: EstadoUpdateManyWithoutProyectoNestedInput
    tareas?: TareaUpdateManyWithoutProyectoNestedInput
  }

  export type ProyectosUncheckedUpdateWithoutCreadoPorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    miembros?: MiembroUncheckedUpdateManyWithoutProyectoNestedInput
    estados?: EstadoUncheckedUpdateManyWithoutProyectoNestedInput
    tareas?: TareaUncheckedUpdateManyWithoutProyectoNestedInput
  }

  export type ProyectosUncheckedUpdateManyWithoutCreadoPorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MiembroUpdateWithoutUsuarioInput = {
    proyecto?: ProyectosUpdateOneRequiredWithoutMiembrosNestedInput
    rol?: RolesUpdateOneRequiredWithoutMiembrosNestedInput
  }

  export type MiembroUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    proyectoId?: StringFieldUpdateOperationsInput | string
    rolId?: IntFieldUpdateOperationsInput | number
  }

  export type MiembroUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    proyectoId?: StringFieldUpdateOperationsInput | string
    rolId?: IntFieldUpdateOperationsInput | number
  }

  export type ResponsableUpdateWithoutUsuarioInput = {
    tarea?: TareaUpdateOneRequiredWithoutResponsablesNestedInput
  }

  export type ResponsableUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    tareaId?: StringFieldUpdateOperationsInput | string
  }

  export type ResponsableUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    tareaId?: StringFieldUpdateOperationsInput | string
  }

  export type ComentarioUpdateWithoutAutorInput = {
    contenido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tarea?: TareaUpdateOneRequiredWithoutComentariosNestedInput
  }

  export type ComentarioUncheckedUpdateWithoutAutorInput = {
    id?: IntFieldUpdateOperationsInput | number
    contenido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tareaId?: StringFieldUpdateOperationsInput | string
  }

  export type ComentarioUncheckedUpdateManyWithoutAutorInput = {
    id?: IntFieldUpdateOperationsInput | number
    contenido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tareaId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificacionUpdateWithoutUsuarioInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tarea?: TareaUpdateOneWithoutNotificacionesNestedInput
  }

  export type NotificacionUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tareaId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NotificacionUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tareaId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MiembroCreateManyProyectoInput = {
    id?: number
    usuarioId: string
    rolId: number
  }

  export type EstadoCreateManyProyectoInput = {
    id?: number
    nombre: string
    posicion: number
  }

  export type TareaCreateManyProyectoInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    estadoId: number
  }

  export type MiembroUpdateWithoutProyectoInput = {
    usuario?: UsuarioUpdateOneRequiredWithoutMiembroDeNestedInput
    rol?: RolesUpdateOneRequiredWithoutMiembrosNestedInput
  }

  export type MiembroUncheckedUpdateWithoutProyectoInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: StringFieldUpdateOperationsInput | string
    rolId?: IntFieldUpdateOperationsInput | number
  }

  export type MiembroUncheckedUpdateManyWithoutProyectoInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: StringFieldUpdateOperationsInput | string
    rolId?: IntFieldUpdateOperationsInput | number
  }

  export type EstadoUpdateWithoutProyectoInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
    tareas?: TareaUpdateManyWithoutEstadoNestedInput
  }

  export type EstadoUncheckedUpdateWithoutProyectoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
    tareas?: TareaUncheckedUpdateManyWithoutEstadoNestedInput
  }

  export type EstadoUncheckedUpdateManyWithoutProyectoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
  }

  export type TareaUpdateWithoutProyectoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EstadoUpdateOneRequiredWithoutTareasNestedInput
    responsables?: ResponsableUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUpdateManyWithoutTareaNestedInput
  }

  export type TareaUncheckedUpdateWithoutProyectoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estadoId?: IntFieldUpdateOperationsInput | number
    responsables?: ResponsableUncheckedUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUncheckedUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUncheckedUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUncheckedUpdateManyWithoutTareaNestedInput
  }

  export type TareaUncheckedUpdateManyWithoutProyectoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estadoId?: IntFieldUpdateOperationsInput | number
  }

  export type ResponsableCreateManyTareaInput = {
    id?: number
    usuarioId: string
  }

  export type ComentarioCreateManyTareaInput = {
    id?: number
    contenido: string
    createdAt?: Date | string
    usuarioId: string
  }

  export type NotificacionCreateManyTareaInput = {
    id?: number
    tipo: string
    mensaje: string
    leida?: boolean
    createdAt?: Date | string
    usuarioId: string
  }

  export type TareasEtiquetasCreateManyTareaInput = {
    etiquetaId: number
  }

  export type BloqueContenidoCreateManyTareaInput = {
    id?: string
    tipo: $Enums.TipoDeBloque
    contenido: string
    posicion: number
  }

  export type ResponsableUpdateWithoutTareaInput = {
    usuario?: UsuarioUpdateOneRequiredWithoutResponsableDeNestedInput
  }

  export type ResponsableUncheckedUpdateWithoutTareaInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type ResponsableUncheckedUpdateManyWithoutTareaInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type ComentarioUpdateWithoutTareaInput = {
    contenido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    autor?: UsuarioUpdateOneRequiredWithoutComentariosNestedInput
  }

  export type ComentarioUncheckedUpdateWithoutTareaInput = {
    id?: IntFieldUpdateOperationsInput | number
    contenido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type ComentarioUncheckedUpdateManyWithoutTareaInput = {
    id?: IntFieldUpdateOperationsInput | number
    contenido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificacionUpdateWithoutTareaInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutNotificacionesNestedInput
  }

  export type NotificacionUncheckedUpdateWithoutTareaInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificacionUncheckedUpdateManyWithoutTareaInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type TareasEtiquetasUpdateWithoutTareaInput = {
    etiqueta?: EtiquetaUpdateOneRequiredWithoutTareasNestedInput
  }

  export type TareasEtiquetasUncheckedUpdateWithoutTareaInput = {
    etiquetaId?: IntFieldUpdateOperationsInput | number
  }

  export type TareasEtiquetasUncheckedUpdateManyWithoutTareaInput = {
    etiquetaId?: IntFieldUpdateOperationsInput | number
  }

  export type BloqueContenidoUpdateWithoutTareaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDeBloqueFieldUpdateOperationsInput | $Enums.TipoDeBloque
    contenido?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
  }

  export type BloqueContenidoUncheckedUpdateWithoutTareaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDeBloqueFieldUpdateOperationsInput | $Enums.TipoDeBloque
    contenido?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
  }

  export type BloqueContenidoUncheckedUpdateManyWithoutTareaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDeBloqueFieldUpdateOperationsInput | $Enums.TipoDeBloque
    contenido?: StringFieldUpdateOperationsInput | string
    posicion?: IntFieldUpdateOperationsInput | number
  }

  export type MiembroCreateManyRolInput = {
    id?: number
    usuarioId: string
    proyectoId: string
  }

  export type MiembroUpdateWithoutRolInput = {
    usuario?: UsuarioUpdateOneRequiredWithoutMiembroDeNestedInput
    proyecto?: ProyectosUpdateOneRequiredWithoutMiembrosNestedInput
  }

  export type MiembroUncheckedUpdateWithoutRolInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
  }

  export type MiembroUncheckedUpdateManyWithoutRolInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
  }

  export type TareaCreateManyEstadoInput = {
    id?: string
    titulo?: string | null
    fechaLimite?: Date | string | null
    posicion?: number
    createdAt?: Date | string
    proyectoId: string
  }

  export type TareaUpdateWithoutEstadoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyecto?: ProyectosUpdateOneRequiredWithoutTareasNestedInput
    responsables?: ResponsableUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUpdateManyWithoutTareaNestedInput
  }

  export type TareaUncheckedUpdateWithoutEstadoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    responsables?: ResponsableUncheckedUpdateManyWithoutTareaNestedInput
    comentarios?: ComentarioUncheckedUpdateManyWithoutTareaNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutTareaNestedInput
    etiquetas?: TareasEtiquetasUncheckedUpdateManyWithoutTareaNestedInput
    BloqueContenido?: BloqueContenidoUncheckedUpdateManyWithoutTareaNestedInput
  }

  export type TareaUncheckedUpdateManyWithoutEstadoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: NullableStringFieldUpdateOperationsInput | string | null
    fechaLimite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posicion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proyectoId?: StringFieldUpdateOperationsInput | string
  }

  export type TareasEtiquetasCreateManyEtiquetaInput = {
    tareaId: string
  }

  export type TareasEtiquetasUpdateWithoutEtiquetaInput = {
    tarea?: TareaUpdateOneRequiredWithoutEtiquetasNestedInput
  }

  export type TareasEtiquetasUncheckedUpdateWithoutEtiquetaInput = {
    tareaId?: StringFieldUpdateOperationsInput | string
  }

  export type TareasEtiquetasUncheckedUpdateManyWithoutEtiquetaInput = {
    tareaId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}