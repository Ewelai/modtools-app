import { Component, OnInit } from '@angular/core';
import { SearchService } from '@app/core/services/search.service';
import { Languages } from 'src/constants';
import { AppConstants } from '@core/constants/app-constants';

@Component({
  selector: 'app-generic-view',
  templateUrl: './generic-view.component.html',
  styleUrls: ['./generic-view.component.less']
})
export class GenericViewComponent implements OnInit {
  response: any;
  clients = [
    { id: 60,  name: 'Live' },
    { id: 61,  name: 'Sandbox' }
  ]
  selectedClient = this.clients[0].id;
  selectedLanguage = 'en';
  languages = Languages;
  contentTypes = AppConstants.contentType;
  selectedContentType = this.contentTypes[0].id;
  loading = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.getApiResponse();
  }

  /**
   * @author Sijo Kuriakose
   * @description retrieve api response
   */

  getApiResponse() {
    this.searchService.getApiResponse().subscribe(response => {
      this.loading = false;
      this.response = response;
    });
  }

  /**
   * @author Sijo Kuriakose
   * @description reload
   */

  onReload() {
    this.loading = true;
    this.searchService.onReload();
  }

  /**
   * @author Sijo Kuriakose
   * @description on client id change
   */
  onClientChanged() {
    this.loading = true;
    this.searchService.storeClientId(this.selectedClient);
  }

  /**
   * @author Sijo Kuriakose
   * @description on language change
   */
  onLanguageChanged() {
    this.loading = true;
    this.searchService.storeLanguage(this.selectedLanguage);
  }

  /**
   * @author Sijo Kuriakose
   * @description on Content type change
   */
  onContentTypeChanged() {
    this.loading = true;
    this.searchService.storeContentType(this.selectedContentType);
  }

}
