import { all, put, call } from 'redux-saga/effects'
import getMenuDataleft from 'services/menuleft'

export function* GET_DATA() {
  const menuDataleft = yield call(getMenuDataleft)
  yield put({
    type: 'menuleft/SET_STATE',
    payload: {
      menuDataleft,
    },
  })
}

export default function* rootSaga() {
  yield all([
    GET_DATA(), // run once on app load to fetch menu data
  ])
}
