import { Module } from '@nestjs/common';
import { UserController } from './controller/users.controller';
import { UserService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './jwt.constants';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: jwtSecret.secret,
            signOptions: { expiresIn: '1h' },
          }),
],
    controllers: [UserController],
    providers: [UserService],
})
export class UsersModule {}
