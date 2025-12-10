import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as wijmo from '@mescius/wijmo';
import {
  FlexGrid,
  SelectionMode,
  CellType,
} from '@mescius/wijmo.grid';
import { Selector } from '@mescius/wijmo.grid.selector';
import { ComboBox } from '@mescius/wijmo.input';
import * as wjcGrid from '@mescius/wijmo.angular2.grid';

interface FieldConfig {
  id?: number;
  level: string;
  fieldName: string;
  fieldType: string;
  format: string;
  fieldWidth: number;
  maxCharacters: number;
  requiredField: boolean;
  deactivate: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-firm-flow',
  templateUrl: './firm-flow.component.html',
  styleUrls: ['./firm-flow.component.scss'],
})
export class FirmFlowComponent implements OnInit, AfterViewInit {
  @ViewChild('grid', { static: true }) grid!: FlexGrid;
  selector: any;
  selectedItems: string = '';
  items: any;
  view!: wijmo.CollectionView;
  private previousActiveElement: HTMLElement | null = null;

  data: FieldConfig[] = [
    {
      level: 'Folder',
      fieldName: 'Manager',
      fieldType: 'Text',
      format: '',
      fieldWidth: 100,
      maxCharacters: 100,
      requiredField: false,
      deactivate: false,
      selected: false,
    },
    {
      level: 'Workflow',
      fieldName: 'Industry',
      fieldType: 'Date',
      format: '',
      fieldWidth: 100,
      maxCharacters: 100,
      requiredField: false,
      deactivate: false,
      selected: false,
    },
    {
      level: 'Workflow',
      fieldName: 'Internal Due Date',
      fieldType: 'Date',
      format: '',
      fieldWidth: 100,
      maxCharacters: 100,
      requiredField: false,
      deactivate: false,
      selected: false,
    },
    {
      level: 'Workflow',
      fieldName: 'Office Location',
      fieldType: 'User Dropdown',
      format: '',
      fieldWidth: 100,
      maxCharacters: 100,
      requiredField: false,
      deactivate: false,
      selected: false,
    },
    {
      level: 'Workflow',
      fieldName: 'Difficulty Level',
      fieldType: 'Dropdown',
      format: '',
      fieldWidth: 100,
      maxCharacters: 100,
      requiredField: false,
      deactivate: false,
      selected: false,
    },
    {
      level: 'Workflow',
      fieldName: 'Preparer Budgeted Hours',
      fieldType: 'Text',
      format: '',
      fieldWidth: 100,
      maxCharacters: 100,
      requiredField: false,
      deactivate: false,
      selected: false,
    },
    {
      level: 'Folder',
      fieldName: 'Reviewer Budgeted Hours',
      fieldType: 'Text',
      format: '',
      fieldWidth: 100,
      maxCharacters: 100,
      requiredField: false,
      deactivate: false,
      selected: false,
    },
    {
      level: 'Folder',
      fieldName: 'Office location',
      fieldType: 'Text',
      format: '',
      fieldWidth: 100,
      maxCharacters: 100,
      requiredField: false,
      deactivate: false,
      selected: false,
    },
    {
      level: 'Workflow',
      fieldName: 'Tax Officer',
      fieldType: 'Text',
      format: '',
      fieldWidth: 100,
      maxCharacters: 100,
      requiredField: false,
      deactivate: false,
      selected: false,
    },
    {
      level: 'Workflow',
      fieldName: 'Folder QED',
      fieldType: 'Text',
      format: '',
      fieldWidth: 100,
      maxCharacters: 100,
      requiredField: false,
      deactivate: false,
      selected: false,
    },
  ];

  levelOptions = ['Folder', 'Workflow'];
  fieldTypeOptions = ['Text', 'Date', 'User Dropdown', 'Dropdown'];
  formatOptions: string[] = []; // Can be populated later

  // Action options for dropdowns
  actionOptions = ['Edit', 'Move up', 'Move down', 'Delete'];

  // Field type options with separator and manage option
  fieldTypeDropdownOptions = ['Text', 'Date', 'User Dropdown', 'Dropdown'];
  manageDropdownOption = 'Manage dropdown';

  // Dialog state
  isManageDropdownDialogHidden = true;

  ngOnInit(): void {
    this.view = new wijmo.CollectionView(this.data, {
      trackChanges: false,
    });
  }

  ngAfterViewInit() {
    this.selector = new Selector(this.grid, {
      itemChecked: () => {
        this.items = this.grid.rows.filter((r) => r.isSelected);
        const numberItems = this.items.length;
        const fields = numberItems > 1 ? 'fields' : 'field';
        this.selectedItems = `${numberItems} ${fields} selected`;
      },
    });

    this.selector.column.width = 52;
    this.selector.showCheckAll = false;
  }

