import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import  { moveFromLeft, moveFromRight }  from  "ngx-router-animations";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('moveFromRight', [ transition('list => add', useAnimation(moveFromRight)) ]),
    trigger('moveFromLeft', [ transition('add => list', useAnimation(moveFromLeft)) ])
  ]
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
    this.toast.info('Sesión Cerrada', 'Aviso');
  }

}
