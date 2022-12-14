// This file is generated by [oats][0] and should not be edited by hand.
//
// [0]: https://github.com/influxdata/oats

export interface OAuthClientConfig {
  clientID: string
  domain: string
  redirectURL: string
  state: string
}

export interface Error {
  readonly code:
    | 'internal error'
    | 'not found'
    | 'conflict'
    | 'invalid'
    | 'unprocessable entity'
    | 'empty value'
    | 'unavailable'
    | 'forbidden'
    | 'too many requests'
    | 'unauthorized'
    | 'method not allowed'
    | 'request too large'
    | 'unsupported media type'
  readonly message?: string
  readonly op?: string
  readonly err?: string
}

export interface LimitEvents {
  links?: Links
  events?: LimitEvent[]
}

export interface Links {
  next?: Link
  self: Link
  prev?: Link
}

export type Link = string

export interface LimitEvent {
  orgID?: string
  type?:
    | 'limited_quota'
    | 'limited_write'
    | 'limited_query'
    | 'limited_cardinality'
  readonly timestamp?: string
}

export interface Limit {
  orgID?: string
  rate: {
    queryTime: number
    readKBs: number
    concurrentReadRequests: number
    writeKBs: number
    concurrentWriteRequests: number
    cardinality: number
    concurrentDeleteRequests?: number
    deleteRequestsPerSecond?: number
  }
  bucket: {
    maxBuckets: number
    maxRetentionDuration: number
  }
  task: {
    maxTasks: number
  }
  dashboard: {
    maxDashboards: number
  }
  check: {
    maxChecks: number
  }
  notificationRule: {
    maxNotifications: number
    blockedNotificationRules?: string
  }
  notificationEndpoint: {
    blockedNotificationEndpoints?: string
  }
  features?: {
    allowDelete?: boolean
  }
}

export type ServerError = any

export interface LimitStatuses {
  read: LimitStatus
  write: LimitStatus
  cardinality: LimitStatus
}

export interface LimitStatus {
  status: 'ok' | 'exceeded'
}

export interface OrgSettings {
  orgID?: string
  settings?: OrgSetting[]
}

export interface OrgSetting {
  key?: string
  value?: string
}

export interface OnboardingRequest {
  username: string
  password?: string
  org: string
  bucket: string
  retentionPeriodHrs?: number
  retentionPeriodSeconds?: number
  limit?: Limit
}

export interface OnboardingResponse {
  user?: {
    readonly id?: string
    name: string
    status?: 'active' | 'inactive'
    readonly links?: {
      self?: string
    }
  }
  org?: {
    readonly links?: {
      self?: Link
      members?: Link
      owners?: Link
      labels?: Link
      secrets?: Link
      buckets?: Link
      tasks?: Link
      dashboards?: Link
    }
    readonly id?: string
    name: string
    description?: string
    readonly createdAt?: string
    readonly updatedAt?: string
    status?: 'active' | 'inactive'
  }
  bucket?: {
    readonly links?: {
      labels?: Link
      members?: Link
      org?: Link
      owners?: Link
      self?: Link
      write?: Link
    }
    readonly id?: string
    readonly type?: 'user' | 'system'
    name: string
    description?: string
    orgID?: string
    rp?: string
    schemaType?: 'implicit' | 'explicit'
    readonly createdAt?: string
    readonly updatedAt?: string
    retentionRules: Array<{
      type?: 'expire'
      everySeconds: number
      shardGroupDurationSeconds?: number
    }>
    labels?: Array<{
      readonly id?: string
      readonly orgID?: string
      name?: string
      properties?: any
    }>
  }
  auth?: {
    status?: 'active' | 'inactive'
    description?: string
  } & {
    readonly createdAt?: string
    readonly updatedAt?: string
    orgID?: string
    permissions?: Array<{
      action: 'read' | 'write'
      resource: {
        type:
          | 'authorizations'
          | 'buckets'
          | 'dashboards'
          | 'orgs'
          | 'tasks'
          | 'telegrafs'
          | 'users'
          | 'variables'
          | 'secrets'
          | 'labels'
          | 'views'
          | 'documents'
          | 'notificationRules'
          | 'notificationEndpoints'
          | 'checks'
          | 'dbrp'
          | 'flows'
          | 'annotations'
          | 'functions'
        id?: string
        name?: string
        orgID?: string
        org?: string
      }
    }>
    readonly id?: string
    readonly token?: string
    readonly userID?: string
    readonly user?: string
    readonly org?: string
    readonly links?: {
      readonly self?: Link
      readonly user?: Link
    }
  }
}

