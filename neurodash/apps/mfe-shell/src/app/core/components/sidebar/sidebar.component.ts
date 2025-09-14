import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'neurodash-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isOpen = true;
  isMobile = false;
  currentRoute = '';

  menuItems = [
    { label: 'Dashboard', route: '/', icon: 'dashboard' },
      { label: 'Agentes', route: '/agents', icon: 'agents' },
      { label: 'Chat', route: '/chat', icon: 'chat' },
    { label: 'Configurações', route: '/settings', icon: 'settings' }
  ];

  constructor(private router: Router) {}

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
    this.trackCurrentRoute();
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

  onMenuClick() {
    // Fechar sidebar em mobile após clicar em um item
    if (this.isMobile) {
      this.isOpen = false;
    }
  }

  private trackCurrentRoute() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  isActiveRoute(route: string): boolean {
    if (route === '/') {
      return this.currentRoute === '/' || this.currentRoute === '';
    }
    return this.currentRoute.startsWith(route);
  }
}
