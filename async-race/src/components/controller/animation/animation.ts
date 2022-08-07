export default class CarAnimation {
  animateCar(
    car,
    start,
    finish,
    duration,
    animationState,
    animationStateKey,
    id?,
    updateState?,
    createWinnerCallBack?
  ) {
    let currX = start;

    const framesCount = (duration / 1000) * 60;
    const diffX = (finish - car.getBoundingClientRect().x) / framesCount;

    const carStep = () => {
      currX += diffX;
      car.style.transform = `translateX(${currX}px)`;

      if (currX < finish) {
        animationState[animationStateKey].animationId = requestAnimationFrame(carStep);
      }

      if (currX >= finish && updateState && id) {
        if (!updateState.winnerInfo) {
          updateState.cars.forEach((car) => {
            const time = (duration / 1000).toFixed(2);
            if (car.id === id) {
              updateState.winnerInfo = {
                id,
                time,
                title: car.title,
              };
              createWinnerCallBack(id, 1, time, updateState);
            }
          });
        }
      }
    };

    carStep();
  }
}
