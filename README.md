# 📦 Warehouse Billing Control System

### Excel Toolkit for Storage, Handling, Transport & Biweekly Billing

[![Excel](https://img.shields.io/badge/Microsoft%20Excel-365%20%7C%202021%2B-217346?style=flat-square\&logo=microsoft-excel\&logoColor=white)](#requirements) [![No VBA](https://img.shields.io/badge/VBA-None-2251FF?style=flat-square)](#why-this-tool-exists) [![License](https://img.shields.io/badge/License-Apache%202.0-lightgrey?style=flat-square)](#license)

> **Record warehouse activity once, calculate charges consistently, group them into biweekly billing periods, and produce a customer-ready billing statement — without rebuilding the same spreadsheet every billing cycle.**

Browser version 👉 [here](https://hyvoid.github.io/Warehouse-Billing-Control-System-Excel-Toolkit/)

Excel Version 👉 [purchase link](https://alexhasgreatestuff.gumroad.com/l/liwdi)

---

## Navigation

* [What Decision Does This Help You Make?](#what-decision-does-this-help-you-make)
* [About The Toolkit](#about-the-toolkit)
* [Who This Is For](#who-this-is-for)
* [Why Most Billing Errors Aren't Calculation Errors](#why-most-billing-errors-arent-calculation-errors)
* [Three Traps This Toolkit Is Designed To Avoid](#three-traps-this-toolkit-is-designed-to-avoid)
* [How It Works](#how-it-works)
* [Core Workflow](#core-workflow)
* [Design Principles](#design-principles)
* [Requirements](#requirements)
* [Typical Operating Cycle](#typical-operating-cycle)
* [Limitations](#limitations)
* [About The Builder](#about-the-builder)
* [License](#license)

---

## What Decision Does This Help You Make?

**How much should each customer be billed for warehouse activity during a specific billing period — and can you trace that amount back to the underlying operational records?**

Warehouse billing often combines several different charging rules:

* storage based on days in storage and billed pallet capacity
* handling based on actual working hours with a minimum billable threshold
* transportation based on pallet quantity and transport activation
* customer-specific activity grouped into fixed billing periods

The difficulty is rarely adding three numbers together.

The difficult part is keeping the **operational facts, pricing assumptions, billing period, calculation logic, and final customer statement connected**.

This toolkit provides that workflow in one Excel workbook.

---

## About The Toolkit

**Warehouse Billing Control System** is a lightweight Excel-based operational billing framework designed for warehouse operators, fulfillment businesses, logistics teams, and finance staff who need a repeatable way to calculate and review warehouse charges.

The workflow is deliberately narrow:

**Settings → Operations → Calculation → Biweekly Summary → Customer Billing Statement**

You enter warehouse activity once. The workbook derives the billing calculations, assigns the activity to a biweekly period, aggregates charges by customer, and provides a single-page billing view for printing or PDF export.

The system contains four connected working areas:

1. **System Settings & Assumptions**
   Maintain rates, billing tiers, minimum work hours, transport charges, cycle length, and cycle anchor date.

2. **Warehouse Operations & Billing Engine**
   The single source of truth for operational records and calculated charges.

3. **Biweekly Billing Summary**
   Review customer-level billing totals by billing period.

4. **Single-Page Billing Statement**
   Select a customer and period, verify billing health, and generate a customer-facing statement.

The design uses modern Excel dynamic-array functions so calculated areas can expand as operational records grow, without manually extending formulas row by row.

---

## Who This Is For

This toolkit is designed for businesses that already know their warehouse charging rules and want a practical operating workbook rather than a new software implementation.

It is a good fit for:

* Warehouse operators
* 3PL and fulfillment businesses
* Storage businesses
* Small logistics operations
* Warehouse finance teams
* Operations managers responsible for customer billing
* Businesses billing storage, handling, and transport as separate service components

It is especially useful when the current process looks like:

**Operational spreadsheet → manual calculations → manual customer grouping → manual invoice preparation**

and you want to turn that into one repeatable workflow.

---

## Why Most Billing Errors Aren't Calculation Errors

A billing workbook can contain perfectly correct formulas and still produce a wrong invoice.

The problem is usually upstream.

A missing receiving date can invalidate storage calculations. An incorrect dispatch date can create an impossible storage period. A transport flag entered inconsistently can prevent transport charges from being triggered. A customer name mismatch can make a valid billing period appear empty.

That is why this toolkit does not treat calculation as the entire problem.

The operational log includes **Data Health** checks at the point where data enters the system. The final billing view includes **Invoice Health** checks before a statement is produced.

The objective is simple:

> **Don't just calculate the number. Make it easier to identify whether the number is based on valid operational data.**

---

## Three Traps This Toolkit Is Designed To Avoid

### 1. Rebuilding the Same Billing Logic Every Cycle

If storage, handling, and transport rules are calculated manually every two weeks, the process becomes dependent on whoever remembers the correct formulas.

Here, the business rules live in the settings layer and are reused across the workbook.

Change the configured rate once, and downstream calculations reference the updated assumption.

---

### 2. Treating Every Pallet as a Simple Unit

Storage billing is not always equal to actual pallet quantity.

This workbook supports a configurable pallet billing tier. With a 10-pallet tier, for example, 12 physical pallets become 20 billed pallet spaces.

That distinction is built into the calculation workflow instead of being left to manual judgment.

---

### 3. Confusing "No Billing Data" With "Broken Spreadsheet"

A blank invoice does not necessarily mean the workbook is broken.

It could mean:

* no customer was selected
* no billing period was selected
* the customer does not exist in the operational data
* the customer had no activity during the selected period

The **Invoice Health** status explicitly distinguishes these situations so that an empty result can be investigated before an invoice is issued.

---

## How It Works

### 01 — Configure Your Billing Rules

The settings layer centralizes the assumptions used throughout the workbook.

Supported parameters include:

* Storage Daily Rate
* Storage Billing Tier
* Hourly Work Rate
* Minimum Work Hours
* Transport Base Fee
* Additional Pallet Fee
* Billing Cycle Days
* Cycle Base Date

This creates one place to maintain the commercial rules instead of embedding rates throughout multiple worksheets.

---

### 02 — Record Warehouse Activity Once

The operational sheet is the workbook's **Single Source of Truth**.

Each record captures:

* Tracking Code
* Client Name
* Item Description
* Date Received
* Date Dispatched
* Pallet Quantity
* Work Hours
* Transport Flag

The workbook then derives:

* Storage Days
* Billed Pallet Spaces
* Storage Cost
* Billed Work Hours
* Handling Cost
* Transport Cost
* Total Charges
* Billing Period
* Data Health

The important design choice is that operational facts are entered once. Downstream billing views reference this source instead of requiring duplicate entry.

---

### 03 — Let the Workbook Apply the Charging Rules

The calculation layer handles the defined billing logic consistently.

For example:

* Storage days continue dynamically for inventory still in storage.
* Dispatched inventory stops accumulating storage days once the dispatch date is entered.
* Pallet quantities are converted into billable pallet spaces according to the configured tier.
* Positive work hours are subject to the configured minimum billable threshold.
* Transport charges apply only when transport is marked as active.
* Total charges combine storage, handling, and transport components.

These calculations are based on the supplied business rules rather than generic warehouse assumptions.

---

### 04 — Review Billing by Customer + Biweekly Period

The summary layer automatically identifies unique combinations of:

**Billing Period + Client Name**

For each combination, it provides:

* Total Tasks Count
* Storage Revenue
* Handling Revenue
* Transport Revenue
* Total Revenue

This gives finance or management a compact view of what each customer should be billed during each billing cycle.

---

### 05 — Generate the Customer Statement

Select:

**Customer → Billing Period**

The single-page billing view then pulls the corresponding billing information and operational line items.

Before printing, **Invoice Health** checks whether the selected combination is valid.

The statement is designed for **landscape, single-page printing or PDF export**, making it suitable for sending to customers as a billing document.

---

## Core Workflow

```text
SYSTEM SETTINGS
      ↓
Warehouse Operations
      ↓
Data Health Check
      ↓
Automatic Charge Calculation
      ↓
Biweekly Billing Period
      ↓
Customer + Period Summary
      ↓
Invoice Health Check
      ↓
Single-Page Billing Statement
      ↓
Print / PDF
```

The result is not a general warehouse management system.

It is a **focused billing-control workflow** built around one recurring business problem.

---

## Design Principles

### Single Source of Truth

Operational facts are entered in one place. Summary and billing views derive their information from that source.

This reduces duplicated entry and makes it easier to trace a billing total back to the underlying operational record.

### Parameters in One Place

Commercial assumptions are centralized rather than scattered across calculation areas.

This makes rate changes easier to manage and reduces the risk of updating one calculation while forgetting another.

### Calculation + Diagnosis

The workbook separates **"What is the charge?"** from **"Can I trust the input?"**

Data Health addresses source-level issues.

Invoice Health addresses billing-output issues.

This two-stage approach is particularly useful when a workbook is used by different people for operations, finance, and customer billing.

### Reuse Instead of Rebuilding

Once the workbook has been configured, the recurring process is primarily:

**enter → review → summarize → bill**

The same framework can be reused across billing cycles rather than rebuilding a new calculation sheet each time.

---

## Requirements

This workbook relies on modern Excel dynamic-array functionality.

**Required:**

* Microsoft 365, or
* Excel 2021 or later
* Dynamic-array functions including `MAP`, `LAMBDA`, `UNIQUE`, and `FILTER`

**Not designed for:**

* Excel 2016
* Excel 2013
* older Excel versions without the required dynamic-array engine
* third-party spreadsheet software without equivalent function support

The implementation also does **not require VBA**.

---

## Typical Operating Cycle

### Initial Setup

1. Open the workbook.
2. Review the system settings.
3. Enter the applicable storage, labor, transport, and billing-cycle assumptions.

### Daily Operations

1. Add new warehouse activity to the operational log.
2. Enter receiving and dispatch information.
3. Record pallet quantity, work hours, and transport status.
4. Review **Data Health** for exceptions.

### Biweekly Billing

1. Open the billing summary.
2. Review customer-period totals.
3. Select the customer in the billing statement.
4. Select the corresponding billing period.
5. Confirm **Invoice Health** shows a valid billing state.
6. Review the line items.
7. Print or export the statement as PDF.

The intended user experience is simple:

> **Set the rules once. Record the work. Review the result. Bill the customer.**

---

## Maintenance

The workbook is designed around low-maintenance recurring use.

Normal operation should involve:

* updating warehouse activity
* keeping dispatch dates current
* reviewing Data Health warnings
* changing commercial assumptions only when the underlying billing rules change
* reviewing customer-period totals before issuing statements

The calculation areas should not be manually overwritten.

In particular, the dynamic-array formula area in the operational sheet must remain clear so that calculations can spill into new records automatically.

---

## Limitations

This toolkit is intentionally focused.

It is **not** intended to replace:

* a full warehouse management system
* inventory management software
* accounting software
* customer relationship management software
* payment collection systems
* a general ERP

It calculates and organizes charges according to the configured business rules. It does not independently determine whether those commercial rules are appropriate for a particular contract.

For performance, the implementation recommends keeping a workbook below approximately **100,000 operational rows** and archiving older data annually if necessary.

---

## About The Builder

This toolkit is built from a simple premise:

**Recurring operational problems deserve reusable workflows.**

A spreadsheet becomes much more useful when it does more than store information. It should make the underlying business process easier to repeat, review, and explain.

The focus here is not to turn Excel into enterprise software.

It is to package a specific operational workflow into a practical tool that can be opened, understood, and reused without a software implementation project.

---

## License

This project is released under the **Apache License 2.0**.

See the `LICENSE` file for the complete license text.

---

## Final Note

Warehouse billing does not need to become a large software project just because several charging rules are involved.

If your process is fundamentally:

**warehouse activity → storage + handling + transport charges → biweekly customer billing**

then a focused Excel workflow can be enough.

This toolkit is designed to keep that workflow visible, repeatable, and auditable — while leaving the business in the familiar Excel environment.
