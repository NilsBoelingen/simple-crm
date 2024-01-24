import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatCardModule, CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  firestore: Firestore = inject(Firestore);
  unSubUsers: any;
  allUsers: any = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.unSubUsers = onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = [];
      list.forEach((obj) => {
        let user: User = obj.data() as any;
        user['id'] = obj.id;
        this.allUsers.push(user);
      })
    })
  }

  ngOnDestroy() {
    this.unSubUsers();
  }

  openDialog() {
    this.dialog.open(AddUserDialogComponent);
  }
}
