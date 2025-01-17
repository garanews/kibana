/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { Meta } from '../../../../../common/types';
import { Result } from '../result/types';

export interface CurationSuggestion {
  query: string;
  updated_at: string;
  promoted: string[];
  status: 'pending' | 'applied' | 'automated' | 'rejected' | 'disabled';
  curation_id?: string;
  override_curation_id?: string;
}

export interface Curation {
  id: string;
  last_updated: string;
  queries: string[];
  promoted: CurationResult[];
  hidden: CurationResult[];
  organic: Result[];
  suggestion?: CurationSuggestion;
}

export interface CurationsAPIResponse {
  results: Curation[];
  meta: Meta;
}

export interface CurationResult {
  // TODO: Consider updating our internal API to return more standard Result data in the future
  id: string;
  [key: string]: string | string[];
}
