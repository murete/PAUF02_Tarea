import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // Manejar colapsables manualmente
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
  }

  private toggleCollapse(targetId: string, button: HTMLElement) {
    const targetElement = this.el.nativeElement.querySelector(targetId);
    if (targetElement) {
      if (targetElement.classList.contains('show')) {
        this.renderer.removeClass(targetElement, 'show');
        this.renderer.setAttribute(button, 'aria-expanded', 'false');
      } else {
        this.renderer.addClass(targetElement, 'show');
        this.renderer.setAttribute(button, 'aria-expanded', 'true');
      }
    }
  }
}
