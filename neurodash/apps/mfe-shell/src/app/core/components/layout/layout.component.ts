import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'neurodash-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  get isSidebarOpen() {
    return this.sidebar?.isOpen ?? true;
  }

  get isMobile() {
    return this.sidebar?.isMobile ?? false;
  }
}
