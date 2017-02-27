import { Component } from "@angular/core";

@Component({
  selector: 'base-grid',
  templateUrl: 'app/examples/base-grid.component.tpl.html',
})
export class BaseGridComponent {
  data: any = [];
  radioGroupValue: any;
  listActionMenu: any;
  navMenu: any;
  selectionMode: boolean = true;

  constructor() {
    this.init();
  }

  private init = (): void => {
    this.listActionMenu = {
      'title': 'Manage Address Association',
      'location': 'right',
      'items': [
        {
          'name': 'Delete Address Association',
          'icon': 'delete',
          'method': this.deleteAssociation
        },
        {
          'name': 'View Address',
          'action': 'view',
          'method': this.viewAssociation
        },
        {
          'name': 'Test Disable',
          'action': 'boat',
          'isDisable': this.validateLink,
          'method': this.viewAssociation
        }
      ]
    };

    this.navMenu = {
      "sections": [
        {
          "name": "Location",
          "type": "toggle",
          "state": ".location",
          "icon": "directions",
          "pages": [
            {
              "name": "Location Details",
              "type": "link",
              "state": "details",
              "icon": "my_location",
              "scroll": "true"
            },
            {
              "name": "Location History",
              "state": "location-history",
              "type": "link",
              "icon": "local_library",
              "scroll": "true"
            },
            {
              "name": "Location Survey",
              "state": "locationSurveyAssociation",
              "type": "link",
              "icon": "question_answer",
              "scroll": "true"
            }
          ]
        },
        {
          "name": "Associated Meters",
          "type": "toggle",
          "state": ".associatedMeters",
          "icon": "devices",
          "pipelineGroups": ["PE"],
          "pipelines": ["GST"],
          "pages": [
            {
              "name": "Associated Meters",
              "type": "link",
              "state": "locationMeterAssociation",
              "icon": "query_builder",
              "scroll": "true"
            },
            {
              "name": "Meter Scheduling Split",
              "state": "schedulingSplitAssociation",
              "type": "link",
              "icon": "view_stream",
              "scroll": "true"
            }
          ]
        },
        {
          "name": "Associated Meters",
          "type": "toggle",
          "state": ".associatedMeters",
          "icon": "devices",
          "pipelineGroups": ["FG"],
          "pipelines": ["FEP", "TGR", "TW"],
          "pages": [
            {
              "name": "Associated Meters",
              "type": "link",
              "state": "locationMeterAssociation",
              "icon": "query_builder",
              "scroll": "true"
            }
          ]
        },
        {
          "name": "Contacts",
          "type": "toggle",
          "state": ".contacts",
          "icon": "contacts",
          "pipelineGroups": ["PE"],
          "pipelines": ["GST"],
          "pages": [
            {
              "name": "Internal Contacts",
              "type": "link",
              "state": "locationInternalContacts",
              "icon": "people",
              "scroll": "true"
            },
            {
              "name": "External Contacts",
              "state": "locationExternalContacts",
              "type": "link",
              "icon": "people_outline",
              "scroll": "true"
            }
          ]
        },
        {
          "name": "Party",
          "type": "toggle",
          "state": ".party",
          "icon": "contacts",
          "pipelineGroups": ["FG"],
          "pipelines": ["FEP", "TGR", "TW"],
          "scroll": "false"
        },
        {
          "name": "Adjacent Locations",
          "type": "toggle",
          "state": ".adjacentLocations",
          "icon": "compare",
          "pipelineGroups": ["PE"],
          "pipelines": ["GST"],
          "scroll": "false"
        },
        {
          "name": "Associated Groups",
          "type": "toggle",
          "state": ".associatedGroups",
          "icon": "share",
          "scroll": "false"
        },
        {
          "name": "Contracts",
          "type": "toggle",
          "state": ".contracts",
          "icon": "layers",
          "scroll": "false"
        },
        {
          "name": "EDI Confirmation",
          "type": "toggle",
          "state": ".ediConfirmation",
          "icon": "nfc",
          "pipelineGroups": ["PE"],
          "pipelines": ["GST"],
          "scroll": "false"
        },
        {
          "name": "Comments",
          "type": "toggle",
          "state": ".comments",
          "icon": "comment",
          "scroll": "false"
        },
        {
          "name": "Forecast Seg",
          "type": "toggle",
          "state": ".forecastSeg",
          "pipelineGroups": ["PE"],
          "pipelines": ["GST"],
          "icon": "donut_large",
          "scroll": "false",
          "forecast": "seg"
        },
        {
          "name": "Forecast Seg",
          "type": "toggle",
          "state": ".forecastSegMeter",
          "pipelineGroups": ["PE"],
          "pipelines": ["GST"],
          "icon": "donut_large",
          "scroll": "false",
          "forecast": "seg-meter"
        }
      ]

    };

    for (let i = 0; i < 50; i++) {
      this.data.push({
        column1: 'col 1 row ' + i,
        column2: i + '',
        column3: 0,
        column4: i,
        column5: i + '',
        column6: i + '',
        column7: i + ''
      });
    }
  };

  public deleteAssociation = (row: any): void => {
    console.log('in the delete', row);
  }

  public viewAssociation = (row: any): void => {
    console.log('in the view association', row);
  }

  public validateLink = (row: any): boolean => {
    return row.column2 % 2 === 0;
  }


}