export interface ProvisionRequest {
  user: Identity
  org: Identity
  config: {
    bucket?: string
    retentionPeriodSeconds?: number
    limit?: Limit
  }
  returnToken?: boolean
}

export interface Identity {
  id?: string
  name?: string
}

export interface ProvisionResponse {
  user?: Identity
  org?: IdentityWithLinks
  token?: string
}

export interface IdentityWithLinks {
  id?: string
  name?: string
  links?: Links
}

export interface ProvisionDeleteRequest {
  orgID: string
}

export interface ProvisionUserRequest {
  user: Identity
  orgID: string
  role: 'owner' | 'member'
}

export interface ProvisionUserResponse {
  user?: Identity
  org?: Identity
}

export interface ProvisionUserDeleteRequest {
  userID: string
  orgID: string
  newOwnerID?: string
  tokenOption?: 'transfer' | 'delete'
  taskOption?: 'transfer' | 'delete'
}

export interface ProvisionSetupRequest {
  user: Identity
  org: Identity
}

export interface ProvisionSuspendRequest {
  orgID: string
}

interface RequestOptions {
  signal?: AbortSignal
}

export type RequestHandler = (
  url: string,
  query: string,
  init: RequestInit
) => {url: string; query: string; init: RequestInit}
export type ResponseHandler = (
  status: number,
  headers: Headers,
  data: any
) => {status: number; headers: Headers; data: any}

const RequestContext = function (
  requestHandler: RequestHandler,
  responseHandler: ResponseHandler
) {
  this.requestHandler = requestHandler
  this.responseHandler = responseHandler
}

RequestContext.prototype.request = async function (
  method: string,
  url: string,
  params: any = {},
  options: RequestOptions = {}
): Promise<any> {
  const requestHeaders = new Headers(params.headers)
  const contentType = requestHeaders.get('Content-Type') || ''

  if (params.auth) {
    const credentials = btoa(`${params.auth.username}:${params.auth.password}`)

    requestHeaders.append('Authorization', `Basic ${credentials}`)
  }

  const body =
    params.data && contentType.includes('json')
      ? JSON.stringify(params.data)
      : params.data

  const query = params.query ? `?${new URLSearchParams(params.query)}` : ''

  const {
    url: middlewareUrl,
    query: middlewareQuery,
    init,
  } = this.requestHandler(url, query, {
    method,
    body,
    credentials: 'same-origin',
    signal: options.signal,
    headers: requestHeaders,
  })

  const response = await fetch(`${middlewareUrl}${middlewareQuery}`, init)

  const {status, headers} = response
  const responseContentType = headers.get('Content-Type') || ''

  let data

  if (responseContentType.includes('json')) {
    data = await response.json()
  } else if (responseContentType.includes('octet-stream')) {
    data = await response.blob()
  } else {
    data = await response.text()
  }

  return this.responseHandler(status, headers, data)
}

RequestContext.prototype.setRequestHandler = function (
  requestHandler: RequestHandler
) {
  this.requestHandler = requestHandler
}

RequestContext.prototype.setResponseHandler = function (
  responseHandler: ResponseHandler
) {
  this.responseHandler = responseHandler
}

const rc = new RequestContext(
  (url, query, init) => {
    return {url, query, init}
  },
  (status, headers, data) => {
    return {status, headers, data}
  }
)
const request = rc.request.bind(rc)
const setRequestHandler = rc.setRequestHandler.bind(rc)
const setResponseHandler = rc.setResponseHandler.bind(rc)

export {request, setRequestHandler, setResponseHandler}

export interface GetOauthClientConfigParams {
  query?: {
    redirectTo?: string
  }
}

type GetOauthClientConfigResult =
  | GetOauthClientConfigOKResult
  | GetOauthClientConfigDefaultResult

interface GetOauthClientConfigOKResult {
  status: 200
  headers: Headers
  data: OAuthClientConfig
}

interface GetOauthClientConfigDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const getOauthClientConfig = (
  params: GetOauthClientConfigParams,
  options: RequestOptions = {}
): Promise<GetOauthClientConfigResult> =>
  request(
    'GET',
    '/api/v2private/oauth/clientConfig',
    params,
    options
  ) as Promise<GetOauthClientConfigResult>

export interface GetFlagsParams {}

type GetFlagsResult = GetFlagsOKResult | GetFlagsDefaultResult

interface GetFlagsOKResult {
  status: 200
  headers: Headers
  data: any
}

interface GetFlagsDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const getFlags = (
  params: GetFlagsParams,
  options: RequestOptions = {}
): Promise<GetFlagsResult> =>
  request(
    'GET',
    '/api/v2private/flags',
    params,
    options
  ) as Promise<GetFlagsResult>

