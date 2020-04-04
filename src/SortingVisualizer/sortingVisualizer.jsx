import React from "react";
import { getMergeSortAnimations } from "../Algorithms/mergeSort";
import { getBubbleSortAnimations } from "../Algorithms/bubbleSort";
import { doBubbleSort } from "../Algorithms/bubbleSort";
import { getQuickSortAnimations } from "../Algorithms/quickSort";
import { doQuickSort } from "../Algorithms/quickSort";
import { quickSortPartition } from "../Algorithms/quickSort";

import "./sortingVisualizer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 0.3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 350;

// This is the main color of the array bars.
const PRIMARY_COLOR = "red";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "green";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 750));
    }

    this.setState({ array });
    const arrayBars = document.getElementsByClassName("array-bar");
    var arrayLength = arrayBars.length;
    for (let j = 0; j < arrayLength; j++) {
      var jBarStyle = arrayBars[j].style;
      jBarStyle.backgroundColor = "red";
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          if (i === animations.length - 1) {
            this.makeAllBarsGreen();
          }
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          if (i === animations.length - 1) {
            this.makeAllBarsGreen();
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    const array = this.state.array;
    const animations = getQuickSortAnimations(array);
    console.log(animations);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        var [oldPosition, newPosition] = animations[i];

        var oldBarStyle = arrayBars[oldPosition].style;
        var newBarStyle = arrayBars[newPosition].style;
        var index;
        const dummyAnimations = [];
        if (array.length > 1) {
          index = quickSortPartition(
            array,
            0,
            array.length - 1,
            dummyAnimations
          ); //index returned from partition
          if (0 < index - 1) {
            //more elements on the left side of the pivot
            doQuickSort(dummyAnimations, array, 0, index - 1);
          }
          if (index < array.length) {
            //more elements on the right side of the pivot
            doQuickSort(dummyAnimations, array, 0, array.length - 1);
          }
        }

        oldBarStyle.height = `${this.state.array[oldPosition]}px`;
        newBarStyle.height = `${this.state.array[newPosition]}px`;

        oldBarStyle.backgroundColor = "green";
        newBarStyle.backgroundColor = "red";

        var currentPosition = oldPosition;
        for (let j = 0; j < currentPosition; j++) {
          var jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = "green";
        }
        if (i === animations.length - 1) {
          this.makeAllBarsGreen();
        }
      }, 0.0001);
    }
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  async bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    const array = this.state.array;
    const animations = getBubbleSortAnimations(array);
    console.log(animations);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        var [oldPosition, newPosition] = animations[i];

        var oldBarStyle = arrayBars[oldPosition].style;
        var newBarStyle = arrayBars[newPosition].style;

        var temp = this.state.array[oldPosition];
        this.state.array[oldPosition] = this.state.array[newPosition];
        this.state.array[newPosition] = temp;

        oldBarStyle.height = `${this.state.array[oldPosition]}px`;
        newBarStyle.height = `${this.state.array[newPosition]}px`;

        oldBarStyle.backgroundColor = "red";
        newBarStyle.backgroundColor = "green";

        var currentPosition = oldPosition;
        for (let j = 0; j < currentPosition; j++) {
          var jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = "red";
        }
        if (i === animations.length - 1) {
          this.makeAllBarsGreen();
        }
      }, i * ANIMATION_SPEED_MS);
    }
  }

  makeAllBarsGreen() {
    console.log("Sorted");
    const arrayBars = document.getElementsByClassName("array-bar");
    var arrayLength = arrayBars.length;
    for (let j = 0; j < arrayLength; j++) {
      var jBarStyle = arrayBars[j].style;
      jBarStyle.backgroundColor = "limegreen";
    }
  }
  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 100);
      const animations = [];
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      const bubbleSortedArray = doBubbleSort(animations, array.slice());
      console.log(
        "Is Bubble Sort Valid ? " +
          arraysAreEqual(javaScriptSortedArray, bubbleSortedArray)
      );
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Sorting Visualizer
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => this.resetArray()}
                >
                  Generate New Array
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.testSortingAlgorithms()}
                >
                  Test Algorithms
                </button>
              </div>
            </div>
            <div
              className="btn-group"
              role="group"
              style={{ right: "10px", position: "absolute" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.quickSort()}
              >
                Quick Sort
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.bubbleSort()}
              >
                Bubble Sort
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.mergeSort()}
              >
                Merge Sort
              </button>
              <button type="button" className="btn btn-primary">
                Heap Sort
              </button>
              <button type="button" className="btn btn-primary">
                Merge Sort
              </button>
            </div>
          </div>
        </nav>

        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
