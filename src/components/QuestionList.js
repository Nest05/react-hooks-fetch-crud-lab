import React from "react";
import axios from "axios";

function QuestionList({questions, setQuestions}) {

  function handleDelete(id) {
    // Send DELETE request to server
    axios.delete(`http://localhost:4000/questions/${id}`)
      .then(response => {
        // Filter out the deleted question from the list
        const updatedQuestions = questions.filter(question => question.id !== id);
        // Update state with the updated list of questions
        setQuestions(updatedQuestions);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function handleUpdate(id, event) {
    const correctIndex = parseInt(event.target.value);

    // Send PATCH request to server
    axios.patch(`http://localhost:4000/questions/${id}`, {
      correctIndex: correctIndex
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      // Find the updated question in the list
      const updatedQuestion = response.data;
      // Update state with the updated question
      setQuestions(prevQuestions => {
        return prevQuestions.map(question => {
          if (question.id === updatedQuestion.id) {
            return updatedQuestion;
          }
          return question;
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => <li key={question.id}>{question.prompt}
      <button onClick={() => handleDelete(question.id)}>Del</button>
      <select value={question.correctIndex} onChange={(event) => handleUpdate(question.id, event)}>
              {question.answers.map((answer, index) => (
                <option value={index} key={index}>{answer}</option>
              ))}
      </select>
      </li>
        )}
        </ul>
    </section>
  );
}

export default QuestionList;
