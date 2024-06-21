import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: any = {
    emailId: "",
    password: ""
  }


  masterSrv = inject(MasterService);
  router = inject(Router);

  onLogin() {
    this.masterSrv.login(this.loginObj).subscribe((res: any) => {
      if (res.length > 0) {
        const user = res[0];
        if (user.emailId === this.loginObj.emailId && user.password === this.loginObj.password) {
          localStorage.setItem('ticketuser', JSON.stringify(user));
          this.router.navigateByUrl('dashboard');
        } else {
          alert('Invalid email or password');
        }
      } else {
        alert('User not found');
      }
    }, (error) => {
      alert('An error occurred during login.');
      console.error(error);
    });
  }
}
