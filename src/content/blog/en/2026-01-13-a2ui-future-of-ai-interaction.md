---
title: "When AI Learns to 'Draw' Interfaces: How A2UI is Redefining Human-Computer Interaction"
description: "From text to interfaces, AI is undergoing a revolution in how it expresses itself. The A2UI protocol enables AI to directly generate interactive interfaces. How will this change the way we communicate with AI?"
date: "2026-01-13"
author: "Zhama AI Technical Team"
category: "Technology Trends"
tags: ["A2UI", "AI", "Human-Computer Interaction", "Future Technology"]
image: "/blog-assets/images/features/dashboard.jpg"
featured: true
locale: "en"
legacySlug: "a2ui-future-of-ai-interaction"
sourceUrl: "https://zhama.com/en/blog/a2ui-future-of-ai-interaction"
sourceCommit: "e61f09338aa2534916dc3b4822555b90927b4a40"
---

# When AI Learns to 'Draw' Interfaces: How A2UI is Redefining Human-Computer Interaction

Have you ever wondered why, when we talk to AI, it can only "say" things but can't actually "do" anything?

This seemingly simple question reveals a fundamental limitation of current AI interaction—no matter how intelligent AI becomes, its means of expression remains stuck at the "text" level. The emergence of A2UI is breaking through this limitation.

This article explores what A2UI is, why it matters, how it works, where it can be used, and how it could change our interactions with AI. It is written for both technical and general readers.

---

## A Story About Expression

Before introducing A2UI, consider a story about how computers express information.

In the 1960s, computer scientists faced a difficult question: how could ordinary people use computers?

Computers were operated through command lines. People had to remember commands such as `ls -la`, `grep -r`, and `chmod 755` to get anything done. It was like learning a foreign language, with a high barrier to entry.

In 1968, Douglas Engelbart gave a presentation later known as the Mother of All Demos. It demonstrated ideas including the mouse, windows, and hyperlinks.

Its central principle was: **make computers adapt to how people think, rather than making people adapt to computers.**

Apple’s Macintosh later brought this idea to a wider audience. Graphical interfaces let people click icons instead of memorizing commands. **Computers learned to communicate through pictures as well as text.**

Today, another change is taking shape. AI can understand natural language, answer complex questions, and generate content, yet much of its communication still takes the form of text, reminiscent of the command-line era.

**A2UI aims to let AI communicate through interfaces.** This is a change in the interaction model, beyond an incremental technical improvement.

---

## Starting with an Everyday Scenario

Suppose you tell an AI: "Help me book a flight to Shanghai for tomorrow."

How does today's AI respond?

It gives you a wall of text: flight information, price comparisons, things to note... then tells you "please visit such-and-such website to complete your booking."

You need to:
- Read through all that text
- Copy the flight number
- Open another website
- Manually fill in your information
- Complete the payment

**AI said a lot, but it didn't actually "do" anything.**

This "talk but don't act" pattern exists in almost every interaction we have with AI. Whether you're asking AI to analyze data, fill out forms, or generate reports, you ultimately need to leave the conversation interface and complete the actual operation somewhere else.

AI is like a knowledgeable consultant who never lifts a finger—it can tell you how to do something, but it can't do it for you.

At the heart of the problem is a gap between what AI can say and what a person needs to operate. AI produces text, while the person needs an actionable interface and must bridge that gap themselves.

---

## What If AI Could Directly 'Draw' the Interface?

Imagine a different scenario:

You say: "Help me book a flight to Shanghai for tomorrow."

AI directly displays a **real booking interface** right in the conversation:

- Three flight options in a clear card layout, each card showing airline, departure time, arrival time, and price
- Prices and times at a glance, with options to sort by price or time
- Click the "Select" button, and the card highlights
- A passenger information form appears where you can fill in details directly
- After confirmation, a payment interface appears
- Done

The entire process happens without leaving the conversation interface, without copying and pasting, without switching between multiple apps.

**From "saying" to "doing" — this is what A2UI aims to achieve.**

This isn't a scene from a sci-fi movie—it's the interaction paradigm defined by the A2UI protocol that Google released at the end of 2025. This technology is moving from concept to reality, and we've already implemented its first complete version.

---

## Why Can Interfaces Be More Effective Than Text?

