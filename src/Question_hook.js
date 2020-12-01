import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question


  /*const anses = async () => {
    const aaa = await instance.get('/checkAns')
    console.log(aaa)
    return aaa
  }*/

  const next = async () => {
    console.log('test1',  ans.length, current_question)
    let finans, tmp
    if(ans.length == current_question){
      tmp = [...ans]
      tmp[current_question] = -1
      finans = tmp
      setAns(tmp)
    }
    setCurrentQuestion(current_question + 1)
    console.log(current_question, contents.length, finans)
    if(current_question >= contents.length - 1){
      console.log('gee')
      if(ans.length == current_question){
        finans = [...ans]
        finans[current_question] = -1
      }
      else{
        finans = [...ans]
        console.log('bish', finans)
      }
      const rep = await instance.post('/checkAns', {params :{finans}})
      setComplete(true)
      setContents([])
    }
    
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question
  }

  const choose = (idx) => {
    let tmp = [...ans]
    tmp[current_question] = idx
    setAns(tmp)
    
    // TODO : update 'ans' for the option you clicked
  }

  const getQuestions = async () => {
    const dta = await instance.get('/getContents')
    console.log(dta)
    console.log(dta.data.cts[0].options)

    setContents(dta.data.cts)
    setCurrentQuestion(0)
    // TODO : get questions from backend
  }

  useEffect(() => {
    console.log('haiya')
    if (!contents.length)
      getQuestions()
    // setAns([-1])
  })

  // TODO : fill in the rendering contents and logic
  return (
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
              Question {current_question + 1} of 5
            </div>
          </div>

          <div id="question-title">
            {contents[current_question].question}
          </div>

          <div id="options">
            {contents[current_question].options.map((e, idx) =>(
              <div className = "each-option" onClick = {() => choose(idx)}>
                {e}
                {console.log(ans)}
              </div>
            ))}
          </div>
          
          <div id="actions" onClick={next}>
            NEXT
          </div>
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question
