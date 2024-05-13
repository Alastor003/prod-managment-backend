import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from '../DTO/create-user.dto';
import { LoginDto } from '../DTO/login.dto';
import { RegisterUserDto } from '../DTO/register-user.dto';
import { LoginResponse } from '../entities/login-response';
import { User } from 'src/entities/user.entity';
import { UserService } from '../service/users.service';
import { AuthGuard } from '../guards/auth.guard';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto : LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.userService.register(registerDto)
  }

  @UseGuards( AuthGuard )
  @Get()
  findAll(@Request() req : Request) {
    // const user = req['user'];
    
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken( @Request() req: Request ): LoginResponse {
    const user = req['user'] as User ;

    return {
      user,
      token: this.userService.getJwtToken({id: user.idUser})
    }
  }

}
