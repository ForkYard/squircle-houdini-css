const drawSquircle = (ctx, geom, radius, smooth, lineWidth, color) => {
  const defaultFill = color;
  const lineWidthOffset = lineWidth / 2;
  // OPEN LEFT-TOP CORNER
  ctx.beginPath();
  ctx.lineTo(radius, lineWidthOffset);
  // TOP-RIGHT CORNER
  ctx.lineTo(geom.width - radius, lineWidthOffset);
  ctx.bezierCurveTo(
    geom.width - radius / smooth,
    lineWidthOffset, // first bezier point
    geom.width - lineWidthOffset,
    radius / smooth, // second bezier point
    geom.width - lineWidthOffset,
    radius // last connect point
  );
  // BOTTOM-RIGHT CORNER
  ctx.lineTo(geom.width - lineWidthOffset, geom.height - radius);
  ctx.bezierCurveTo(
    geom.width - lineWidthOffset,
    geom.height - radius / smooth, // first bezier point
    geom.width - radius / smooth,
    geom.height - lineWidthOffset, // second bezier point
    geom.width - radius,
    geom.height - lineWidthOffset // last connect point
  );
  // BOTTOM-LEFT CORNER
  ctx.lineTo(radius, geom.height - lineWidthOffset);
  ctx.bezierCurveTo(
    radius / smooth,
    geom.height - lineWidthOffset, // first bezier point
    lineWidthOffset,
    geom.height - radius / smooth, // second bezier point
    lineWidthOffset,
    geom.height - radius // last connect point
  );
  // CLOSE LEFT-TOP CORNER
  ctx.lineTo(lineWidthOffset, radius);
  ctx.bezierCurveTo(
    lineWidthOffset,
    radius / smooth, // first bezier point
    radius / smooth,
    lineWidthOffset, // second bezier point
    radius,
    lineWidthOffset // last connect point
  );
  ctx.closePath();

  if (lineWidth) {
    // console.log(lineWidth);
    ctx.strokeStyle = defaultFill;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  } else {
    ctx.fillStyle = defaultFill;
    ctx.fill();
  }
};

// eslint-disable-next-line no-undef
registerPaint(
  "squircle",
  class {
    static get contextOptions() {
      return { alpha: true };
    }
    static get inputProperties() {
      return [
        "--squircle-radius",
        "--squircle-smooth",
        "--squircle-outline",
        "--squircle-color",
        "--squircle-ratio",
      ];
    }

    paint(ctx, geom, properties) {
      let customRatio = properties.get("--squircle-ratio");
      const distanceRatio = parseInt(customRatio) ? parseInt(customRatio) : 1.8;
      const squircleSmooth = properties.get("--squircle-smooth") * 10;
      const squircleRadius =
        parseInt(properties.get("--squircle-radius"), 10) * distanceRatio;
      const squrcleOutline = parseInt(properties.get("--squircle-outline"), 10);
      const squrcleColor = properties
        .get("--squircle-color")
        .toString()
        .replace(/\s/g, "");

      const isSmooth = () => {
        if (squircleSmooth !== "") {
          if (squircleSmooth === 0) {
            return 1;
          }
          return squircleSmooth;
        }

        return 8;
      };

      const isOutline = () => {
        if (squrcleOutline) {
          return squrcleOutline;
        } else {
          return 0;
        }
      };

      const isColor = () => {
        if (squrcleColor) {
          return squrcleColor;
        } else {
          return "#f45";
        }
      };

      if (squircleRadius < geom.width / 2 && squircleRadius < geom.height / 2) {
        drawSquircle(
          ctx,
          geom,
          squircleRadius,
          isSmooth(),
          isOutline(),
          isColor()
        );
      } else {
        drawSquircle(
          ctx,
          geom,
          Math.min(geom.width / 2, geom.height / 2),
          isSmooth(),
          isOutline(),
          isColor()
        );
      }
    }
  }
);
