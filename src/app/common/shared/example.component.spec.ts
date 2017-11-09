import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, fakeAsync, inject, TestBed, TestModuleMetadata, tick } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { DxDataGridModule, DxPopoverModule, DxTemplateModule } from 'devextreme-angular';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as _ from 'lodash';

import { setUpTestBed } from 'test.common.spec';
import { ConfigurationService, LocksService, ModalService, PermissionsService } from 'core/services';
import { ConfigurationServiceMock, LocksServiceMock, PermissionsServiceMock } from 'core/services/mocks';
import { CollectionWorkfileItem } from 'core/models';
import { AlertModalModule, ConfirmModalModule, TrapTabulationModule } from 'share';
import { CoreModalsService } from 'share/modals/modal-providers/core-modals-provider/core-modals.service';
import { PhoneModule, SocNumberModule } from 'share/pipes/modules';

import { ModalProvider, WorkfileService } from '../../services';
import { ModalProviderMock, WorkfileServiceMock } from '../../services/mocks';

import { CollectionsWorkfileComponent } from './collections-workfile.component';

class RouteStub {
  data: Observable<Object> =  Observable.of({
    activities: [
      {id: '<All>', displayValue: 'All Workfile Contents'},
      {id: '1', displayValue: 'Today\'s Follow Up Items'},
      {id: '6', displayValue: 'Reminder Letter Items Only'}
    ],
    collectors: [
      {id: '100', name: 'Alicia Lehr', initials: null},
      {id: '199', name: 'Dyann Eisiminger', initials: null},
      {id: '200', name: 'Steven Weiss', initials: 'SW'}
    ]
  });
}

