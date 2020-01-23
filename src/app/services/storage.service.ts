import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { HeatIndex } from '../models/heatIndex.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private STORAGE_KEY = 'local_hi';

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  store(heatIndex: HeatIndex) {
    const storedHeatIndexes = this.storage.get(this.STORAGE_KEY) || [];
    
    if (storedHeatIndexes.length == 5) {
      storedHeatIndexes.pop();
    }
    
    storedHeatIndexes.unshift(heatIndex);
    this.storage.set(this.STORAGE_KEY, storedHeatIndexes);
  }

  getHeatIndexes() {
    return this.storage.get(this.STORAGE_KEY) || [];
  }

  clearStorage() {
    this.storage.remove(this.STORAGE_KEY);
  }
}
