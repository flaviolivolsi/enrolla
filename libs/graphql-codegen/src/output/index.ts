import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A field whose value conforms to the standard cuid format as specified in https://github.com/ericelliott/cuid#broken-down */
  Cuid: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A field whose value is a Semantic Version: https://semver.org */
  SemVer: any;
};

export type ApiToken = {
  __typename?: 'ApiToken';
  createdAt: Scalars['DateTime'];
  id: Scalars['Cuid'];
  name: Scalars['String'];
  token: Scalars['String'];
};

export type CreateApiTokenInput = {
  name: Scalars['String'];
};

export type CreateCustomerInput = {
  createOrganizationName?: InputMaybe<Scalars['String']>;
  features: Array<FeatureInstanceInput>;
  name: Scalars['String'];
  organizationId?: InputMaybe<Scalars['String']>;
  packageId?: InputMaybe<Scalars['String']>;
};

export type CreateFeatureInput = {
  defaultValue: Scalars['JSON'];
  description?: InputMaybe<Scalars['String']>;
  key: Scalars['String'];
  type: FeatureType;
};

export type CreateOrganizationInput = {
  name: Scalars['String'];
};

export type CreatePackageInput = {
  description?: InputMaybe<Scalars['String']>;
  features: Array<FeatureInstanceInput>;
  icon?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parentPackageId?: InputMaybe<Scalars['Cuid']>;
};

export type CreateSecretInput = {
  customerId: Scalars['String'];
  key: Scalars['String'];
  value: Scalars['String'];
};

export type Customer = {
  __typename?: 'Customer';
  createdAt: Scalars['DateTime'];
  effectiveConfiguration: Array<FeatureValue>;
  features: Array<FeatureValue>;
  id: Scalars['Cuid'];
  name: Scalars['String'];
  organizationId?: Maybe<Scalars['String']>;
  package?: Maybe<Package>;
  packageId?: Maybe<Scalars['String']>;
  secrets: Array<Secret>;
  tenantId: Scalars['String'];
};

export type Feature = {
  __typename?: 'Feature';
  createdAt: Scalars['DateTime'];
  defaultValue: Scalars['JSON'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Cuid'];
  key: Scalars['String'];
  tenantId: Scalars['String'];
  type: FeatureType;
};

export type FeatureInstanceInput = {
  featureId: Scalars['Cuid'];
  value: Scalars['JSON'];
};

export enum FeatureType {
  Boolean = 'BOOLEAN',
  Float = 'FLOAT',
  Integer = 'INTEGER',
  Json = 'JSON',
  String = 'STRING'
}

export type FeatureValue = {
  __typename?: 'FeatureValue';
  feature: Feature;
  value: Scalars['JSON'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createApiToken: ApiToken;
  createCustomer: Customer;
  createFeature: Feature;
  createOrganization: Organization;
  createPackage: Package;
  createSecret: Secret;
  removeApiToken: ApiToken;
  removeCustomer: Customer;
  removeFeature: Feature;
  removeOrganization: Organization;
  removePackage: Package;
  updateCustomer: Customer;
  updateFeature: Feature;
  updateOrganization: Organization;
  updatePackage: Package;
};


export type MutationCreateApiTokenArgs = {
  input: CreateApiTokenInput;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateFeatureArgs = {
  input: CreateFeatureInput;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreatePackageArgs = {
  input: CreatePackageInput;
};


export type MutationCreateSecretArgs = {
  input: CreateSecretInput;
};


export type MutationRemoveApiTokenArgs = {
  id: Scalars['String'];
};


export type MutationRemoveCustomerArgs = {
  id: Scalars['String'];
};


export type MutationRemoveFeatureArgs = {
  id: Scalars['String'];
};


export type MutationRemoveOrganizationArgs = {
  id: Scalars['String'];
};


export type MutationRemovePackageArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateFeatureArgs = {
  input: UpdateFeatureInput;
};


export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


export type MutationUpdatePackageArgs = {
  input: UpdatePackageInput;
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Package = {
  __typename?: 'Package';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  effectiveConfiguration: Array<FeatureValue>;
  features: Array<FeatureValue>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Cuid'];
  name: Scalars['String'];
  parentPackage?: Maybe<Package>;
  parentPackageId?: Maybe<Scalars['Cuid']>;
  tenantId: Scalars['String'];
  version: Scalars['SemVer'];
};

export type Query = {
  __typename?: 'Query';
  apiTokens: Array<ApiToken>;
  customer: Customer;
  customers: Array<Customer>;
  feature: Feature;
  features: Array<Feature>;
  organization: Organization;
  organizations: Array<Organization>;
  package: Package;
  packages: Array<Package>;
};


export type QueryCustomerArgs = {
  id: Scalars['String'];
};


export type QueryFeatureArgs = {
  id: Scalars['String'];
};


export type QueryOrganizationArgs = {
  id: Scalars['String'];
};


export type QueryPackageArgs = {
  id: Scalars['String'];
};

export type Secret = {
  __typename?: 'Secret';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type UpdateCustomerInput = {
  createOrganizationName?: InputMaybe<Scalars['String']>;
  features?: InputMaybe<Array<FeatureInstanceInput>>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  organizationId?: InputMaybe<Scalars['String']>;
  packageId?: InputMaybe<Scalars['String']>;
};

export type UpdateFeatureInput = {
  id: Scalars['Cuid'];
};

export type UpdateOrganizationInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdatePackageInput = {
  id: Scalars['Cuid'];
};

export type GetAllCustomerFeaturesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCustomerFeaturesQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'Customer', organizationId?: string | null, effectiveConfiguration: Array<{ __typename?: 'FeatureValue', value: any, feature: { __typename?: 'Feature', key: string, type: FeatureType } }> }> };


export const GetAllCustomerFeaturesDocument = gql`
    query getAllCustomerFeatures {
  customers {
    organizationId
    effectiveConfiguration {
      feature {
        key
        type
      }
      value
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAllCustomerFeatures(variables?: GetAllCustomerFeaturesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllCustomerFeaturesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllCustomerFeaturesQuery>(GetAllCustomerFeaturesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllCustomerFeatures', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;