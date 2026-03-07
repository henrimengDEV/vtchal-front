import {InjectionToken} from '@angular/core';
import {CreateFactureRequest, FactureModel} from '../model/facture.model';

export interface FactureApiContract {
  getAll(): FactureModel[];
  create(request: CreateFactureRequest): FactureModel;
  remove(id: string): void;
}

export const FACTURE_API_CONTRACT = new InjectionToken<FactureApiContract>('FACTURE_API_CONTRACT');
