import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserService } from '../service/users.service';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService,
              private authService: UserService) {}

async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        {
          secret: process.env.JWD_SEED
        }
      );
      
      const user = await this.authService.findUserById( payload.id)
      if(!user) throw new UnauthorizedException('user does not exists')
      if(!user.isActive) throw new UnauthorizedException('user is not active')

      request['user'] = payload.id;

    } catch {
        throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
