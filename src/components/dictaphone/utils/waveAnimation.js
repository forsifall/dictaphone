// В начало waveConfig добавьте:
const waveConfig = {
  baseRadius: 40,
  amplitude: 0,
  targetAmplitude: 0,
  frequency: 3,
  phase: 0,
  rotationSpeed: 0.01,
  pulse: 0,
  pulseSpeed: 0.03,
  scaleFactor: 0,

  // ДОБАВЛЕНО для плавности цвета
  colorIntensity: 0,
  colorTarget: 0,
};

export function cnavasWaveUpdate(amplitude, micIsActive, ctx, canvas) {
  if (!micIsActive) {
    waveConfig.amplitude = 0;
    waveConfig.targetAmplitude = 0;
    waveConfig.phase = 0;
  }

  if (amplitude > 2) {
    amplitude = 1.5;
  }

  if(amplitude === 0) {
    canvas.classList.add("hidden");
    return
  }

  waveConfig.colorTarget = amplitude;
  waveConfig.colorIntensity +=
    (waveConfig.colorTarget - waveConfig.colorIntensity) * 0.1; // Плавный

  // 3. Центр canvas
  let centerX, centerY;
  function updateCenter() {
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
  }
  updateCenter();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  waveConfig.targetAmplitude = amplitude * 10;

  // Плавное изменение амплитуды (чтобы не было резких скачков)
  waveConfig.amplitude +=
    (waveConfig.targetAmplitude - waveConfig.amplitude) * 0.1;

  // 4. Увеличиваем скорость вращения при громком звуке
  const currentRotationSpeed = waveConfig.rotationSpeed + amplitude * 0.03;
  waveConfig.phase += currentRotationSpeed;

  // 5. Пульсация (независимо от громкости)
  waveConfig.pulse += waveConfig.pulseSpeed;
  const pulseFactor = 1 + 0.1 * Math.sin(waveConfig.pulse);

  //РИСУЕМ ВОЛНУ
  ctx.beginPath();

  // Количество точек - чем больше, тем плавнее волна
  const points = 150;

  for (let i = 0; i <= points; i++) {
    // Угол для текущей точки
    const angle = (i / points) * Math.PI * 2;

    // тут происходит расчет значения на которое итоговый радиус точки будет умножаться чтобы увеличиться(та самая асиметрия круга)\
    //просиходит за счет получения текущего градуса для текущей точки выше(в радианах) и далее отдаем в Math.sin тк он принимает радианы и уже
    //возращает взависимости от радиана диапозон от -1 до 1, то есть чем больше радиан(радиус дуги или же отрезанная часть от круга) тем он вернет больше в сторону 1
    //и так же соответственно работает и в обратку, тем самым мы для каждой точки круга за весь оборот успеваем сделать цикл от -1 до 1 и у нас появляется горка
    // чтобы таких горок было несколько нужно несоклько таких циклов и для этого мы используем параметр из конфигурации frequency
    const wave =
      Math.sin(angle * waveConfig.frequency + waveConfig.phase) *
      waveConfig.amplitude;

    // Итоговый радиус точки
    const radius =
      waveConfig.baseRadius * pulseFactor + wave + waveConfig.amplitude;

    // Координаты точки
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    // Рисуем линию к точке
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath();

  // 7. ЗАЛИВКА И ОБВОДКА (настраивайте цвета)
  // Градиентная заливка
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    waveConfig.baseRadius * 0.3,
    centerX,
    centerY,
    waveConfig.baseRadius + waveConfig.amplitude * 1.5
  );

  const colorIntensity = waveConfig.colorIntensity;

  // ГОЛУБАЯ ЦВЕТОВАЯ ГАММА
  // От светло-голубого (внутри) к насыщенному синему (снаружи)
  const innerColorHue = 190 + colorIntensity * 15; // От голубого (190) к синему (205)
  const outerColorHue = 210 - colorIntensity * 5; // От синего (210) к глубокому синему (205)

  const innerSaturation = 75 + colorIntensity * 20;
  const outerSaturation = 85 + colorIntensity * 10;

  const innerLightness = 75 - colorIntensity * 15;
  const outerLightness = 50 + colorIntensity * 10;

  const innerAlpha = 0.4 + colorIntensity * 0.4;
  const outerAlpha = 0.15 + colorIntensity * 0.2;

  // БОЛЕЕ ЯРКИЙ И ЗАМЕТНЫЙ ГРАДИЕНТ
  gradient.addColorStop(
    0,
    `hsla(${innerColorHue}, ${Math.min(innerSaturation, 95)}%, ${Math.min(
      innerLightness,
      80
    )}%, ${Math.min(innerAlpha, 0.9)})`
  );
  gradient.addColorStop(
    0.2,
    `hsla(${innerColorHue + 5}, ${Math.min(
      innerSaturation - 5,
      90
    )}%, ${Math.min(innerLightness - 5, 75)}%, ${Math.min(
      innerAlpha - 0.05,
      0.8
    )})`
  );
  gradient.addColorStop(
    0.5,
    `hsla(${innerColorHue + 10}, ${Math.min(
      innerSaturation + 5,
      95
    )}%, ${Math.min(innerLightness - 10, 70)}%, ${Math.min(
      innerAlpha - 0.15,
      0.6
    )})`
  );
  gradient.addColorStop(
    0.8,
    `hsla(${outerColorHue}, ${Math.min(outerSaturation, 95)}%, ${Math.min(
      outerLightness,
      60
    )}%, ${Math.min(outerAlpha + 0.1, 0.4)})`
  );
  gradient.addColorStop(
    1,
    `hsla(${outerColorHue - 5}, ${Math.min(
      outerSaturation - 10,
      85
    )}%, ${Math.min(outerLightness - 5, 55)}%, ${Math.min(outerAlpha, 0.3)})`
  );

  ctx.fillStyle = gradient;
  ctx.fill();

  // Обводка в голубых тонах
  const strokeHue = 195 + colorIntensity * 10;
  const strokeSaturation = 85 + colorIntensity * 10;
  const strokeLightness = 75 - colorIntensity * 15;
  const strokeAlpha = 0.6 + colorIntensity * 0.25;

  ctx.lineWidth = 2 + colorIntensity * 1.5;
  ctx.strokeStyle = `hsla(${strokeHue}, ${Math.min(
    strokeSaturation,
    95
  )}%, ${Math.min(strokeLightness, 80)}%, ${Math.min(strokeAlpha, 0.9)})`;
  ctx.stroke();

  // ИСПРАВЛЕНО: Постоянное, но очень слабое свечение в состоянии покоя
  // Убрали условие if (colorIntensity > 0.2) и сделали свечение всегда, но с минимальной прозрачностью
  const glowGradient = ctx.createRadialGradient(
    centerX,
    centerY,
    waveConfig.baseRadius * 0.1,
    centerX,
    centerY,
    waveConfig.baseRadius * 0.7
  );

  // Светло-голубое свечение - всегда, но очень слабое в покое
  const glowAlpha = 0.03 + colorIntensity * 0.15; // Минимум 0.03 вместо 0
  glowGradient.addColorStop(
    0,
    `hsla(190, 70%, 85%, ${Math.min(glowAlpha, 0.25)})`
  );
  glowGradient.addColorStop(
    0.5,
    `hsla(200, 60%, 75%, ${Math.min(glowAlpha * 0.6, 0.15)})`
  );
  glowGradient.addColorStop(1, "hsla(210, 50%, 65%, 0)");

  ctx.beginPath();
  ctx.arc(centerX, centerY, waveConfig.baseRadius * 0.7, 0, Math.PI * 2);
  ctx.fillStyle = glowGradient;
  ctx.fill();

  // ИСПРАВЛЕНО: Внешнее сияние - только при заметной громкости
  // Увеличили порог с 0.5 до 0.3 и сделали плавное появление
  if (colorIntensity > 0.3) {
    const outerGlowAlpha = (colorIntensity - 0.3) * 0.3; // Плавное появление от 0.3

    const outerGlowGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      waveConfig.baseRadius + waveConfig.amplitude * 0.5,
      centerX,
      centerY,
      waveConfig.baseRadius + waveConfig.amplitude * 2
    );

    outerGlowGradient.addColorStop(
      0,
      `hsla(200, 50%, 70%, ${Math.min(outerGlowAlpha, 0.15)})`
    );
    outerGlowGradient.addColorStop(
      0.7,
      `hsla(210, 40%, 60%, ${Math.min(outerGlowAlpha * 0.7, 0.1)})`
    );
    outerGlowGradient.addColorStop(1, "hsla(220, 30%, 50%, 0)");

    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      waveConfig.baseRadius + waveConfig.amplitude * 2,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = outerGlowGradient;
    ctx.fill();
  }
}

export function canvasIsError() {
    const canvas = document.getElementById("waveCanvas");
    const ctx = canvas.getContext("2d")

  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Получаем текущие данные с канваса
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Просто рисуем красный градиент поверх существующей формы
    const errorGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      40 * 0.3,
      centerX,
      centerY,
      40 + 20 * 1.5 // Примерные значения
    );

    // Красно-оранжевая палитра
    errorGradient.addColorStop(0, "hsla(0, 90%, 70%, 0.8)"); // Ярко-красный
    errorGradient.addColorStop(0.3, "hsla(10, 85%, 65%, 0.6)"); // Оранжево-красный
    errorGradient.addColorStop(0.6, "hsla(0, 80%, 60%, 0.4)"); // Темно-красный
    errorGradient.addColorStop(1, "hsla(0, 75%, 50%, 0.2)"); // Очень темный красный

    // Заливаем существующую форму красным градиентом
    ctx.fillStyle = errorGradient;
    ctx.fill();

    // Меняем обводку на красную
    ctx.lineWidth = 2;
    ctx.strokeStyle = "hsla(0, 90%, 75%, 0.7)";
    ctx.stroke();
  }
}
