import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class LogService {
  log(txt: string) {
    console.log("Some text... " + txt)
  }
}
