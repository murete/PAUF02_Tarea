import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // Manejar modal manualmente
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

    // Manejar formulario
    const form = this.el.nativeElement.querySelector('#inscripcionForm');
    if (form) {
      this.renderer.listen(form, 'submit', (event) => {
        event.preventDefault();
        if (form.checkValidity()) {
          this.hideAllModals(); // Cerrar modal del formulario
          form.reset();
          form.classList.remove('was-validated');
          this.showModal('#inscripcionConfirmModal');
          // Cerrar modal de confirmación después de 2 segundos
          setTimeout(() => {
            this.hideModal('#inscripcionConfirmModal');
          }, 2000);
        } else {
          form.classList.add('was-validated');
        }
      });
    }
  }

  private hideModal(targetId: string) {
    const modalElement = this.el.nativeElement.querySelector(targetId);
    if (modalElement) {
      this.renderer.removeClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'none');
      // Remover backdrop
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      // Restaurar scroll
      this.renderer.removeStyle(document.body, 'overflow');
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
