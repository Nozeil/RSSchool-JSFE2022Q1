import { AnimationStateT, UpdateStateT } from '../../types/types';

export default class CarAnimation {
  animateCar(
    car: SVGElement,
    start: number,
    finish: number,
    duration: number,
    animationState: AnimationStateT,
    animationStateKey: string,
    id?: number,
    updateState?: UpdateStateT,
    createWinnerCallBack?: (_id: number, wins: number, time: number, _updateState: UpdateStateT) => Promise<void>
  ) {
    const carCopy = car;
    const animationStateCopy = animationState;
    let currX = start;

    const framesCount = (duration / 1000) * 60;
    const diffX = (finish - car.getBoundingClientRect().x) / framesCount;

    const carStep = () => {
      currX += diffX;
      carCopy.style.transform = `translateX(${currX}px)`;
      if (currX < finish) {
        animationStateCopy[animationStateKey].animationId = requestAnimationFrame(carStep);
      }

      if (currX >= finish && updateState && id) {
        if (!updateState.winnerInfo) {
          updateState.cars.forEach((updateStateCar) => {
            const time = +(duration / 1000).toFixed(2);
            if (updateStateCar.id === id) {
              const updateStateCopy = updateState;
              updateStateCopy.winnerInfo = {
                id,
                time,
                title: updateStateCar.title,
              };
              if (createWinnerCallBack) {
                createWinnerCallBack(id, 1, time, updateState);
              }
            }
          });
        }
      }
    };

    carStep();
  }
}
