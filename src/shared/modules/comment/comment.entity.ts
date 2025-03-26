import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';

import { OfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public commentText: string;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public commentOfferId: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public commentUserId: Ref<UserEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public commentRating: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
