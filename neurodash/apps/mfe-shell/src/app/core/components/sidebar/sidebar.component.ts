import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'neurodash-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isOpen = true;
  isMobile = false;

  menuItems = [
    { label: 'Dashboard', route: '/', icon: 'dashboard' },
    { label: 'Agentes', route: '/agents', icon: 'agents' },
    { label: 'Chat', route: '/chat', icon: 'chat' },
    { label: 'Configurações', route: '/settings', icon: 'settings' }
  ];

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
