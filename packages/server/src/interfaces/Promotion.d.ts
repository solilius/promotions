
enum PromotionTypes {
  Basic = 'Basic',
  Common = 'Common',
  Epic = 'Epic',
}

enum UserGroups {
  Beginners = 'Beginners',
  Regulars = 'Regulars',
  Veterans = 'Veterans',
  Masters = 'Masters',
}

export interface Promotion {
  name: string;
  type: PromotionTypes;
  startDate: Date;
  endDate: Date;
  userGroup: UserGroups;
}