export interface GetLimiteventsParams {
  query: {
    orgID: string
    start?: string
    stop?: string
    limit?: number
    offset?: number
  }
}

type GetLimiteventsResult = GetLimiteventsOKResult | GetLimiteventsDefaultResult

interface GetLimiteventsOKResult {
  status: 200
  headers: Headers
  data: LimitEvents
}

interface GetLimiteventsDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const getLimitevents = (
  params: GetLimiteventsParams,
  options: RequestOptions = {}
): Promise<GetLimiteventsResult> =>
  request(
    'GET',
    '/api/v2private/limitevents',
    params,
    options
  ) as Promise<GetLimiteventsResult>

export interface GetOrgsLimitsParams {
  orgID: string
}

type GetOrgsLimitsResult = GetOrgsLimitsOKResult | GetOrgsLimitsDefaultResult

interface GetOrgsLimitsOKResult {
  status: 200
  headers: Headers
  data: Limit
}

interface GetOrgsLimitsDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const getOrgsLimits = (
  params: GetOrgsLimitsParams,
  options: RequestOptions = {}
): Promise<GetOrgsLimitsResult> =>
  request(
    'GET',
    `/api/v2private/orgs/${params.orgID}/limits`,
    params,
    options
  ) as Promise<GetOrgsLimitsResult>

export interface PutOrgsLimitsParams {
  orgID: string

  data: Limit
}

type PutOrgsLimitsResult = PutOrgsLimitsOKResult | PutOrgsLimitsDefaultResult

interface PutOrgsLimitsOKResult {
  status: 200
  headers: Headers
  data: Limit
}

