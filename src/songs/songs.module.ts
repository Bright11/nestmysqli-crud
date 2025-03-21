import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';

@Module({
  providers: [
     SongsService
    // {
    //   provide:SongsService,
    //   useClass:SongsService,
    // }
  ],
  controllers: [SongsController]
})
export class SongsModule {}
