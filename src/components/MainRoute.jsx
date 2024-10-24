import React from "react";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import { CreatePoll } from "./CreatePoll";
import { PollsListPage } from "../pages/PollsListPage";
import { VotePollPage } from "../pages/VotePollPage";
import { PollResultsPage } from "../pages/PollResultsPage";
import { ProfilePage } from "../pages/ProfilePage";
import Navbar from "./Navbar";

export const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-poll" element={<CreatePoll />} />
      <Route path="/polls" element={<PollsListPage />} />
      <Route path="/polls/vote/:pollId" element={<VotePollPage />} />
      <Route path="/polls/results/:pollId" element={<PollResultsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};
