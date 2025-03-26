import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { OfferEntity } from './offer.entity.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { MAX_COMMENT_COUNT } from '../comment/comment.constant.js';
import { CommentEntity } from '../comment/comment.entity.js';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {

    return this.offerModel
      .findById(offerId)
      .populate(['userId', 'city'])
      .exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .populate(['userId', 'city'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId', 'city'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        comments: 1,
      }}).exec();
  }

  public async findIsFavorite() {
    return this.offerModel
      .find({ 'isFavorite': true })
      .exec();
  }

  public async findPremium(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ isFavorite: SortType.Up })
      .limit(count)
      .populate(['userId', 'categories'])
      .exec();
  }

  public async findComments(): Promise<DocumentType<CommentEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id'},
            pipeline: [
              { $match: { $expr: { $in: ['$$offerId', '$commentOfferId'] } } },
              { $project: { _id: 1, commentRating: 1, commentText: 1, commentUserId: 1}}
            ],
            as: 'comments'
          },
        },
        { $addFields:
          { id: { $toString: '$_id'}, commentCount: { $size: '$comments'} }// добавили поле с оличеством комментариев
        },
        { $limit: MAX_COMMENT_COUNT },
        { $sort: { commentCount: SortType.Down } }
      ]).exec();
  }

  public async getRating() {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id'},
            pipeline: [
              { $match: { $expr: { $in: ['$$offerId', '$commentOfferId'] } } },
              { $project: { _id: 1, commentRating: 1}}
            ],
            as: 'commentsRatingAverage'
          },
        },
        { $addFields:
          { id: { $toString: '$_id'}, commentCount: { $size: '$comments'}, commentRating:{$avg: '$commentRating'} }
        },
        { $limit: MAX_COMMENT_COUNT },

      ]).exec();
  }

}