describe('CollectionsWorkfileComponent', () => {
  let component: any; // tslint:disable-line:no-any
  let fixture: ComponentFixture<CollectionsWorkfileComponent>;
  const routeStub: RouteStub = new RouteStub();

  const moduleDef: TestModuleMetadata = {
    declarations: [ CollectionsWorkfileComponent ],
    imports: [
      NgbModule.forRoot(), RouterTestingModule, HttpClientTestingModule, DxDataGridModule, DxTemplateModule,
      DxPopoverModule, AlertModalModule, ConfirmModalModule, TrapTabulationModule, PhoneModule, SocNumberModule
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    providers: [
      FormBuilder,
      { provide: ActivatedRoute, useValue: routeStub },
      { provide: ConfigurationService, useValue: new ConfigurationServiceMock() },
      CoreModalsService,
      { provide: LocksService, useValue: new LocksServiceMock() },
      { provide: ModalProvider, useValue: new ModalProviderMock() },
      ModalService,
      { provide: NgbModal, useExisting: ModalService },
      { provide: PermissionsService, useValue: new PermissionsServiceMock() },
      { provide: WorkfileService, useValue: new WorkfileServiceMock() }
    ]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsWorkfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should be present list of activities', () => {
      expect(component.activities.length).toEqual(3);
    });

    it('should be present list of collectors', () => {
      expect(component.collectors.length).toEqual(3);
    });
  });

  describe('calculate group value for datagrid', () => {
    beforeEach(() => {
      component.collections = [
        new CollectionWorkfileItem({
          accountType: '30',
          accountTypeColor: null,
          accountTypeDescription: 'MCC - Managed  Care Contract',
          age: 1050,
          balance: 33,
          charges: 380,
          claimId: '531167559',
          claimPtr: '3',
          collectorId: '100',
          depts: '1',
          employerName: 'El Bohio Restaurant',
          firstServiceDate: '2014-04-29T00:00:00',
          insuranceId: '12264',
          insuranceName: 'Health Partners PA (MCC)',
          insuranceTypeDescription: 'MCC - Managed Care Contract',
          insuranceTypeId: '30',
          lastActionCode: '1',
          lastActionCodeDescription: 'AR Follow Up',
          lastActionDate: '2014-07-08T00:00:00',
          lastServiceDate: '2014-04-29T00:00:00',
          locationId: '21034',
          locationName: 'Juniata Park-PA',
          nextActionCode: '1',
          nextActionCodeDescription: 'AR Follow Up',
          nextActionColor: 'MAROON',
          nextActionColorDescription: 'Rebilled',
          nextActionColorDescriptionTextColor: 'WHITE',
          nextActionDate: '2014-10-16T00:00:00',
          nextActionId: 101139,
          nextActionPriority: '2',
          nextActionPriorityDescription: 'Short Term Follow Up',
          nextActionStatus: '1',
          patientId: '530112524',
          patientName: 'Munoz,Mercedita',
          wcCarrier: null,
          workfileId: 171
        })
      ];
    });

    it('should concat firstServiceDate and lastServiceDate', () => {
      const expected: string = component.calculateGroupServiceDates(component.collections[0]);
      expect(expected).toEqual(`${component.collections[0].firstServiceDate} - ${component.collections[0].lastServiceDate}`);
    });

    it('should concat lastActionCode and lastActionCodeDescription', () => {
      const expected: string = component.calculateGroupLastActionTaken(component.collections[0]);
      expect(expected).toEqual(`${component.collections[0].lastActionCode} - ${component.collections[0].lastActionCodeDescription}`);
    });

    it('should concat nextActionCode and nextActionCodeDescription', () => {
      const expected: string = component.calculateGroupNextActionToTake(component.collections[0]);
      expect(expected).toEqual(`${component.collections[0].nextActionCode} - ${component.collections[0].nextActionCodeDescription}`);
    });

    it('should concat nextActionPriority and nextActionPriorityDescription', () => {
      const expected: string = component.calculateGroupPriority(component.collections[0]);
      expect(expected)
        .toEqual(`${component.collections[0].nextActionPriority} - ${component.collections[0].nextActionPriorityDescription}`);
    });
  });

  describe('openActionsModal()', () => {
    it('should open modal', inject([ModalProvider], (modalProvider: ModalProvider) => {
      spyOn(modalProvider, 'openActionModal').and.callThrough();
      component.openActionsModal();
      expect(modalProvider.openActionModal).toHaveBeenCalledWith('transactionId');
    }));
  });

  describe('openHistoryModal()', () => {
    it('should open modal', inject([ModalProvider], (modalProvider: ModalProvider) => {
      spyOn(modalProvider, 'openHistoryModal').and.callThrough();
      const claimId: string = '531688422';
      component.dataGrid.selectedRowKeys.push({claimId});
      component.openHistoryModal();
      expect(modalProvider.openHistoryModal).toHaveBeenCalledWith(claimId);
    }));
  });

  describe('openDetailsModal()', () => {
    it('should open modal', inject([ModalProvider], (modalProvider: ModalProvider) => {
      spyOn(modalProvider, 'openDetailsModal').and.callThrough();
      component.workfiles = [{ collectorId: 100, id: '171', description: '6.5.14', steps: null }];
      component.form.get('workfile').patchValue(component.workfiles[0].id);

      component.openDetailsModal();
      expect(modalProvider.openDetailsModal).toHaveBeenCalledWith(component.workfiles[0]);
    }));
  });

  describe('collector changed', () => {
    it('should return workfiles when selected collector', inject([WorkfileService],
      fakeAsync((workfileService: WorkfileService) => {
        spyOn(workfileService, 'getListItems').and.callThrough();
        component.form.get('collector').patchValue(component.collectors[1].id);
        fixture.detectChanges();
        tick();
        tick(800);

        expect(component.form.get('collector').value).toEqual(component.collectors[1].id);
        expect(workfileService.getListItems).toHaveBeenCalledWith(component.collectors[1].id);
        expect(component.workfiles.length).toEqual(4);
      })));

    it('should not return empty array when selected collector has not assigned workfiles', inject([WorkfileService, CoreModalsService],
      fakeAsync((workfileService: WorkfileService, coreModalsService: CoreModalsService) => {
        spyOn(workfileService, 'getListItems').and.callThrough();
        spyOn(coreModalsService, 'openAlertModal').and.callThrough();
        component.form.get('collector').patchValue(component.collectors[2].id);
        fixture.detectChanges();
        tick();
        tick(800);

        expect(component.form.get('collector').value).toEqual(component.collectors[2].id);
        expect(workfileService.getListItems).toHaveBeenCalledWith(component.collectors[2].id);
        expect(component.workfiles.length).toEqual(0);
        _.forEach(component.form.controls, (control: FormControl, key: string) => {
          if (key !== 'collector') {
            expect(control.disabled).toBeTruthy();
          }
        });
        expect(coreModalsService.openAlertModal).toHaveBeenCalled();
      })));
  });

  describe('workfile changed', () => {
    it('should return collections when selected workfile', inject([WorkfileService],
      fakeAsync((workfileService: WorkfileService) => {
        spyOn(workfileService, 'getCollections').and.callThrough();
        spyOn(workfileService, 'getListItems').and.callThrough();
        component.form.get('collector').patchValue(component.collectors[0].id);
        fixture.detectChanges();
        tick();
        tick(800);

        component.form.get('workfile').patchValue(component.workfiles[1].id);
        fixture.detectChanges();
        tick();
        tick(800);

        expect(component.form.get('workfile').value).toEqual(component.workfiles[1].id);
        expect(workfileService.getCollections).toHaveBeenCalledWith(component.form.getRawValue());
        expect(component.collections.length).toEqual(1);
      })));

    it('should return empty array when selected workfile has not collections', inject([WorkfileService],
      fakeAsync((workfileService: WorkfileService) => {
        spyOn(workfileService, 'getCollections').and.callThrough();
        spyOn(workfileService, 'getListItems').and.callThrough();
        component.form.get('collector').patchValue(component.collectors[1].id);
        fixture.detectChanges();
        tick();
        tick(800);

        component.form.get('workfile').patchValue(component.workfiles[1].id);
        fixture.detectChanges();
        tick();
        tick(800);

        expect(component.form.get('workfile').value).toEqual(component.workfiles[1].id);
        expect(workfileService.getCollections).toHaveBeenCalledWith(component.form.getRawValue());
        expect(component.collections.length).toEqual(0);
      })));
  });

  describe('deleteWorkfile()', () => {
    it('should delete workfile', fakeAsync(inject([CoreModalsService, WorkfileService],
      (coreModalsService: CoreModalsService, workfileService: WorkfileService) => {
        spyOn(workfileService, 'deleteItem').and.callThrough();
        spyOn(workfileService, 'getListItems').and.callThrough();
        const collectorId: string = '200';
        const workfileId: number = 1030;
        const deletePassword: string = 'password';
        component.deleteWorkfile(collectorId, workfileId, deletePassword);
        fixture.detectChanges();

        tick();
        tick(300);
        expect(workfileService.deleteItem).toHaveBeenCalledWith(collectorId, workfileId, deletePassword);
        expect(workfileService.getListItems).toHaveBeenCalledWith(collectorId);
        expect(component.form.get('workfile').value).toBeNull();
      })));
  });

  describe('getCollections()', () => {
    it('should get collections', fakeAsync(inject([WorkfileService],
      (workfileService: WorkfileService) => {
        const values: Object = {
          activity: null,
          collector: '100',
          workDate: null,
          workfile: 171
        };
        spyOn(workfileService, 'getCollections').and.callThrough();
        component.form.get('collector').patchValue(component.collectors[0].id);
        fixture.detectChanges();
        tick();
        tick(800);

        component.form.get('workfile').patchValue(component.workfiles[1].id);
        fixture.detectChanges();
        tick();
        tick(800);

        component.getCollections();

        expect(workfileService.getCollections).toHaveBeenCalledWith(values);
      })));
  });

  describe('prepareDeleteWorkfile()', () => {
    it('should open chain of modals', async(inject([ConfigurationService, CoreModalsService, WorkfileService],
      (configurationService: ConfigurationService, coreModalsService: CoreModalsService, workfileService: WorkfileService) => {
        spyOn(configurationService, 'checkValues').and.callThrough();
        spyOn(coreModalsService, 'openConfirmModal').and.callThrough();
        component.form.patchValue({ collector: '200', workfile: 1030 });
        component.prepareDeleteWorkfile();
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(configurationService.checkValues).toHaveBeenCalledWith(['DELETE.PASSWORD']);

          const confirmModal: Element = document.querySelector('body').querySelector('.modal-content');
          expect(confirmModal).toBeTruthy();

          (<HTMLElement>document.querySelector('#password')).setAttribute('value', 'password');
          (<HTMLElement>document.querySelector('.btn-primary')).click();
          fixture.detectChanges();

          fixture.whenStable().then(() => {
            expect(coreModalsService.openConfirmModal).toHaveBeenCalled();
          });
        });
    })));
  });

  describe('reassignClaims()', () => {
    it('should open reassignClaims modal', fakeAsync(inject([ModalProvider], (modalProvider: ModalProvider) => {
      spyOn(modalProvider, 'openReassignClaimModal').and.returnValue({ result: { then: (): void => {} }});
      component.form.get('collector').patchValue(component.collectors[0].id);
      fixture.detectChanges();
      tick();
      tick(800);

      component.form.get('workfile').patchValue(component.workfiles[1].id);
      fixture.detectChanges();
      tick();
      tick(800);

      component.reassignClaims(component.dataGrid.selectedRowKeys);
      expect(modalProvider.openReassignClaimModal).toHaveBeenCalledWith(component.collectors, component.collectors[0],
        component.workfiles[1].id);
    })));
  });
});
