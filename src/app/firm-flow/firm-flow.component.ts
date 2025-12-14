import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as wijmo from '@mescius/wijmo';
import { FlexGrid, SelectionMode } from '@mescius/wijmo.grid';
import { Selector } from '@mescius/wijmo.grid.selector';
import { ComboBox } from '@mescius/wijmo.input';
import * as wjcGrid from '@mescius/wijmo.angular2.grid';

interface FieldConfig {
  level: string;
  fieldName: string;
  fieldType: string;
  format: string;
  fieldWidth: number;
  maxCharacters: number;
  requiredField: boolean;
  deactivate: boolean;
}

@Component({
  selector: 'app-firm-flow',
  templateUrl: './firm-flow.component.html',
  styleUrls: ['./firm-flow.component.scss'],
})
export class FirmFlowComponent implements OnInit, AfterViewInit {
  @ViewChild('grid', { static: true }) grid!: FlexGrid;
  selector!: Selector;
  view!: wijmo.CollectionView;
  fieldType = 'text';
  private previousActiveElement: HTMLElement | null = null;

  // Valid field type values for input validation
  private readonly validFieldTypes: readonly string[] = [
    'text',
    'date',
    'dropdown',
    'user-dropdown',
  ];

  /**
   * Check if running in production environment
   * @private
   */
  private isProduction(): boolean {
    return (
      typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    );
  }

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
    },
  ];

  // Action options for dropdowns
  actionOptions = ['Edit', 'Move up', 'Move down', 'Delete'];

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
        // Selector callback - can be extended if needed
      },
    });
    if (this.selector.column) {
      this.selector.column.width = 52;
    }
    this.selector.showCheckAll = false;
  }

  initGrid(grid: wjcGrid.WjFlexGrid) {
    grid.columnHeaders.rows.defaultSize = 48;
    grid.rows.defaultSize = 48;
    grid.selectionMode = SelectionMode.Cell;

    // Set up ComboBox editors for Level, Field Type, and Format columns
    // Create editor instances that will be reused
    const levelCombo = new ComboBox(document.createElement('div'), {
      itemsSource: this.actionOptions,
      isEditable: false,
      dropDownCssClass: 'action-dropdown',
    });

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

          const formatCol = s.columns.getColumn('format');
          if (formatCol) {
            const formatHeaderCell = s.columnHeaders.getCellElement(
              0,
              formatCol.index
            );
            if (formatHeaderCell) {
              const computedStyle = window.getComputedStyle(formatHeaderCell);
              referenceBgColor = computedStyle.backgroundColor;
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
          // Using CSS variable for consistency and security
          cell.style.backgroundColor = 'var(--saf-color-background-default)';
        }

        if (col && col.binding === 'fieldType') {
          const value = s.getCellData(e.row, e.col, false);

          // Clear existing content safely
          while (cell.firstChild) {
            cell.removeChild(cell.firstChild);
          }

          // Create container for text and button
          const container = document.createElement('div');
          container.style.display = 'flex';
          container.style.alignItems = 'center';
          container.style.justifyContent = 'space-between';
          container.style.width = '100%';
          container.style.height = '100%';
          container.style.padding = '0 8px';

          // Create text element - use textContent to prevent XSS
          const textElement = document.createElement('span');
          // Sanitize value: ensure it's a string and escape any potential HTML
          const sanitizedValue =
            typeof value === 'string' ? value : String(value || '');
          textElement.textContent = sanitizedValue;
          textElement.style.flex = '1';
          textElement.style.overflow = 'hidden';
          textElement.style.textOverflow = 'ellipsis';
          textElement.style.whiteSpace = 'nowrap';

          // Create saf-button element
          const button = document.createElement('saf-button');
          button.setAttribute('appearance', 'tertiary');
          button.className = 'field-type-cell-button';
          button.style.flexShrink = '0';
          button.style.marginLeft = '8px';
          button.setAttribute('aria-label', 'Edit field type');
          // Ensure button is focusable and has proper role
          button.setAttribute('tabindex', '0');
          button.setAttribute('role', 'button');

          // Create saf-icon element for the button
          const icon = document.createElement('saf-icon');
          icon.setAttribute('icon-name', 'pen-line');
          icon.setAttribute('appearance', 'solid');
          button.appendChild(icon);

          // Function to handle button activation (click or keyboard)
          const handleButtonActivation = (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            // Store reference to the button for focus return
            this.previousActiveElement = button;
            // Open manage dropdown dialog when button is activated
            this.openManageDropdownDialog();
          };

          // Add click handler to button
          button.addEventListener('click', handleButtonActivation);

          // Add keyboard handler for Enter key (handle immediately)
          button.addEventListener(
            'keydown',
            (event: KeyboardEvent) => {
              if (event.key === 'Enter') {
                handleButtonActivation(event);
              }
            },
            true
          ); // Use capture phase to catch before saf-button handles it

          // Handle Space key: prevent default scrolling in keydown, activate in keyup
          button.addEventListener(
            'keydown',
            (event: KeyboardEvent) => {
              if (event.key === ' ') {
                event.preventDefault(); // Prevent page scroll
              }
            },
            true
          );

          button.addEventListener('keyup', (event: KeyboardEvent) => {
            if (event.key === ' ') {
              handleButtonActivation(event);
            }
          });

          container.appendChild(textElement);
          container.appendChild(button);
          cell.appendChild(container);
        }
      }
    });

    // Assign editors to columns (excluding fieldType)
    grid.columns.forEach(col => {
      if (col.binding === 'level') {
        col.editor = levelCombo;
      } else if (col.binding === 'format') {
        col.editor = formatCombo;
      } else if (col.binding === 'fieldType') {
        // Make fieldType column read-only since we're using text + button
        col.isReadOnly = true;
      }
    });
  }

  openManageDropdownDialog() {
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

  onFieldTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target?.value;

    // Validate input to prevent XSS and ensure only valid values are accepted
    if (value && this.validFieldTypes.includes(value)) {
      this.fieldType = value;
    } else {
      // Reset to default if invalid value is provided
      this.fieldType = 'text';
      // Log security warning in development only
      if (!this.isProduction()) {
        console.warn('Invalid field type value rejected:', value);
      }
    }
  }
}
