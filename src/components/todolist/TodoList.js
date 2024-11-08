import React, { useEffect, useState } from 'react'
import Index from '../Index'


 const TodoList = () => {
 
  const [activeBtn,deactiveBtn]=useState(false)
  const [isComplete,setIsComplete]=useState(false)
  const [todo,setTodo]=useState([])

  const [fields,setFields]=useState({
    title:"",
    description:"",
    id:""
  })
   const isAcitveButton=()=>{
    deactiveBtn(!activeBtn)
    console.log("active btn",activeBtn)

  }

  const Todofields=(e)=>{
    const {name,value}=e.target;
    
  setFields((field)=>({
    ...field,
    [name]:value
  }))

  }

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000000).toString().substr(0, 9);
  };
  const addTodoListItem=()=>{
    const {title,description}=fields;
    const id = generateUniqueId();
    if(title&&description){
      setTodo((prevTodo) => [...prevTodo, { title, description,id }]);
     localStorage.setItem("todo",JSON.stringify(todo))    }
   

  }


  const deleteItem=(unid)=>{
   
   const result=todo?.filter((item)=>item.id!==unid)
   console.log(result)
   setTodo(result)
   localStorage.setItem("todo",JSON.stringify(result)) 
   

  }

  useEffect(()=>{
    const result=JSON.parse(localStorage.getItem('todo'))
    if(result){
      setTodo(result)
    }
  },[])
  return (
    <Index.Box className="todo-main">
    <Index.Box>
<Index.Typography className='todo-heading'>My Todos</Index.Typography>

    </Index.Box>
      <Index.Box className="todo-contain">
        <Index.Box className="todo-center">
        <Index.Box>
          <Index.Typography className='title-text'>Title :</Index.Typography>
          <Index.TextField   value={fields.title}onChange={(e) => Todofields(e)} name='title' size="small" placeholder="what's the title of your To Do?"
/>
        </Index.Box>
        <Index.Box>
          <Index.Typography className='title-text'>Description :</Index.Typography>
          <Index.TextField     value={fields.description}  onChange={(e) => Todofields(e)}
 name="description"size="small"         placeholder="What's the description of your To Do?"
/>
        </Index.Box>
        <Index.Box>
        <Index.Button  className="add-btn"variant="contained" onClick={addTodoListItem}>ADD</Index.Button>
        </Index.Box>
        </Index.Box>
       
        <Index.Box className="todo-add-complete-btn">
          
        <Index.Button  className={`${activeBtn?'active-btn':'deactive-btn'}`} variant="contained" onClick={isAcitveButton}>ToDO</Index.Button>
        <Index.Button   className={`${activeBtn?'deactive-btn':'active-btn'}`}  variant="contained" onClick={isAcitveButton}>Complete</Index.Button>
        </Index.Box>
        
        <Index.Box >
                {todo?.map((item,index)=>{
                  
                  return(
                    <>
                   <Index.Box className="todo-list-main">
                   <Index.Box>
                   <Index.Typography className='todolist-title'>{item?.title}</Index.Typography>
                   <Index.Typography className='todolist-description'>{item?.description}</Index.Typography>
                   </Index.Box>
                   <Index.Box>
                    <Index.DeleteIcon className='delete-icon' onClick={()=>{deleteItem(item?.id)}}/>
                    <Index.DoneIcon className='done-icon' onClick={()=>setIsComplete(item)}/>
                   </Index.Box>
                   </Index.Box>
                    </>
                  )
                })}
        </Index.Box>
      </Index.Box>
     
      
    </Index.Box>
  )
}
export default TodoList