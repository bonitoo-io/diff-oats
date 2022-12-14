// This file is generated by [oats][0] and should not be edited by hand.
//
// [0]: https://github.com/influxdata/oats

export interface Scripts {
  scripts?: Script[]
}

export interface Script {
  readonly id?: string
  name: string
  description?: string
  orgID: string
  /** script to be executed */
  script: string
  language?: ScriptLanguage
  /** invocation endpoint address */
  url?: string
  readonly createdAt?: string
  readonly updatedAt?: string
  /** The list of label names associated with the script. */
  labels?: string[]
}

export type ScriptLanguage = 'flux'

export interface Error {
  /** code is the machine-readable error code. */
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
  /** Human-readable message. */
  readonly message?: string
  /** Describes the logical code operation when the error occurred. Useful for debugging. */
  readonly op?: string
  /** Stack of errors that occurred during processing of the request. Useful for debugging. */
  readonly err?: string
}

export interface ScriptCreateRequest {
  /** Script name. The name must be unique within the organization. */
  name: string
  /** Script description. A description of the script. */
  description: string
  /** The script to execute. */
  script: string
  language: ScriptLanguage
}

export interface ScriptUpdateRequest {
  name?: string
  description?: string
  /** script is script to be executed */
  script?: string
}

export interface ScriptInvocationParams {
  /** The script parameters.
`params` contains key-value pairs that map values to the **params.keys**
in a script.
When you invoke a script with `params`, InfluxDB passes the values as
invocation parameters to the script.
 */
  params?: any
}

/**
 * The response body contains the results of the executed script.
The response is user-defined and dynamic.

*/
export type ScriptHTTPResponseData = string

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

export interface GetScriptsParams {
  query?: {
    limit?: number
    offset?: number
    name?: string
    labelNames?: any
    labelContains?: string
  }
}

type GetScriptsResult =
  | GetScriptsOKResult
  | GetScriptsBadRequestResult
  | GetScriptsUnauthorizedResult
  | GetScriptsInternalServerErrorResult
  | GetScriptsDefaultResult

interface GetScriptsOKResult {
  status: 200
  headers: Headers
  data: Scripts
}

interface GetScriptsBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface GetScriptsUnauthorizedResult {
  status: 401
  headers: Headers
  data: {
    /** The HTTP status code description. Default is `unauthorized`.
     */
    readonly code?: 'unauthorized'
    /** A human-readable message that may contain detail about the error. */
    readonly message?: string
  }
}

interface GetScriptsInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

interface GetScriptsDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const getScripts = (
  params: GetScriptsParams,
  options: RequestOptions = {}
): Promise<GetScriptsResult> =>
  request(
    'GET',
    '/api/v2/scripts',
    params,
    options
  ) as Promise<GetScriptsResult>

export interface PostScriptParams {
  data: ScriptCreateRequest
}

type PostScriptResult =
  | PostScriptCreatedResult
  | PostScriptBadRequestResult
  | PostScriptUnauthorizedResult
  | PostScriptUnprocessableEntityResult
  | PostScriptInternalServerErrorResult
  | PostScriptDefaultResult

interface PostScriptCreatedResult {
  status: 201
  headers: Headers
  data: Script
}

interface PostScriptBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PostScriptUnauthorizedResult {
  status: 401
  headers: Headers
  data: {
    /** The HTTP status code description. Default is `unauthorized`.
     */
    readonly code?: 'unauthorized'
    /** A human-readable message that may contain detail about the error. */
    readonly message?: string
  }
}

interface PostScriptUnprocessableEntityResult {
  status: 422
  headers: Headers
  data: Error
}

interface PostScriptInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

