import React from "react";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const InterviewPage = async () => {
  const userInfo = await getCurrentUser();

  return (
    <>
      <h3>Practice Interview Generation</h3>
      <Agent userName={userInfo?.name} userId={userInfo?.id} type="generate" />
    </>
  );
};

export default InterviewPage;
