import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { UserData } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements UserData {
  @prop({
    required: true,
    minlength: [1, 'Min length for name path is 1'],
    maxLength: [15, 'Max length for name path is 15'],
  })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarUrl: string;

  @prop({ required: true, })
  public isPro: string;

  @prop({
    required: true,
    minlength: [6, 'Min length for password path is 6'],
    //maxLength: [12, 'Max length for password path is 12'],
  })
  private password?: string;

  constructor(userData: UserData) {
    super();

    this.email = userData.email;
    this.name = userData.name;
    this.isPro = userData.isPro;
    this.avatarUrl = userData.avatarUrl;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
