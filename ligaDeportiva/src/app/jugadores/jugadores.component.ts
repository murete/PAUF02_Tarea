import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements AfterViewInit {

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

    // Manejar modales manualmente
    const modalButtons = this.el.nativeElement.querySelectorAll('[data-bs-toggle="modal"]');
    modalButtons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', (event) => {
        event.preventDefault();
        const targetId = button.getAttribute('data-bs-target');
        if (targetId) {
          this.showModal(targetId);
        }
      });
    });

    // Manejar cerrar modales
    const closeButtons = this.el.nativeElement.querySelectorAll('.btn-close, [data-bs-dismiss="modal"]');
    closeButtons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', () => {
        this.hideAllModals();
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

  private showModal(targetId: string) {
    const modalElement = this.el.nativeElement.querySelector(targetId);
    if (modalElement) {
      this.renderer.addClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'block');
      // Agregar backdrop
      const backdrop = this.renderer.createElement('div');
      this.renderer.addClass(backdrop, 'modal-backdrop');
      this.renderer.addClass(backdrop, 'show');
      this.renderer.appendChild(document.body, backdrop);
      // Prevenir scroll
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  private hideAllModals() {
    const modals = this.el.nativeElement.querySelectorAll('.modal');
    modals.forEach((modal: HTMLElement) => {
      this.renderer.removeClass(modal, 'show');
      this.renderer.setStyle(modal, 'display', 'none');
    });
    // Remover backdrop
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
    // Restaurar scroll
    this.renderer.removeStyle(document.body, 'overflow');
  }
}
