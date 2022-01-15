
export enum PromotionTypes {
  Basic = 'basic',
  Common = 'common',
  Epic = 'epic',
}

export enum UserGroups {
  Beginners = 'beginners',
  Veterans = 'veterans',
  Greek = 'greek',
  Spanish = 'spanish',
  Facebook = 'from-facebook',
  Friends = 'from-friends',
  Testers = 'testers',
}

export interface Promotion {
  _id?: string;
  _doc?: any,
  name: string;
  type: PromotionTypes;
  startDate: Date;
  endDate: Date;
  userGroup: UserGroups;
}