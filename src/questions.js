const option = (id, text, signals, evidence) => ({ id, text, signals, evidence });

export const QUESTIONS = [
  {
    id: 'q1',
    text: 'Your project suddenly hits a technical blocker one day before a demo. What do you naturally do first?',
    options: [
      option('a', 'Break the problem into smaller parts, test assumptions, and isolate the failure.', { analytical_thinking: 1, problem_solving: 1, attention_to_detail: 0.5, technical_aptitude: 0.7 }, 'You chose to decompose the blocker and test assumptions.'),
      option('b', 'Rapidly brainstorm several alternative approaches and prototype the most promising one.', { creativity: 1, problem_solving: 0.8, adaptability: 0.7, technical_aptitude: 0.5 }, 'You chose to generate alternatives and prototype quickly.'),
      option('c', 'Bring the right teammates together and work through the blocker collaboratively.', { collaboration: 1, communication: 0.8, problem_solving: 0.7, leadership: 0.4 }, 'You chose to solve the blocker by coordinating the team.'),
      option('d', 'Start experimenting hands-on with the system until you find a path forward.', { technical_aptitude: 1, adaptability: 0.6, problem_solving: 0.8, decision_making: 0.4 }, 'You chose hands-on experimentation to find a practical route forward.')
    ]
  },
  {
    id: 'q2',
    text: 'Two teammates strongly disagree about how a project should proceed. What is closest to your instinct?',
    options: [
      option('a', 'Collect the strongest facts and constraints, then help the team choose a direction.', { analytical_thinking: 0.8, decision_making: 1, communication: 0.6, attention_to_detail: 0.3 }, 'You preferred evidence and explicit trade-offs before deciding.'),
      option('b', 'Listen to both people, identify the underlying concerns, and find common ground.', { empathy: 1, collaboration: 1, communication: 0.9, adaptability: 0.3 }, 'You focused on understanding both perspectives and building agreement.'),
      option('c', 'Suggest a small experiment so the team can compare the approaches using real results.', { creativity: 0.8, problem_solving: 0.7, decision_making: 0.8, analytical_thinking: 0.6 }, 'You preferred testing competing ideas rather than arguing abstractly.'),
      option('d', 'Let the project lead decide while you focus on executing your part well.', { collaboration: 0.4, attention_to_detail: 0.6, planning_organization: 0.4, communication: 0.2 }, 'You preferred clear ownership and strong execution within your role.')
    ]
  },
  {
    id: 'q3',
    text: 'You are assigned a task using a tool you have never used before. What do you usually do?',
    options: [
      option('a', 'Learn the core concepts first, then follow a focused tutorial and practice.', { adaptability: 0.8, technical_aptitude: 0.8, planning_organization: 0.5, analytical_thinking: 0.4 }, 'You chose structured learning before applying the new tool.'),
      option('b', 'Open it immediately and learn by experimenting and trying things.', { adaptability: 1, creativity: 0.6, technical_aptitude: 0.9, problem_solving: 0.5 }, 'You chose hands-on exploration to learn the unfamiliar tool.'),
      option('c', 'Find someone experienced and learn by working through the first task together.', { collaboration: 1, communication: 0.7, adaptability: 0.8, empathy: 0.2 }, 'You chose collaborative learning with an experienced teammate.'),
      option('d', 'Stick with familiar tools and use the new one only when absolutely necessary.', { adaptability: -0.8, technical_aptitude: 0.2, planning_organization: 0.2, decision_making: 0.2 }, 'You preferred minimizing tool changes and protecting execution certainty.')
    ]
  },
  {
    id: 'q4',
    text: 'You have three important tasks due at nearly the same time. What is your first move?',
    options: [
      option('a', 'Rank them by impact and dependency, create a sequence, and start with the critical path.', { planning_organization: 1, decision_making: 0.8, analytical_thinking: 0.6, attention_to_detail: 0.4 }, 'You prioritized work using impact and dependencies.'),
      option('b', 'Negotiate scope or deadlines so the highest-value work gets done properly.', { communication: 0.9, decision_making: 0.8, leadership: 0.5, planning_organization: 0.7 }, 'You chose proactive expectation-setting to protect the highest-value work.'),
      option('c', 'Handle the hardest task yourself first, then work down the list.', { problem_solving: 0.7, planning_organization: 0.5, technical_aptitude: 0.3, decision_making: 0.5 }, 'You chose to attack the hardest task first and reduce risk early.'),
      option('d', 'Ask teammates to split the workload and coordinate who owns what.', { collaboration: 1, communication: 0.8, planning_organization: 0.8, leadership: 0.6 }, 'You chose coordinated delegation to balance the workload.')
    ]
  },
  {
    id: 'q5',
    text: 'A dataset gives you a surprising result that does not match what you expected. What do you do?',
    options: [
      option('a', 'Audit the data, transformations, and assumptions before trusting the result.', { analytical_thinking: 1, attention_to_detail: 1, problem_solving: 0.6, technical_aptitude: 0.6 }, 'You chose to audit data quality, transformations, and assumptions.'),
      option('b', 'Visualize the data in several ways to look for patterns or hidden structure.', { analytical_thinking: 0.9, creativity: 0.7, attention_to_detail: 0.6, problem_solving: 0.6 }, 'You chose visual exploration to uncover patterns.'),
      option('c', 'Question whether your original assumption was wrong and explore alternative explanations.', { adaptability: 0.8, analytical_thinking: 0.8, creativity: 0.7, decision_making: 0.6 }, 'You were willing to revise the original assumption and explore alternatives.'),
      option('d', 'Use your intuition about the domain to decide whether the result is believable.', { decision_making: 0.6, empathy: 0.2, adaptability: 0.2, analytical_thinking: 0.1 }, 'You leaned on domain intuition as an initial credibility check.')
    ]
  },
  {
    id: 'q6',
    text: 'You are asked to lead a small project. Which part feels most natural to you?',
    options: [
      option('a', 'Set milestones, assign ownership, and keep the team aligned to the plan.', { leadership: 1, planning_organization: 1, communication: 0.7, decision_making: 0.5 }, 'You emphasized milestones, ownership, and alignment.'),
      option('b', 'Understand what each person needs and help them perform at their best.', { leadership: 0.8, empathy: 1, collaboration: 0.9, communication: 0.8 }, 'You emphasized coaching, support, and team dynamics.'),
      option('c', 'Take responsibility for the most difficult execution work and lead by example.', { leadership: 0.7, problem_solving: 0.8, technical_aptitude: 0.5, attention_to_detail: 0.5 }, 'You preferred leading through difficult execution and example.'),
      option('d', 'Facilitate decisions so everyone understands the trade-offs and commits to the direction.', { leadership: 0.9, communication: 1, collaboration: 0.9, decision_making: 0.8 }, 'You emphasized shared understanding, trade-offs, and commitment.')
    ]
  },
  {
    id: 'q7',
    text: 'You notice a mistake in an important presentation just before you are about to present. What do you do?',
    options: [
      option('a', 'Correct it openly, explain the impact briefly, and continue.', { communication: 0.9, adaptability: 0.8, decision_making: 0.7, leadership: 0.4 }, 'You chose transparent correction while keeping the situation moving.'),
      option('b', 'Improvise around it and keep the presentation flowing.', { adaptability: 1, communication: 0.8, creativity: 0.5, decision_making: 0.6 }, 'You chose to adapt in real time while preserving the flow.'),
      option('c', 'Re-check the surrounding figures and fix every related detail before continuing.', { attention_to_detail: 1, analytical_thinking: 0.6, planning_organization: 0.4, technical_aptitude: 0.3 }, 'You prioritized tracing the error and checking related details.'),
      option('d', 'Pause, stay calm, and use the available time to decide the safest way to handle it.', { decision_making: 0.8, adaptability: 0.7, planning_organization: 0.4, analytical_thinking: 0.4 }, 'You prioritized calm decision-making under time pressure.')
    ]
  },
  {
    id: 'q8',
    text: 'You are given a repetitive quality-checking task. What would you naturally do?',
    options: [
      option('a', 'Look for a way to automate the repetitive parts.', { technical_aptitude: 0.9, creativity: 0.8, problem_solving: 0.8, planning_organization: 0.4 }, 'You looked for automation to remove repetitive effort.'),
      option('b', 'Create a clear checklist or standard process so mistakes are less likely.', { planning_organization: 0.9, attention_to_detail: 1, analytical_thinking: 0.4, communication: 0.3 }, 'You chose a repeatable process and checklist for consistency.'),
      option('c', 'Think about how errors affect the end user and focus checks around that impact.', { empathy: 0.9, attention_to_detail: 0.7, decision_making: 0.5, communication: 0.5 }, 'You prioritized checks based on user impact.'),
      option('d', 'Do the task carefully as assigned and improve the process only if problems appear.', { attention_to_detail: 0.7, planning_organization: 0.4, collaboration: 0.2, adaptability: 0.3 }, 'You preferred reliable execution before changing the process.')
    ]
  },
  {
    id: 'q9',
    text: 'You have an exciting project idea but no obvious path to build it. What is your next move?',
    options: [
      option('a', 'Build a tiny prototype to turn the idea into something testable.', { creativity: 1, problem_solving: 0.8, adaptability: 0.8, technical_aptitude: 0.6 }, 'You chose rapid prototyping to make the idea testable.'),
      option('b', 'Talk to potential users and understand the problem before building.', { empathy: 0.9, communication: 0.9, collaboration: 0.6, analytical_thinking: 0.5 }, 'You chose user discovery before committing to a solution.'),
      option('c', 'Build the business case, estimate effort, and identify what would make the project worthwhile.', { analytical_thinking: 0.8, planning_organization: 0.9, decision_making: 0.9, communication: 0.5 }, 'You chose to test the idea through value, effort, and feasibility.'),
      option('d', 'Find an expert or partner who can fill the biggest gap in your skills.', { collaboration: 1, adaptability: 0.8, communication: 0.7, decision_making: 0.5 }, 'You chose to close the capability gap through collaboration.')
    ]
  },
  {
    id: 'q10',
    text: 'A user or client is upset because something did not work as expected. What is closest to your natural response?',
    options: [
      option('a', 'Listen carefully, understand what they actually need, and acknowledge the impact.', { empathy: 1, communication: 0.9, collaboration: 0.7, adaptability: 0.4 }, 'You focused first on listening, needs, and impact.'),
      option('b', 'Clarify the issue, explain the available options, and move toward a practical solution.', { communication: 0.9, problem_solving: 0.8, decision_making: 0.7, empathy: 0.6 }, 'You combined clear communication with practical resolution.'),
      option('c', 'Set realistic expectations and agree on what can be delivered and by when.', { communication: 1, planning_organization: 0.8, leadership: 0.6, decision_making: 0.7 }, 'You focused on expectations, commitments, and delivery.'),
      option('d', 'Trace the root cause so the same issue is less likely to happen again.', { analytical_thinking: 0.8, problem_solving: 0.9, attention_to_detail: 0.7, technical_aptitude: 0.4 }, 'You focused on root-cause analysis and prevention.')
    ]
  }
];

export const QUESTION_MAP = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
