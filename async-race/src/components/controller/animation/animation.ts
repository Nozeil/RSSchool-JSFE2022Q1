export default class CarAnimation {
  animateCar(car, start, finish, duration, animationState, animationStateKey, updateState?, id?) {
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
            if (car.id === id) {
              updateState.winnerInfo = {
                id,
                time: duration / 1000,
                title: car.title,
              };
              alert(`Winner is ${updateState.winnerInfo.title}! Time: ${updateState.winnerInfo.time}`);
            }
          });
        }
      }
    };

    carStep();
  }
}
