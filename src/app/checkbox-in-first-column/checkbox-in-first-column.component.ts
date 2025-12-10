import { Component, ViewChild, OnInit, Renderer2 } from '@angular/core';
import * as wjcGrid from '@mescius/wijmo.grid';
import { Selector } from '@mescius/wijmo.grid.selector';
import { CollectionView } from '@mescius/wijmo';

const { FlexGrid, HeadersVisibility } = wjcGrid;

@Component({
  selector: 'app-checkbox-in-first-column',
  templateUrl: './checkbox-in-first-column.component.html',
  styleUrls: ['./checkbox-in-first-column.component.scss'],
})
export class CheckboxInFirstColumnComponent implements OnInit {
  title = 'add-checkbox-first-column-flexgrid';
  view: any;
  items: any = [];
  data: any = [];
  selector: any;
  headers = true;

  constructor(private renderer: Renderer2) {
    this.items = [
      {
        authorizer: 'Steven Singer',
        email: 'steven.singer@gmail.com',
        authorizationStatus: 'Authorized',
        validUntil: '04/21/2024',
      },
      {
        authorizer: 'Anna Southern',
        email: 'anna.southem@thomsonreuters.com',
        authorizationStatus: 'Pending - Undelivered',
        validUntil: '06/21/2024',
      },
      {
        authorizer: 'Lidiia Trotsiuk',
        email: 'lidiia.trotsiuk@thomsonreuters.com',
        authorizationStatus: 'Pending - Delivered',
        validUntil: '05/03/2024',
      },
      {
        authorizer: 'Andrea Frazier',
        email: 'andrea.frazier@thomsonreuters.com',
        authorizationStatus: 'Expired',
        validUntil: '04/14/2024',
      },
    ];
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
  }

  initGrid(grid: wjcGrid.FlexGrid) {
    this.selector = new Selector(grid, {
      itemChecked: () => {
        // this.items = grid.rows.filter((r) => r.isSelected);
      },
    });
    // this.view = this.data;
  }

  setHeaders(headersOn: boolean) {
    // let theGrid = this.selector.column.grid;
    // theGrid.headersVisibility = headersOn
    //   ? HeadersVisibility.All
    //   : HeadersVisibility.Column;
    // this.selector.column = headersOn
    //   ? theGrid.rowHeaders.columns[0]
    //   : theGrid.columns[0];
    // this.headers = headersOn;
  }
}

