import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.css']
})
export class NotFoundComponent implements OnInit {
  isImageVisible = false;

  constructor(
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.isImageVisible = true;
    }, 100);
  }

  goBack(): void {
    this.location.back();
  }

  redirectToHome(): void {
    this.router.navigate(['/']);
  }
}
