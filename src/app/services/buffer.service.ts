import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BufferService {
  private bufferData: Map<string, any> = new Map();

  constructor() {
  }

  setBufferedItem(key: string, item: any, timeoutMilliSeconds: number = null) {
    this.bufferData.set(key, item);
    if (timeoutMilliSeconds !== null) {
      setTimeout(() => this.bufferData.delete(key), timeoutMilliSeconds);
    }
  }

  getBufferItem(key: string) {
    return this.bufferData.get(key);
  }

  deleteBufferItem(key: string) {
    return this.bufferData.delete(key);
  }

  clearBuffer() {
    this.bufferData.clear();
  }
}