Before going further, consider why a graphical interface can make some information easier to understand than a text-only response.

### Visual Structure and Recognition

Visuals and text support different kinds of understanding. A chart or interface can make structure, comparisons, and relationships visible at the same time, while prose is useful for explaining context and detail. The right choice depends on the task and the information.

When information is presented visually, people can:

- See the overall structure at a glance.
- Identify emphasis through color, size, and position.
- Recognize relationships without first reconstructing them from prose.

With a text-only presentation, people often need to:

- Read the information sequentially.
- Build a mental model themselves.
- Keep track of details and relationships while reading.

For a task such as comparing sales figures, a chart can make the relevant comparison easier to see than a paragraph alone.

### Cognitive Load

Psychologist John Sweller’s cognitive load theory describes the limits of working memory. Processing too much information at once can make a task harder to understand and increase the chance of mistakes.

A text-only AI response can leave several demands with the person doing the work:

1. Read and understand the answer.
2. Remember the important information.
3. Switch to another application to carry out the action.
4. Keep track of the task’s state.

Together, these demands can make work cumbersome. **By generating an interface, A2UI can move some of that work into the system.** The interface can keep relevant information and actions together and help maintain the task state.

### Direct Manipulation

Direct manipulation is a principle in human-computer interaction: people should be able to operate directly on the objects they see, instead of relying on indirect commands.

For example:

- Indirect operation: enter `move file1.txt to folder2/`.
- Direct operation: drag a file icon into a folder.

Direct manipulation can make an action easier to recognize and learn. In a text-only exchange, a person tells AI what they want, AI explains what to do, and the person then performs the action elsewhere.

A2UI uses an interactive interface to bring those steps closer together: people can operate on the information they see.

---

## What is A2UI?

**A2UI**, short for Agent-to-User Interface, is an open protocol officially released by Google in December 2025.

Simply put, it defines a set of standard rules that allow AI to output **interactive interface elements**, not just text.

### An Analogy: From HTML to A2UI

For web developers, the relationship can be understood this way:

- **HTML** is an interface description language that developers write for browsers. The browser renders the HTML as a page.
- **A2UI** is an interface description language that AI writes for an application. AI outputs A2UI data, and a renderer turns it into an interactive interface.

HTML is written by people with development skills. With A2UI, AI generates the description from natural-language instructions.

### Traditional AI Output vs A2UI Output

| Dimension | Traditional AI | A2UI AI |
| --- | --- | --- |
| Output | Plain text or Markdown | Structured interface descriptions |
| User actions | Carried out manually | Available directly in the interface |
| Presentation | A linear stream of text | Visual components |
| Task completion | Multiple exchanges and manual actions | A flow completed within the conversation |
| Data interaction | Copy and paste | Direct interaction |
| State management | Kept in mind by the user | Maintained by the interface |

### Interface Elements Supported by A2UI

These interface elements cover most application scenarios:

**Basic Components**
- Text: rich text, heading levels, emphasis, links, and lists
- Buttons: primary, secondary, and destructive styles, icons, loading states, and disabled states
- Input fields: single-line, multi-line, password, search, numeric, and email inputs with validation
- Checkboxes and radio buttons: grouping, linked behavior, and default values

**Layout Components**
- Cards: containers with headers, cover images, content, and actions
- Lists: vertical or horizontal arrangements with pagination, lazy loading, and drag sorting
- Tables: sorting, filtering, pagination, row selection, and cell editing
- Tabs: switching between views with lazy loading
- Collapsible panels: expandable and collapsible content
- Column layouts: flexible arrangements of multiple columns

**Data Visualization**
- Charts: line, bar, pie, scatter, area, radar, and heatmap charts
- Progress bars: linear or circular, with segments and animation
- Stat cards: key metrics, trend arrows, and comparisons
- Timelines: events and processes

**Media Components**
- Images: carousels, zoom, lazy loading, and watermarks
- Video and audio: embedded players with playback controls
- Files: upload, download, and preview
- Maps: location display and selection

**Advanced Interactions**
- Modal dialogs: confirmation, forms, details, and multistep flows
- Dropdown menus: single and multiple selection, search, and grouping
- Date pickers: single dates, ranges, and times
- Sliders: selection within a numeric range
- Ratings: star-based feedback
- Drag-and-drop file upload areas

