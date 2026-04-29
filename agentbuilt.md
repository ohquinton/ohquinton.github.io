📊 FinFlow — Real-Time Financial Data Pipeline & Analytics Platform

A full-stack data engineering portfolio project demonstrating end-to-end data movement, transformation, and visualization using Azure-native tools and modern data engineering practices.


🎯 Project Goal
Build a production-grade financial data pipeline that ingests live stock market data, processes it through the Azure data stack, exposes it via a REST API, and visualizes the entire pipeline flow on a public portfolio website — showing recruiters not just the output, but the journey of the data.

🏗️ Architecture Overview
Yahoo Finance / Alpha Vantage API
        ↓
  Azure Data Factory (ADF)          ← Ingestion & Orchestration
        ↓
  Azure Data Lake Storage Gen2      ← Raw Layer (Bronze)
        ↓
  Azure Databricks (PySpark)        ← Transformation (Silver → Gold)
        ↓
  Azure Synapse Analytics           ← Data Warehouse
        ↓
  FastAPI (Python)                  ← REST API Layer
        ↓
  Streamlit Dashboard               ← Pipeline Visualization & Analytics
        ↓
  Power BI (Gateway Connection)     ← Executive Reporting Layer

🧱 Full Tech Stack
☁️ Azure Data Engineering
ToolPurposeAzure Data Factory (ADF)Pipeline orchestration, ingestion triggers, schedulingAzure Data Lake Storage Gen2 (ADLS)Raw and processed data storage (Bronze/Silver/Gold zones)Azure DatabricksPySpark transformations, Delta Lake operationsAzure Synapse AnalyticsData warehousing, SQL query layer, dedicated poolAzure SQL DatabaseOperational data store for API layerAzure Container AppsDeploying FastAPI and Streamlit as containersAzure Key VaultSecrets management (API keys, connection strings)
🐍 Python & Data Libraries
LibraryPurposepandasData manipulation and transformationpyarrowParquet file handling for Data LakepysparkDistributed transformations in Databricksdelta-sparkDelta Lake ACID transactions and time travelsqlalchemyDatabase ORM and connection managementpyodbcSynapse/SQL Server connectivityazure-storage-blobADLS read/write from Pythongreat-expectationsData quality validationyfinance / alpha_vantageStock market data ingestionpydanticData validation for API layer
🚀 API & Application Layer
ToolPurposeFastAPIREST API serving processed financial datauvicornASGI server running FastAPIStreamlitPipeline visualization dashboardDockerContainerizing FastAPI and Streamlit apps
📊 Visualization & BI
ToolPurposePower BIExecutive dashboards via Synapse gateway connectionPlotlyInteractive charts inside StreamlitStreamlitLive pipeline stage visualization
🛠️ DevOps & Infrastructure
ToolPurposeDockerContainerizationGitHub ActionsCI/CD pipelineAzure Container AppsServerless container hosting.env / Azure Key VaultSecrets and environment management

🗄️ Data Model (Star Schema)
Fact Table
sqlfact_stock_prices (
    price_id        BIGINT PRIMARY KEY,
    stock_id        INT FK → dim_stock,
    date_id         INT FK → dim_date,
    open_price      DECIMAL(10,2),
    close_price     DECIMAL(10,2),
    high_price      DECIMAL(10,2),
    low_price       DECIMAL(10,2),
    volume          BIGINT,
    vwap            DECIMAL(10,2),
    created_at      TIMESTAMP
)
Dimension Tables
sqldim_stock (
    stock_id        INT PRIMARY KEY,
    ticker          VARCHAR(10),
    company_name    VARCHAR(100),
    sector          VARCHAR(50),
    market_cap      BIGINT
)

dim_date (
    date_id         INT PRIMARY KEY,
    full_date       DATE,
    year            INT,
    quarter         INT,
    month           INT,
    week            INT,
    day_of_week     VARCHAR(10),
    is_trading_day  BOOLEAN
)

🔄 Pipeline Stages
Stage 1 — Ingestion (Bronze Layer)

ADF pipeline triggers on schedule (daily or hourly)
Python script calls Yahoo Finance / Alpha Vantage API
Raw JSON/CSV data lands in ADLS Bronze container
No transformation — raw as-is

Stage 2 — Transformation (Silver Layer)

Databricks notebook triggered by ADF
PySpark reads Bronze Parquet files
Cleans nulls, standardizes column names, casts data types
Deduplicates records
Writes to Silver Delta table

Stage 3 — Aggregation (Gold Layer)

Second Databricks job runs on Silver data
Calculates moving averages, daily returns, volatility metrics
MERGE INTO for upserts (idempotent)
OPTIMIZE + ZORDER for query performance
Writes to Gold Delta table

Stage 4 — Warehouse Load

ADF copies Gold Delta data into Synapse dedicated pool
Hash-distributed on stock_id for query performance
Fact and dimension tables populated

Stage 5 — API Layer

FastAPI reads from Azure SQL / Synapse
Endpoints: /stocks, /prices/{ticker}, /analytics/{ticker}
Containerized with Docker
Deployed to Azure Container Apps

Stage 6 — Visualization

Streamlit dashboard shows each pipeline stage with status, row counts, timestamps
Live charts: price history, volume, moving averages, sector performance
Power BI connected via Synapse gateway for executive view


🌐 Portfolio Website Integration
The Streamlit dashboard gets embedded or linked directly from your portfolio site. Visitors can:

See each pipeline stage light up as data flows through
Watch row counts update at each layer (Bronze → Silver → Gold)
Interact with stock charts and analytics
Click through to the Power BI dashboard

The visual pipeline flow — boxes connected with arrows, each stage showing status (pending → processing → complete) with a timestamp and row count. That's what makes this impressive to a recruiter. They can see you understand the full data lifecycle.

