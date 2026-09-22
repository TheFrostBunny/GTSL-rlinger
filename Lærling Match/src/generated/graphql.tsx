import { offlineExchange } from '@urql/exchange-graphcache';
import { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver } from '@urql/exchange-graphcache';

import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Success: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type CreateUserInput = {
  readonly name: Scalars['String']['input'];
};

export type CreateUserPayload = {
  readonly __typename?: 'CreateUserPayload';
  readonly query: Query;
  readonly user?: Maybe<User>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly createUser: CreateUserPayload;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  readonly id: Scalars['ID']['output'];
};

export type Query = {
  readonly __typename?: 'Query';
  /** Fetches an object given its ID. */
  readonly node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  readonly nodes: ReadonlyArray<Maybe<Node>>;
  readonly user?: Maybe<User>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: ReadonlyArray<Scalars['ID']['input']>;
};


export type QueryUserArgs = {
  userId: Scalars['ID']['input'];
};

export type Subscription = {
  readonly __typename?: 'Subscription';
  readonly onUserCreated: User;
};

export type User = Node & {
  readonly __typename?: 'User';
  readonly id: Scalars['ID']['output'];
  readonly name?: Maybe<Scalars['String']['output']>;
};

export type UserFragment = { readonly __typename?: 'User', readonly id: string, readonly name?: string | null };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
}
    `;
export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  CreateUserPayload?: (data: WithTypename<CreateUserPayload>) => null | string,
  User?: (data: WithTypename<User>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    node?: GraphCacheResolver<WithTypename<Query>, QueryNodeArgs, WithTypename<User> | string>,
    nodes?: GraphCacheResolver<WithTypename<Query>, QueryNodesArgs, Array<WithTypename<User> | string>>,
    user?: GraphCacheResolver<WithTypename<Query>, QueryUserArgs, WithTypename<User> | string>
  },
  CreateUserPayload?: {
    query?: GraphCacheResolver<WithTypename<CreateUserPayload>, Record<string, never>, WithTypename<Query> | string>,
    user?: GraphCacheResolver<WithTypename<CreateUserPayload>, Record<string, never>, WithTypename<User> | string>
  },
  User?: {
    id?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  createUser?: GraphCacheOptimisticMutationResolver<MutationCreateUserArgs, WithTypename<CreateUserPayload>>
};

export type GraphCacheUpdaters = {
  Query?: {
    node?: GraphCacheUpdateResolver<{ node: Maybe<WithTypename<User>> }, QueryNodeArgs>,
    nodes?: GraphCacheUpdateResolver<{ nodes: Array<WithTypename<User>> }, QueryNodesArgs>,
    user?: GraphCacheUpdateResolver<{ user: Maybe<WithTypename<User>> }, QueryUserArgs>
  },
  Mutation?: {
    createUser?: GraphCacheUpdateResolver<{ createUser: WithTypename<CreateUserPayload> }, MutationCreateUserArgs>
  },
  Subscription?: {
    onUserCreated?: GraphCacheUpdateResolver<{ onUserCreated: WithTypename<User> }, Record<string, never>>
  },
  CreateUserPayload?: {
    query?: GraphCacheUpdateResolver<Maybe<WithTypename<CreateUserPayload>>, Record<string, never>>,
    user?: GraphCacheUpdateResolver<Maybe<WithTypename<CreateUserPayload>>, Record<string, never>>
  },
  User?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>
  },
};

export type GraphCacheConfig = Parameters<typeof offlineExchange>[0] & {
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
};