import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'neurodash-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // navega para ambos outlets automaticamente
    this.router.navigate([
      '/workbench',
      {
        outlets: {
          agents: ['agents'],
          chat: ['chat']
        }
      }
    ]);
  }
}


