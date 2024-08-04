import { Body, Controller, Delete, Get, Put, Res, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDTO } from './dto/UserUpdateDTO';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Response } from 'express';
import { APIResponse } from 'src/common/utils/ApiResponse';
import { PasswordDTO } from './dto/PasswordDTO';
import {  ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private readonly userService : UserService) {}
    
    @UseGuards(AuthGuard)
    @Put()
    async updateUserProfile(@Body() userUpdateDto : UserUpdateDTO, @Request() req, @Res() res:Response) : Promise<any> {
        const userId = await req.user.id

        const updated = await this.userService.updateUser(userId, userUpdateDto)
        if(updated) return new APIResponse('user profile successfully updated', updated).ok(res)
        else return new APIResponse("user not found", null).notfound(res)

    }

    @UseGuards(AuthGuard)
    @Put('/password-update')
    async updateUserPassword(@Body() passwrodDto : PasswordDTO, @Request() req, @Res() res:Response) : Promise<any> {
        const userId = await req.user.id
        console.log(passwrodDto)

        const updatedPassword = await this.userService.updatePassword(userId, passwrodDto)
        if(updatedPassword) return new APIResponse('user password successfully updated', null).ok(res)
        else return new APIResponse("user not found", null).notfound(res)
    }

    @UseGuards(AuthGuard)
    @Delete()
    async deleteUser(@Request() req, @Res() res:Response) : Promise<any> {
        const userId = await req.user.id

        const deletedUser = await this.userService.deleteUser(userId)
        if(deletedUser.affected > 0) return new APIResponse('user successfully deleted', null).ok(res)
        else return new APIResponse("user not found", null).notfound(res)
        
    }

  



}
