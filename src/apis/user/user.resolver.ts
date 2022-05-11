import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchLoginUser(
    @CurrentUser() currentUser: any, //
  ) {
    return await this.userService.findOne({ userId: currentUser.id });
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    return this.userService.create({ createUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUser(
    @CurrentUser() currentUser: any, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const userId = currentUser.id;

    return await this.userService.update({
      userId,
      updateUserInput,
    });
  }

  // 관리자만
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteUser(
    @Args('userId') userId: string, //
    @CurrentUser() currentUser: any,
  ) {
    // 관리자인지 체크
    const adminId = currentUser.id;
    await this.userService.checkAdmin({ userId: adminId });

    // 관리자를 삭제하는지 체크
    await this.userService.noAdmin({ userId: userId });

    // 삭제
    return await this.userService.delete({ userId });
  }
}
