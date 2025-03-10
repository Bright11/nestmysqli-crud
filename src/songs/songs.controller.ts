import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseArrayPipe, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService:SongsService){}
@Get()
findAll(){
   try {
    return this.songsService.allsong()
   } catch (error) {
    throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR
    )
   }
}


// fetch song byId
@Get("getsinglsong/:id")
findOn(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    return this.songsService.singlesong(id); // Pass id directly
}
// fetch song byId
@Put("update/:id")
update(@Query() id:string){
    //return this.songsService()
}

@Post('postsong')
create(@Body() createsongDTO:CreateSongDTO){
    return this.songsService.createsong(createsongDTO)
}

@Delete("delete/:id")
delete(){

}



}
