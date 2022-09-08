// This file is generated by [oats][0] and should not be edited by hand.
//
// [0]: https://github.com/influxdata/oats

export interface Notebooks {
  flows?: Notebook[]
}

export interface Notebook {
  id?: string
  /** flag set to determine whether a notebook has been published or not? */
  isDirty?: boolean
  name?: string
  orgID?: string
  spec?: any
  createdAt?: string
  createdBy?: string
  updatedAt?: string
}

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

export interface NotebookParams {
  name?: string
  orgID?: string
  spec?: any
}

export interface NotebookVersion {
  notebookVersion?: Notebook
}

export type VersionHistories = VersionHistory[]

export interface VersionHistory {
  /** the ID of the published version */
  id: string
  /** the time the data was published */
  publishedAt: string
  /** the name of the person that published the notebook */
  publishedBy: string
}

export type Shares = Share[]

export interface Share {
  id?: string
  orgID?: string
  notebookID?: string
  accessID?: string
  region?: string
  createdAt?: string
  updatedAt?: string
}

export interface ShareParams {
  notebookID?: string
  orgID?: string
  region?: string
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

export interface GetNotebooksParams {
  query: {
    orgID: string
  }
}

type GetNotebooksResult =
  | GetNotebooksOKResult
  | GetNotebooksUnauthorizedResult
  | GetNotebooksInternalServerErrorResult

interface GetNotebooksOKResult {
  status: 200
  headers: Headers
  data: Notebooks
}

interface GetNotebooksUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface GetNotebooksInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const getNotebooks = (
  params: GetNotebooksParams,
  options: RequestOptions = {}
): Promise<GetNotebooksResult> =>
  request(
    'GET',
    '/api/v2private/notebooks',
    params,
    options
  ) as Promise<GetNotebooksResult>

export interface PostNotebookParams {
  data: NotebookParams
}

type PostNotebookResult =
  | PostNotebookOKResult
  | PostNotebookBadRequestResult
  | PostNotebookUnauthorizedResult
  | PostNotebookInternalServerErrorResult

interface PostNotebookOKResult {
  status: 200
  headers: Headers
  data: Notebook
}

interface PostNotebookBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PostNotebookUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface PostNotebookInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const postNotebook = (
  params: PostNotebookParams,
  options: RequestOptions = {}
): Promise<PostNotebookResult> =>
  request(
    'POST',
    '/api/v2private/notebooks',
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PostNotebookResult>

export interface GetNotebooksVersionParams {
  notebookID: string
  id: string
}

type GetNotebooksVersionResult =
  | GetNotebooksVersionOKResult
  | GetNotebooksVersionBadRequestResult
  | GetNotebooksVersionUnauthorizedResult
  | GetNotebooksVersionInternalServerErrorResult

interface GetNotebooksVersionOKResult {
  status: 200
  headers: Headers
  data: NotebookVersion
}

interface GetNotebooksVersionBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface GetNotebooksVersionUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface GetNotebooksVersionInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const getNotebooksVersion = (
  params: GetNotebooksVersionParams,
  options: RequestOptions = {}
): Promise<GetNotebooksVersionResult> =>
  request(
    'GET',
    `/api/v2private/notebooks/${params.notebookID}/versions/${params.id}`,
    params,
    options
  ) as Promise<GetNotebooksVersionResult>

export interface GetNotebooksVersionsParams {
  id: string
}

type GetNotebooksVersionsResult =
  | GetNotebooksVersionsOKResult
  | GetNotebooksVersionsBadRequestResult
  | GetNotebooksVersionsUnauthorizedResult
  | GetNotebooksVersionsInternalServerErrorResult

interface GetNotebooksVersionsOKResult {
  status: 200
  headers: Headers
  data: VersionHistories
}

interface GetNotebooksVersionsBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface GetNotebooksVersionsUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface GetNotebooksVersionsInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const getNotebooksVersions = (
  params: GetNotebooksVersionsParams,
  options: RequestOptions = {}
): Promise<GetNotebooksVersionsResult> =>
  request(
    'GET',
    `/api/v2private/notebooks/${params.id}/versions`,
    params,
    options
  ) as Promise<GetNotebooksVersionsResult>

export interface PostNotebooksVersionParams {
  id: string
}

type PostNotebooksVersionResult =
  | PostNotebooksVersionOKResult
  | PostNotebooksVersionBadRequestResult
  | PostNotebooksVersionUnauthorizedResult
  | PostNotebooksVersionNotFoundResult
  | PostNotebooksVersionInternalServerErrorResult

interface PostNotebooksVersionOKResult {
  status: 200
  headers: Headers
  data: any
}

interface PostNotebooksVersionBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PostNotebooksVersionUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface PostNotebooksVersionNotFoundResult {
  status: 404
  headers: Headers
  data: Error
}

interface PostNotebooksVersionInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const postNotebooksVersion = (
  params: PostNotebooksVersionParams,
  options: RequestOptions = {}
): Promise<PostNotebooksVersionResult> =>
  request(
    'POST',
    `/api/v2private/notebooks/${params.id}/versions`,
    params,
    options
  ) as Promise<PostNotebooksVersionResult>

export interface PostNotebooksCloneParams {
  id: string

  data?: {
    orgID?: string
  }
}

type PostNotebooksCloneResult =
  | PostNotebooksCloneOKResult
  | PostNotebooksCloneBadRequestResult
  | PostNotebooksCloneUnauthorizedResult
  | PostNotebooksCloneNotFoundResult
  | PostNotebooksCloneInternalServerErrorResult

interface PostNotebooksCloneOKResult {
  status: 200
  headers: Headers
  data: Notebook
}

interface PostNotebooksCloneBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PostNotebooksCloneUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface PostNotebooksCloneNotFoundResult {
  status: 404
  headers: Headers
  data: Error
}

interface PostNotebooksCloneInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const postNotebooksClone = (
  params: PostNotebooksCloneParams,
  options: RequestOptions = {}
): Promise<PostNotebooksCloneResult> =>
  request(
    'POST',
    `/api/v2private/notebooks/${params.id}/clone`,
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PostNotebooksCloneResult>

export interface GetNotebookParams {
  id: string
}

type GetNotebookResult =
  | GetNotebookOKResult
  | GetNotebookBadRequestResult
  | GetNotebookUnauthorizedResult
  | GetNotebookInternalServerErrorResult

interface GetNotebookOKResult {
  status: 200
  headers: Headers
  data: Notebook
}

interface GetNotebookBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface GetNotebookUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface GetNotebookInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const getNotebook = (
  params: GetNotebookParams,
  options: RequestOptions = {}
): Promise<GetNotebookResult> =>
  request(
    'GET',
    `/api/v2private/notebooks/${params.id}`,
    params,
    options
  ) as Promise<GetNotebookResult>

export interface PutNotebookParams {
  id: string

  data: NotebookParams
}

type PutNotebookResult =
  | PutNotebookOKResult
  | PutNotebookBadRequestResult
  | PutNotebookUnauthorizedResult
  | PutNotebookInternalServerErrorResult

interface PutNotebookOKResult {
  status: 200
  headers: Headers
  data: Notebook
}

interface PutNotebookBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PutNotebookUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface PutNotebookInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const putNotebook = (
  params: PutNotebookParams,
  options: RequestOptions = {}
): Promise<PutNotebookResult> =>
  request(
    'PUT',
    `/api/v2private/notebooks/${params.id}`,
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PutNotebookResult>

export interface PatchNotebookParams {
  id: string

  data: NotebookParams
}

type PatchNotebookResult =
  | PatchNotebookOKResult
  | PatchNotebookBadRequestResult
  | PatchNotebookUnauthorizedResult
  | PatchNotebookInternalServerErrorResult

interface PatchNotebookOKResult {
  status: 200
  headers: Headers
  data: Notebook
}

interface PatchNotebookBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PatchNotebookUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface PatchNotebookInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const patchNotebook = (
  params: PatchNotebookParams,
  options: RequestOptions = {}
): Promise<PatchNotebookResult> =>
  request(
    'PATCH',
    `/api/v2private/notebooks/${params.id}`,
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PatchNotebookResult>

export interface DeleteNotebookParams {
  id: string
}

type DeleteNotebookResult =
  | DeleteNotebookNoContentResult
  | DeleteNotebookBadRequestResult
  | DeleteNotebookUnauthorizedResult
  | DeleteNotebookNotFoundResult
  | DeleteNotebookInternalServerErrorResult

interface DeleteNotebookNoContentResult {
  status: 204
  headers: Headers
  data: any
}

interface DeleteNotebookBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface DeleteNotebookUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface DeleteNotebookNotFoundResult {
  status: 404
  headers: Headers
  data: Error
}

interface DeleteNotebookInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const deleteNotebook = (
  params: DeleteNotebookParams,
  options: RequestOptions = {}
): Promise<DeleteNotebookResult> =>
  request(
    'DELETE',
    `/api/v2private/notebooks/${params.id}`,
    params,
    options
  ) as Promise<DeleteNotebookResult>

export interface GetNotebooksShareParams {
  query: {
    orgID: string
    notebookID?: string
  }
}

type GetNotebooksShareResult =
  | GetNotebooksShareOKResult
  | GetNotebooksShareUnauthorizedResult
  | GetNotebooksShareInternalServerErrorResult

interface GetNotebooksShareOKResult {
  status: 200
  headers: Headers
  data: Shares
}

interface GetNotebooksShareUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface GetNotebooksShareInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const getNotebooksShare = (
  params: GetNotebooksShareParams,
  options: RequestOptions = {}
): Promise<GetNotebooksShareResult> =>
  request(
    'GET',
    '/api/v2private/notebooks/share',
    params,
    options
  ) as Promise<GetNotebooksShareResult>

export interface PostNotebooksShareParams {
  data: ShareParams
}

type PostNotebooksShareResult =
  | PostNotebooksShareOKResult
  | PostNotebooksShareBadRequestResult
  | PostNotebooksShareUnauthorizedResult
  | PostNotebooksShareInternalServerErrorResult

interface PostNotebooksShareOKResult {
  status: 200
  headers: Headers
  data: Share
}

interface PostNotebooksShareBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface PostNotebooksShareUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface PostNotebooksShareInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const postNotebooksShare = (
  params: PostNotebooksShareParams,
  options: RequestOptions = {}
): Promise<PostNotebooksShareResult> =>
  request(
    'POST',
    '/api/v2private/notebooks/share',
    {...params, headers: {'Content-Type': 'application/json'}},
    options
  ) as Promise<PostNotebooksShareResult>

export interface DeleteNotebooksShareParams {
  id: string
}

type DeleteNotebooksShareResult =
  | DeleteNotebooksShareNoContentResult
  | DeleteNotebooksShareBadRequestResult
  | DeleteNotebooksShareUnauthorizedResult
  | DeleteNotebooksShareNotFoundResult
  | DeleteNotebooksShareInternalServerErrorResult

interface DeleteNotebooksShareNoContentResult {
  status: 204
  headers: Headers
  data: Error
}

interface DeleteNotebooksShareBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface DeleteNotebooksShareUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface DeleteNotebooksShareNotFoundResult {
  status: 404
  headers: Headers
  data: Error
}

interface DeleteNotebooksShareInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const deleteNotebooksShare = (
  params: DeleteNotebooksShareParams,
  options: RequestOptions = {}
): Promise<DeleteNotebooksShareResult> =>
  request(
    'DELETE',
    `/api/v2private/notebooks/share/${params.id}`,
    params,
    options
  ) as Promise<DeleteNotebooksShareResult>

export interface GetApiShareQueryParams {
  id: string
  pipeID: string
}

type GetApiShareQueryResult =
  | GetApiShareQueryOKResult
  | GetApiShareQueryBadRequestResult
  | GetApiShareQueryUnauthorizedResult
  | GetApiShareQueryInternalServerErrorResult

interface GetApiShareQueryOKResult {
  status: 200
  headers: Headers
  data: string
}

interface GetApiShareQueryBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface GetApiShareQueryUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface GetApiShareQueryInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const getApiShareQuery = (
  params: GetApiShareQueryParams,
  options: RequestOptions = {}
): Promise<GetApiShareQueryResult> =>
  request(
    'GET',
    `/api/v2private/api/share/${params.id}/query/${params.pipeID}`,
    params,
    options
  ) as Promise<GetApiShareQueryResult>

export interface GetApiShareParams {
  id: string
}

type GetApiShareResult =
  | GetApiShareOKResult
  | GetApiShareBadRequestResult
  | GetApiShareUnauthorizedResult
  | GetApiShareInternalServerErrorResult

interface GetApiShareOKResult {
  status: 200
  headers: Headers
  data: Notebook
}

interface GetApiShareBadRequestResult {
  status: 400
  headers: Headers
  data: Error
}

interface GetApiShareUnauthorizedResult {
  status: 401
  headers: Headers
  data: Error
}

interface GetApiShareInternalServerErrorResult {
  status: 500
  headers: Headers
  data: Error
}

export const getApiShare = (
  params: GetApiShareParams,
  options: RequestOptions = {}
): Promise<GetApiShareResult> =>
  request(
    'GET',
    `/api/v2private/api/share/${params.id}`,
    params,
    options
  ) as Promise<GetApiShareResult>
