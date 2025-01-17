/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import React, { useContext, useState, useCallback } from 'react';
import { i18n } from '@kbn/i18n';
import { find } from 'lodash';
import { useKibana } from '../../../../../../../src/plugins/kibana_react/public';
import { GlobalStateContext } from '../../global_state_context';
import { ComponentProps } from '../../route_init';
import { useCharts } from '../../hooks/use_charts';
// @ts-ignore
import { Overview } from '../../../components/logstash/overview';
import { LogstashTemplate } from './logstash_template';

export const LogStashOverviewPage: React.FC<ComponentProps> = ({ clusters }) => {
  const globalState = useContext(GlobalStateContext);
  const { zoomInfo, onBrush } = useCharts();
  const { services } = useKibana<{ data: any }>();
  const clusterUuid = globalState.cluster_uuid;
  const ccs = globalState.ccs;
  const cluster = find(clusters, {
    cluster_uuid: clusterUuid,
  });
  const [data, setData] = useState(null);
  // const [showShardActivityHistory, setShowShardActivityHistory] = useState(false);

  const title = i18n.translate('xpack.monitoring.logstash.overview.title', {
    defaultMessage: 'Logstash',
  });

  const pageTitle = i18n.translate('xpack.monitoring.logstash.overview.pageTitle', {
    defaultMessage: 'Logstash overview',
  });

  const getPageData = useCallback(async () => {
    const bounds = services.data?.query.timefilter.timefilter.getBounds();
    const url = `../api/monitoring/v1/clusters/${clusterUuid}/logstash`;

    const response = await services.http?.fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ccs,
        timeRange: {
          min: bounds.min.toISOString(),
          max: bounds.max.toISOString(),
        },
      }),
    });

    setData(response);
  }, [ccs, clusterUuid, services.data?.query.timefilter.timefilter, services.http]);

  const renderOverview = (overviewData: any) => {
    if (overviewData === null) {
      return null;
    }
    const { clusterStatus, metrics, logs } = overviewData || {};

    return (
      <Overview
        stats={clusterStatus}
        metrics={metrics}
        logs={logs}
        onBrush={onBrush}
        zoomInfo={zoomInfo}
      />
    );
  };

  return (
    <LogstashTemplate
      title={title}
      pageTitle={pageTitle}
      getPageData={getPageData}
      data-test-subj="elasticsearchOverviewPage"
      cluster={cluster}
    >
      <div data-test-subj="elasticsearchOverviewPage">{renderOverview(data)}</div>
    </LogstashTemplate>
  );
};