**AI is no longer just a "text generator" — it becomes an "interface designer."**

---

## How A2UI Works

How does AI “draw” an interface? It describes the interface rather than drawing it directly.

### An Analogy: AI Is the Architect, the Renderer Is the Builder

Imagine building a house.

**The traditional approach:** you ask an architect for a house and receive a 500-page document describing every room, brick, and pipe. You then have to find builders, buy materials, and supervise the work yourself.

**The A2UI approach:** the architect produces a plan, the builders work from it, and you review the finished result.

In this analogy:

- **You** are the person describing a need.
- **The architect** is AI, understanding that need and designing a response.
- **The plan** is A2UI data, a standardized interface description.
- **The builders** are the renderer, constructing the interface from the description.
- **The house** is the interactive interface you see.

AI does not need to lay bricks or connect pipes—in interface terms, draw charts or handle clicks. It needs to select an appropriate interface for the situation. This is separation of concerns.

### Step 1: AI Generates an Interface Description

When you say “Show last month’s sales,” AI generates structured data describing what to display. The description is like an interface plan:

```text
Component: Chart
Chart type: Bar
Title: December 2025 sales
Data: [
  { Period: "Week 1", Sales: 120 },
  { Period: "Week 2", Sales: 150 },
  ...
]
Interaction: Click to view details
```

The plan specifies the component, data, and supported interactions. Implementation details belong to the renderer. AI only needs to determine that a bar chart suits the request to view sales data.

### Step 2: The Renderer Parses and Displays It

A renderer, such as our `@zhama/a2ui`, receives this description and turns it into interface elements. It handles:

- Drawing charts from the data.
- Adding hover effects.
- Handling clicks.
- Creating smooth transitions.
- Adapting to different screen sizes.
- Supporting dark and light themes.

It turns the interface plan into a finished interface.

### Step 3: Interactions Return to AI

When someone clicks a data point, the renderer captures the event and sends a user-action message to AI. AI can then provide a more detailed analysis or related actions for that point.

**The loop is: AI describes → the renderer displays → the person interacts → AI responds → a new description follows.**

AI focuses on understanding the request and choosing content, while the renderer focuses on presentation and interaction.

---

## What Does This Mean for Different Roles?

### For Regular Users: Goodbye to the "Copy-Paste" Era

Previously, talking to AI was like communicating with an assistant who could only talk but never act. You ask it questions, it gives you answers, but the answers are just text. You need to execute the operations described in that text yourself.

It's like asking someone "how do I get to the train station" — they give you detailed directions, but you still have to walk there yourself.

With A2UI, AI can directly help you:

**Scenario 1: Filling Out Complex Forms**

Before: AI tells you what information to fill in, you find the form, fill it out item by item.

Now: AI generates the form, prefills known information, marks required fields, and validates input. You complete it in the conversation, and AI helps check and submit it.

**Scenario 2: Data Queries**

Before: AI tells you what the data is, you need to organize it yourself or export to Excel.

Now: AI directly generates charts and tables, you can click to filter, sort, and export.

**Scenario 3: Booking Services**

Before: AI tells you available time slots, you go to a calendar app to create an event.

Now: AI displays a calendar with available times highlighted. You select a time, add notes, and confirm. AI can also send a reminder.

**Scenario 4: Shopping Decisions**

Before: AI gives you product descriptions to compare yourself, often across several pages.

Now: AI generates comparison cards with key specifications side by side. You can add products, change the sort order, and place an order.

**Less copying and pasting, less switching between apps — everything happens within the conversation.**

### For Businesses: A Qualitative Leap in AI Customer Service

Traditional AI customer service has a fundamental problem: it can only answer questions, not solve problems.

When a user says "I want to return this item," traditional AI replies: "Please log into your account, go to the orders page, click the return button..." Then the user has to go do it themselves. If the user encounters any problems, they have to come back and ask again.

This isn't real service — it's just a talking instruction manual.

With A2UI, AI customer service can:

**Directly Display Order Lists**

User says "I want to return something," AI directly shows the user's recent orders in card format, each order showing product image, name, purchase date, and order status. User clicks the one they want to return — no need to remember order numbers or navigate to a separate sign-in page.

**Generate Return Application Forms**

