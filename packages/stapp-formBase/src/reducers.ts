import { createReducer } from 'stapp/lib/core/createReducer/createReducer'
import {
  resetForm,
  setActive,
  setError,
  setReady,
  setSubmitting,
  setTouched,
  setValue
} from './events'

// tslint:disable-next-line
import { Reducer } from 'stapp/lib/core/createReducer/createReducer.h'

/**
 * @private
 */
const commonHandler = <T, K extends keyof T>(o: T, n: Partial<T>) => {
  const keys = Object.keys(n) as K[]
  const changedFields = keys.filter((field) => o[field] !== n[field])

  return changedFields.length !== 0 ? Object.assign({}, o, n) : o
}

/**
 * @private
 */
const mapObject = <T, R, O extends { [K: string]: T }>(
  fn: (element: T, key: string, index: number) => R,
  obj: O
): { [K in keyof O]: R } => {
  return Object.keys(obj).reduce(
    (result, key, index) => {
      result[key] = fn(obj[key], key, index)
      return result
    },
    {} as any
  )
}

/**
 * @private
 */
export const createFormBaseReducers = (initialState: any) => {
  const valuesReducer = createReducer<any>(initialState)
    .on(setValue, commonHandler)
    .reset(resetForm)

  const dirtyReducer = createReducer<any>({})
    .on(setValue, (dirty, values) =>
      commonHandler(
        dirty,
        mapObject((element, key) => element !== (initialState[key] || ''), values)
      )
    )
    .reset(resetForm)

  const errorsReducer = createReducer<any>({})
    .on(setError, commonHandler)
    .reset(resetForm)

  const touchedReducer = createReducer<any>({})
    .on(setTouched, commonHandler)
    .reset(resetForm)

  const readyReducer = createReducer<any>({})
    .on(setReady, commonHandler)
    .reset(resetForm)

  const activeReducer = createReducer<any>(null)
    .on(setActive, (_, payload) => payload)
    .reset(resetForm)

  const pristineReducer = createReducer(true)
    .on([setValue, setTouched], () => false)
    .reset(resetForm)

  const submittingReducer = createReducer(false)
    .on(setSubmitting, (_, payload) => payload)
    .reset(resetForm)

  return {
    values: valuesReducer,
    errors: errorsReducer,
    touched: touchedReducer,
    ready: readyReducer,
    active: activeReducer,
    dirty: dirtyReducer,
    pristine: pristineReducer,
    submitting: submittingReducer
  }
}