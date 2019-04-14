
export declare type RoleType = 'ROLE_ADMIN' | 'ROLE_USER' |
    'ROLE_INTERNAL_OPERATOR' | 'ROLE_ORGANIZATION_OPERATOR';

export interface IModel {
  projectFolder: string;
  entityName: string;
  outputFolder: string;
  restApi: string;
  role: RoleType;
}

export class Model implements IModel {
  constructor(
      public projectFolder: string, public entityName: string,
      public outputFolder: string, public restApi: string,
      public role: RoleType) {}
}
