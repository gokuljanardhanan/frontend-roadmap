// public/worker.js
self.onmessage = function (event) {
  console.log("web worker called", event.data);
  const { answers, questions } = event.data;

  // Simulate heavy computation
  const results = {
    score: 0,
    totalQuestions: questions.length,
    correctAnswers: 0,
    incorrectAnswers: 0,
    accuracy: 0,
    timeTaken: 0,
    analytics: {
      byTopic: {},
      strengths: [],
      weaknesses: [],
    },
  };

  // Calculate score and analytics
  questions.forEach((question) => {
    const userAnswer = answers[question.id] || [];
    const isCorrect =
      JSON.stringify(userAnswer.sort()) ===
      JSON.stringify(question.correctAnswers.sort());

    if (isCorrect) {
      results.score += question.points || 1;
      results.correctAnswers++;
    } else {
      results.incorrectAnswers++;
    }

    // Track topic performance
    if (!results.analytics.byTopic[question.topic]) {
      results.analytics.byTopic[question.topic] = {
        total: 0,
        correct: 0,
      };
    }
    results.analytics.byTopic[question.topic].total++;
    if (isCorrect) {
      results.analytics.byTopic[question.topic].correct++;
    }
  });

  // Calculate accuracy
  results.accuracy = (results.correctAnswers / results.totalQuestions) * 100;

  // Determine strengths and weaknesses
  const topicPerformance = Object.entries(results.analytics.byTopic).map(
    ([topic, data]) => ({
      topic,
      accuracy: (data.correct / data.total) * 100,
    })
  );

  results.analytics.strengths = topicPerformance
    .filter((t) => t.accuracy >= 70)
    .map((t) => t.topic);

  results.analytics.weaknesses = topicPerformance
    .filter((t) => t.accuracy < 70)
    .map((t) => t.topic);

  // // Simulate some processing time
  // for (let i = 0; i < 1000000; i++) {
  //   // Heavy computation simulation
  // }

  self.postMessage(results);
};
