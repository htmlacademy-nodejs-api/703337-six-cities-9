import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';

import { RentType } from '../../types/index.js';
import { CityEntity } from '../city/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public date!: Date;

  @prop({
    ref: CityEntity,
    required: true,
    _id: false
  })
  public city!: Ref<CityEntity>;

  @prop()
  public previewImage!: string;

  @prop({
    type: () => String,
    default: [],
  })
  public images!: string [];

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;

  @prop()
  public rating!: number;

  @prop({
    type: () => String,
    enum: RentType
  })
  public type!: RentType;

  @prop()
  public bedrooms!: number;

  @prop()
  public maxAdults!: number;

  @prop()
  public price!: number;

  @prop({
    type: () => String,
    default: [],
  })
  public goods!: string[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public hostId!: Ref<UserEntity>;

  @prop({default: 0})
  public comments!: number;

  @prop()
  public latitude!: number;

  @prop()
  public longitude!: number;

}

export const OfferModel = getModelForClass(OfferEntity);
