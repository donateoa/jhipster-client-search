
export declare type RoleType = 'ROLE_ADMIN' | 'ROLE_USER' |
    'ROLE_INTERNAL_OPERATOR' | 'ROLE_ORGANIZATION_OPERATOR';

export interface IModel {
  projectFolder: string;
  entityName: string;
  translationLabel: string;
  entityFolder: string;
  outputFolder: string;
  restApi: string;
  role: RoleType;
  microservice: string;
  projectName: string;
  useTranslation: string
}

export class Model implements IModel {
  constructor(
      public projectFolder: string, public entityName: string,
      public translationLabel: string, public entityFolder: string,
      public outputFolder: string, public restApi: string,
      public role: RoleType, public microservice: string,
      public projectName: string, public useTranslation: string) {}
}