  initGrid(grid: wjcGrid.WjFlexGrid) {
    grid.columnHeaders.rows.defaultSize = 48;
    grid.rows.defaultSize = 40;
    grid.selectionMode = SelectionMode.Cell;

    // Set up ComboBox editors for Level, Field Type, and Format columns
    // Create editor instances that will be reused
    const levelCombo = new ComboBox(document.createElement('div'), {
      itemsSource: this.actionOptions,
      isEditable: false,
      dropDownCssClass: 'action-dropdown',
    });

    // Field Type column now uses text + button instead of dropdown
    // Removed fieldTypeCombo initialization as it's no longer needed

    const formatCombo = new ComboBox(document.createElement('div'), {
      itemsSource: this.actionOptions,
      isEditable: false,
      dropDownCssClass: 'action-dropdown',
    });

    // Format Field Type column cells to show text and button
    grid.formatItem.addHandler((s, e) => {
      // Ensure Field Type header has the same background as other headers
      if (e.panel === s.columnHeaders) {
        const col = s.columns[e.col];
        if (col && col.binding === 'fieldType') {
          // Get the background color from another header (e.g., "Format" column)
          // Try to find any other header that's already rendered to get its background color
          let referenceBgColor: string | null = null;

          // Try Format column first
          const formatCol = s.columns.getColumn('format');
          if (formatCol) {
            const formatHeaderCell = s.columnHeaders.getCellElement(0, formatCol.index);
            if (formatHeaderCell) {
              const computedStyle = window.getComputedStyle(formatHeaderCell);
              referenceBgColor = computedStyle.backgroundColor;
            }
          }

          // If Format header not available, try any other column
          if (!referenceBgColor) {
            for (let i = 0; i < s.columns.length; i++) {
              const otherCol = s.columns[i];
              if (otherCol && otherCol.binding !== 'fieldType') {
                const otherHeaderCell = s.columnHeaders.getCellElement(0, i);
                if (otherHeaderCell) {
                  const computedStyle = window.getComputedStyle(otherHeaderCell);
                  referenceBgColor = computedStyle.backgroundColor;
                  if (referenceBgColor && referenceBgColor !== 'rgba(0, 0, 0, 0)' && referenceBgColor !== 'transparent') {
                    break;
                  }
                }
              }
            }
          }

          // Apply the background color if we found one
          if (referenceBgColor) {
            e.cell.style.backgroundColor = referenceBgColor;
          }
        }
      }

      if (e.panel === s.cells) {
        const col = s.columns[e.col];
        const cell = e.cell;

        // Override any light blue background with white for all cells (except selected)
        const isSelected = cell.getAttribute('aria-selected') === 'true';
        if (!isSelected) {
          // Set white background for all non-selected cells
          cell.style.backgroundColor = '#ffffff';
        }

        if (col && col.binding === 'fieldType') {
          const value = s.getCellData(e.row, e.col, false);

          // Clear existing content
          cell.innerHTML = '';

          // Create container for text and button
          const container = document.createElement('div');
          container.style.display = 'flex';
          container.style.alignItems = 'center';
          container.style.justifyContent = 'space-between';
          container.style.width = '100%';
          container.style.height = '100%';
          container.style.padding = '0 8px';

          // Create text element
          const textElement = document.createElement('span');
          textElement.textContent = value || '';
          textElement.style.flex = '1';
          textElement.style.overflow = 'hidden';
          textElement.style.textOverflow = 'ellipsis';
          textElement.style.whiteSpace = 'nowrap';

          // Create button element
          const button = document.createElement('button');
          button.className = 'field-type-cell-button';
          // Use SVG icon for pencil/edit
          button.innerHTML = ' <saf-icon color="background: var(--color-interactive-on-tertiary-nested, #212223);" icon-name="pen-line" appearance="solid">';
          button.type = 'button';
          button.style.flexShrink = '0';
          button.style.marginLeft = '8px';
          button.style.background = 'none';
          button.style.border = 'none';
          button.style.cursor = 'pointer';
          button.style.padding = '4px';
          button.style.display = 'flex';
          button.style.alignItems = 'center';
          button.style.justifyContent = 'center';
          button.style.borderRadius = '4px';
          button.style.color = '#666';
          button.setAttribute('aria-label', 'Edit field type');

          // Add click handler to button
          button.addEventListener('click', (event) => {
            event.stopPropagation();
            // Store reference to the button for focus return
            this.previousActiveElement = button;
            // Open manage dropdown dialog when button is clicked
            this.openManageDropdownDialog();
          });

          // Add hover styles
          button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = '#f0f0f0';
            button.style.color = '#333';
          });
          button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = 'transparent';
            button.style.color = '#666';
          });

          container.appendChild(textElement);
          container.appendChild(button);
          cell.appendChild(container);
        }
      }
    });

    // Use prepareCellForEdit to set up editors when editing starts
    grid.prepareCellForEdit.addHandler((s, e) => {
      const col = s.columns[e.col];
      if (!col) return;

      let combo: ComboBox | null = null;

      if (col.binding === 'level') {
        combo = levelCombo;
      } else if (col.binding === 'format') {
        combo = formatCombo;
      }

      if (combo) {
        // Set the current value from the cell
        const currentValue = s.getCellData(e.row, e.col, false);
        if (currentValue !== null && currentValue !== undefined) {
          combo.text = String(currentValue);
        } else {
          combo.text = '';
        }
      }
    });

    // Assign editors to columns (excluding fieldType)
    grid.columns.forEach((col) => {
      if (col.binding === 'level') {
        col.editor = levelCombo;
      } else if (col.binding === 'format') {
        col.editor = formatCombo;
      } else if (col.binding === 'fieldType') {
        // Make fieldType column read-only since we're using text + button
        col.isReadOnly = true;
      }
    });

    // Function to sync Field Type header background with other headers
    const syncFieldTypeHeaderBackground = () => {
      const fieldTypeCol = grid.columns.getColumn('fieldType');
      const formatCol = grid.columns.getColumn('format');

      if (fieldTypeCol && formatCol) {
        const fieldTypeHeaderCell = grid.columnHeaders.getCellElement(0, fieldTypeCol.index);
        const formatHeaderCell = grid.columnHeaders.getCellElement(0, formatCol.index);

        if (fieldTypeHeaderCell && formatHeaderCell) {
          // Get the computed background color from Format header
          const computedStyle = window.getComputedStyle(formatHeaderCell);
          const bgColor = computedStyle.backgroundColor;

          // Apply the same background color to Field Type header
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            fieldTypeHeaderCell.style.backgroundColor = bgColor;
          }
        }
      }
    };

    // Ensure Field Type header has the same background as other headers
    // Use setTimeout to ensure all headers are rendered
    setTimeout(syncFieldTypeHeaderBackground, 0);

    // Also sync when the grid is refreshed/updated
    grid.updatedView.addHandler(() => {
      setTimeout(syncFieldTypeHeaderBackground, 0);
    });

    // Function to ensure all Field Type cells have white background
    const syncFieldTypeCellsBackground = () => {
      const fieldTypeCol = grid.columns.getColumn('fieldType');

      if (fieldTypeCol) {
        // Iterate through all rows and set white background for Field Type cells
        for (let row = 0; row < grid.rows.length; row++) {
          const cell = grid.cells.getCellElement(row, fieldTypeCol.index);
          if (cell) {
            cell.style.backgroundColor = '#ffffff';
          }
        }
      }
    };

    // Ensure Field Type cells have white background
    setTimeout(syncFieldTypeCellsBackground, 0);

    // Also sync when the grid is refreshed/updated
    grid.updatedView.addHandler(() => {
      setTimeout(syncFieldTypeCellsBackground, 0);
    });

    // Function to ensure all cells have white background (override light blue)
    const syncAllCellsBackground = () => {
      // Iterate through all rows and columns to set white background
      for (let row = 0; row < grid.rows.length; row++) {
        for (let col = 0; col < grid.columns.length; col++) {
          const cell = grid.cells.getCellElement(row, col);
          if (cell) {
            // Only set white if not selected (selected cells keep their selection color)
            const isSelected = cell.getAttribute('aria-selected') === 'true';
            if (!isSelected) {
              cell.style.backgroundColor = '#ffffff';
            }
          }
        }
      }
    };

    // Ensure all cells have white background (override light blue)
    setTimeout(syncAllCellsBackground, 0);

    // Also sync when the grid is refreshed/updated
    grid.updatedView.addHandler(() => {
      setTimeout(syncAllCellsBackground, 0);
    });

  }

  openManageDropdownDialog() {
    // Always open the dialog, reset state first to ensure it opens
    this.isManageDropdownDialogHidden = false;
  }

  closeManageDropdownDialog() {
    this.isManageDropdownDialogHidden = true;
    // Return focus to the element that opened the modal
    if (this.previousActiveElement) {
      setTimeout(() => {
        this.previousActiveElement?.focus();
        this.previousActiveElement = null;
      }, 100);
    }
  }
}

