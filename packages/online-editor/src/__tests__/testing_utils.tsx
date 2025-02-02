/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { EMPTY_FILE_DMN } from "@kie-tooling-core/editor/dist/channel";
import * as React from "react";
import { Route, Switch } from "react-router";
import { HashRouter } from "react-router-dom";
import { GithubService } from "../common/GithubService";
import { GlobalContext, GlobalContextType } from "../common/GlobalContext";
import { Routes } from "../common/Routes";
import { EnvelopeMapping } from "@kie-tooling-core/editor/dist/api";
import { I18nDictionariesProvider, I18nDictionariesProviderProps } from "@kie-tooling-core/i18n/dist/react-components";
import { OnlineI18n, OnlineI18nContext, onlineI18nDefaults, onlineI18nDictionaries } from "../common/i18n";
import { EMPTY_CONFIG } from "../editor/DmnDevSandbox/DmnDevSandboxConnectionConfig";
import { DmnDevSandboxContext, DmnDevSandboxContextType } from "../editor/DmnDevSandbox/DmnDevSandboxContext";
import { DmnDevSandboxInstanceStatus } from "../editor/DmnDevSandbox/DmnDevSandboxInstanceStatus";
import { DmnRunnerContextProvider } from "../editor/DmnRunner/DmnRunnerContextProvider";
import {
  DependentFeature,
  KieToolingExtendedServicesContext,
  KieToolingExtendedServicesContextType,
} from "../editor/KieToolingExtendedServices/KieToolingExtendedServicesContext";
import { KieToolingExtendedServicesStatus } from "../editor/KieToolingExtendedServices/KieToolingExtendedServicesStatus";
import { NotificationsPanelContextProvider } from "../editor/NotificationsPanel/NotificationsPanelContextProvider";

export function usingTestingGlobalContext(children: React.ReactElement, ctx?: Partial<GlobalContextType>) {
  const envelopeMapping: EnvelopeMapping = {
    envelopePath: "envelope/envelope.html",
    resourcesPathPrefix: "",
  };

  const usedCtx: GlobalContextType = {
    file: EMPTY_FILE_DMN,
    routes: new Routes(),
    editorEnvelopeLocator: {
      targetOrigin: window.location.origin,
      mapping: new Map([
        ["dmn", envelopeMapping],
        ["bpmn", envelopeMapping],
        ["bpmn2", envelopeMapping],
      ]),
    },
    readonly: false,
    external: false,
    senderTabId: undefined,
    githubService: new GithubService(),
    isChrome: true,
    ...ctx,
  };
  return {
    ctx: usedCtx,
    wrapper: (
      <GlobalContext.Provider key={""} value={usedCtx}>
        <HashRouter>
          <Switch>
            <Route exact={true} path={usedCtx.routes.home.url({})}>
              {children}
            </Route>
          </Switch>
        </HashRouter>
      </GlobalContext.Provider>
    ),
  };
}

export function usingTestingOnlineI18nContext(
  children: React.ReactElement,
  ctx?: Partial<I18nDictionariesProviderProps<OnlineI18n>>
) {
  const usedCtx: I18nDictionariesProviderProps<OnlineI18n> = {
    defaults: onlineI18nDefaults,
    dictionaries: onlineI18nDictionaries,
    ctx: OnlineI18nContext,
    children,
    ...ctx,
  };
  return {
    ctx: usedCtx,
    wrapper: (
      <I18nDictionariesProvider defaults={usedCtx.defaults} dictionaries={usedCtx.dictionaries} ctx={usedCtx.ctx}>
        {usedCtx.children}
      </I18nDictionariesProvider>
    ),
  };
}

export function usingTestingNotificationsPanelContext(children: React.ReactElement, ref?: React.RefObject<any>) {
  return <NotificationsPanelContextProvider ref={ref}>{children}</NotificationsPanelContextProvider>;
}

export function usingTestingDmnRunnerContext(children: React.ReactElement, editor: any, isEditorReady = true) {
  return (
    <DmnRunnerContextProvider editor={editor} isEditorReady={isEditorReady}>
      {children}
    </DmnRunnerContextProvider>
  );
}

export function usingTestingDmnDevSandboxContext(
  children: React.ReactElement,
  ctx?: Partial<DmnDevSandboxContextType>
) {
  const usedCtx: DmnDevSandboxContextType = {
    deployments: [],
    currentConfig: EMPTY_CONFIG,
    instanceStatus: DmnDevSandboxInstanceStatus.CONNECTED,
    isDropdownOpen: false,
    isConfigModalOpen: false,
    isConfigWizardOpen: false,
    isConfirmDeployModalOpen: false,
    setDeployments: jest.fn(),
    setInstanceStatus: jest.fn(),
    setDropdownOpen: jest.fn(),
    setConfigModalOpen: jest.fn(),
    setConfigWizardOpen: jest.fn(),
    setConfirmDeployModalOpen: jest.fn(),
    onDeploy: jest.fn(),
    onCheckConfig: jest.fn(),
    onResetConfig: jest.fn(),
    ...ctx,
  };

  return {
    ctx: usedCtx,
    wrapper: (
      <DmnDevSandboxContext.Provider key={""} value={usedCtx}>
        {children}
      </DmnDevSandboxContext.Provider>
    ),
  };
}

export function usingTestingKieToolingExtendedServicesContext(
  children: React.ReactElement,
  ctx?: Partial<KieToolingExtendedServicesContextType>
) {
  const usedCtx: KieToolingExtendedServicesContextType = {
    status: KieToolingExtendedServicesStatus.RUNNING,
    port: "21345",
    baseUrl: "http://localhost:21345",
    version: "X.Y.Z",
    outdated: false,
    isModalOpen: false,
    installTriggeredBy: DependentFeature.DMN_RUNNER,
    setStatus: jest.fn(),
    setModalOpen: jest.fn(),
    setInstallTriggeredBy: jest.fn(),
    saveNewPort: jest.fn(),
    closeDmnTour: jest.fn(),
    ...ctx,
  };
  return {
    ctx: usedCtx,
    wrapper: (
      <KieToolingExtendedServicesContext.Provider key={""} value={usedCtx}>
        {children}
      </KieToolingExtendedServicesContext.Provider>
    ),
  };
}
