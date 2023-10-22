import { AuthService } from '@auth';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private readonly authService: AuthService) {}
    async signin(username, password) {
        const data = await this.authService.signIn(username, password);
        return data;
    }
}
