1. What is Schema Design and What a Database Schema Represents

Schema design is the process of planning and organizing how data will be stored in a relational database.
A database schema represents the structure of the database, including:

Tables

Columns

Data types

Relationships between tables

Constraints and rules

In simple terms, schema design is the blueprint of the database.
Just like a building needs a plan before construction, a database needs a schema before storing data.

Example:
A students schema defines what information a student table will store (id, name, email, age) and how each field behaves.

2. Why Schema Design Is Required Before Writing Backend Code

Schema design must be done first because backend code depends on how data is stored.

Backend APIs read and write data based on table structure

Wrong schema leads to complex queries and frequent errors

A well-designed schema makes backend logic simpler and faster

If schema changes after backend code is written, it can break APIs and require major rewrites.

Example:
If email is not marked as UNIQUE in schema, backend must manually check duplicates, increasing complexity.

3. Impact of Poor Schema Design

Poor schema design negatively affects:

Data Consistency

Duplicate records

Conflicting values

Invalid or missing data

Maintenance

Difficult to understand tables

Hard to update or modify data

More chances of bugs

Scalability

Slow queries

Large storage usage

Poor performance as data grows

Example:
Storing the same user address in multiple tables can cause inconsistency if one copy is updated and others are not.

4. Validations in Schema Design and Why Databases Enforce Them

Validations are rules applied at the database level to ensure correct and reliable data.

Common validations:

NOT NULL → prevents empty values

UNIQUE → prevents duplicate values

PRIMARY KEY → uniquely identifies each record

DEFAULT → assigns a default value if none is given

Databases enforce validations to:

Maintain data integrity

Reduce errors

Protect data even if backend logic fails

Example:
email TEXT UNIQUE NOT NULL ensures every user has a unique and valid email.

5. Difference Between Database Schema and Database Table
Database Schema	Database Table
Overall structure of the database	Stores actual data
Contains tables, constraints, relations	Contains rows and columns
Logical design	Physical data storage

A schema is the design, while a table is a component inside the schema.

6. Why a Table Should Represent Only One Entity

Each table should represent one real-world entity to:

Avoid confusion

Reduce redundancy

Simplify queries

Example:
A students table should store only student details, not course or payment details.

This follows the single responsibility principle in databases.

7. Why Redundant or Derived Data Should Be Avoided

Redundant data is data stored multiple times.
Derived data is data that can be calculated from existing fields.

Problems caused:

Data inconsistency

Extra storage

Update anomalies

Example:
Storing both age and date_of_birth is redundant because age can be derived from date of birth.

8. Importance of Choosing Correct Data Types

Choosing correct data types:2

Improves performance

Saves storage

Prevents invalid data

Makes queries efficient

Example:

Use INTEGER for age, not TEXT

Use TIMESTAMP for dates

Use BOOLEAN for true/false values

Wrong data types can cause comparison issues and slow queries.