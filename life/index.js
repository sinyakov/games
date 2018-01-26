'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const scale = 2;

canvas.width = CANVAS_WIDTH * scale;
canvas.height = CANVAS_HEIGHT * scale;
canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`;
ctx.scale(scale, scale);

const width = 60;
const heigth = 60;

function init(width, height) {
  const frame = [];
  for (let y = 0; y < height; y++) {
    frame[y] = [];
    for (let x = 0; x < width; x++) {
      frame[y][x] = Math.random() > 0.8 ? 1 : 0;
    }
  }
  return frame;
}

function getCeilValue(frame, x, y) {
  const height = frame.length;
  const width = frame[0].length;
  x = (x + width) % width;
  y = (y + heigth) % heigth;
  return frame[y][x];
}

function countNeighbours(frame, x, y) {
  let answer = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx !== 0 || dy !== 0) {
        answer += getCeilValue(frame, x + dx, y + dy);
      }
    }
  }
  return answer;
}

function generateNextFrame(frame) {
  const nextFrame = [];
  for (let y = 0; y < frame.length; y++) {
    nextFrame[y] = [];
    for (let x = 0; x < frame[y].length; x++) {
      const n = countNeighbours(frame, x, y);
      if (frame[y][x] === 1) {
        nextFrame[y][x] = n < 2 || n > 3 ? 0 : 1;
      } else {
        nextFrame[y][x] = n === 3 ? 1 : 0;
      }
    }
  }
  return nextFrame;
}

function renderFrame(frame, ctx, canvasWidth, canvasHeight) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const ceilHeight = canvasHeight / frame.length;
  const ceilWidth = canvasWidth / frame[0].length;

  for (let y = 0; y < frame.length; y++) {
    for (let x = 0; x < frame[y].length; x++) {
      if (frame[y][x]) {
        ctx.fillStyle = 'rgb(50, 150, 255)';
        ctx.fillRect(x * ceilWidth, y * ceilHeight, ceilWidth, ceilHeight);
      }
    }
  }

  setTimeout(() => {
    renderFrame(generateNextFrame(frame), ctx, canvasWidth, canvasHeight);
  }, 100);
}

renderFrame(init(width, heigth), ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
