import React, { useState, useEffect } from "react";
import "./exchanger.css";

const Exchanger = () => {
  const [but, setBut] = useState(true);
  const [focus, setFocus] = useState(0);
  const [inputLeft, setInputLeft] = useState(0.0);
  const [inputRight, setInputRight] = useState(0.0);
  const [currentId, setCurrentId] = useState(1);
  const [currentIdRight, setCurrentIdRight] = useState(1);

  const [item, setItem] = useState([
    {
      left: [
        {
          id: 1,
          money: "UAH",
          value: true,
          rate: 36,
        },
        {
          id: 2,
          money: "USD",
          value: false,
          rate: 1,
        },
        {
          id: 3,
          money: "ZL",
          value: false,
          rate: 4.15,
        },
      ],
      right: [
        {
          id: 1,
          money: "UAH",
          value: true,
          rate: 36,
        },
        {
          id: 2,
          money: "USD",
          value: false,
          rate: 1,
        },
        {
          id: 3,
          money: "ZL",
          value: false,
          rate: 4.15,
        },
      ],
    },
  ]);

  let onClickLeft = (e) => {
    let id = +e.target.id;
    if (id !== currentId) {
      setItem([
        ...item,
        (item[0].left[currentId - 1].value =
          !item[0].left[currentId - 1].value),
        (item[0].left[id - 1].value = !item[0].left[id - 1].value),
      ]);
    }
    setCurrentId(id);
  };
  let onClickRight = (e) => {
    let id = +e.target.id;
    if (id !== currentIdRight) {
      setItem([
        ...item,
        (item[0].right[currentIdRight - 1].value =
          !item[0].right[currentIdRight - 1].value),
        (item[0].right[id - 1].value = !item[0].right[id - 1].value),
      ]);
    }
    setCurrentIdRight(id);
  };
  let onChangeLeft = (e) => {
    setInputLeft(e.target.value);
  };
  let onChangeRight = (e) => {
    setInputRight(e.target.value);
  };
  let onFocusLeft = () => {
    setFocus(1);
  };
  let onFocusRight = () => {
    setFocus(2);
  };

  // console.log("rate :  ", inputLeft * item[0].right[currentId - 1].rate);
  useEffect(() => {
    if (focus == 1) {
      // console.log("focus t : ", focus);
      if (currentId === currentIdRight) {
        setInputRight(inputLeft);
      } else {
        setInputRight(
          (
            (inputLeft / item[0].left[currentId - 1].rate) *
            item[0].right[currentIdRight - 1].rate
          ).toFixed(2)
        );
      }
    } else {
      // console.log("focus F : ", focus);
      if (currentId === currentIdRight) {
        setInputLeft(inputRight);
      } else {
        setInputLeft(
          (
            (inputRight / item[0].left[currentIdRight - 1].rate) *
            item[0].left[currentId - 1].rate
          ).toFixed(2)
        );
      }
    }
  });

  let fn = () => {
    fetch(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20191021&json"
    ).then((res) => {
      // console.log(Object.keys(res.json()));
      // console.log(typeof res.json());
      console.log(res.json());
    });
  };
  fn();
  // useEffect(() =>
  //   setInputLeft((inputRight * item[0].right[currentId - 1].rate).toFixed(2))
  // );
  function bubbleSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Меняем элементы местами
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }

    return arr;
  }

  // Пример использования:
  const myArray = [4, 2, 7, 1, 9, 5];
  console.log("Исходный массив: " + myArray);
  const sortedArray = bubbleSort(myArray.slice()); // Копируем массив, чтобы не изменять оригинал
  console.log("Отсортированный массив: " + sortedArray);

  return (
    <div>
      <hr />
      <h3> --- Exchanger ---</h3>
      <div className="wrapperE">
        <div className="leftE">
          <div>
            <button
              className="buttonE"
              id={1}
              style={{
                backgroundColor: item[0].left[0].value ? "green" : "white",
              }}
              onClick={onClickLeft}>
              {item[0].left[0].money}
            </button>
            <button
              className="buttonE"
              id="2"
              style={{
                backgroundColor: item[0].left[1].value ? "green" : "white",
              }}
              onClick={onClickLeft}>
              {item[0].left[1].money}
            </button>
            <button
              className="buttonE"
              id="3"
              style={{
                backgroundColor: item[0].left[2].value ? "green" : "white",
              }}
              onClick={onClickLeft}>
              {item[0].left[2].money}
            </button>
          </div>
          <div>
            <input
              onFocus={onFocusLeft}
              value={inputLeft}
              className="inputE"
              onChange={onChangeLeft}
            />
          </div>
        </div>
        <div className="rightE">
          <div>
            <button
              className="buttonE"
              id={1}
              style={{
                backgroundColor: item[0].right[0].value ? "green" : "white",
              }}
              onClick={onClickRight}>
              {item[0].right[0].money}
            </button>
            <button
              className="buttonE"
              id="2"
              style={{
                backgroundColor: item[0].right[1].value ? "green" : "white",
              }}
              onClick={onClickRight}>
              {item[0].right[1].money}
            </button>
            <button
              className="buttonE"
              id="3"
              style={{
                backgroundColor: item[0].right[2].value ? "green" : "white",
              }}
              onClick={onClickRight}>
              {item[0].right[2].money}
            </button>
          </div>
          <div>
            <input
              onFocus={onFocusRight}
              value={inputRight}
              className="inputE"
              onChange={onChangeRight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchanger;
