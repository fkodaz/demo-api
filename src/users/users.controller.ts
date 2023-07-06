import { Controller, Post, Body, HttpException, HttpStatus, HttpCode, UseGuards, Get, Request } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UserGuard } from "./user.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.usersService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    let user = await this.usersService.findOne(createUserDto.email);

    if (user) {
      throw new HttpException("User Available", HttpStatus.UNAUTHORIZED);
    }

    const createdUser = await this.usersService.create(createUserDto);
    if (createdUser) {
      return this.usersService.signIn(createdUser.email, createdUser.password);
    }
  }

  @UseGuards(UserGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
