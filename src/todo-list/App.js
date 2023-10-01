import React, { useState } from "react";
import { Link } from "react-router-dom"

function ToDoListItem({ isChecked, content, isFocused, onItemClick, onItemUnfocus, onItemFocus, onItemEdit, onItemRemove }) {
  return <div style={{ display: "flex" }}>
    <input type="checkbox" value={isChecked} onClick={onItemClick} />
    {isFocused ?
      <input value={content} autoFocus onKeyDown={e => { if (e.key === 'Enter') onItemUnfocus() }} onChange={e => onItemEdit(e.target.value)} />
      : <a onClick={onItemFocus}>{content}</a>
    }
    <a onClick={onItemRemove}>❌</a>
  </div>
  { }
}

function ToDoList({ items, focus, onItemChanged, onItemFocus }) {

  function handleItemCheck(i) {
    const nextItems = items.slice().map(item => Object.assign({}, item))
    nextItems[i].isChecked = !nextItems[i].isChecked
    onItemChanged(nextItems)
    onItemFocus(null)
  }
  function handleItemEdit(i, content) {
    const nextItems = items.slice().map(item => Object.assign({}, item))
    nextItems[i].content = content
    onItemChanged(nextItems)
  }
  function handleItemFocus(i) {
    onItemFocus(i)
  }
  function handleItemRemove(i) {
    const nextItems = items.slice().toSpliced(i, 1)
    onItemChanged(nextItems)
    onItemFocus(null)
  }

  return (
    <React.Fragment>
      {items.map((item, index) => {
        return (
          <ToDoListItem
            isChecked={item.isChecked}
            content={item.content}
            isFocused={index === focus}
            onItemClick={() => handleItemCheck(index)}
            onItemEdit={content => handleItemEdit(index, content)}
            onItemUnfocus={() => handleItemFocus(null)}
            onItemFocus={() => handleItemFocus(index)}
            onItemRemove={() => handleItemRemove(index)}
            key={index} />
        )
      }).reverse()}
    </React.Fragment>
  )
}

export default function ToDoListConsole() {
  const [toDoList, setToDoList] = useState([])
  const [newItemContent, setNewItemContent] = useState("")
  const [focus, setFocus] = useState(null)

  function handleItemAdd() {
    if (!newItemContent) return
    const item = {
      isChecked: false,
      content: newItemContent
    }
    const nextToDoList = toDoList.slice().concat([item])
    setNewItemContent("")
    setToDoList(nextToDoList)
    setFocus(null)
  }

  return (
    <div>
      <Link to="/">戻る</Link>
      <p>ToDo List</p>
      <ul>
        <li>Enterで項目追加</li>
        <li>項目クリックで内容編集可能</li>
      </ul>
      <div>
        <input type="text" value={newItemContent} autoFocus onKeyDown={e => { if (e.key === 'Enter') handleItemAdd() }} onChange={e => { setNewItemContent(e.target.value) }} /><button onClick={handleItemAdd}>追加</button>
      </div>
      <div>
        <ToDoList items={toDoList} focus={focus} onItemChanged={setToDoList} onItemFocus={setFocus} />
      </div>
    </div>
  )
}
