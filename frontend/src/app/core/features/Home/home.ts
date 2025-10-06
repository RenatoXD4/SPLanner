import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  currentSlide = 0;
  isRedirecting = false;
  isImageVisible = false;

  constructor(private router: Router) {}

  redirectToLogin(): void {
    this.isRedirecting = true;
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    if (typeof document === 'undefined') return;

    const revealElement = document.querySelector('.reveal-image-container');
    if (revealElement) {
      const elementTop = revealElement.getBoundingClientRect().top;
      const elementVisible = 150;

      this.isImageVisible = elementTop < window.innerHeight - elementVisible;
    }
  }
}
