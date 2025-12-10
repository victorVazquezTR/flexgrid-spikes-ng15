import {
  Component,
  ElementRef,
  AfterViewInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DataService } from '../multiple-components-in-cells/data.service';
import { SafStatusInstance } from '@saffron/core-components';
import * as wijmo from '@mescius/wijmo';
import * as wjcGrid from '@mescius/wijmo.grid';
import { Selector } from '@mescius/wijmo.grid.selector';

@Component({
  selector: 'app-inline-validation',
  templateUrl: './inline-validation.component.html',
  styleUrls: ['./inline-validation.component.scss'],
})
export class InlineValidationComponent implements AfterViewInit {
  view: wijmo.CollectionView;
  items: any = [];
  data: any = [];
  selector: any;
  headers = true;
  templateSimpleLink: any;
  actions: any = [];
  colors: any = [];
  @ViewChild('debitRef', { static: false })
  divInlineValidation!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2, private dataService: DataService) {
    this.items = [
      {
        reference: 'AJE1 (6 items)',
        account: '',
        debit: '',
        credit: '$100.00',
        actions: 'Include',
      },
      {
        reference: 'RJE1 (2 items)',
        account: '',
        debit: '$120',
        credit: '0',
        actions: '',
      },
      {
        reference: 'MJE2 (3 items)',
        account: '1006',
        debit: '$112.00',
        credit: '0',
        actions: '',
      },
      {
        reference: 'NME2 (4 items)',
        account: '1007',
        debit: '$245.78',
        credit: '$432.09',
        actions: 'Include',
      },
    ];

    this.actions = ['Include', 'Delete', 'Edit'];

    this.view = new wijmo.CollectionView(this.items, {
      sortDescriptions: [''],
      getError: this.getError.bind(this),
    });
  }

  ngAfterViewInit(): void {
    console.log('debitRef', this.divInlineValidation);
    // this.divInlineValidation.nativeElement.style.backgroundColor = 'red';
  }

  initGrid(grid: wjcGrid.FlexGrid) {
    this.selector = new Selector(grid, {
      itemChecked: () => {
        this.items = grid.rows.filter((r) => r.isSelected);
      },
    });

    this.view = this.data;
  }

  getError(item: any, propName: string) {
    switch (propName) {
      case 'account':
        // console.info('item', item);
        // console.log('item prop name', item[propName] === '');
        // item[propName].className = 'invalid';
        return item[propName] === '' ? ' ' : null;
      case 'debit':
      case 'credit':
        // console.log('propNAme', item[propName]);
        // return item[propName] === null || undefined ? '' : '';
        return;
      default:
        // console.log('item', item);
        return;
    }
  }

  onFormatItem(grid: any, event: any) {
    // console.log('grid', grid.cells);
    // console.log('event', event.cell.className);
    // cell
    if (event.cell.className.includes('wj-state-invalid')) {
      event.cell.style.color = 'red';
      event.cell.className += ' invalid-cell ';
      event.cell.innerText = 'Enter an existing account.';
      event.cell.addEventListener('dblclick', (event: any) => {
        console.log('event', event.cell);

        // if (event.cell.innerText) {
        //   event.cell.style.color = 'grey';
        // }
        // event.cell.innerText = '';
      });
      return;
    } else if (event.cell.className.includes('wj-header wj-state-invalid')) {
      //
    }
    // if (grid.cells === event.panel) {
    //   event.cell.setAttribute('id', `row-${event.row}-col-${event.col}`);
    // }
  }

  tooltipContent(hti: any) {
    let item = hti.item;
    return `<b>Country: </b>${item.account} <img src="resources/${item.account}.png" /></br>downloads: ${item.downloads}</br>sales: ${item.sales}`;
  }
}

