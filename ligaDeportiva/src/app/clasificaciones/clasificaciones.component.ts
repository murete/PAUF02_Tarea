import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-clasificaciones',
  templateUrl: './clasificaciones.component.html',
  styleUrls: ['./clasificaciones.component.css']
})
export class ClasificacionesComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // Manejar tabs manualmente
    const tabButtons = this.el.nativeElement.querySelectorAll('[data-bs-toggle="tab"]');
    tabButtons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', (event) => {
        event.preventDefault();
        const targetId = button.getAttribute('data-bs-target');
        if (targetId) {
          this.switchTab(targetId, button);
        }
      });
    });
  }

  private switchTab(targetId: string, activeButton: HTMLElement) {
    // Remover active de todos los botones
    const allButtons = this.el.nativeElement.querySelectorAll('.nav-link');
    allButtons.forEach((btn: HTMLElement) => {
      this.renderer.removeClass(btn, 'active');
      this.renderer.setAttribute(btn, 'aria-selected', 'false');
    });

    // Agregar active al botón clicado
    this.renderer.addClass(activeButton, 'active');
    this.renderer.setAttribute(activeButton, 'aria-selected', 'true');

    // Remover show active de todos los panes
    const allPanes = this.el.nativeElement.querySelectorAll('.tab-pane');
    allPanes.forEach((pane: HTMLElement) => {
      this.renderer.removeClass(pane, 'show');
      this.renderer.removeClass(pane, 'active');
    });

    // Agregar show active al pane objetivo
    const targetPane = this.el.nativeElement.querySelector(targetId);
    if (targetPane) {
      this.renderer.addClass(targetPane, 'show');
      this.renderer.addClass(targetPane, 'active');
    }
  }
}