After an order is selected, AI shows common return reasons, refund or exchange choices, supplementary notes, and an image-upload action for problems such as product defects. The person completes the form and submits it.

**Display Processing Progress in Real-Time**

After submission, AI shows a timeline: "Application submitted → Merchant review → Awaiting return shipment → Inspection → Refund processing → Complete." Each stage shows its time and status, and the person can return to check progress.

**Follow-Up Service**

After a refund, AI can confirm its arrival, ask whether another product is needed, and display relevant recommendations.

**From "Q&A bot" to "service terminal" — users don't need to leave the conversation interface to complete the entire business process.**

The aim is to resolve more requests within the conversation, leave complex judgment to human service staff, improve the experience of completing a request, and reduce repeated service work.

### For Developers: Lowering the Barrier to AI Application Development

Previously, to get AI to output structured content, developers needed to:

1. Design complex prompts to get AI to output specific JSON formats
2. Write parsing code to handle various exceptions in AI output
3. Design frontend components to render this data
4. Handle user interactions and feed results back to AI
5. Debug constantly because AI output formats are often unstable

The entire process was full of uncertainty, with long development cycles and high maintenance costs.

With A2UI, developers can:

**Use Standardized Protocols**

A2UI defines clear data structures — what format AI outputs, what fields it includes, how to describe interactions — all clearly specified. No need to design and maintain proprietary formats.

**Use Ready-Made Renderers**

Our open-source @zhama/a2ui provides a complete React renderer. Just pass AI output to the component, and interfaces render automatically with interactions handled.

**Focus on Business Logic**

Developers no longer need to worry about "how to get AI to output the right format," "how to render this data," or "how to handle user clicks." These are all solved by the protocol and renderer. Developers only need to focus on: what the user wants to do and how AI should help.

**Reuse and Extension**

A2UI is an open protocol, and renderers can be replaced or extended. Teams can use the default styling, customize a theme, or add components to extend the supported interface capabilities.

**Lower development barriers, faster AI application deployment.** Work that previously took weeks might now take just days.

---

## Applications Across Industries

A2UI is a general interaction approach, rather than a technology limited to one industry. The following scenarios illustrate where interactive interfaces can help.

### Financial Services: Making Financial Tasks Easier to Navigate

**Investment guidance**

Traditional investment guidance often takes the form of a long report with technical terms and complex charts. It can be difficult for a general reader to understand and act on.

An A2UI interface can present:

- An asset-allocation pie chart with details available for each segment.
- Actions such as buying, selling, or rebalancing.
- Curves comparing strategies, with a timeline to explore the results.
- Prominent risk information alongside the relevant decision.

**Loan applications**

Instead of a long paper form or several separate pages, a conversation can collect the requirements and generate the necessary fields progressively. The interface can display an eligible borrowing amount, a repayment schedule, and an application action.

**Billing inquiries**

For “How much did I spend on my credit card last month?”, the interface can show:

- Total spending.
- A spending breakdown by categories such as dining, shopping, and transport.
- Expandable billing details.
- Export and reminder actions.

### Healthcare: Making Care Easier to Access

**Online consultations**

A text-only consultation can make it difficult to collect complete information. An A2UI interface can provide:

- Structured symptom selection by location, type, and duration.
- A symptom-severity slider.
- Uploads for examination reports and photos.
- A calendar for booking examinations.
- Medication information, including dosage and usage instructions.

**Health management**

For a request to review the week’s activity, the interface can show:

- Daily step counts in a bar chart.
- Heart-rate changes in a line chart.
- Sleep-quality information.
- Progress against a goal.
- Actions to adjust goals or share results.

**Medication reminders**

A reminder can display the medicine’s image and name, the amount and instructions for the current dose, “Taken” and “Remind me later” actions, and the remaining supply with a refill reminder.

### Education and Training: Supporting Different Learning Needs

**Personalized learning**

Conventional online courses often present the same videos and exercises to everyone. An AI tutor using A2UI can provide:

- A radar chart of knowledge areas based on assessment results.
- Interactive practice for weaker areas.
- A timeline of learning progress.
- Options to skip familiar content or explore a subject in depth.

**Interactive case studies**

For a business case, the interface can show the company’s key figures, decision options, and the consequences of a selected decision. Learners can go back and try other choices before receiving a learning summary and score.

**Language learning**

