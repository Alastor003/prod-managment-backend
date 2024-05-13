import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../DTO/create-user.dto';
import { RegisterUserDto } from '../DTO/register-user.dto';
import { LoginResponse } from '../entities/login-response';
import { LoginDto } from '../DTO/login.dto';
import * as bcrypt from 'bcryptjs'
import { JwtPayload } from '../interfaces/jwt-payload';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userReposoitory: Repository<User>,
    private jwdService: JwtService
  ) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {

    // 1- encriptar la contraseña
    // 2 - Guardar el usuario
    // 3- generar el jason web token

    try {

      const {password, ...userData} = createUserDto;
      
      const newUser =  this.userReposoitory.create({
        password: bcrypt.hashSync(password, 10),
        ...userData
      });

      await this.userReposoitory.save(newUser);
      const {password:_, ...user} = newUser;

      return user

    } catch(error) {
      if(error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exist!`)
      }
      throw new InternalServerErrorException('Something terrible happen!') 
    }
    
  }

  async register(registerDto: RegisterUserDto): Promise<LoginResponse> {

    const user = await this.create( registerDto );

    return {
      user : user,
      token: this.getJwtToken({ id: user.idUser }),
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    
    const { email, password} = loginDto;

    const user = await this.userReposoitory.findOne(
        {where : {
            email
        } 
    });


    if(!user) {
      throw new UnauthorizedException('Not valid credentials');
    }

    if(bcrypt.compareSync(password, user.password) ) {
      throw new UnauthorizedException('Not valid password');
    }

    const { password:_, ...rest } = user;
    
    return {
      user : rest,
      token: this.getJwtToken({id: user.idUser}),
    }

  }

  findAll(): Promise<User[]> {
    return this.userReposoitory.find();
  }

  async findUserById( idUser: number ) {
    const user = await this.userReposoitory.findOne( { where : { idUser }} )
    const { password, ...rest } = user;
    return rest;

  }
  
  getJwtToken(payload: JwtPayload) {
    const token = this.jwdService.sign(payload)
    return token;
  }

}
