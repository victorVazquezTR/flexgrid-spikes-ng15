import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Spikes</h2>
    <ol>
      <li>
        <a routerLink="/checkbox-in-first-column">Checkbox in first column</a>
      </li>
      <li>
        <a routerLink="/multiple-components-in-cells"
          >Multiple components in cells</a
        >
      </li>
      <li><a routerLink="/inline-validation">Inline validation</a></li>
      <li><a routerLink="/accessible-editing">Accessible Editing</a></li>
      <li><a routerLink="/firm-flow">Firm Flow</a></li>
    </ol>
  `,
})
export class DashboardComponent {}
