# MUSA 509: Geospatial Cloud Computing & Visualization - Syllabus

* **Instructor(s):**
  * Mjumbe Poe, mjumbe@design.upenn.edu
  * Sofia Fasullo, sfasullo@design.upenn.edu
* **Schedule:** Wednesdays, 10:15-1:15
* **Room:** Meyerson Hall, B13
* **Office Hours:**
  * Mjumbe:
    * In person Wednesdays immediately after class, first-come first-served
    * By appointment
  * Sofia:
    * TBD

[Description](#description) | [Schedule](#course-schedule) | [Objectives](#course-objectives) | [Format](#format) | [Assignments](#assignments) | [Grading](#grading) | [Academic Integrity](#academic-integrity)


## Description

In this course you will learn how to collect, store, wrangle and display cartographic data in a cloud-based setting. You will learn reproducible approaches for pulling spatial data from APIs with emphasis on PostGIS, Airflow, and BigQuery; to wrangle these data in Python and/or JavaScript; and visualize in various platforms including Carto and Metabase. You will build your own APIs and develop your own custom web applications. This course is the second in a progression toward building web-based systems using geospatial data, and expands on the Fall course in JavaScript Programming for Planning.

There will be a strong emphasis on open source tools although we will also strongly rely on proprietary cloud-based infrastructure providers. Besides the technologies used in class, we will be using large and sometimes messy data from which we will be deriving insights from how people inhabit, move around in, and affect their environments. We will be working with datasets published by a variety of organizations, from the local to the national level, across governments, non-profits, and private corporations.

The class is divided into four modules:

1. **Spatial Analytics with Databases** -- learn the basics of SQL and PostGIS for exploring datasets and answering questions of your data
2. **Scripting with Cloud Services** -- building basic scripts with queries and interacting with web services/APIs programmatically
3. **Data Pipelining** -- use Python or JavaScript and SQL to automate extracting, transforming, and loading data into a data warehouse
4. **Building Interfaces** -- build a dashboard and APIs to answer operational questions using dynamic representations data

## Course Schedule
(subject to adapt to the flow of the semester)

|  W#  |  Date  |  Topic  |
|------|--------|---------|
|  1   |  Jan 24  |  Introduction  |
|  2   |  Jan 31  |  _Analytics_: Spatial Databases & Querying Geospatial Data  |
|  3   |  Feb 7   |  _Analytics_: Joins & More Geospatial SQL Operations  |
|  4   |  Feb 14   |  _Analytics_: Efficient Queries  |
|  5   |  Feb 21  |  _Scripting_: Working with Data from Files and Web Services  |
|  6   |  Feb 28  |  _Scripting_: More Extracting Data  |
|  -   |  Mar 6   |  **-(SPRING BREAK)-**  |
|  7   |  Mar 13   |  _Pipelines_: Implementing ETL in Cloud Services  |
|  8   |  Mar 20  |  _Pipelines_: Deploying to the cloud  |
|  9   |  Mar 27  |  _Interfaces_: Open Source Business Intelligence Tools  |
|  10  |  Apr 3  |  _Interfaces_: Rendering Data with Custom Applications (APIs and Templates)  |
|  11  |  Apr 10   |    |
|  12  |  Apr 17  |    |
|  13  |  Apr 24  |    |
|  14  |  May 1  |   |

## Course Objectives

Students will learn how to use professional tools and cloud-based services to automate the process of preparing data for use in organizational decision making. **By the end of this course students should be able to:**
* Use SQL to answer questions with the data in a database
* Set up and use tools for exploring and visualizing data in a database
* Use web services to create beautiful and meaningful data products
* Use Python or JavaScript to automate the process of extracting, transforming, and loading data
* Do all of these things using professional software development tools and methods

## Format

- The majority of lectures will be asynchronous.
- The beginning of each class will be devoted to answering questions, clarifying content, or discussions.
- The later part of classes will be interactive, sometimes with some deliverable expected by the end that will make up part of the participation portion of your grade.

## Guidelines

As we will be collaborating on projects, we will need to use common tools and practices. As such, I will run this course as a benevolent dictator.

* If you are using Python:
  - You will use `poetry` to manage your dependencies. I will use `poetry` in my examples.
* If you are using JavaScript:
  - You will use `npm` to manage your dependencies. I will use `npm` in my examples.
* Your code will conform to the linter rules we agree upon as a class (and I have veto power on rules).

## Assignments

There will be assignments with some lectures. Other lectures will have recommended readings and suggested exercises to give additional practice. Labs will often have exercises that are intended to be completed in class or, in some exceptional cases, soon after.

The final project will be the culmination of all of the skills learned in the class. Students will build an automatically updating data product, powered by a cloud-hosted data pipeline, that can be used to make some operational decisions. Expectations are that the products will address some socially relevant domain, and will make use of multiple visualizations of data (static or interactive charts and maps, formatted statistics, templated prose, etc.).

## Grading

* Assignments & Participation: 50%
* Final Project: 50%

## Course Data

Some of the data we are using in this course may be proprietary and cannot be openly disseminated. In these cases students will be provided with access to private class repositories of datasets. Derivative insights based on these datasets can be openly shared, especially as part of final project work.

## Academic Integrity

In compliance with Penn's [Code of Academic Integrity](http://www.upenn.edu/academicintegrity/ai_codeofacademicintegrity.html), blatantly and egregiously copying another student's work will not be tolerated. However, because this course is designed to help prepare students for work in professional programming environments, *copying and pasting is not universally prohibited*: we encourage students to work together and to freely use the internet as a resource for finding solutions to vexing problems. Citing every copied and pasted line of code is *not* necessary. Large patterns or multiple lines of code taken from external sources *should*, however, be noted with in-code comments. If an instance is unclear, you should feel free to speak with the instructors.

### Note about AI tools...

I don't mind generative AI tools to help with coding -- I use them myself on a limited basis. If you use Chat GPT or any other AI tool, note that you are subject to the same guidelines around citation as above.

Also, understand that many of these tools often make mistakes that can be difficult to identify if you don't know what you're doing. If you and can verify that the generated code is correct, cool. But if you come to me or the TA to help debugging something generated with AI, it is always best to disclose the source of the code (for that matter, I'll be able to tell), as it would be with any code.
