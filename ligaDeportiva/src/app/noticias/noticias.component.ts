import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements AfterViewInit {

  private carouselInterval: any;
  private currentSlide = 0;
  private totalSlides = 4; // Número de slides

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // Inicializar carrusel manual
    this.initCarousel();

    // Manejar botones de navegación del carrusel
    const prevButton = this.el.nativeElement.querySelector('.carousel-control-prev');
    const nextButton = this.el.nativeElement.querySelector('.carousel-control-next');
    if (prevButton) {
      this.renderer.listen(prevButton, 'click', () => this.prevSlide());
    }
    if (nextButton) {
      this.renderer.listen(nextButton, 'click', () => this.nextSlide());
    }

    // Manejar botones de modal manualmente
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

  private initCarousel() {
    const carouselItems = this.el.nativeElement.querySelectorAll('.carousel-item');
    this.totalSlides = carouselItems.length;
    this.updateCounter();

    // Función para cambiar slide
    const nextSlide = () => {
      this.nextSlide();
    };

    // Iniciar intervalo
    this.carouselInterval = setInterval(nextSlide, 3000); // Cambiar cada 3 segundos
  }

  private nextSlide() {
    const carouselItems = this.el.nativeElement.querySelectorAll('.carousel-item');
    carouselItems[this.currentSlide].classList.remove('active');
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    carouselItems[this.currentSlide].classList.add('active');
    this.updateCounter();
  }

  private prevSlide() {
    const carouselItems = this.el.nativeElement.querySelectorAll('.carousel-item');
    carouselItems[this.currentSlide].classList.remove('active');
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    carouselItems[this.currentSlide].classList.add('active');
    this.updateCounter();
  }

  private updateCounter() {
    const counterEl = this.el.nativeElement.querySelector('#carousel-counter');
    if (counterEl) {
      counterEl.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
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

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
}
