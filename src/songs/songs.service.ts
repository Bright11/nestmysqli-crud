import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
    
    allsong(){
        return "God is good"
    }

    createsong(createsongDTO){
        return createsongDTO;
    }

    singlesong(id:number){
        return id;
    }
    
}