interface PutOrgsLimitsDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const putOrgsLimits = (
  params: PutOrgsLimitsParams,
  options: RequestOptions = {}
): Promise<PutOrgsLimitsResult> =>
  request(
    'PUT',
    `/api/v2private/orgs/${params.orgID}/limits`,
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PutOrgsLimitsResult>

export interface PatchOrgsLimitsParams {
  orgID: string

  data: {
    orgID?: string
    rate?: {
      queryTime?: number
      readKBs?: number
      concurrentReadRequests?: number
      writeKBs?: number
      concurrentWriteRequests?: number
      cardinality?: number
      concurrentDeleteRequests?: number
      deleteRequestsPerSecond?: number
    }
    bucket?: {
      maxBuckets?: number
      maxRetentionDuration?: number
    }
    task?: {
      maxTasks: number
    }
    dashboard?: {
      maxDashboards: number
    }
    check?: {
      maxChecks: number
    }
    notificationRule?: {
      maxNotifications?: number
      blockedNotificationRules?: string
    }
    notificationEndpoint?: {
      blockedNotificationEndpoints?: string
    }
  }
}

type PatchOrgsLimitsResult =
  | PatchOrgsLimitsOKResult
  | PatchOrgsLimitsUnprocessableEntityResult
  | PatchOrgsLimitsDefaultResult

interface PatchOrgsLimitsOKResult {
  status: 200
  headers: Headers
  data: Limit
}

interface PatchOrgsLimitsUnprocessableEntityResult {
  status: 422
  headers: Headers
  data: ServerError
}

interface PatchOrgsLimitsDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const patchOrgsLimits = (
  params: PatchOrgsLimitsParams,
  options: RequestOptions = {}
): Promise<PatchOrgsLimitsResult> =>
  request(
    'PATCH',
    `/api/v2private/orgs/${params.orgID}/limits`,
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PatchOrgsLimitsResult>

export interface GetOrgsLimitsStatusParams {
  orgID: string
}

type GetOrgsLimitsStatusResult =
  | GetOrgsLimitsStatusOKResult
  | GetOrgsLimitsStatusDefaultResult

interface GetOrgsLimitsStatusOKResult {
  status: 200
  headers: Headers
  data: LimitStatuses
}

interface GetOrgsLimitsStatusDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const getOrgsLimitsStatus = (
  params: GetOrgsLimitsStatusParams,
  options: RequestOptions = {}
): Promise<GetOrgsLimitsStatusResult> =>
  request(
    'GET',
    `/api/v2private/orgs/${params.orgID}/limits/status`,
    params,
    options
  ) as Promise<GetOrgsLimitsStatusResult>

export interface GetOrgsSettingsParams {
  orgID: string
}

type GetOrgsSettingsResult =
  | GetOrgsSettingsOKResult
  | GetOrgsSettingsDefaultResult

interface GetOrgsSettingsOKResult {
  status: 200
  headers: Headers
  data: OrgSettings
}

interface GetOrgsSettingsDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const getOrgsSettings = (
  params: GetOrgsSettingsParams,
  options: RequestOptions = {}
): Promise<GetOrgsSettingsResult> =>
  request(
    'GET',
    `/api/v2private/orgs/${params.orgID}/settings`,
    params,
    options
  ) as Promise<GetOrgsSettingsResult>

export interface PutOrgsSettingsParams {
  orgID: string

  data: OrgSettings
}

type PutOrgsSettingsResult =
  | PutOrgsSettingsOKResult
  | PutOrgsSettingsDefaultResult

interface PutOrgsSettingsOKResult {
  status: 200
  headers: Headers
  data: OrgSettings
}

interface PutOrgsSettingsDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const putOrgsSettings = (
  params: PutOrgsSettingsParams,
  options: RequestOptions = {}
): Promise<PutOrgsSettingsResult> =>
  request(
    'PUT',
    `/api/v2private/orgs/${params.orgID}/settings`,
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PutOrgsSettingsResult>

export interface PostSetupUserParams {
  data: OnboardingRequest
}

type PostSetupUserResult =
  | PostSetupUserCreatedResult
  | PostSetupUserDefaultResult

interface PostSetupUserCreatedResult {
  status: 201
  headers: Headers
  data: OnboardingResponse
}

interface PostSetupUserDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const postSetupUser = (
  params: PostSetupUserParams,
  options: RequestOptions = {}
): Promise<PostSetupUserResult> =>
  request(
    'POST',
    '/api/v2private/setup/user',
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PostSetupUserResult>

export interface PutProvisionParams {
  data: ProvisionRequest
}

type PutProvisionResult =
  | PutProvisionCreatedResult
  | PutProvisionBadRequestResult
  | PutProvisionUnauthorizedResult
  | PutProvisionForbiddenResult
  | PutProvisionUnprocessableEntityResult
  | PutProvisionNotImplementedResult
  | PutProvisionDefaultResult

interface PutProvisionCreatedResult {
  status: 201
  headers: Headers
  data: ProvisionResponse
}

interface PutProvisionBadRequestResult {
  status: 400
  headers: Headers
  data: ServerError
}

interface PutProvisionUnauthorizedResult {
  status: 401
  headers: Headers
  data: ServerError
}

interface PutProvisionForbiddenResult {
  status: 403
  headers: Headers
  data: ServerError
}

interface PutProvisionUnprocessableEntityResult {
  status: 422
  headers: Headers
  data: ServerError
}

interface PutProvisionNotImplementedResult {
  status: 501
  headers: Headers
  data: ServerError
}

interface PutProvisionDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const putProvision = (
  params: PutProvisionParams,
  options: RequestOptions = {}
): Promise<PutProvisionResult> =>
  request(
    'PUT',
    '/api/v2private/provision',
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PutProvisionResult>

export interface PostProvisionDeleteParams {
  data: ProvisionDeleteRequest
}

type PostProvisionDeleteResult =
  | PostProvisionDeleteNoContentResult
  | PostProvisionDeleteBadRequestResult
  | PostProvisionDeleteUnauthorizedResult
  | PostProvisionDeleteUnprocessableEntityResult
  | PostProvisionDeleteDefaultResult

interface PostProvisionDeleteNoContentResult {
  status: 204
  headers: Headers
  data: any
}

interface PostProvisionDeleteBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PostProvisionDeleteUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface PostProvisionDeleteUnprocessableEntityResult {
  status: 422
  headers: Headers
  data: Error
}

interface PostProvisionDeleteDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const postProvisionDelete = (
  params: PostProvisionDeleteParams,
  options: RequestOptions = {}
): Promise<PostProvisionDeleteResult> =>
  request(
    'POST',
    '/api/v2private/provision/delete',
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PostProvisionDeleteResult>

export interface PutProvisionUserParams {
  data: ProvisionUserRequest

  headers?: {
    'Zap-Trace-Span'?: string
  }
}

type PutProvisionUserResult =
  | PutProvisionUserCreatedResult
  | PutProvisionUserBadRequestResult
  | PutProvisionUserUnauthorizedResult
  | PutProvisionUserUnprocessableEntityResult
  | PutProvisionUserNotImplementedResult
  | PutProvisionUserDefaultResult

interface PutProvisionUserCreatedResult {
  status: 201
  headers: Headers
  data: ProvisionUserResponse
}

interface PutProvisionUserBadRequestResult {
  status: 400
  headers: Headers
  data: ServerError
}

interface PutProvisionUserUnauthorizedResult {
  status: 401
  headers: Headers
  data: ServerError
}

interface PutProvisionUserUnprocessableEntityResult {
  status: 422
  headers: Headers
  data: ServerError
}

interface PutProvisionUserNotImplementedResult {
  status: 501
  headers: Headers
  data: ServerError
}

interface PutProvisionUserDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const putProvisionUser = (
  params: PutProvisionUserParams,
  options: RequestOptions = {}
): Promise<PutProvisionUserResult> =>
  request(
    'PUT',
    '/api/v2private/provision/user',
    {
      ...params,
      headers: {...params.headers, 'Content-Type': 'application/json'},
    },
    options
  ) as Promise<PutProvisionUserResult>

export interface PostProvisionUserDeleteParams {
  data: ProvisionUserDeleteRequest
}

type PostProvisionUserDeleteResult =
  | PostProvisionUserDeleteNoContentResult
  | PostProvisionUserDeleteBadRequestResult
  | PostProvisionUserDeleteUnauthorizedResult
  | PostProvisionUserDeleteUnprocessableEntityResult
  | PostProvisionUserDeleteDefaultResult

interface PostProvisionUserDeleteNoContentResult {
  status: 204
  headers: Headers
  data: any
}

interface PostProvisionUserDeleteBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PostProvisionUserDeleteUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface PostProvisionUserDeleteUnprocessableEntityResult {
  status: 422
  headers: Headers
  data: Error
}

interface PostProvisionUserDeleteDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const postProvisionUserDelete = (
  params: PostProvisionUserDeleteParams,
  options: RequestOptions = {}
): Promise<PostProvisionUserDeleteResult> =>
  request(
    'POST',
    '/api/v2private/provision/user/delete',
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PostProvisionUserDeleteResult>

export interface PostProvisionSetupParams {
  data: ProvisionSetupRequest
}

type PostProvisionSetupResult =
  | PostProvisionSetupCreatedResult
  | PostProvisionSetupBadRequestResult
  | PostProvisionSetupUnprocessableEntityResult
  | PostProvisionSetupDefaultResult

interface PostProvisionSetupCreatedResult {
  status: 201
  headers: Headers
  data: {
    token?: string
  }
}

interface PostProvisionSetupBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PostProvisionSetupUnprocessableEntityResult {
  status: 422
  headers: Headers
  data: Error
}

interface PostProvisionSetupDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const postProvisionSetup = (
  params: PostProvisionSetupParams,
  options: RequestOptions = {}
): Promise<PostProvisionSetupResult> =>
  request(
    'POST',
    '/api/v2private/provision/setup',
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PostProvisionSetupResult>

export interface PostProvisionSuspendParams {
  data: ProvisionSuspendRequest
}

type PostProvisionSuspendResult =
  | PostProvisionSuspendNoContentResult
  | PostProvisionSuspendBadRequestResult
  | PostProvisionSuspendUnauthorizedResult
  | PostProvisionSuspendUnprocessableEntityResult
  | PostProvisionSuspendDefaultResult

interface PostProvisionSuspendNoContentResult {
  status: 204
  headers: Headers
  data: any
}

interface PostProvisionSuspendBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PostProvisionSuspendUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface PostProvisionSuspendUnprocessableEntityResult {
  status: 422
  headers: Headers
  data: Error
}

interface PostProvisionSuspendDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const postProvisionSuspend = (
  params: PostProvisionSuspendParams,
  options: RequestOptions = {}
): Promise<PostProvisionSuspendResult> =>
  request(
    'POST',
    '/api/v2private/provision/suspend',
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PostProvisionSuspendResult>

export interface PostProvisionUnsuspendParams {
  data: ProvisionSuspendRequest
}

type PostProvisionUnsuspendResult =
  | PostProvisionUnsuspendNoContentResult
  | PostProvisionUnsuspendBadRequestResult
  | PostProvisionUnsuspendUnauthorizedResult
  | PostProvisionUnsuspendUnprocessableEntityResult
  | PostProvisionUnsuspendDefaultResult

interface PostProvisionUnsuspendNoContentResult {
  status: 204
  headers: Headers
  data: any
}

interface PostProvisionUnsuspendBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PostProvisionUnsuspendUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface PostProvisionUnsuspendUnprocessableEntityResult {
  status: 422
  headers: Headers
  data: Error
}

interface PostProvisionUnsuspendDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const postProvisionUnsuspend = (
  params: PostProvisionUnsuspendParams,
  options: RequestOptions = {}
): Promise<PostProvisionUnsuspendResult> =>
  request(
    'POST',
    '/api/v2private/provision/unsuspend',
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PostProvisionUnsuspendResult>
