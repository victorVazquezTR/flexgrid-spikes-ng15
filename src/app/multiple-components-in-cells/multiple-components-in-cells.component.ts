import { OnInit, AfterViewInit, Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import * as wjcGrid from '@mescius/wijmo.grid';
import { Selector } from '@mescius/wijmo.grid.selector';
import { CellMaker } from '@mescius/wijmo.grid.cellmaker';
import { CollectionView } from '@mescius/wijmo';

import { DataService } from './data.service';
import { SafStatusInstance } from '@saffron/core-components';

const { FlexGrid, HeadersVisibility } = wjcGrid;

@Component({
  selector: 'app-multiple-components-in-cells',
  templateUrl: './multiple-components-in-cells.component.html',
  styleUrls: ['./multiple-components-in-cells.component.scss'],
})
export class MultipleComponentsInCellsComponent implements OnInit, AfterViewInit {
  title = 'add-checkbox-first-column-flexgrid';
  view: any;
  items: any = [];
  data: any = [];
  selector: any;
  headers = true;
  templateSimpleLink: any;
  actions: any = [];
  colors: any = [];
  @ViewChild('myRef') myRef: ElementRef<SafStatusInstance> | undefined;

  constructor(private renderer: Renderer2, private dataService: DataService) {
    this.items = [
      {
        consentId: '33e0378',
        provider: 'Client Keys',
        authorizationStatus: 'Received',
        iconStatus: 'check-circle',
        iconColor: 'green',
        validUntil: 'Actions',
      },
      {
        consentId: '58ba9efz',
        provider: 'Bank Simple',
        authorizationStatus: 'Soon to expire',
        iconColor: 'orange',
        iconStatus: 'exclamation-triangle',
        validUntil: 'Actions',
      },
      {
        consentId: '6f437da9',
        provider: 'Client Keys',
        authorizationStatus: 'Expired',
        iconStatus: 'exclamation-circle',
        iconColor: 'red',
        validUntil: 'Actions',
      },
      {
        consentId: '9fu02m7',
        provider: 'Client Bank',
        authorizationStatus: 'Transaction Error',
        iconStatus: 'ban',
        iconColor: 'red',
        validUntil: 'Actions',
      },
    ];

    this.actions = ['Edit', 'Delete', 'Request new consent'];
  }

  private _getData() {
    /**
     * Create some random data
     */
    this.data = new CollectionView(this.items);
    // this.data.pageSize = this.itemsPerPage;

    return this.data;
  }

  ngOnInit() {
    // this.initGrid(this.items);
    console.log(this.items);
    // this.view = new CollectionView(this.data);
    this.items = this._getData();

    this.colors = this.dataService.getColors();
    console.log('colors', this.colors);

    this.templateSimpleLink = CellMaker.makeLink({
      click: (e, ctx) => alert('Clicked Link ** ' + ctx.item.country + ' **'),
    });

    
  }

  ngAfterViewInit(){
    // this.colors = this.getColors();
    // console.log('colors', this.colors);
  }

  initGrid(grid: wjcGrid.FlexGrid) {
    // this.selector = new Selector(grid, {
    //   column: 0
    // });

    this.selector = new Selector(grid, {
      itemChecked: () => {
        this.items = grid.rows.filter((r) => r.isSelected);
      },
    });

    this.view = this.data;
  }

  setHeaders(headersOn: boolean) {
    let theGrid = this.selector.column.grid;
    theGrid.headersVisibility = headersOn
      ? HeadersVisibility.All
      : HeadersVisibility.Column;
    this.selector.column = headersOn
      ? theGrid.rowHeaders.columns[0]
      : theGrid.columns[0];
    this.headers = headersOn;
  }

  getColors() {
    return 'Red,Green,Blue,White,Black,Yellow,Orange'.split(',');
  }
}

