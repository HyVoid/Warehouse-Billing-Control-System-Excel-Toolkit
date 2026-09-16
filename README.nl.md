[ 🌐 عربي ](README.ar.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# 📦 Warehouse Billing Management Excel Template & 3PL Invoicing System

[![Excel](https://img.shields.io/badge/Microsoft%20Excel-365%20%7C%202021%2B-217346?style=flat-square\&logo=microsoft-excel\&logoColor=white)](#requirements) [![No VBA](https://img.shields.io/badge/VBA-None-2251FF?style=flat-square)](#why-this-tool-exists) [![License](https://img.shields.io/badge/License-Apache%202.0-lightgrey?style=flat-square)](#license)

Een geautomatiseerd **Excel-template voor magazijnfacturatie** en een **tracker voor 3PL-logistiekfacturatie**, ontworpen om opslagkosten, gewerkte uren voor goederenbehandeling en vrachtkosten naadloos te berekenen. Vervang handmatige, foutgevoelige spreadsheets door één systeem dat dagelijkse operationele records direct groepeert in tweewekelijkse facturatiecycli en facturen genereert die klaar zijn voor de klant — zonder de overhead van complexe Warehouse Management Systems (WMS).

> 🌐 **Live webapplicatie**  
> [Start de gratis webgebaseerde calculator voor magazijnfacturatie (geen installatie)](https://hyvoid.github.io/Warehouse-Billing-Control-System-Excel-Toolkit/)
>
> 📥 **Downloadbaar Excel-bestand**  
> [Download het herbruikbare Excel-template voor magazijnfacturatie (.xlsx)](https://www.theseusworkshop.com/l/liwdi?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=warehouse-billing-control)

---

## Kernproblemen in de operatie en ingebouwde facturatieoplossingen

Deze toolkit koppelt veelvoorkomende knelpunten in facturatie bij fulfillmentcentra en 3PL direct aan geautomatiseerde spreadsheetberekeningen, zodat elke in rekening gebrachte euro terug te voeren is op een geverifieerd operationeel feit.

| Operationeel knelpunt / pijnpunt | Ingebouwde geautomatiseerde oplossing | Operationele impact en LSI-doel |
| :--- | :--- | :--- |
| **Complexe prijsstelling met meerdere variabelen** | **Dynamische engine voor tariefkaarten** | Verwijst automatisch naar opslagdagen, factureerbare palletcapaciteitsschijven en minimale behandelingsdrempels om nauwkeurige **3PL-handlingkosten** te genereren. |
| **Losgekoppelde facturatieperiodes** | **Aggregator voor tweewekelijkse cycli** | Groepeert uiteenlopende in- en uitgaande ontvangstlogboeken automatisch in vaste tweewekelijkse of maandelijkse **facturatiecycli voor logistiek**. |
| **Verschillen door spookpallets** | **Calculator voor palletruimteschijven** | Zet fysieke palletaantallen om in gefactureerde schijfruimtes (bijv. 12 fysiek = 20 gefactureerd) om de werkelijke omzet uit **magazijnopslagkosten** te realiseren. |
| **Ontbrekende operationele triggers** | **Validatielaag voor datakwaliteit** | Markeert ontbrekende verzenddatums of niet-gedefinieerde transportmarkeringen voordat zij **fouten in vrachtfacturatie** of omzetverlies veroorzaken. |

---

## Doelgroep en praktijkgerichte logistieke use cases

Speciaal ontworpen voor logistieke professionals die een betrouwbare, transparante en flexibele **spreadsheet voor magazijnfacturatie** nodig hebben zonder te investeren in enterprise-software.

### 1. Exploitanten van 3PL en fulfillmentcentra
* **Primaire zoekintentie:** *Excel-alternatief voor 3PL-facturatiesoftware*
* **Operationeel scenario:** het beheren van meerdere klantaccounts waarbij dagelijkse goederenontvangst, orderpicking en palletopslag nauwkeurig moeten worden gevolgd en gefactureerd volgens een tweewekelijks schema.

### 2. Operationeel managers van magazijnen
* **Primaire zoekintentie:** *calculator voor magazijnbehandeling en opslagkosten*
* **Operationeel scenario:** de overstap van ongestructureerde dagelijkse logboeken naar een gestandaardiseerde workflow die klanten precies aantoont hoeveel arbeidsuren en palletruimtes zijn gebruikt.

### 3. Finance- en facturatieteams in de logistiek
* **Primaire zoekintentie:** *Excel-template voor vracht- en opslagfacturen*
* **Operationeel scenario:** het elimineren van de paniek rond handmatige afstemming aan het einde van de maand door te vertrouwen op één single source of truth die "geen facturatiegegevens" onderscheidt van daadwerkelijke "spreadsheetfouten."

### 4. Eigenaren van zelfstandige opslagfaciliteiten
* **Primaire zoekintentie:** *spreadsheet voor het volgen van palletopslag*
* **Operationeel scenario:** klanten uitsluitend factureren op basis van voorraadvoetafdruk en duur, wat een geautomatiseerde manier vereist om opslagdagen te volgen tegen dynamische minimumdrempels.

---

## Vergelijking van magazijnfacturatie: handmatige tracking versus geautomatiseerde toolkit

Voorkom de drie meest voorkomende valkuilen bij magazijnfacturatie door uw operationele workflow te upgraden.

| Onderdeel van de facturatieworkflow | Traditionele handmatige spreadsheet | Geautomatiseerde facturatietoolkit (deze repo) |
| :--- | :--- | :--- |
| **Updates van tariefkaarten en logica** | **Logica elke cyclus opnieuw opbouwen:** formules moeten elke maand handmatig worden gekopieerd, geplakt en bijgewerkt in meerdere tabbladen. | **Gecentraliseerde parameteraansturing:** wijzig opslagtarieven of transportkosten één keer in de instellingenlaag; alle historische en toekomstige facturen worden automatisch bijgewerkt. |
| **Berekeningen van palletopslag** | **Vlakke eenheidstelling:** behandelt elke pallet als een simpele 1:1-eenheid, waardoor omzet uit getrapte overeenkomsten voor opslagruimte wordt gemist. | **Configureerbare facturatieschijven:** past automatisch op schijven gebaseerde afronding toe (bijv. factureren voor een blok van 10 pallets) op basis van klantcontracten. |
| **Diagnose van factuurfouten** | **Blindelings probleemoplossing:** een lege factuur kan wijzen op een kapotte VLOOKUP, een ontbrekende klant of nul maandelijkse activiteit. | **Expliciete factuurgezondheidsstatus:** diagnostische indicatoren vermelden expliciet of gegevens ontbreken, niet overeenkomen of simpelweg inactief zijn in de periode. |

---

## Quickstart-tutorial: facturatieworkflow in 4 stappen

Stop met het kopiëren en plakken van formules. Volg deze operationele volgorde om een herhaalbare facturatiecyclus op te zetten:

### Stap 1: configureer uw magazijntariefkaarten
Open het tabblad **System Settings & Assumptions** om uw kernparameters voor de logistiek te definiëren:
* Stel uw ankerdatum voor de cyclus in (tweewekelijks of maandelijks).
* Definieer dagelijkse opslagtarieven, uurtarieven voor goederenbehandeling en activeringskosten voor transport.
* Stel de minimale factureerbare werkuren en de facturatieschijven voor pallets in.

### Stap 2: registreer dagelijkse magazijnactiviteiten
Voer dagelijkse activiteiten in bij de **Warehouse Operations & Billing Engine**:
* Plak ontvangstdatums, verzenddatums, fysieke palletaantallen en werkelijke behandelingsuren.
* Het systeem markeert automatisch ontbrekende gegevens en berekent realtime de naar rato toegerekende opslagduur en de totalen voor goederenbehandeling.

### Stap 3: controleer de tweewekelijkse factuuroverzichten
Schakel over naar het dashboard **Biweekly Billing Summary**:
* Bekijk de geaggregeerde totalen voor opslag, behandeling en transport, gegroepeerd per klantaccount.
* Verifieer de controles op datakwaliteit om er zeker van te zijn dat geen ontbrekende operationele variabelen de omzet vertekenen.

### Stap 4: genereer klantoverzichten en beveilig uw gegevens
Selecteer een specifieke klant en facturatieperiode om een schoon, exporteerbaar **Single-Page Billing Statement** te genereren. 

👉 **Klaar om uw magazijnfacturatie te standaardiseren?**  
Test uw tarieven in de gratis browserversie en [download daarna het herbruikbare Excel-template voor magazijnfacturatie](https://www.theseusworkshop.com/l/liwdi?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=warehouse-billing-control) om een veilig, offline en levenslang toegankelijk facturatiekader voor uw bedrijf in te zetten.

---

## Hoe het werkt

### 01 — Configureer uw facturatieregels

De instellingenlaag centraliseert de aannames die in de hele werkmap worden gebruikt.

Ondersteunde parameters zijn onder meer:

* Storage Daily Rate
* Storage Billing Tier
* Hourly Work Rate
* Minimum Work Hours
* Transport Base Fee
* Additional Pallet Fee
* Billing Cycle Days
* Cycle Base Date

Zo ontstaat één plek om de commerciële regels te onderhouden, in plaats van tarieven te verspreiden over meerdere werkbladen.

---

### 02 — Registreer magazijnactiviteiten één keer

Het operationele blad is de **single source of truth** van de werkmap.

Elk record legt vast:

* Tracking Code
* Client Name
* Item Description
* Date Received
* Date Dispatched
* Pallet Quantity
* Work Hours
* Transport Flag

De werkmap leidt vervolgens het volgende af:

* Storage Days
* Billed Pallet Spaces
* Storage Cost
* Billed Work Hours
* Handling Cost
* Transport Cost
* Total Charges
* Billing Period
* Data Health

De belangrijke ontwerpkeuze is dat operationele feiten één keer worden ingevoerd. Stroomafwaartse facturatietoewijzingen verwijzen naar deze bron in plaats van dubbele invoer te vereisen.

---

### 03 — Laat de werkmap de facturatieregels toepassen

De berekeningslaag verwerkt de gedefinieerde facturatielogica consistent.

Bijvoorbeeld:

* Opslagdagen lopen dynamisch door voor voorraad die nog in opslag ligt.
* Verzonden voorraad stopt met het opbouwen van opslagdagen zodra de verzenddatum is ingevoerd.
* Palletaantallen worden omgezet in factureerbare palletruimtes volgens de geconfigureerde schijf.
* Op positieve werkuren is de geconfigureerde minimale factureerbare drempel van toepassing.
* Transportkosten worden alleen toegepast wanneer transport als actief is gemarkeerd.
* De totale kosten combineren de componenten opslag, behandeling en transport.

Deze berekeningen zijn gebaseerd op de aangeleverde bedrijfsregels in plaats van op generieke magazijnaannames.

---

### 04 — Bekijk facturatie per klant en tweewekelijkse periode

De samenvattingslaag identificeert automatisch unieke combinaties van:

**Billing Period + Client Name**

Voor elke combinatie biedt deze:

* Total Tasks Count
* Storage Revenue
* Handling Revenue
* Transport Revenue
* Total Revenue

Dit geeft finance of management een compact overzicht van wat elke klant tijdens elke facturatiecyclus gefactureerd moet krijgen.

---

### 05 — Genereer het klantoverzicht

Selecteer:

**Customer → Billing Period**

De facturatieweergave van één pagina haalt vervolgens de bijbehorende facturatie-informatie en operationele regels op.

Vóór het afdrukken controleert **Invoice Health** of de geselecteerde combinatie geldig is.

Het overzicht is ontworpen voor **liggend, afdrukken op één pagina of export naar PDF**, waardoor het geschikt is om als facturatiedocument naar klanten te sturen.

---

## Kernworkflow

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

Het resultaat is geen algemeen magazijnbeheersysteem.

Het is een **gerichte workflow voor facturatiebeheersing**, gebouwd rond één terugkerend bedrijfsprobleem.

---

## Ontwerpprincipes

### Single source of truth

Operationele feiten worden op één plek ingevoerd. Samenvattings- en facturatietoewijzingen halen hun informatie uit die bron.

Dit vermindert dubbele invoer en maakt het eenvoudiger om een facturatietotaal terug te voeren op het onderliggende operationele record.

### Parameters op één plek

Commerciële aannames worden gecentraliseerd in plaats van verspreid over berekeningsgebieden.

Dit maakt tariefwijzigingen eenvoudiger te beheren en verkleint het risico dat de ene berekening wordt bijgewerkt terwijl een andere wordt vergeten.

### Berekening + diagnose

De werkmap scheidt **"Wat is de kostenpost?"** van **"Kan ik de invoer vertrouwen?"**

Data Health behandelt problemen op bronniveau.

Invoice Health behandelt problemen op het niveau van de facturatie-uitvoer.

Deze tweefasige aanpak is bijzonder nuttig wanneer een werkmap door verschillende mensen wordt gebruikt voor operations, finance en klantfacturatie.

### Hergebruiken in plaats van opnieuw opbouwen

Zodra de werkmap is geconfigureerd, is het terugkerende proces hoofdzakelijk:

**enter → review → summarize → bill**

Hetzelfde kader kan worden hergebruikt over facturatiecycli heen, in plaats van elke keer een nieuw berekeningsblad op te bouwen.

---

## Vereisten

Deze werkmap is afhankelijk van de moderne functionaliteit voor dynamische arrays in Excel.

**Vereist:**

* Microsoft 365, of
* Excel 2021 of later
* Functies voor dynamische arrays, waaronder `MAP`, `LAMBDA`, `UNIQUE` en `FILTER`

**Niet ontworpen voor:**

* Excel 2016
* Excel 2013
* oudere Excel-versies zonder de vereiste engine voor dynamische arrays
* spreadsheetsoftware van derden zonder gelijkwaardige functieondersteuning

De implementatie vereist bovendien **geen VBA**.

---

## Typische operationele cyclus

### Initiële configuratie

1. Open de werkmap.
2. Controleer de systeeminstellingen.
3. Voer de toepasselijke aannames in voor opslag, arbeid, transport en de facturatiecyclus.

### Dagelijkse operatie

1. Voeg nieuwe magazijnactiviteit toe aan het operationele logboek.
2. Voer informatie over ontvangst en verzending in.
3. Registreer palletaantal, werkuren en transportstatus.
4. Controleer **Data Health** op uitzonderingen.

### Tweewekelijkse facturatie

1. Open het factuuroverzicht.
2. Controleer de totalen per klant en periode.
3. Selecteer de klant in het factuuroverzicht.
4. Selecteer de bijbehorende facturatieperiode.
5. Controleer of **Invoice Health** een geldige facturatiestatus toont.
6. Controleer de regels.
7. Druk het overzicht af of exporteer het als PDF.

De beoogde gebruikerservaring is eenvoudig:

> **Stel de regels één keer in. Registreer het werk. Controleer het resultaat. Factureer de klant.**

---

## Onderhoud

De werkmap is ontworpen voor terugkerend gebruik met weinig onderhoud.

Normale operatie zou het volgende moeten omvatten:

* het bijwerken van magazijnactiviteiten
* het actueel houden van verzenddatums
* het beoordelen van Data Health-waarschuwingen
* het alleen wijzigen van commerciële aannames wanneer de onderliggende facturatieregels veranderen
* het controleren van de totalen per klant en periode voordat overzichten worden uitgegeven

De berekeningsgebieden mogen niet handmatig worden overschreven.

Met name het gebied met dynamische-arrayformules in het operationele blad moet leeg blijven, zodat berekeningen automatisch naar nieuwe records kunnen doorlopen.

---

## Beperkingen

Deze toolkit is bewust gericht.

Hij is **niet** bedoeld als vervanging van:

* een volledig warehouse management system
* voorraadbeheersoftware
* boekhoudsoftware
* software voor klantrelatiebeheer
* systemen voor het innen van betalingen
* een algemeen ERP

Hij berekent en organiseert kosten volgens de geconfigureerde bedrijfsregels. Hij bepaalt niet zelfstandig of die commerciële regels passend zijn voor een bepaald contract.

Voor prestaties adviseert de implementatie om een werkmap onder ongeveer **100.000 operationele rijen** te houden en indien nodig oudere gegevens jaarlijks te archiveren.

---

## Over de bouwer

Deze toolkit is gebouwd op een eenvoudig uitgangspunt:

**Terugkerende operationele problemen verdienen herbruikbare workflows.**

Een spreadsheet wordt veel nuttiger wanneer hij meer doet dan informatie opslaan. Hij moet het onderliggende bedrijfsproces eenvoudiger te herhalen, te beoordelen en uit te leggen maken.

De focus hier is niet om van Excel enterprise-software te maken.

Het is de bedoeling om een specifieke operationele workflow te bundelen in een praktische tool die kan worden geopend, begrepen en hergebruikt zonder een software-implementatieproject.

---

## Licentie

Dit project is vrijgegeven onder de **Apache License 2.0**.

Zie het bestand `LICENSE` voor de volledige licentietekst.

---

## Slotopmerking

Magazijnfacturatie hoeft geen groot softwareproject te worden alleen omdat er meerdere facturatieregels in het spel zijn.

Als uw proces in essentie is:

**magazijnactiviteit → kosten voor opslag + behandeling + transport → tweewekelijkse klantfacturatie**

dan kan een gerichte Excel-workflow voldoende zijn.

Deze toolkit is ontworpen om die workflow zichtbaar, herhaalbaar en controleerbaar te houden — terwijl het bedrijf in de vertrouwde Excel-omgeving blijft werken.
