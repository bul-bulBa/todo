import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Authorization } from 'src/auth/decorators/auth.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { AuthMethod } from 'prisma/generated/enums';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Get('profile')
  async findProfile(@Authorized('id') userId: string) {
    return this.userService.findById(userId)
  }

  @Get('by-id/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id)
  }

  @Post('create')
  async create(@Body() dto: {email: string, password: string, method: AuthMethod, isVerified: boolean}) {
    return this.userService.create(
      dto.email, dto.password, dto.method, dto.isVerified
    )
  }
}