interface PostScriptDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const postScript = (
  params: PostScriptParams,
  options: RequestOptions = {}
): Promise<PostScriptResult> =>
  request(
    'POST',
    '/api/v2/scripts',
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PostScriptResult>

export interface GetScriptParams {
  scriptID: string
}

type GetScriptResult = GetScriptOKResult | GetScriptDefaultResult

interface GetScriptOKResult {
  status: 200
  headers: Headers
  data: Script
}

interface GetScriptDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const getScript = (
  params: GetScriptParams,
  options: RequestOptions = {}
): Promise<GetScriptResult> =>
  request(
    'GET',
    `/api/v2/scripts/${params.scriptID}`,
    params,
    options
  ) as Promise<GetScriptResult>

export interface PatchScriptParams {
  scriptID: string

  data: ScriptUpdateRequest
}

type PatchScriptResult = PatchScriptOKResult | PatchScriptDefaultResult

interface PatchScriptOKResult {
  status: 200
  headers: Headers
  data: Script
}

interface PatchScriptDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const patchScript = (
  params: PatchScriptParams,
  options: RequestOptions = {}
): Promise<PatchScriptResult> =>
  request(
    'PATCH',
    `/api/v2/scripts/${params.scriptID}`,
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PatchScriptResult>

export interface DeleteScriptParams {
  scriptID: string
}

type DeleteScriptResult =
  | DeleteScriptNoContentResult
  | DeleteScriptDefaultResult

interface DeleteScriptNoContentResult {
  status: 204
  headers: Headers
  data: any
}

interface DeleteScriptDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const deleteScript = (
  params: DeleteScriptParams,
  options: RequestOptions = {}
): Promise<DeleteScriptResult> =>
  request(
    'DELETE',
    `/api/v2/scripts/${params.scriptID}`,
    params,
    options
  ) as Promise<DeleteScriptResult>

export interface PostScriptsInvokeParams {
  scriptID: string

  data?: ScriptInvocationParams
}

type PostScriptsInvokeResult =
  | PostScriptsInvokeOKResult
  | PostScriptsInvokeBadRequestResult
  | PostScriptsInvokeUnauthorizedResult
  | PostScriptsInvokeNotFoundResult
  | PostScriptsInvokeInternalServerErrorResult
  | PostScriptsInvokeDefaultResult

interface PostScriptsInvokeOKResult {
  status: 200
  headers: Headers
  data: ScriptHTTPResponseData
}

interface PostScriptsInvokeBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PostScriptsInvokeUnauthorizedResult {
  status: 401
  headers: Headers
  data: {
    /** The HTTP status code description. Default is `unauthorized`.
     */
    readonly code?: 'unauthorized'
    /** A human-readable message that may contain detail about the error. */
    readonly message?: string
  }
}

interface PostScriptsInvokeNotFoundResult {
  status: 404
  headers: Headers
  data: Error
}

interface PostScriptsInvokeInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

interface PostScriptsInvokeDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const postScriptsInvoke = (
  params: PostScriptsInvokeParams,
  options: RequestOptions = {}
): Promise<PostScriptsInvokeResult> =>
  request(
    'POST',
    `/api/v2/scripts/${params.scriptID}/invoke`,
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PostScriptsInvokeResult>

export interface PatchScriptsLabelsAddParams {
  scriptID: string

  data: {
    /** A list of label names to add. */
    labels?: string[]
  }
}

type PatchScriptsLabelsAddResult =
  | PatchScriptsLabelsAddOKResult
  | PatchScriptsLabelsAddBadRequestResult
  | PatchScriptsLabelsAddUnauthorizedResult
  | PatchScriptsLabelsAddNotFoundResult
  | PatchScriptsLabelsAddInternalServerErrorResult
  | PatchScriptsLabelsAddDefaultResult

interface PatchScriptsLabelsAddOKResult {
  status: 200
  headers: Headers
  data: Script
}

interface PatchScriptsLabelsAddBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PatchScriptsLabelsAddUnauthorizedResult {
  status: 401
  headers: Headers
  data: {
    /** The HTTP status code description. Default is `unauthorized`.
     */
    readonly code?: 'unauthorized'
    /** A human-readable message that may contain detail about the error. */
    readonly message?: string
  }
}

interface PatchScriptsLabelsAddNotFoundResult {
  status: 404
  headers: Headers
  data: Error
}

interface PatchScriptsLabelsAddInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

interface PatchScriptsLabelsAddDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const patchScriptsLabelsAdd = (
  params: PatchScriptsLabelsAddParams,
  options: RequestOptions = {}
): Promise<PatchScriptsLabelsAddResult> =>
  request(
    'PATCH',
    `/api/v2/scripts/${params.scriptID}/labels/add`,
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PatchScriptsLabelsAddResult>

export interface PatchScriptsLabelsRemoveParams {
  scriptID: string

  data: {
    /** A list of label names to remove. */
    labels?: string[]
  }
}

type PatchScriptsLabelsRemoveResult =
  | PatchScriptsLabelsRemoveOKResult
  | PatchScriptsLabelsRemoveBadRequestResult
  | PatchScriptsLabelsRemoveUnauthorizedResult
  | PatchScriptsLabelsRemoveNotFoundResult
  | PatchScriptsLabelsRemoveInternalServerErrorResult
  | PatchScriptsLabelsRemoveDefaultResult

interface PatchScriptsLabelsRemoveOKResult {
  status: 200
  headers: Headers
  data: Script
}

interface PatchScriptsLabelsRemoveBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PatchScriptsLabelsRemoveUnauthorizedResult {
  status: 401
  headers: Headers
  data: {
    /** The HTTP status code description. Default is `unauthorized`.
     */
    readonly code?: 'unauthorized'
    /** A human-readable message that may contain detail about the error. */
    readonly message?: string
  }
}

interface PatchScriptsLabelsRemoveNotFoundResult {
  status: 404
  headers: Headers
  data: Error
}

interface PatchScriptsLabelsRemoveInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

interface PatchScriptsLabelsRemoveDefaultResult {
  status: 500
  headers: Headers
  data: Error
}

export const patchScriptsLabelsRemove = (
  params: PatchScriptsLabelsRemoveParams,
  options: RequestOptions = {}
): Promise<PatchScriptsLabelsRemoveResult> =>
  request(
    'PATCH',
    `/api/v2/scripts/${params.scriptID}/labels/remove`,
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PatchScriptsLabelsRemoveResult>
