import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Firestore } from '@angular/fire/firestore';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'simple-crm';
  firestore: Firestore = inject(Firestore);
  sidenavOpen = true;
  backdrop = false;

  ngOnInit() {
    setInterval(() => {
      this.closeSideNavOnResolutionChange();
      this.setBackdrop();
    }, 250);
  }

  closeSideNavOnResolutionChange() {
    if (window.innerWidth > 1580) {
      this.sidenavOpen = true;
    } else {
      this.sidenavOpen = false;
    }
  }

  setBackdrop() {
    if (window.innerWidth <= 960) {
      this.backdrop = true;
    } else {
      this.backdrop = false;
    }
  }
}
