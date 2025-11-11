export class Store {
  constructor(initialState) {
    this._state = initialState;
    this._observers = new Set();
  }

  // 현재 상태 조회
  get state() {
    return this._state;
  }

  // 상태 업데이트
  setState(newState) {
    // 객체인 경우 병합, 아닌 경우 교체
    this._state = typeof newState === "object" && !Array.isArray(newState) ? { ...this._state, ...newState } : newState;

    // 모든 구독자에게 알림
    this._notify();
  }

  // 구독자 등록
  subscribe(observer) {
    this._observers.add(observer);

    // 구독 취소 함수 반환
    return () => {
      this._observers.delete(observer);
    };
  }

  // 모든 구독자에게 상태 변경 알림
  _notify() {
    this._observers.forEach((observer) => observer(this._state));
  }
}
