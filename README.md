# NotSoEasy Hiring Analyst

> **Hiring isn't easy. Choosing candidates shouldn't be.**

An AI-powered Hiring Intelligence SaaS that transforms recruiter intent into structured evaluation frameworks and helps recruiters identify the best candidates through explainable AI-driven assessments.

---

## Overview

Recruiters spend countless hours manually reviewing resumes while relying on inconsistent hiring criteria and keyword-based Applicant Tracking Systems (ATS).

**NotSoEasy Hiring Analyst** solves this by understanding *how a recruiter actually wants to hire*, generating a dynamic evaluation rubric, and using that rubric to evaluate every candidate consistently and transparently.

Instead of asking:

> *"Does this resume match the JD?"*

NotSoEasy asks:

> *"What does success look like for this role?"*

Every candidate is then evaluated against that same recruiter-approved framework.

---

# Features

## Recruiter Workspace

- Google Authentication (Auth.js)
- Recruiter Dashboard
- Campaign Management
- Campaign Search
- Rename/Delete Campaigns
- Secure Campaign Ownership

---

## AI Hiring Intelligence

Generate hiring frameworks directly from:

- Job Description
- Recruiter Notes

The system automatically produces:

- Role Summary
- Must-Have Criteria
- Preferred Criteria
- Deal Breakers
- Clarification Areas
- Hidden Evaluation Factors
- Evaluation Risks
- Dynamic Evaluation Rubric

---

## Clarification Engine

Instead of blindly trusting the JD, the platform asks intelligent clarification questions such as:

- Which skills are negotiable?
- What matters more?
- Which requirements are true deal breakers?
- What should be weighted higher?

Recruiter responses are used to refine the hiring framework before any candidate is evaluated.

---

## Explainable Evaluation Rubric

Unlike traditional ATS platforms that rely on keyword matching, NotSoEasy generates a structured evaluation rubric containing:

- Weighted Criteria
- Required Flags
- Categories
- Expected Evidence

Every future candidate is evaluated against the exact same rubric.

---

## Resume Management

- Multi-file Upload
- PDF Support
- DOCX Support
- Duplicate Detection (SHA-256)
- Private Resume Storage
- Resume Lifecycle Tracking

---

## Secure SaaS Architecture

- Multi-tenant architecture
- Google OAuth
- Role-based Authorization
- Campaign Ownership
- Protected Routes
- Private Resume Storage
- Storage Service Abstraction

---

# Current Development Status

## Completed

- Application Foundation
- Recruiter Authentication
- Recruiter Workspace
- Campaign Management
- Hiring Framework Generation
- Clarification Engine
- Evaluation Rubric Generation
- Resume Upload Backend
- Storage Architecture
- Structured AI Outputs

## In Progress

- Resume Workspace
- Resume Parsing Engine

## Planned

- Candidate Intelligence Engine
- Candidate Evaluation Engine
- Ranking System
- Candidate Comparison
- Recruiter Analytics

---

# Product Workflow

```text
Recruiter Login
        │
        ▼
Create Campaign
        │
        ▼
Paste Job Description
        │
        ▼
Generate Hiring Framework
        │
        ▼
Answer Clarification Questions
        │
        ▼
Generate Evaluation Rubric
        │
        ▼
Upload Candidate Resumes
        │
        ▼
Candidate Intelligence (Upcoming)
        │
        ▼
AI Evaluation (Upcoming)
        │
        ▼
Ranking & Explainability (Upcoming)
```

---

# Architecture

```text
User
│
└── Campaign
      │
      ├── Hiring Framework
      ├── Clarifications
      ├── Evaluation Rubric
      ├── Resume
      ├── Candidate Profile (Upcoming)
      ├── Evaluation (Upcoming)
      └── Rankings (Upcoming)
```

---

# Tech Stack

## Frontend

- Next.js 15
- TypeScript
- React
- Tailwind CSS
- Shadcn UI

## Backend

- Next.js Server Actions
- MongoDB
- Mongoose
- Auth.js v5

## AI

- Google Gemini 2.5 Flash
- Structured Outputs
- Schema Validation

## Authentication

- Google OAuth
- JWT Sessions
- Role-based Authorization

## Storage

- Local Storage Provider
- Storage Service Abstraction
- Cloud-ready (S3 / Vercel Blob / Cloudinary)

---

# AI Pipeline

Unlike traditional LLM applications that parse markdown responses using regular expressions, NotSoEasy uses Gemini Structured Outputs.

```text
Prompt
      │
      ▼
Gemini Structured Output
      │
      ▼
Schema Validation
      │
      ▼
MongoDB
```

This eliminates:

- Regex parsing
- Markdown stripping
- Manual JSON extraction
- Brittle response handling

---

# Security

- Google OAuth Authentication
- Protected Routes
- Campaign Ownership Validation
- Server-side Authorization
- Private Resume Storage
- Duplicate File Detection
- Secure Server Actions

---

# Future Roadmap

### Candidate Intelligence

Generate structured candidate profiles from resumes.

---

### Evaluation Engine

Evaluate candidates using recruiter-approved weighted rubrics.

---

### Ranking Engine

Automatically rank candidates based on explainable AI scoring.

---

### Candidate Comparison

Compare finalists with transparent reasoning and trade-off analysis.

---

### Recruiter Analytics

Hiring insights, reports, and candidate trends.

---

# Vision

NotSoEasy is not another Applicant Tracking System.

It is an **AI Hiring Intelligence Platform** designed to help recruiters answer one question:

> **Which candidates should I interview, and why?**

---

# Author

**Manvesh Thakur**

Building AI-powered developer tools and intelligent SaaS products.

---
