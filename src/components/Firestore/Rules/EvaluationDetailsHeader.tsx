/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import './index.scss';

import { Icon } from '@rmwc/icon';
import { IconButton } from '@rmwc/icon-button';
import React from 'react';
import { Link } from 'react-router-dom';

import { CustomThemeProvider } from '../../../themes';
import { FirestoreRulesEvaluation } from './rules_evaluation_result_model';
import { useEvaluationCleanData } from './utils';

const EvaluationDetailsHeader: React.FC<{
  evaluation?: FirestoreRulesEvaluation;
}> = ({ evaluation }) => {
  const [
    requestTimeComplete,
    requestTimeFromNow,
    requestMethod,
    resourceSubPaths,
    outcomeData,
  ] = useEvaluationCleanData(evaluation);

  return (
    <div className="Firestore-Evaluation-Details-Header">
      <div
        className="Firestore-Evaluation-Details-Header-Return"
        title="Go back to Table"
      >
        <IconButton icon="arrow_back_ios" tag={Link} to="/firestore/rules" />
      </div>
      <div
        className="Firestore-Evaluation-Details-Header-Info"
        title={outcomeData?.label}
      >
        <CustomThemeProvider use={outcomeData?.theme || 'note'} wrap>
          <div
            className="Firestore-Evaluation-Outcome"
            title={outcomeData?.label}
          >
            {outcomeData?.icon && (
              <Icon icon={{ icon: outcomeData?.icon, size: 'large' }} />
            )}
          </div>
        </CustomThemeProvider>
        <div className="Firestore-Evaluation-Method">{requestMethod}</div>
        <div className="Firestore-Evaluations-Path-Container">
          {resourceSubPaths?.map((subpath, index) => (
            <React.Fragment key={`${subpath}-${index}`}>
              <span className="Firestore-Evaluation-Path-Slash"> / </span>
              <span
                title="copy subpath"
                className="Firestore-Evaluation-Path-Subpath"
                onClick={() => {
                  navigator.clipboard.writeText(subpath);
                }}
              >
                {' '}
                {subpath}{' '}
              </span>
            </React.Fragment>
          ))}
        </div>
        <div className="Firestore-Evaluation-Date" title={requestTimeComplete}>
          {requestTimeFromNow}
        </div>
      </div>
    </div>
  );
};

export default EvaluationDetailsHeader;
