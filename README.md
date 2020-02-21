# ngx-sign-pad
ngx-sign-pad is an Angular wrapper for [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).

## NOTICE
This is a fork of https://github.com/HeicoJoswig/ngx-sign-pad to make it ng 9 compatible.

## Usage

### 1. Install
`npm install ngx-sign-pad --save`

### 2. Import SignaturePadModule
```typescript

import { SignPadModule } from 'ngx-sign-pad';

...

@NgModule({
  declarations: [ ],
  imports: [ SignPadModule ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
```

### 3. Use ngx-sign-pad

```typescript
import { Component, ViewChild } from '@angular/core';
import { EImageType, SignPadComponent } from 'ngx-sign-pad';

@Component({
  template: '<ngx-sign-pad [(signature)]="signature" [type]="imageTypes.SVG"></ngx-sign-pad>'
})

export class AppComponent{

  imageTypes = EImageType;
  signature = null;
  @ViewChild(SignPadComponent) signaturePad: SignPadComponent;
  
  constructor() {
  }

  clear() {
    this.signaturePad.clear();
  }
}
```
