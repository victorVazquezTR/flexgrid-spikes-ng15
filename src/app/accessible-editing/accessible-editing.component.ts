import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import * as wijmo from '@mescius/wijmo';
import {
  FlexGrid,
  Row,
  CellType,
  CellRange,
  SelectionMode,
} from '@mescius/wijmo.grid';
import { Selector } from '@mescius/wijmo.grid.selector';
import * as wjcGrid from '@mescius/wijmo.angular2.grid';

interface Client {
  id?: number;
  clientName: string | null;
  clientNumber: number | null;
  selected: boolean;
  current?: boolean;
  createdAt?: Date;
}

@Component({
  selector: 'app-accessible-editing',
  templateUrl: './accessible-editing.component.html',
  styleUrls: ['./accessible-editing.component.scss'],
})
export class AccessibleEditingComponent implements OnInit, AfterViewInit {
  @ViewChild('grid', { static: true }) grid!: FlexGrid;
  isModalHidden = true;
  isDeleteDialogHidden = true;
  alertAppearance = 'informational';
  alertMessage = '';
  alertDuration = 5;
  isAlertHidden = true;
  isDeleteButtonDisabled = true;
  isSaveButtonDisabled = true;
  isCancelButtonDisabled = false;
  lastEditedValue: any;
  lastTypedCharacter: string = '';
  currentCellContent: string = '';
  currentCellValue: any = null;
  previousCellInfo: any = null;
  isNewClient = false;
  cellHistory: Array<any> = [];
  clientsToSave = new Set<any>();
  selector: any;
  selectedItems!: string;
  items: any;
  view!: wijmo.CollectionView;
  data: Client[] = [
    { clientName: 'Alice Smith', clientNumber: 3057318, selected: false },
    { clientName: 'Bob Johnson', clientNumber: 3065627, selected: false },
    { clientName: 'Charlie Williams', clientNumber: 3827967, selected: false },
    { clientName: 'Diana Brown', clientNumber: 3624220, selected: false },
    { clientName: 'Ethan Jones', clientNumber: 3137996, selected: false },
    { clientName: 'Fiona Garcia', clientNumber: 3335572, selected: false },
    { clientName: 'George Miller', clientNumber: 3037666, selected: false },
    { clientName: 'Hannah Davis', clientNumber: 3685192, selected: false },
    { clientName: 'Ian Martinez', clientNumber: 3436199, selected: false },
    { clientName: 'Julia Taylor', clientNumber: 3826224, selected: false },
  ];

