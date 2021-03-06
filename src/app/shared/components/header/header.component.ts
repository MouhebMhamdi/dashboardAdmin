import { EventEmitter,Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { Users } from 'src/app/core/Model/User';
import { UserService } from 'src/app/core/Services/auth/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggeleSideBarForMe:EventEmitter<any> =new EventEmitter();

  users: Users;
  hide:boolean;
  data:any;
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  constructor(public router: Router,private authService:UserService,private darkModeService: DarkModeService) { }

  onToggle(): void {
    this.darkModeService.toggle();
   
  }
  ngOnInit(): void {
    this.verifUserRoleConncet(String(localStorage.getItem("email")))
    this.authService.sharedUser.subscribe(
      (data:Users)=>
      {this.users=data},
      ()=>{},
      ()=>{this.users = new Users()}
    )
      
      this.data=localStorage.getItem("data");
  }

  ngOnChanges():void{
    this.authService.sharedUser.subscribe(
      (data:Users)=>
      {this.users=data},
      ()=>{},
      ()=>{this.users = new Users()}
    )
  
  }

  verifUserRoleConncet(email:string){
    this.authService.getUserConnect(String(email)).subscribe(user =>{})
}

logout(){
 
  this.authService.sharedUser.subscribe(
    (data:Users)=>
    {this.users=new Users()},
    ()=>{},
    ()=>{this.users = new Users()}
  )
  this.authService.logOut();
  
}
  toggleSideBar(){
    
    this.toggeleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 50);
  }
}
