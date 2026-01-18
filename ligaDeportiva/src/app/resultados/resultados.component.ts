import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // Seleccionar todos los botones de acordeón
    const accordionButtons = this.el.nativeElement.querySelectorAll('.accordion-button');

    accordionButtons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', (event) => {
        event.preventDefault();
        const targetId = button.getAttribute('data-bs-target');
        if (targetId) {
          const targetElement = this.el.nativeElement.querySelector(targetId);
          if (targetElement) {
            // Toggle la clase 'show'
            if (targetElement.classList.contains('show')) {
              this.renderer.removeClass(targetElement, 'show');
              this.renderer.addClass(button, 'collapsed');
            } else {
              this.renderer.addClass(targetElement, 'show');
              this.renderer.removeClass(button, 'collapsed');
            }
          }
        }
      });
    });
  }
}
