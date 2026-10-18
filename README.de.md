[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# 📦 Excel-Vorlage für Lagerabrechnung & 3PL-Rechnungsstellung

[![Excel](https://img.shields.io/badge/Microsoft%20Excel-365%20%7C%202021%2B-217346?style=flat-square\&logo=microsoft-excel\&logoColor=white)](#requirements) [![No VBA](https://img.shields.io/badge/VBA-None-2251FF?style=flat-square)](#why-this-tool-exists) [![License](https://img.shields.io/badge/License-Apache%202.0-lightgrey?style=flat-square)](#license)

Eine automatisierte **Excel-Vorlage für Lagerabrechnung** und ein **Tracker für 3PL-Logistikrechnungsstellung**, konzipiert zur nahtlosen Berechnung von Lagergebühren, Handling-Arbeitsstunden und Frachtkosten. Ersetze manuelle, fehleranfällige Tabellenkalkulationen durch ein einheitliches System, das tägliche Betriebsdatensätze sofort in zweiwöchentliche Abrechnungszyklen gruppiert und kundenfertige Rechnungen generiert — ohne den Overhead komplexer Lagerverwaltungssysteme (WMS).

> 🌐 **Live-Webanwendung**  
> [Starte den kostenlosen webbasierten Lagerabrechnungs-Rechner (keine Installation)](https://hyvoid.github.io/Warehouse-Billing-Control-System-Excel-Toolkit/)
>
> 📥 **Herunterladbare Excel-Datei**  
> [Lade die wiederverwendbare Excel-Vorlage für Lagerabrechnung herunter (.xlsx)](https://www.theseusworkshop.com/l/liwdi?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=warehouse-billing-control)

---

## Kernprobleme im Betrieb & eingebaute Abrechnungslösungen

Dieses Toolkit bildet häufige Engpässe bei der Abrechnung in Fulfillment-Centern und 3PL direkt auf automatisierte Tabellenkalkulationsberechnungen ab und stellt sicher, dass jede in Rechnung gestellte Geldeinheit auf einen verifizierten Betriebsfakt zurückzuführen ist.

| Betrieblicher Engpass / Schmerzpunkt | Eingebaute automatisierte Lösung | Betriebliche Auswirkung & LSI-Ziel |
| :--- | :--- | :--- |
| **Komplexe Preisbildung mit mehreren Variablen** | **Dynamische Tarifkarten-Engine** | Verweist automatisch auf Lagertage, abrechenbare Palettenkapazitätsstufen und Mindest-Handling-Schwellen, um genaue **3PL-Handling-Gebühren** zu generieren. |
| **Getrennte Abrechnungsperioden** | **Zweiwochenzyklus-Aggregator** | Gruppiert unterschiedliche Eingangs-/Ausgangsprotokolle automatisch in feste zweiwöchentliche oder monatliche **Logistik-Rechnungszyklen**. |
| **Phantom-Paletten-Abweichungen** | **Palettenplatz-Stufenrechner** | Rechnet physische Palettenmengen in abgerechnete Stufenplätze um (z. B. 12 physische = 20 abgerechnete), um die tatsächlichen Einnahmen aus **Lagergebühren** zu realisieren. |
| **Fehlende betriebliche Auslöser** | **Validierungsschicht für Data Health** | Markiert fehlende Versanddaten oder undefinierte Transportmarkierungen, bevor sie **Fehler in der Frachtabrechnung** oder Umsatzverluste verursachen. |

---

## Zielgruppe & praxisnahe Logistik-Anwendungsfälle

Speziell konzipiert für Logistikprofis, die eine zuverlässige, transparente und flexible **Tabellenkalkulation für Lagerabrechnung** benötigen, ohne in Unternehmenssoftware zu investieren.

### 1. Betreiber von 3PL & Fulfillment-Centern
* **Primäre Suchintention:** *Excel-Alternative zu 3PL-Abrechnungssoftware*
* **Betriebliches Szenario:** Verwaltung mehrerer Kundenkonten, bei denen täglicher Wareneingang, Kommissionierung und Palettenlagerung genau nachverfolgt und zweiwöchentlich abgerechnet werden müssen.

### 2. Betriebsleiter im Lager
* **Primäre Suchintention:** *Rechner für Lager-Handling und Lagergebühren*
* **Betriebliches Szenario:** Übergang von unstrukturierten Tagesprotokollen zu einem standardisierten Workflow, der Kunden genau belegt, wie viele Arbeitsstunden und Palettenplätze genutzt wurden.

### 3. Finanz- & Rechnungsstellungsteams in der Logistik
* **Primäre Suchintention:** *Excel-Vorlage für Fracht- und Lagerrechnungen*
* **Betriebliches Szenario:** Beseitigung der manuellen Abstimmungspanik zum Monatsende durch Vertrauen auf eine einzige Quelle der Wahrheit, die „keine Abrechnungsdaten" von tatsächlichen „Tabellenkalkulationsfehlern" unterscheidet.

### 4. Inhaber unabhängiger Lagerbetriebe
* **Primäre Suchintention:** *Tabelle zur Nachverfolgung von Palettenlagerung*
* **Betriebliches Szenario:** Abrechnung von Kunden strikt nach Bestandsfläche und Dauer, was eine automatisierte Nachverfolgung von Lagertagen gegen dynamische Mindestschwellen erfordert.

---

## Vergleich der Lagerabrechnung: Manuelle Nachverfolgung vs. automatisiertes Toolkit

Vermeide die drei häufigsten Fallen bei der Lagerabrechnung, indem du deinen Betriebs-Workflow modernisierst.

| Bereich des Abrechnungs-Workflows | Traditionelle manuelle Tabellenkalkulation | Automatisiertes Abrechnungs-Toolkit (dieses Repository) |
| :--- | :--- | :--- |
| **Aktualisierung von Tarifkarten & Logik** | **Logik jeden Zyklus neu aufbauen:** Formeln müssen jeden Monat manuell über mehrere Registerkarten kopiert, eingefügt und aktualisiert werden. | **Zentrale Parametersteuerung:** Ändere Lagertarife oder Transportgebühren einmal in der Einstellungsebene; alle historischen und zukünftigen Rechnungen aktualisieren sich automatisch. |
| **Berechnung der Palettenlagerung** | **Flache Einheitenzählung:** Behandelt jede Palette als einfache 1:1-Einheit und verfehlt Einnahmen aus gestaffelten Lagerplatzvereinbarungen. | **Konfigurierbare Abrechnungsstufen:** Wendet automatisch stufenbasierte Rundung an (z. B. Abrechnung eines 10-Paletten-Blocks), basierend auf Kundenverträgen. |
| **Diagnose von Rechnungsfehlern** | **Blinde Fehlersuche:** Eine leere Rechnung kann einen kaputten SVERWEIS, einen fehlenden Kunden oder keine monatliche Aktivität bedeuten. | **Expliziter Invoice-Health-Status:** Diagnoseindikatoren geben explizit an, ob Daten fehlen, nicht übereinstimmen oder für die Periode einfach inaktiv sind. |

---

## Schnellstart-Tutorial: Abrechnungs-Workflow in 4 Schritten

Hör auf, Formeln zu kopieren und einzufügen. Befolge diese betriebliche Reihenfolge, um einen wiederholbaren Abrechnungszyklus zu etablieren:

### Schritt 1: Konfiguriere deine Lager-Tarifkarten
Öffne die Registerkarte **System Settings & Assumptions**, um deine Kernparameter für die Logistik zu definieren:
* Lege dein Zyklus-Ankerdatum fest (zweiwöchentlich oder monatlich).
* Definiere Tagessätze für Lagerung, Stundensätze für Handling und Transportaktivierungsgebühren.
* Lege mindestens abrechenbare Arbeitsstunden und Paletten-Tarifstufen fest.

### Schritt 2: Protokolliere den täglichen Lagerbetrieb
Gib die alltäglichen Aktivitäten in die **Warehouse Operations & Billing Engine** ein:
* Füge Eingangsdaten, Versanddaten, physische Palettenmengen und tatsächliche Handling-Stunden ein.
* Das System markiert automatisch fehlende Daten und berechnet die anteilige Lagerdauer und Handling-Summen in Echtzeit.

### Schritt 3: Prüfe die zweiwöchentlichen Abrechnungsübersichten
Wechsle zum **Biweekly Billing Summary**-Dashboard:
* Prüfe die aggregierten Lager-, Handling- und Transportsummen, gruppiert nach Kundenkonto.
* Verifiziere die Data-Health-Prüfungen, um sicherzustellen, dass keine fehlenden Betriebsvariablen den Umsatz verzerren.

### Schritt 4: Generiere Kundenaufstellungen & sichere deine Daten
Wähle einen bestimmten Kunden und Abrechnungszeitraum, um eine saubere, exportierbare **Einseitige Abrechnungsaufstellung** zu generieren. 

👉 **Bereit, deine Lagerabrechnung zu standardisieren?**  
Teste deine Tarife in der kostenlosen Browser-Version und [lade dann die wiederverwendbare Excel-Vorlage für Lagerabrechnung herunter](https://www.theseusworkshop.com/l/liwdi?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=warehouse-billing-control), um einen sicheren, offline und dauerhaft verfügbaren Abrechnungsrahmen für dein Unternehmen einzusetzen.

---

## So funktioniert es

### 01 — Konfiguriere deine Abrechnungsregeln

Die Einstellungsebene zentralisiert die in der gesamten Arbeitsmappe verwendeten Annahmen.

Unterstützte Parameter umfassen:

* Lager-Tagessatz
* Lager-Tarifstufe
* Arbeitsstundensatz
* Mindestarbeitsstunden
* Transport-Grundgebühr
* Zusätzliche Palettengebühr
* Tage des Abrechnungszyklus
* Basisdatum des Zyklus

So gibt es einen Ort, um die Geschäftsregeln zu pflegen, statt Tarife über mehrere Arbeitsblätter zu verteilen.

---

### 02 — Erfasse Lageraktivitäten nur einmal

Das Betriebsblatt ist die **Single Source of Truth** der Arbeitsmappe.

Jeder Datensatz erfasst:

* Tracking-Code
* Kundenname
* Artikelbeschreibung
* Eingangsdatum
* Versanddatum
* Palettenmenge
* Arbeitsstunden
* Transportmarkierung

Die Arbeitsmappe leitet daraus ab:

* Lagertage
* Abgerechnete Palettenplätze
* Lagerkosten
* Abgerechnete Arbeitsstunden
* Handling-Kosten
* Transportkosten
* Gesamtgebühren
* Abrechnungszeitraum
* Data Health

Die wichtige Designentscheidung ist, dass Betriebsdaten nur einmal eingegeben werden. Nachgelagerte Abrechnungsansichten verweisen auf diese Quelle, statt doppelte Eingaben zu erfordern.

---

### 03 — Lass die Arbeitsmappe die Gebührenregeln anwenden

Die Berechnungsebene wendet die definierte Abrechnungslogik konsistent an.

Zum Beispiel:

* Lagertage laufen für Bestände, die noch im Lager sind, dynamisch weiter.
* Versandter Bestand hört auf, Lagertage zu akkumulieren, sobald das Versanddatum eingegeben wird.
* Palettenmengen werden gemäß der konfigurierten Stufe in abrechenbare Palettenplätze umgerechnet.
* Positive Arbeitsstunden unterliegen der konfigurierten Mindestabrechnungsschwelle.
* Transportgebühren fallen nur an, wenn Transport als aktiv markiert ist.
* Gesamtgebühren kombinieren Lager-, Handling- und Transportkomponenten.

Diese Berechnungen basieren auf den bereitgestellten Geschäftsregeln und nicht auf generellen Lagerannahmen.

---

### 04 — Prüfe die Abrechnung nach Kunde + zweiwöchentlichem Zeitraum

Die Übersichtsebene identifiziert automatisch eindeutige Kombinationen aus:

**Abrechnungszeitraum + Kundenname**

Für jede Kombination stellt sie bereit:

* Gesamtanzahl der Aufgaben
* Lagerumsatz
* Handling-Umsatz
* Transportumsatz
* Gesamtumsatz

Das gibt der Finanzabteilung oder dem Management eine kompakte Sicht darauf, was jedem Kunden in jedem Abrechnungszyklus in Rechnung gestellt werden sollte.

---

### 05 — Generiere die Kundenaufstellung

Wähle:

**Kunde → Abrechnungszeitraum**

Die einseitige Abrechnungsansicht ruft dann die entsprechenden Abrechnungsinformationen und betrieblichen Einzelposten ab.

Vor dem Druck prüft **Invoice Health**, ob die gewählte Kombination gültig ist.

Die Aufstellung ist für **Querformat, einseitigen Druck oder PDF-Export** konzipiert und damit geeignet, als Abrechnungsdokument an Kunden gesendet zu werden.

---

## Kern-Workflow

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

Das Ergebnis ist kein allgemeines Lagerverwaltungssystem.

Es ist ein **fokussierter Workflow zur Abrechnungssteuerung**, gebaut um ein wiederkehrendes Geschäftsproblem.

---

## Design-Prinzipien

### Single Source of Truth

Betriebsdaten werden an einem Ort eingegeben. Übersichts- und Abrechnungsansichten leiten ihre Informationen aus dieser Quelle ab.

Das reduziert doppelte Eingaben und macht es einfacher, eine Abrechnungssumme auf den zugrunde liegenden Betriebsdatensatz zurückzuverfolgen.

### Parameter an einem Ort

Geschäftsannahmen sind zentralisiert statt über Bereiche verstreut.

Das macht Tarifänderungen einfacher zu verwalten und reduziert das Risiko, eine Berechnung zu aktualisieren und eine andere zu vergessen.

### Berechnung + Diagnose

Die Arbeitsmappe trennt **"Was ist die Gebühr?"** von **"Kann ich der Eingabe trauen?"**

Data Health adressiert Probleme auf Quell-Datenebene.

Invoice Health adressiert Probleme auf Abrechnungsoutput-Ebene.

Dieser zweistufige Ansatz ist besonders nützlich, wenn eine Arbeitsmappe von verschiedenen Personen für Betrieb, Finanzen und Kundenabrechnung genutzt wird.

### Wiederverwenden statt Neuaufbauen

Sobald die Arbeitsmappe konfiguriert ist, besteht der wiederkehrende Prozess primär aus:

**eingeben → prüfen → zusammenfassen → abrechnen**

Derselbe Rahmen kann über Abrechnungszyklen hinweg wiederverwendet werden, statt jedes Mal ein neues Berechnungsblatt aufzubauen.

---

## Anforderungen

Diese Arbeitsmappe setzt auf moderne dynamische Array-Funktionalität von Excel.

**Erforderlich:**

* Microsoft 365, oder
* Excel 2021 oder neuer
* Dynamische-Array-Funktionen einschließlich `MAP`, `LAMBDA`, `UNIQUE` und `FILTER`

**Nicht ausgelegt für:**

* Excel 2016
* Excel 2013
* ältere Excel-Versionen ohne die erforderliche Dynamic-Array-Engine
* Drittanbieter-Tabellenkalkulationssoftware ohne gleichwertige Funktionsunterstützung

Die Implementierung erfordert außerdem **kein VBA**.

---

## Typischer Betriebszyklus

### Ersteinrichtung

1. Öffne die Arbeitsmappe.
2. Prüfe die Systemeinstellungen.
3. Gib die geltenden Annahmen für Lagerung, Arbeit, Transport und Abrechnungszyklus ein.

### Täglicher Betrieb

1. Füge neue Lageraktivitäten zum Betriebsprotokoll hinzu.
2. Gib Eingangs- und Versandinformationen ein.
3. Erfasse Palettenmenge, Arbeitsstunden und Transportstatus.
4. Prüfe **Data Health** auf Ausnahmen.

### Zweiwöchentliche Abrechnung

1. Öffne die Abrechnungsübersicht.
2. Prüfe die Kunden-Zeitraum-Summen.
3. Wähle den Kunden in der Abrechnungsaufstellung.
4. Wähle den entsprechenden Abrechnungszeitraum.
5. Bestätige, dass **Invoice Health** einen gültigen Abrechnungsstatus anzeigt.
6. Prüfe die Einzelposten.
7. Drucke die Aufstellung oder exportiere sie als PDF.

Die beabsichtigte Nutzererfahrung ist einfach:

> **Regeln einmal festlegen. Arbeit erfassen. Ergebnis prüfen. Kunden abrechnen.**

---

## Wartung

Die Arbeitsmappe ist auf wiederkehrende Nutzung mit geringem Wartungsaufwand ausgelegt.

Der Normalbetrieb sollte umfassen:

* Aktualisierung der Lageraktivitäten
* Aktualität der Versanddaten
* Prüfung von Data-Health-Warnungen
* Änderung geschäftlicher Annahmen nur, wenn sich die zugrunde liegenden Abrechnungsregeln ändern
* Prüfung der Kunden-Zeitraum-Summen vor Ausstellung von Aufstellungen

Die Berechnungsbereiche sollten nicht manuell überschrieben werden.

Insbesondere muss der Dynamic-Array-Formelbereich im Betriebsblatt frei bleiben, damit Berechnungen automatisch in neue Datensätze überlaufen können.

---

## Grenzen

Diese Toolkit ist absichtlich fokussiert.

Sie ist **nicht** dazu gedacht, zu ersetzen:

* ein vollständiges Lagerverwaltungssystem
* Bestandsverwaltungssoftware
* Buchhaltungssoftware
* Customer-Relationship-Management-Software
* Zahlungseinzugssysteme
* ein allgemeines ERP-System

Sie berechnet und organisiert Gebühren gemäß den konfigurierten Geschäftsregeln. Sie bestimmt nicht unabhängig, ob diese Geschäftsregeln für einen bestimmten Vertrag angemessen sind.

Für die Performance empfiehlt die Implementierung, eine Arbeitsmappe unter etwa **100.000 Betriebsdatensätzen** zu halten und ältere Daten bei Bedarf jährlich zu archivieren.

---

## Über den Entwickler

Dieses Toolkit basiert auf einer einfachen Prämisse:

**Wiederkehrende Betriebsprobleme verdienen wiederverwendbare Workflows.**

Eine Tabellenkalkulation wird deutlich nützlicher, wenn sie mehr tut als Informationen zu speichern. Sie sollte den zugrunde liegenden Geschäftsprozess einfacher zu wiederholen, zu prüfen und zu erklären machen.

Der Fokus hier ist nicht, Excel in Unternehmenssoftware zu verwandeln.

Es geht darum, einen spezifischen Betriebs-Workflow in ein praktisches Tool zu verpacken, das ohne Software-Implementierungsprojekt geöffnet, verstanden und wiederverwendet werden kann.

---

## Lizenz

Dieses Projekt wird unter der **Apache License 2.0** veröffentlicht.

Siehe die Datei `LICENSE` für den vollständigen Lizenztext.

---

## Abschließender Hinweis

Lagerabrechnung muss nicht zu einem großen Softwareprojekt werden, nur weil mehrere Gebührenregeln beteiligt sind.

Wenn dein Prozess grundsätzlich ist:

**Lageraktivität → Lager- + Handling- + Transportgebühren → zweiwöchentliche Kundenabrechnung**

dann kann ein fokussierter Excel-Workflow genügen.

Dieses Toolkit ist darauf ausgelegt, diesen Workflow sichtbar, wiederholbar und prüfbar zu halten — während das Unternehmen in der vertrauten Excel-Umgebung bleibt.