An interactive conversation can include a situation such as ordering at a restaurant or checking in at an airport, selectable replies, continued dialogue after each choice, pronunciation feedback, and a vocabulary notebook.

### E-Commerce and Retail: Helping People Choose and Resolve Issues

**Product guidance**

For “I want a coffee machine for home,” AI can:

- Ask about budget, preferred drinks, and frequency of use.
- Present comparisons of three to five suitable products.
- Show product images, prices, key features, and ratings.
- Offer comparison, detail, and purchase actions.

**After-sales service**

Beyond the return flow described earlier, interfaces can support:

- **Installation bookings:** display the installer’s schedule, choose a time, enter an address, and confirm.
- **Repair requests:** guide a fault assessment and show appointment options when a visit is needed.
- **Exchanges:** show available colors and sizes so a replacement can be selected.

### Enterprise Work: Connecting Collaboration and Actions

**Meeting support**

Before a meeting, AI can generate an agenda where participants add topics and upload materials. During the meeting, it can prepare notes and identify actions for assignment. Afterwards, it can produce a task list with due dates, reminders, and progress tracking.

**Approvals**

Instead of exchanging emails and downloading attachments, an approval interface can display:

- A structured request.
- Highlighted key information.
- Approve, reject, and forward actions.
- A timeline of previous decisions.
- An indicator for pending approvals.

**Data reporting**

The following images show chart presentation in A2UI:

<div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 24px 0;">
  <img src="/blog-assets/images/blog/a2ui/chart-line-en_V1.0.png" alt="Sales trend line chart" style="width: 280px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
  <img src="/blog-assets/images/blog/a2ui/chart-bar-en_V1.0.png" alt="Sales bar chart" style="width: 280px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
  <img src="/blog-assets/images/blog/a2ui/chart-pie-en_V1.0.png" alt="Sales distribution pie chart" style="width: 280px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
</div>

In an interactive product interface, people can:

- Hover to inspect values.
- Select a data point to explore details.
- Change the time range or filters.
- Export data or charts.
- Ask for further analysis in natural language.

### Public Services: Making Applications Easier to Complete

**Service guidance**

For a resident applying for a residence permit, AI can:

- Confirm identity information and the application type.
- Generate a checklist of required materials.
- Show the application process as a timeline.
- Display a map of nearby service centers and booking options.
- Create a confirmation after a booking.

**Online applications**

Government forms can be complex. An A2UI interface can show fields relevant to the person’s circumstances, connect available identity or social-security information, validate entries, guide the application in stages, and show the result and next actions.

---

## Comparison with Existing Technologies

There are already many approaches that combine AI and interfaces. What makes A2UI different?

### Traditional Chatbots

| Dimension | Traditional chatbot | A2UI |
| --- | --- | --- |
| Output | Fixed quick-reply buttons | Dynamically generated rich interfaces |
| Flexibility | A limited set of predefined options | Components combined to suit the context |
| Interaction | Selection from predefined options | Input, selection, dragging, and other interactions |
| Development | Every flow designed in advance | AI generates an interface for the request |

Traditional chatbot buttons are designed in advance and address anticipated scenarios. With A2UI, AI can generate an interface in response to the person’s specific request.

### Low-Code and No-Code Platforms

| Dimension | Low-code platform | A2UI |
| --- | --- | --- |
| Interface creation | People configure through drag and drop | AI generates the interface |
| Suitable tasks | Relatively stable business processes | Interaction needs that change dynamically |
| Flexibility | Within predefined templates | Generated around the request |
| Learning requirement | Learn the platform’s controls | Describe the need in natural language |

Low-code platforms reduce development effort, but people still design and configure interfaces. A2UI takes the description of what is needed and lets AI generate the interface.

### Robotic Process Automation (RPA)

| Dimension | RPA | A2UI |
| --- | --- | --- |
| Approach | Reproduce human actions in existing interfaces | Generate new interfaces |
| Suitable tasks | Repetitive task automation | Human-AI interaction |
| Human participation | The script executes the process | People participate in decisions through the interface |
| Flexibility | Follow a fixed script | Adapt during a conversation |

RPA operates an interface on a person’s behalf; A2UI generates an interface for the person to use. They address different problems and can work together.

---

## Security and Privacy Considerations

