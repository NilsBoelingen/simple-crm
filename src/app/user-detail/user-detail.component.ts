import { Component, inject } from '@angular/core';
import { Firestore, Unsubscribe, doc, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  userId: string = '';
  unSubUser: any;
  user: User = new User();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
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
}
