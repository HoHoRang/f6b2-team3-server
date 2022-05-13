import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePurchaseInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  productId: string;

  @Field(() => String)
  recieverName: string;

  @Field(() => String)
  recieverPhone: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  addressDetail: string;

  @Field(() => Int)
  itemCount: number;
}