Security is a central concern when enterprises introduce a technology. A2UI’s design addresses several relevant areas.

### Declarative Descriptions Instead of Executable Code

A2UI uses a declarative data format. AI outputs an interface description, rather than executable code.

- AI works with predefined component types instead of arbitrary code.
- The renderer displays content that conforms to the protocol.
- An arbitrary script is not an A2UI component and is not executed as one by the renderer.

For example, a request to output a malicious script does not make that script a valid component. The renderer handles the declared components and actions.

### Permission Controls

Controls can define:

- Which component types AI can use.
- Which actions an interface can perform.
- Confirmation steps before an action runs.
- Audit records of user operations.

For a financial workflow, for example, transactions can require a second confirmation, with additional verification above a configured amount.

### Data Isolation

The renderer’s data-access scope can be configured so that AI receives authorized data. Sensitive information can be masked before display, and data can be managed by category and classification.

### Private Deployment

For enterprises with demanding data-security requirements, A2UI can be deployed privately. Models can run within the enterprise network, with data kept inside the enterprise boundary and infrastructure under enterprise control.

---

## Implementation Path and Recommendations

For teams considering A2UI in a product or business workflow, the following stages provide a starting point.

### Stage 1: Understand and Explore

1. **Explore the project:** visit the [project repository](https://github.com/zhama-ai/a2ui-react) to examine the interaction experience.
2. **Read the documentation:** understand the A2UI protocol and how to use the `@zhama/a2ui` renderer.
3. **Assess use cases:** identify workflows where an interactive interface could help.

### Stage 2: Run a Focused Pilot

1. **Choose a pilot:** start with frequent tasks such as customer service, data queries, or form completion.
2. **Build a prototype:** use `@zhama/a2ui` to assess feasibility.
3. **Collect feedback:** have actual users try the workflow and record their experience.

### Stage 3: Extend Adoption

1. **Design the architecture:** consider performance, security, and scalability.
2. **Customize the implementation:** adapt component styling and interaction logic to business needs.
3. **Improve continuously:** use analysis of the workflow to refine the interface-generation strategy.

### Common Questions

**Do we need to replace our AI model?**

No. A2UI is a protocol layer that can work with models supporting structured output. With suitable prompting, models such as GPT-4, Claude 3, and Gemini can produce A2UI-formatted data.

**Do we need to rewrite existing frontend code?**

No. `@zhama/a2ui` is a standalone React component that can be embedded in a React application. It can be introduced in one page or module without replacing the rest of the application.

**How much is there to learn?**

Frontend developers can get started with the renderer and its component model. Backend developers need to understand how to have AI produce A2UI-formatted data.

**What about performance?**

The renderer is built with React 18 for regular interface workloads. For very large datasets, optimization options include virtual scrolling.

---

## Why Now?

A2UI didn't appear out of nowhere — it's the natural product of multiple technologies maturing.

### Large Language Model Breakthroughs

Large language models like GPT-4, Claude 3, and Gemini can now:

- Understand complex, multi-step instructions
- Generate well-formatted structured output (JSON, XML, etc.)
- Adjust output content and format based on context
- Handle multi-turn conversations, maintaining state and memory

This means having AI output interface descriptions conforming to the A2UI protocol is entirely feasible. AI doesn't need to "learn to draw interfaces" — it just needs to output data describing interfaces, and the renderer handles the "drawing."

### Frontend Technology Maturity

The core idea of modern frontend frameworks like React, Vue, and Svelte is "data-driven interfaces" — you give the framework data, it renders it into an interface.

This perfectly aligns with A2UI's philosophy. AI outputs data, frontend frameworks render interfaces. All that's needed between them is a "translation layer" — this is the @zhama/a2ui renderer we developed.

### Rising User Expectations

After years of AI adoption, users have become accustomed to talking with AI. But they're increasingly unsatisfied with "just talking."

- Users want AI to help them complete tasks, not just provide information
- Users want more direct operations, not jumping between multiple apps
- Users want more natural interaction, like communicating with a person

Market demand exists, and technical conditions are mature.

**A2UI appeared at exactly this time to connect AI capabilities, frontend technology, and user needs.**

---

## What Are We Doing?

When Google released the A2UI protocol, they announced the official React renderer would be released in Q1 2026.

**But we couldn't wait.**

After the protocol was released, the Zhama AI team immediately began implementation work. Based on the A2UI protocol specification, we developed the first complete React implementation: **@zhama/a2ui**.

### Why Implement Early?

**Technical Validation**

We believe A2UI is the right direction, but whether the protocol can be implemented, whether the experience is smooth, whether there are hidden issues — you only know by actually building it. Through implementation, we validated the protocol's feasibility and discovered and fed back areas needing improvement.

**Accumulating Experience**

Waiting until the official renderer releases to start learning means you're already behind. By implementing early, our team gained deep understanding of A2UI's design philosophy and technical details, accumulating valuable experience for future application development.

**Serving Customers**

Our customers have real needs — they want to use this technology in their products as soon as possible. Waiting isn't an option; we chose to take initiative.

### Features of @zhama/a2ui

**Complete Implementation**

The implementation covers A2UI component types, data binding, event handling, and the action system.

**Independent Styling System**

Comes with complete CSS styles, no dependency on Tailwind or other frameworks. Uses `a2-` prefix to avoid style conflicts with host applications. Supports automatic dark mode.

**Security-First Design**

AI outputs declarative data rather than executable code. The renderer handles predefined components; arbitrary scripts are not renderable component types.

**Open Source and Free**

Open source under MIT license — you can freely use, modify, and distribute. We believe open source leads to better technology development.

We believe that **embracing new technology early means gaining competitive advantage early**.

---

## What Does the Future Hold?

A2UI is just the beginning — it opens up an entirely new interaction paradigm. As technology develops, we might see more exciting changes.

### Multimodal Fusion

Currently A2UI mainly handles the "AI generates interface → user clicks to operate" flow. In the future, input methods will become richer:

- Voice commands: you speak, AI adjusts the interface
- Gesture operations: in AR/VR environments, interact with AI-generated interfaces using gestures
- Eye tracking: AI adjusts information display based on your gaze

Interfaces will no longer be static but will adapt in real-time to your behavior.

### Extreme Personalization

Today's applications show the same interface to everyone for the same function. But everyone has different preferences — some like information-dense layouts, others prefer clean and simple; some are visual types who prefer charts, others prefer text lists.

With AI-generated interfaces, this personalization becomes possible:

- Same "view sales data" function: analysts see detailed multidimensional charts, CEOs see a one-page concise summary
- Interface style automatically adjusts to user preferences
- Information presentation order optimizes based on user history

### No-Code Development Goes Mainstream

Currently, developing an application interface requires professional designers and engineers. But if AI can generate interfaces:

- Product managers describe requirements in natural language, AI generates prototypes
- Entrepreneurs without technical backgrounds can quickly validate ideas
- Internal business systems can be customized by business users themselves

Product prototypes shrink from weeks to minutes, dramatically lowering the barrier to software development.

### Blurred Human-Machine Boundaries

Ultimately, the boundary between "applications" and "AI conversations" will become blurred. You might not be able to tell whether you're "using an app" or "talking to AI" — because the two merge into one.

Interface is conversation, conversation is interface. Every sentence you say might change the interface; every click you make is a communication with AI.

---

## A Thought Experiment: A Day in 2030

Imagine how a day might unfold if this approach to interaction matures.

### Morning

You wake up and ask a smart speaker, “What does today look like?”

The wall screen shows an interface generated around the day’s circumstances, rather than a fixed calendar app:

- A weather card shows rain, and “take an umbrella” appears in the reminders.
- A meeting timeline marks one meeting in red because the presentation is not ready.
- A transport comparison shows the subway and taxi options, recommending a taxi based on the weather and your habits.
- A “Prepare materials” action can generate the presentation outline.

You say “Book a taxi.” Taxi options open in the current interface, and the selected option starts the booking.

### On the Way to Work

In the car, you say, “Help me prepare for the ten o’clock meeting.”

The display shows meeting background and charts of the key figures. You browse with gestures and revise content by voice. By the time you arrive, the presentation is ready and synchronized with the meeting-room screen.

### During Work

In the meeting, your manager asks how the regions performed last quarter.

Instead of searching for a spreadsheet and building a chart, you say, “Show Q3 sales by region.” A bar chart appears with details available through selection.

Your manager asks what might happen if investment in East China increased by 20%. You request that scenario, and a dashed forecast line is added to the chart.

The experience resembles a conversation with an assistant that understands the request, rather than navigating a complex application.

### Lunch

You ask for a healthy lunch. The interface shows nearby options ranked around your preferences, with calories, delivery times, and ratings. You choose an option and confirm the order.

### Afternoon

A customer emails a technical question about the product. You ask, “Draft a reply using the product documentation.”

AI presents a draft. You can select passages to revise or ask for a more formal tone, then confirm before sending it.

### After Work

On the way home, you ask for help planning a hotpot dinner. A map shows nearby restaurants, with dishes, booking options, and directions. You confirm a reservation by voice.

At home, you ask for something relaxing to watch. The television shows a few recommendations selected for that evening, rather than requiring a search through categories.

### What Would This Mean?

The day involves scheduling, transport, documents, analysis, food ordering, email, navigation, and entertainment. Yet it does not require opening a different application and learning a different set of controls for every task.

The assistant presents relevant information and actions in a suitable interface.

**The vision is to let technology recede while interaction becomes more natural.** It will not happen overnight. The protocol, renderer, and surrounding ecosystem are steps toward that vision.

---

## The Evolution of Interaction Methods

Looking back at the history of computer interaction methods, every revolution has brought massive industry transformation:

**Command Line Era (1970s-1980s)**

Users interacted with computers by typing text commands. Required memorizing numerous commands, extremely high barrier — only professionals could use them.

**Graphical Interface Era (1980s-2000s)**

The appearance of mice, windows, and icons allowed ordinary people to use computers. This sparked the explosion of the personal computer industry, with Microsoft and Apple becoming giants.

**Web Era (1990s-2000s)**

Browsers became a common entry point across devices. Hyperlinks connected information across computers without requiring people to know where it was stored. Search, online shopping, and social networks developed around this access model, including Google, Amazon, and Facebook.

**Mobile Internet Era (2010s)**

Touchscreens made interaction more intuitive, app stores made software distribution more convenient. This sparked mobile internet prosperity, with smartphones becoming essential for everyone.

**Conversational AI Era (2020s)**

Large language models like ChatGPT made human-machine dialogue possible. But conversation output remained text, with limited capabilities.

**A2UI Era (2025-)**

AI can output interactive interfaces, truly moving from "saying" to "doing." What industry transformation will this spark? We're witnessing it and participating in it.

### Patterns in the Evolution of Interaction

**Each generation broadens access to computers.** Command lines served specialists, graphical interfaces reached office workers, the web connected a much wider audience, and mobile devices brought computing into daily life. Conversational AI offers another way to participate through ordinary language.

**Each generation shortens the distance between an idea and an action.**

- Command line: idea → learn a command → enter it → execute.
- Graphical interface: idea → find a button → click → execute.
- Touchscreen: idea → touch the object → execute.
- AI conversation: idea → describe it → receive instructions → act yourself.
- A2UI: idea → describe it → use the generated interface to act.

**Changes in interaction also create new businesses and ecosystems.** Microsoft and Apple grew with graphical interfaces; Google, Amazon, and Facebook with the web; app stores and WeChat with mobile; and OpenAI and Anthropic with conversational AI. The article’s question is which organizations and ecosystems will emerge as generated interfaces develop.

This approach can make AI capabilities accessible within more tasks, rather than requiring a separate fixed application for every interaction.

---

## Final Thoughts

From command line to graphical interfaces, from web pages to mobile apps, every revolution in interaction methods has created enormous commercial value and birthed new tech giants.

**A2UI represents the next revolution: from "humans adapting to machines" to "machines adapting to humans."**

In this new paradigm:

- AI is no longer just a tool that answers questions — it becomes an intelligent assistant that understands needs, generates interfaces, and completes operations
- Applications are no longer fixed interface flows — they become dynamic interaction experiences generated based on user needs
- Development is no longer the exclusive domain of professional engineers — it becomes a creative activity anyone can participate in

This isn't science fiction. This is happening now. And we're standing at the starting point of this revolution.

Want to learn more or get started? Visit our [GitHub repository](https://github.com/zhama-ai/a2ui-react), or [contact us](/en/contact) to discuss how to apply this technology in your business.

---

*This article was written by the Zhama AI technical team. We are committed to making AI technology better serve humanity.*
