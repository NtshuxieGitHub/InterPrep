import React from "react";
import Agent from "@/components/Agent";

const InterviewPage = () => {
  return (
    <>
      <h3>Practice Interview Generation</h3>
      <Agent userName="Me" userId="user1" type="generate" />
    </>
  );
};

export default InterviewPage;