📁 Project Structure
finflow/
├── ingestion/
│   ├── adf_pipelines/          # ADF ARM templates / JSON configs
│   └── fetch_stock_data.py     # Python ingestion script
├── transformation/
│   ├── bronze_to_silver.py     # PySpark cleaning job
│   └── silver_to_gold.py       # PySpark aggregation job
├── warehouse/
│   └── synapse_ddl.sql         # Synapse table definitions
├── api/
│   ├── main.py                 # FastAPI app
│   ├── models.py               # Pydantic models
│   ├── database.py             # SQLAlchemy connection
│   └── Dockerfile
├── dashboard/
│   ├── app.py                  # Streamlit app
│   └── Dockerfile
├── tests/
│   └── test_pipeline.py        # pytest validation tests
├── docker-compose.yml
├── .env.example
└── README.md

🧪 Data Quality Checks (great-expectations)

Row count reconciliation between Bronze → Silver → Gold
Null checks on critical columns (ticker, close_price, date)
Range validation (price > 0, volume > 0)
Duplicate detection on (ticker, date) composite key
Schema drift detection between ingestion runs


📈 Analytics Features

Price history — OHLCV charts for any ticker
Moving averages — 7-day, 30-day, 90-day SMA/EMA
Daily returns — percentage change day over day
Volatility — rolling standard deviation
Sector performance — aggregated returns by sector
Volume analysis — unusual volume detection


🏆 What This Proves to Recruiters
SkillWhere It ShowsAzure Data EngineeringADF, ADLS, Databricks, SynapsePySpark & Delta LakeBronze/Silver/Gold transformationData ModelingStar schema in SynapsePythonIngestion scripts, API, transformationsSQLSynapse DDL, query optimizationAPI DevelopmentFastAPI endpointsContainerizationDocker + Azure Container AppsData Qualitygreat-expectations validationBI & ReportingPower BI + Synapse gatewayEnd-to-End ThinkingFull pipeline from API → dashboard

✅ Build Tasks
Phase 1 — Azure Environment Setup

 Create Azure free tier account
 Provision ADLS Gen2 with Bronze / Silver / Gold containers
 Provision Azure Data Factory instance
 Provision Azure Databricks workspace
 Provision Azure Synapse Analytics dedicated pool
 Provision Azure SQL Database for API layer
 Set up Azure Key Vault and store all secrets
 Configure IAM roles and service principals for tool-to-tool access

Phase 2 — Ingestion (Bronze Layer)

 Register for Yahoo Finance or Alpha Vantage API key
 Write Python ingestion script to pull OHLCV data
 Land raw data in ADLS Bronze container as Parquet
 Build ADF pipeline to trigger ingestion on schedule
 Test incremental loads — only pull new data each run

Phase 3 — Transformation (Silver Layer)

 Write PySpark notebook in Databricks to read Bronze Parquet
 Clean nulls, standardize column names, cast data types
 Deduplicate on (ticker, date) composite key
 Write cleaned data to Silver Delta table
 Trigger Silver job from ADF after Bronze completes

Phase 4 — Aggregation (Gold Layer)

 Write PySpark notebook for Gold aggregations
 Calculate moving averages (7-day, 30-day, 90-day)
 Calculate daily returns and rolling volatility
 Implement MERGE INTO for idempotent upserts
 Run OPTIMIZE + ZORDER on Gold Delta table
 Trigger Gold job from ADF after Silver completes

Phase 5 — Data Warehouse (Synapse)

 Write Synapse DDL for fact_stock_prices, dim_stock, dim_date
 Configure hash distribution on stock_id
 Build ADF copy activity to load Gold Delta → Synapse
 Write and test analytical SQL queries against Synapse
 Validate row counts match Gold Delta layer

Phase 6 — Data Quality

 Set up great-expectations suite
 Write expectations for nulls, ranges, duplicates, schema
 Integrate validation into pipeline — fail on breach
 Log validation results to ADLS for audit trail

Phase 7 — API Layer

 Build FastAPI app with /stocks, /prices/{ticker}, /analytics/{ticker} endpoints
 Connect to Azure SQL via SQLAlchemy
 Add Pydantic models for request/response validation
 Write Dockerfile for FastAPI
 Test locally with uvicorn
 Deploy to Azure Container Apps

Phase 8 — Dashboard

 Build Streamlit app with pipeline stage visualization
 Show live row counts and timestamps per stage
 Build interactive charts: price history, volume, moving averages, sector performance
 Write Dockerfile for Streamlit
 Deploy to Azure Container Apps

Phase 9 — Power BI

 Install and configure on-premises data gateway
 Connect Power BI Service to Synapse via gateway
 Build semantic model on top of star schema
 Build executive dashboard with price trends, sector performance, volume
 Schedule automatic refresh

Phase 10 — Portfolio & Deployment

 Write clean README with architecture diagram
 Push everything to GitHub with proper folder structure
 Link live Streamlit dashboard from portfolio website
 Document every architectural decision and why you made it


💬 Interview Talking Points

Why ADF over Airflow? Native Azure integration, no infra to manage, built-in monitoring and alerts
Why Delta Lake? ACID transactions on a data lake, MERGE INTO for idempotent upserts, time travel for debugging
Why star schema? Optimized for analytical queries, denormalized for read performance, industry standard for warehousing
Why hash distribution on stock_id? Ensures related data lands on the same Synapse distribution node, avoids data skew on joins
Why FastAPI over Flask? Async support, automatic OpenAPI docs, Pydantic validation built-in
What does idempotent mean here? Running the pipeline twice produces the same result — no duplicates, no corrupted state. Achiev