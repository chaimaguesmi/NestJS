import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common/common.service';

@Injectable()
export class TestService {
    constructor(private readonly commonService: CommonService) {}

  printUUID(): string {
    const uuid = this.commonService.generateUUID();
    console.log('Generated UUID:', uuid); // Afficher l'UUID généré
    return uuid;
  }
}
