import React, { useEffect, useState, useRef } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const isMounted = useRef(false);  

  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted.current) {  // Check if component is still mounted before updating state
          setQuestions(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    isMounted.current = true;   // Set to true when component mounts
    fetchQuestions();

    return () => {
      isMounted.current = false;  // Set to false when component unmounts
    };
  }, []);

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error status code: ${response.status}`);
      }
      // Refetch questions after successful delete
      fetchQuestions();
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

 
  const handleUpdateQuestion = (updatedItem) => {
    const updatedItems = questions.map((question) => {
      if (question.id === updatedItem.id) {
        return updatedItem;
      } else {
        return question;
      }
    });
    setQuestions(updatedItems);
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            handleDeleteQuestion={handleDeleteQuestion}
            handleUpdateQuestion={handleUpdateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;




   


