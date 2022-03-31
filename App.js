
import React from 'react';
import {useState } from 'react';
import './App.css';
function Header(props){
  return(
    <header>
        <h1><a href="*" 
        onClick={(e)=>{props.cchange(); e.preventDefault()}}>{props.title}</a></h1>
    </header>
  )
}
function Nav(props){
  let a='';
  a=props.topic.map(t=>
    <li key={t.id}><a id={t.id} href='*' 
    /*onClick={props.ccchange}*/
      onClick={e=>{props.idchange(e); e.preventDefault();
      props.modechange(e);}}>{t.title}{t.id}</a></li>)
      return(<ol>
        {a}
      </ol>)}
function Article(props){
  return(
    <article>
    <h2 onClick={props.changee}>{props.title}</h2>
      {props.body}
    </article>)
    }
function Create(props){
  return <article>
    <h2>Create</h2> 
    <form onSubmit={event=>{
      event.preventDefault();
      const title=event.target.title.value;//event.target은 폼태그이다.
      const body=event.target.body.value;
      props.onCreate(title, body)
    }}>
      <p><input name='title' placeholder='title'></input></p>
      <p><textarea name='body' placeholder='body' /></p>
      <p><input type='submit' value='Create'></input></p> 
    </form>
  </article>/*title과 body가 옆으로 붙어있는게 보기싫어서 p태그로감싸줌 */
    }
function App(){
  const [mode, setMode]=useState('welcome');
  const [id, setId]=useState('');
  const [nextId, setNextId]=useState(4);/*id값을 별도로 관리하기 위함으로 지금 이미 3개가있으니 4개부터시작~ */
  const [topic, setTopic]=useState([
        {id:1, title:'html', body:"html..." },
        {id:2, title:'css', body:"css..." },
        {id:3, title:'js', body:"js..." },   
      ])

let title, body='';
let content=null;
if(mode==='welcome'){
  content=<Article title="welcom" body='hello, web' />
}
else if(mode==='read'){
  for(let i=0;i<topic.length;i++){
  console.log(topic[i].id, id);
  if(topic[i].id===id){
    title=topic[i].title;
    body=topic[i].body;
  }
}
}content=<Article title={title} body={body} />

if(mode==='create'){
  content=<Create onCreate={(_title, _body)=>{
    const newTopic = {id:nextId, title:_title, body:_body}
    setTopic([...topic, newTopic])
    setMode('read')
 setId(nextId)//이걸해주면 등록하자마자 그 글의 페이지가 나온다. 안그러면 이전에 눌렀던 나와있던페이지가 계속나와잇음
    setNextId(nextId+1)

  } }/>
}
return(
        <div>
      <Header title="WEB" cchange={()=>alert('hi')} />
      <Nav topic={topic} modechange={e=>setMode('read')}
      idchange={(e)=>setId(Number(e.target.id))} 
       />
      {content}
      <a href='/*' onClick={e=>{setMode('create'); e.preventDefault()}}>
        create</a>

        </div>
      )
    }//태그의 속성, 넘어온 id는 문자다! 비교문쓰기위해 숫자로 전환


export default App;
