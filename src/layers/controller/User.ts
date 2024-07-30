import { Controller,Get,Body,Post, Req, Res, Param, Query } from "@nestjs/common";


@Controller("users") //Controller notasyonu
export class UserController{
  @Get("")
  fun() {
    return "test"
  }
    
}