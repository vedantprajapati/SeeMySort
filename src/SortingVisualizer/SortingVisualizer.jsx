import React from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.jsx';
import './SortingVisualizer.css';
import styled from "styled-components";
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
// import Form from 'react-bootstrap/NavDropdown'
// import FormControl from 'react-bootstrap/FormControl'

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

// Change this value for the speed of the animations.
let ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
let NUMBER_OF_ARRAY_BARS = 300;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#8747b8';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'turquoise';

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
  reduceBarCount() {
    if(NUMBER_OF_ARRAY_BARS >52){
        NUMBER_OF_ARRAY_BARS -= 50;
        this.resetArray();
    }  
  }
  increaseBarCount() {
    if(NUMBER_OF_ARRAY_BARS <= 300){
        NUMBER_OF_ARRAY_BARS += 50;
        this.resetArray();
    }  
  }
  increaseSortSpeed() {
    ANIMATION_SPEED_MS = ANIMATION_SPEED_MS/2;
  }
  reduceSortSpeed() {
    ANIMATION_SPEED_MS = ANIMATION_SPEED_MS*2;
  }
  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
//   testSortingAlgorithms() {
//     for (let i = 0; i < 100; i++) {
//       const array = [];
//       const length = randomIntFromInterval(1, 1000);
//       for (let i = 0; i < length; i++) {
//         array.push(randomIntFromInterval(-1000, 1000));
//       }
//       const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
//       const mergeSortedArray = getMergeSortAnimations(array.slice());
//       console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
//     }
//   }

  render() {
    const {array} = this.state;

    return (
        //for each array value at each idx, plot a bar with defined styles
        <div>
            <Button onClick={() => this.resetArray()}>Generate New Array</Button>
            <Button onClick={() => this.mergeSort()}>Merge Sort</Button>
            <Button onClick={() => this.reduceBarCount()}>Reduce Bar Count</Button>
            <Button onClick={() => this.increaseBarCount()}>Increase Bar Count</Button>
            <Button onClick={() => this.reduceSortSpeed()}>Reduce Sort Speed</Button>
            <Button onClick={() => this.increaseSortSpeed()}>Increase Sort Speed</Button>
            <Button><a href="https://vedantprajapati.github.io/portfolio/">
About Me</a></Button>
            <div className="array-container" top="100px">
                {array.map((value, idx) => (
                <div
                    className="array-bar"
                    key={idx}
                    style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: `${value}px`,
                    }}></div>
                ))}

        </div>
      </div>
    );
  }
}

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