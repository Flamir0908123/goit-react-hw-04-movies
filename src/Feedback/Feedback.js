import React, { useState } from "react";
import FeedbackOptions from "./FeedbackOptions";
import Section from "./Section";
import Statistics from "./Statistics";
import Notification from "./Notification";

export function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = neutral + good + bad;
  const positiveFeedbackPercentage = Math.floor((good / total) * 100);

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options="good"
          onFeedbackButtonClick={() => {
            setGood((prevState) => prevState + 1);
          }}
        />
        <FeedbackOptions
          options="neutral"
          onFeedbackButtonClick={() => {
            setNeutral((prevState) => prevState + 1);
          }}
        />
        <FeedbackOptions
          options="bad"
          onFeedbackButtonClick={() => {
            setBad((prevState) => prevState + 1);
          }}
        />
      </Section>
      <Section title="Statistics">
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            percent={positiveFeedbackPercentage}
          />
        ) : null}
        {total ? null : <Notification message="No feedback given" />}
      </Section>
    </div>
  );
}

export default Feedback;