  private currentEditorInput: HTMLInputElement | null = null;
  private keyupListener: ((event: KeyboardEvent) => void) | null = null;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.view = new wijmo.CollectionView(this.data, {
      trackChanges: false,
      newItemCreator: () =>
        ({
          clientName: '',
          clientNumber: null,
          selected: false,
        } as Client),
    });
  }

  ngAfterViewInit() {
    this.selector = new Selector(this.grid, {
      itemChecked: () => {
        this.items = this.grid.rows.filter((r) => r.isSelected);
        const numberItems = this.items.length;
        const clients = numberItems > 1 ? 'clients' : 'client';
        this.selectedItems = `${numberItems} ${clients} selected`;
        this.isDeleteButtonDisabled = numberItems <= 0;
      },
    });

    this.selector.column.width = 52;
    this.selector.showCheckAll = false;
  }

  initGrid(grid: wjcGrid.WjFlexGrid) {
    let previousSelection = { row: -1, col: -1 };

    grid.columnHeaders.rows.defaultSize = 48;
    grid.rows.defaultSize = 40;
    grid.selectionMode = SelectionMode.Cell;

    grid.itemFormatter = (panel, r, c, cell) => {
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';

      if (panel.cellType === CellType.Cell) {
        cell.style.backgroundColor = '#ffffff';
      }
    };

    grid.prepareCellForEdit.addHandler(() => {
      const activeEditor = grid.activeEditor as HTMLInputElement;

      if (!activeEditor) return;

      const onKeydown = (ev: KeyboardEvent) => {
        setTimeout(() => {
          this.currentCellValue = activeEditor.value;
        });
      };

      activeEditor.addEventListener('keydown', onKeydown);
    });

    grid.beginningEdit.addHandler((s, e) => {
      const dataItem = s.rows[e.row]?.dataItem as Client | undefined;
    });

    grid.cellEditEnding.addHandler((flex, eventArguments) => {
      const col = flex.columns[eventArguments.col];
      if (
        !col ||
        (col.binding !== 'clientName' && col.binding !== 'clientNumber')
      ) {
        return;
      }

      const editor = flex.activeEditor as HTMLInputElement | null;
      if (!editor) return;

      // Clean previous value
      if (this.isNewClient && editor.value === null) {
        editor.value = '';
      }

      const isValueEqualToClientName = this.data.some(
        ({ clientName }, index) => {
          return clientName === editor.value;
        }
      );

      const raw = String(editor.value ?? '').trim();
      const rowIndex = eventArguments.row;
      const binding = col.binding as 'clientName' | 'clientNumber';

      const validation = this.validateCell(binding, raw, rowIndex);

      if (!validation.ok) {
        eventArguments.cancel = true; // keep editor open, do not commit
      } else {
        if (!this.isNewClient && !isValueEqualToClientName) {
          this.isSaveButtonDisabled = false;
        }
      }
    });

    grid.cellEditEnded.addHandler((s, e) => {
      // Get the data item for the row that was just edited.
      const editedItem = s.rows[e.row].dataItem;

      // Only add to 'editedRows' if it's not a newly added row.
      if (editedItem) {
        this.clientsToSave.add(editedItem);
      }
    });

    grid.selectionChanged.addHandler((s, event) => {
      if (this.isNewClient) {
        this.isSaveButtonDisabled = true;

        const currentRow = s.selection.row;
        const currentCol = s.selection.col;
        let previousItem;

        if (previousSelection.row >= 0 && previousSelection.col >= 0) {
          const previousValue = grid.getCellData(
            previousSelection.row,
            previousSelection.col,
            true
          );
          const previousColumn = grid.columns[previousSelection.col];
          previousItem = grid.rows[previousSelection.row].dataItem;
          const { clientName, clientNumber } = previousItem;

          if (clientName === '') {
            this.showAlert(
              'error',
              'Client number must have at least 1 character'
            );
          }

          if (clientNumber === null) {
            this.showAlert(
              'error',
              'Client number must have at least 1 character'
            );
          }

          if (
            clientName !== '' &&
            clientNumber !== null &&
            previousSelection.row === 0 &&
            previousItem.current
          ) {
            this.isSaveButtonDisabled = false;
            this.hideAlert();
            console.clear();
            console.log('previous item', previousItem);
          }

          // console.log('Previous Cell Info (when moving away):', {
          //   row: previousSelection.row,
          //   col: previousSelection.col,
          //   columnName: previousColumn?.binding,
          //   columnHeader: previousColumn?.header,
          //   cellValue: previousValue,
          //   rowData: previousItem,
          // });

          this.previousCellInfo = {
            row: previousSelection.row,
            col: previousSelection.col,
            columnName: previousColumn?.binding,
            value: previousValue,
            rowData: { ...previousItem },
          };

          // Add to history
          this.cellHistory.push({
            timestamp: new Date(),
            ...this.previousCellInfo,
          });
        }

        // Get the value from the CURRENT cell (after moving)
        if (currentRow >= 0 && currentCol >= 0) {
          const currentValue = s.getCellData(currentRow, currentCol, true);
          const currentColumn = s.columns[currentCol];
          const currentItem = s.rows[currentRow].dataItem;
          const { clientName, clientNumber } = currentItem;

          if (clientName === null) {
            this.showAlert(
              'error',
              'Client name must have at least 1 character'
            );
            this.isSaveButtonDisabled = true;
          }

          if (
            currentRow > 0 &&
            this.data[0].clientName !== '' &&
            this.data[0].clientNumber !== null
          ) {
            this.isSaveButtonDisabled = false;
          }

          this.currentCellValue = currentValue;
        }

        // Update previous selection for next move
        previousSelection = { row: currentRow, col: currentCol };
      }
    });
  }

  private validateCell(
    binding: 'clientName' | 'clientNumber',
    value: string,
    rowIndex: number
  ): { ok: boolean; message: string } {
    // Cell cannot be empty
    if (this.isNewClient && !value) {
      this.showAlert('error', 'Value is required and cannot be empty.');
      console.error('Value is required and cannot be empty.', value);
      return { ok: false, message: 'Value is required and cannot be empty.' };
    }

    if (binding === 'clientName') {
      let lower = this.isNewClient ? '' : value.toLowerCase();
      const isValidName = /^[A-Za-z0-9 ]+$/.test(value);

      if (!isValidName) {
        console.log('velue', value);
        this.showAlert(
          'error',
          `Client Name must be alphanumeric and include at least one letter (letters, digits, spaces only). ${value}`
        );
        console.error(
          'error',
          'Client Name must be alphanumeric and include at least one letter (letters, digits, spaces only).'
        );
      }

      if (this.currentCellValue !== null) {
        lower = this.currentCellValue.toLowerCase();
      }

      const duplicate = this.data.some(({ clientName }, index) => {
        return clientName?.toLowerCase() === lower;
      });

      if (duplicate) {
        this.showAlert(
          'error',
          'Client name already exists. Please a different one from the list.'
        );

        return {
          ok: false,
          message:
            'Client name already exists. Please a different one from the list.',
        };
      }
    }

    if (binding === 'clientNumber') {
      // Digits only
      if (!/^\d+$/.test(value)) {
        this.showAlert('error', 'Client Number must contain digits only.');

        return {
          ok: false,
          message: 'Client Number must contain digits only.',
        };
      }

      // Avoid duplicates
      const duplicate = this.data.some(({ clientNumber }, index) => {
        return clientNumber === Number(value);
      });

      if (duplicate) {
        this.showAlert(
          'error',
          `A client with number ${value} already exist. Please enter a unique client number.`
        );

        return {
          ok: false,
          message: 'Client Number already exists in the list.',
        };
      }
    }

    return { ok: true, message: '' };
  }

  addClient() {
    this.isNewClient = true;
    const newItem = {
      clientName: null,
      clientNumber: null,
      selected: false,
      current: true,
    };

    // Insert at the top
    this.data = [newItem, ...this.data];
    this.view.refresh();

    if (this.grid) {
      const newRowIndex = 0; // The new row is always the last one
      const targetColumnIndex = 0; // 'description' column (index 1) is the first editable cell

      // Set the selection to the first editable cell in the new row
      this.grid.select(new CellRange(newRowIndex, targetColumnIndex));

      // Start editing the cell
      this.grid.startEditing(true);
      // this.isNewClient = false;
    }
  }

  onCellEditStarting(event: any) {
    // Remove any previous listener to avoid duplicates
    this.removeKeyupListener();

    // Get the editor for the current cell
    const editor = this.grid.activeEditor;

    if (editor instanceof HTMLInputElement) {
      this.currentEditorInput = editor;
      this.keyupListener = (event: KeyboardEvent) => {
        this.lastTypedCharacter = event.key;
        this.currentCellContent = (event.target as HTMLInputElement).value;
      };
      this.currentEditorInput.addEventListener('keyup', this.keyupListener);
    }

    if (!event.cancel) {
      // Check if editing was not cancelled
      const column = this.grid.columns[event.col];
      const row = this.grid.rows[event.row];
      if (column && row && column.binding) {
        // Access the updated value from the item
        this.lastEditedValue = row.dataItem[column.binding];
        if (this.lastEditedValue === '') {
          this.showAlert('error', 'Client name must have at least 1 character');
          this.isDeleteButtonDisabled = true;
        }
      }
    }
  }

  removeKeyupListener() {
    if (this.currentEditorInput && this.keyupListener) {
      this.currentEditorInput.removeEventListener('keyup', this.keyupListener);
      this.currentEditorInput = null;
      this.keyupListener = null;
    }
  }

  deleteClients() {
    console.log('Rows to Delete', this.items);
    this.isDeleteDialogHidden = false;
  }

  confirmDeletion() {
    try {
      this.items.forEach((item: Row) => {
        this.grid.rows.remove(item);
      });

      this.closeDeleteDialog();
      this.showAlert('success', 'Clients deleted successfully!');
      this.isDeleteButtonDisabled = true;
      this.selectedItems = '';
    } catch (error) {
      console.error('Error deleting clients: ', error);
      this.showAlert('error', `Error deleting clients: ${error}`);
      this.isDeleteButtonDisabled = true;
      this.closeDeleteDialog();
    }
  }

  closeDeleteDialog() {
    this.isDeleteDialogHidden = true;
  }

  showModal() {
    this.isModalHidden = !this.isModalHidden;
  }

  showAlert(appearance: string, message: string, alertDuration = 0) {
    this.alertAppearance = appearance;
    this.alertMessage = message;
    this.alertDuration = alertDuration;
    this.isAlertHidden = false;
  }

  hideAlert() {
    this.isAlertHidden = true;
  }

  saveClient(grid: any) {
    let client;
    const edited = Array.from(this.clientsToSave);
    const editedSize = edited.length;

    if (editedSize === 0) {
      this.showAlert('error', 'No changes to save.');
      return;
    }

    if (this.isNewClient) {
      // TODO - Fix filtered by removing existing
      const filtered = edited.filter(({ clientName }: any, index) => {
        return clientName !== 'Alice Smith';
      });

      client = filtered.length > 1 ? 'Clients added' : 'Client added';
    } else {
      client = editedSize > 1 ? 'Clients updated' : 'Client updated';
    }

    this.showAlert('success', `${client} successfully!`);

    this.isSaveButtonDisabled = true;
    this.isNewClient = false;
    this.clientsToSave = new Set();
  }
}
