import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // Manejar colapsables (acordeones)
    const collapseButtons = this.el.nativeElement.querySelectorAll('[data-bs-toggle="collapse"]');
    collapseButtons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', (event) => {
        event.preventDefault();
        const targetId = button.getAttribute('data-bs-target');
        if (targetId) {
          this.toggleCollapse(targetId, button);
        }
      });
    });

    // Manejar formulario
    const form = this.el.nativeElement.querySelector('#contactForm');
    if (form) {
      this.renderer.listen(form, 'submit', (event) => {
        event.preventDefault();
        this.showToast();
      });
    }
  }

  private toggleCollapse(targetId: string, button: HTMLElement) {
    const targetElement = this.el.nativeElement.querySelector(targetId);
    if (targetElement) {
      if (targetElement.classList.contains('show')) {
        this.renderer.removeClass(targetElement, 'show');
        this.renderer.addClass(button, 'collapsed');
      } else {
        this.renderer.addClass(targetElement, 'show');
        this.renderer.removeClass(button, 'collapsed');
      }
    }
  }

  private showToast() {
    const toastElement = this.el.nativeElement.querySelector('#toastMensaje');
    if (toastElement) {
      this.renderer.addClass(toastElement, 'show');
      // Ocultar después de 5 segundos
      setTimeout(() => {
        this.renderer.removeClass(toastElement, 'show');
      }, 5000);
    }
  }
}
