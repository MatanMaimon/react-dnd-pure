import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Row, Col } from "antd";
import "antd/dist/antd.css";
import "./style.css";

const App = () => {
  const theme = useState("darkblue");

  var itemsArray = [
    {
      name: "row-1",
      col: [
        {
          name: "col 1",
          props: {
            span: 4
          },
          content: [1, 2, 3, 4]
        },
        {
          name: "col 2",
          props: {
            span: 4
          },
          content: [1, 4]
        },
        {
          name: "col 3",
          props: {
            span: 4
          },
          content: []
        },
        {
          name: "col 4",
          props: {
            span: 4
          },
          content: []
        },
        {
          name: "col 5",
          props: {
            span: 4
          },
          content: []
        },
        {
          name: "col 6",
          props: {
            span: 4
          },
          content: []
        }
      ]
    },
    {
      name: "row-2",
      col: [
        {
          name: "col 1",
          props: {
            span: 3
          },
          content: []
        },
        {
          name: "col 2",
          props: {
            span: 3
          },
          content: []
        },
        {
          name: "col 3",
          props: {
            span: 3
          },
          content: []
        },
        {
          name: "col 4",
          props: {
            span: 3
          },
          content: []
        },
        {
          name: "col 5",
          props: {
            span: 3
          },
          content: []
        },
        {
          name: "col 6",
          props: {
            span: 3
          },
          content: []
        },
        {
          name: "col 7",
          props: {
            span: 3
          },
          content: []
        },
        {
          name: "col 8",
          props: {
            span: 3
          },
          content: []
        }
      ]
    }
  ];

  const [items, setItems] = useState(itemsArray);
  const [newItems, setNewItems] = useState([]);

  const onDragOver = e => {
    e.preventDefault();
  };

  const onDragStart = (e, [row_i, col_i, content_i]) => {
    e.dataTransfer.setData("row_i", row_i);
    e.dataTransfer.setData("col_i", col_i);
    e.dataTransfer.setData("content_i", content_i);
  };

  const onDrop = e => {
    let row_i = e.dataTransfer.getData("row_i");
    let col_i = e.dataTransfer.getData("col_i");
    let content_i = e.dataTransfer.getData("content_i");

    if (row_i === "" || col_i === "" || content_i === "") {
      return false;
    }

    var targetRowIndex = 0,
      targetColIndex = 0,
      targetContentIndex = 0;

    var currentTarget = e.currentTarget,
      targetParent = e.target.parentNode.parentNode,
      target = e.target;

    while ((currentTarget = currentTarget.previousSibling) != null)
      targetRowIndex++;
    while ((targetParent = targetParent.previousSibling) != null)
      targetColIndex++;
    while ((target = target.previousSibling) != null) targetContentIndex++;

    var tempItems = [...items];
    // tempItems ==> [0,1]

    var colTarget = tempItems[targetRowIndex].col[targetColIndex].content;
    var colContentLength = colTarget.length; // rowColsLength ==> 2

    colTarget.push(colTarget[colContentLength - 1]);
    // tempItems ==> [0,1,1]
    for (let i = colContentLength - 1; i > targetContentIndex; i--) {
      let contentBefore = colTarget[i - 1];
      colTarget[i] = contentBefore;
    }
    // let's say the pivot for drop was on the 2nd item (1)
    // tempItems ==> [0,1,1] ===> [0,newIndex,1]
    // let's say the pivot for drop was on the 1st item (0)
    // tempItems ==> [0,0,1] ===> [newIndex,0,1]

    // set the col to the target row
    colTarget[targetContentIndex] =
      tempItems[row_i].col[col_i].content[content_i];

    // remove the col from the source row
    tempItems[row_i].col[col_i].content.splice(content_i, 1);

    setItems(tempItems);
  };

  const handleAddRow = () => {
    var addRowSep = document.getElementById("addRowSeperator");

    // var newItemsTemp = [...newItems];

    // var newRowNum = newItemsTemp.length + 1;
    // newItemsTemp.push({
    //   name: `newRow${newRowNum}`,
    //   col: [{ name: "col 1", content: [] }]
    // });

    // setNewItems(newItemsTemp);

    var itemsTemp = [...items];

    var newRowNum = itemsTemp.length + 1;
    itemsTemp.push({
      name: `row-${newRowNum}`,
      col: [{ name: "col 1", content: [] }]
    });

    setItems(itemsTemp);
  };

  return (
    // <ThemeContext.Provider value={theme}>
    //   <div>
    //     <header>
    //       <Link to="/">Adopt Me!</Link>
    //     </header>
    //     ;
    //     <Router>
    //       <SearchParams path="/" />
    //       <Details path="/details/:id" />
    //     </Router>
    //   </div>
    // </ThemeContext.Provider>

    <div>
      {items.map((row, row_i) => (
        <Row
          key={row.name}
          gutter={6}
          justify="space-between"
          onDragOver={onDragOver}
          onDrop={onDrop}
          type="flex"
          style={{ margin: "10px 0", background: "lightgray" }}
        >
          {row.col.map((col, col_i) => {
            var span = Math.floor(24 / row.col.length);
            return (
              <Col
                key={row_i + col_i}
                span={span}
                style={{
                  border: "1px solid lightblue",
                  padding: "5px 0",
                  display: "grid",
                  gridTemplateRows: "min-content"
                }}
              >
                <div>
                  {col.content.map((content, content_i) => (
                    <div
                      key={row_i + col_i + content_i}
                      draggable
                      style={{
                        border: "1px dashed #fff",
                        padding: 7,
                        cursor: "grab",
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "bold"
                      }}
                      onDragStart={e =>
                        onDragStart(e, [row_i, col_i, content_i])
                      }
                    >
                      {content}
                    </div>
                  ))}
                </div>
                <div>
                  <div
                    style={{
                      textAlign: "center",
                      // position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: "100%",
                      minHeight: "50px",
                      background:
                        "url(https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-15-256.png)",
                      backgroundPosition: "center center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      border: "1px dashed #fff",
                      opacity: 0.4
                    }}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      ))}

      <div id="addRowSeperator" />

      {newItems.map((row, row_i) => (
        <Row
          key={row.name}
          gutter={6}
          justify="space-between"
          onDragOver={onDragOver}
          onDrop={onDrop}
          type="flex"
          style={{ margin: "10px 0", background: "lightgray" }}
        >
          {row.col.map((col, col_i) => {
            var span = Math.floor(24 / row.col.length);
            return (
              <Col
                key={row_i + col_i}
                span={span}
                style={{ border: "1px solid lightblue", padding: "5px 0" }}
              >
                {col.content.map((content, content_i) => (
                  <div
                    key={row_i + col_i + content_i}
                    draggable
                    style={{
                      border: "1px dashed #fff",
                      padding: 7,
                      cursor: "grab"
                    }}
                    onDragStart={e => onDragStart(e, [row_i, col_i, content_i])}
                  >
                    {content}
                  </div>
                ))}
                <div>
                  <div
                    style={{
                      textAlign: "center",
                      // position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: "30px",
                      background:
                        "url(https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-15-256.png)",
                      backgroundPosition: "center center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      border: "1px dashed #fff",
                      opacity: 0.4
                    }}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      ))}

      <center>
        <button onClick={handleAddRow}>add row</button>
      </center>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
