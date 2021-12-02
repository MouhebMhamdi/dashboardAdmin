import { EventEmitter,Component, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggeleSideBarForMe:EventEmitter<any> =new EventEmitter();

  constructor() { }

  ngOnInit(): void {
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
