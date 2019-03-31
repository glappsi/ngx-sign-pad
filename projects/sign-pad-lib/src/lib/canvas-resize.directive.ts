import {
  Directive,
  AfterViewInit,
  Renderer2,
  ElementRef,
  Input
} from '@angular/core';
import SignaturePad from 'signature_pad';
import { EImageType } from './models/image-type.enum';

@Directive({
  selector: '[libCanvasResize]'
})
export class CanvasResizeDirective implements AfterViewInit {

  @Input() private signaturePad: SignaturePad;
  private currentSignature: string;


  constructor(private canvasElementRef: ElementRef<HTMLCanvasElement>, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.renderer.listen(window, 'resize', () => {

      this.currentSignature = this.signaturePad.toDataURL(EImageType.PNG);
      console.log("before resize", this.currentSignature);

      this.resizeCanvas();
      this.signaturePad.clear();

      const canvas = this.canvasElementRef.nativeElement;
      this.signaturePad.fromDataURL(this.currentSignature,
        {
          ratio: Math.max(window.devicePixelRatio || 1, 1),
          height: parseFloat(canvas.getAttribute('height')),
          width: parseFloat(canvas.getAttribute('width'))
        },
        (error) => {
          if (error) {
            console.log("could not redraw", error);
            this.signaturePad.clear();

            // @ts-ignore
            // this.signaturePad._strokeEnd.apply(this.signaturePad);
          }
        });
    });
    this.resizeCanvas();
  }

  private resizeCanvas() {
    const canvas = this.canvasElementRef.nativeElement;
    const container = this.renderer.parentNode(canvas);
    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    this.renderer.setAttribute(canvas, 'width', (container.offsetWidth * ratio).toString());
    this.renderer.setAttribute(canvas, 'height', (container.offsetHeight * ratio).toString());
    canvas.getContext('2d').scale(ratio, ratio);
  }

}