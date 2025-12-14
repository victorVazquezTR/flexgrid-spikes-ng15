import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  SafAlert,
  SafButton,
  SafCheckbox,
  SafDialog,
  SafIcon,
  SafRadio,
  SafRadioGroup,
  SafText,
  SafOption,
  SafSelect,
  SafTextField,
  SafButtonEmbedded,
} from '@saffron/core-components';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'flexgrid-spikes-ng15';

  constructor(
    public route: Router,
    private location: Location
  ) {
    SafAlert();
    SafButton();
    SafCheckbox();
    SafDialog();
    SafIcon();
    SafRadio();
    SafRadioGroup();
    SafText();
    SafOption();
    SafSelect();
    SafTextField();
    SafButtonEmbedded();
  }

  goBack() {
    this.location.back();
  }
}
