import Question from '../models/question'
import Answer from '../models/answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  console.log('yeeee')
  let msg
  Question.find().sort({_id:1}).exec((err, rep) => {
    msg = rep;
    console.log(msg)
    if(err || rep.length == 0){
      res.status(403).send({message: 'error', cts: []})
    }
    res.status(200).send({message: 'success', cts: msg})
  })
  // console.log(msg)
  
}
exports.CheckAns = async (req, res) => {
  console.log('wooha')
  console.log(req.body.params.finans)
  let hisans = req.body.params.finans
  /*for(var i=0; i<hisans.length;i++){
    if()
  }*/
  let scores = 0
  Answer.find().sort({_id:1}).exec((err, rep) => {
    for(var i=0; i<hisans.length;i++){
      if((hisans[i] + 1) == rep[i].answer){
        scores += 1
      }
    }
    console.log(rep, scores)
    if(err || rep.length == 0){
      res.status(403).send({message: 'error', score: -1})
    }
    res.status(200).send({message: 'success', score: scores})
    // res.status(200).send({mess: 'success', cts: msg})
  })
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
}
