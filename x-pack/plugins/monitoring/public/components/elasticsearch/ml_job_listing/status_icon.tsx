/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { i18n } from '@kbn/i18n';
import { StatusIcon } from '../../status_icon';

export function MachineLearningJobStatusIcon({ status }: { status: string }) {
  const type = (() => {
    const statusKey = status.toUpperCase();

    if (statusKey === 'OPENED') {
      return StatusIcon.TYPES.GREEN;
    } else if (statusKey === 'CLOSED') {
      return StatusIcon.TYPES.GRAY;
    } else if (statusKey === 'FAILED') {
      return StatusIcon.TYPES.RED;
    }

    // basically a "changing" state like OPENING or CLOSING
    return StatusIcon.TYPES.YELLOW;
  })();

  return (
    <StatusIcon
      type={type}
      label={i18n.translate('xpack.monitoring.elasticsearch.mlJobListing.statusIconLabel', {
        defaultMessage: 'Job Status: {status}',
        values: { status },
      })}
    />
  );
}
