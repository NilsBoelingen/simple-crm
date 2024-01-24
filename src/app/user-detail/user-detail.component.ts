import { Component, inject } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditAddressDialogComponent } from '../edit-address-dialog/edit-address-dialog.component';
import { EditNameDialogComponent } from '../edit-name-dialog/edit-name-dialog.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  userId: string = '';
  unSubUser: any;
  user: User = new User();

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id')!.toString();
      this.getUser();
    })
  }

  ngOnDestroy() {
    this.unSubUser();
  }

  getUser() {
    this.unSubUser = onSnapshot(doc(this.firestore, 'users', this.userId), (user) => {
      this.user = new User(user.data());
    });
  }

  editUserAddress() {
    const dialog = this.dialog.open(EditAddressDialogComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUserName() {
    const dialog = this.dialog.open(EditNameDialogComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
