[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# 📦 Modèle Excel de gestion de la facturation d'entrepôt & système de facturation 3PL

[![Excel](https://img.shields.io/badge/Microsoft%20Excel-365%20%7C%202021%2B-217346?style=flat-square\&logo=microsoft-excel\&logoColor=white)](#requirements) [![No VBA](https://img.shields.io/badge/VBA-None-2251FF?style=flat-square)](#why-this-tool-exists) [![License](https://img.shields.io/badge/License-Apache%202.0-lightgrey?style=flat-square)](#license)

Un **modèle Excel de facturation d'entrepôt** automatisé et un **tracker de facturation logistique 3PL**, conçus pour calculer de manière transparente les frais de stockage, les heures de main-d'œuvre de manutention et les frais de transport de fret. Remplace les tableurs manuels et sujets aux erreurs par un système unifié qui regroupe instantanément les enregistrements opérationnels quotidiens en cycles de facturation bimensuels et génère des factures prêtes pour le client — sans la surcharge de systèmes complexes de gestion d'entrepôt (WMS).

> 🌐 **Application web en direct**  
> [Lance la calculatrice de facturation d'entrepôt web gratuite (aucune installation)](https://hyvoid.github.io/Warehouse-Billing-Control-System-Excel-Toolkit/)
>
> 📥 **Fichier Excel téléchargeable**  
> [Télécharge le modèle Excel de facturation d'entrepôt réutilisable (.xlsx)](https://www.theseusworkshop.com/l/liwdi?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=warehouse-billing-control)

---

## Points de douleur opérationnels fondamentaux & solutions de facturation intégrées

Cette trousse cartographie les goulots d'étranglement courants de facturation dans les centres de fulfillment et 3PL directement sur des calculs de tableur automatisés, garantissant que chaque dollar facturé se rattache à un fait opérationnel vérifié.

| Goulot d'étranglement opérationnel / point de douleur | Solution automatisée intégrée | Impact opérationnel & cible LSI |
| :--- | :--- | :--- |
| **Tarification complexe multi-variables** | **Moteur dynamique de grille tarifaire** | Recoupe automatiquement les jours de stockage, les paliers de capacité palettisable facturable et les seuils minimaux de manutention pour générer des **frais de manutention 3PL** précis. |
| **Périodes de facturation déconnectées** | **Agrégateur de cycles bimensuels** | Regroupe automatiquement les journaux d'entrée/sortie disparates en **cycles de facturation logistique** bimensuels ou mensuels fixes. |
| **Écarts de palettes fantômes** | **Calculateur de paliers d'espace palettisable** | Convertit les quantités de palettes physiques en espaces facturés par palier (par ex. 12 physiques = 20 facturés) pour capter les véritables revenus de **frais de stockage d'entrepôt**. |
| **Déclencheurs opérationnels manquants** | **Couche de validation Data Health** | Signale les dates d'expédition manquantes ou les marqueurs de transport non définis avant qu'ils ne provoquent des **erreurs de facturation de fret** ou des pertes de revenus. |

---

## Public cible & cas d'usage logistiques concrets

Conçu spécifiquement pour les professionnels de la logistique qui ont besoin d'un **tableur de facturation d'entrepôt** fiable, transparent et flexible sans investir dans des logiciels d'entreprise.

### 1. Exploitants 3PL & centres de fulfillment
* **Intention de recherche principale :** *alternative Excel au logiciel de facturation 3PL*
* **Scénario opérationnel :** gérer plusieurs comptes clients où la réception quotidienne, la préparation de commandes et le stockage palettisé doivent être suivis et facturés avec précision selon un calendrier bimensuel.

### 2. Responsables des opérations d'entrepôt
* **Intention de recherche principale :** *calculatrice de frais de manutention et de stockage d'entrepôt*
* **Scénario opérationnel :** passer de journaux quotidiens non structurés à un workflow standardisé qui prouve aux clients exactement combien d'heures de main-d'œuvre et d'espaces palettisables ont été utilisés.

### 3. Équipes finance & facturation logistiques
* **Intention de recherche principale :** *modèle Excel de facture de fret et de stockage*
* **Scénario opérationnel :** éliminer la panique de réconciliation manuelle de fin de mois en s'appuyant sur une source de vérité unique qui distingue « aucune donnée de facturation » des véritables « erreurs de tableur ».

### 4. Propriétaires indépendants d'installations de stockage
* **Intention de recherche principale :** *tableur de suivi du stockage palettisé*
* **Scénario opérationnel :** facturer les clients strictement sur l'empreinte et la durée de l'inventaire, ce qui nécessite un moyen automatisé de suivre les jours de stockage face à des seuils minimaux dynamiques.

---

## Comparaison de la facturation d'entrepôt : suivi manuel vs. trousse automatisée

Évite les trois pièges les plus courants de la facturation d'entrepôt en modernisant ton workflow opérationnel.

| Domaine du workflow de facturation | Tableur manuel traditionnel | Trousse de facturation automatisée (ce dépôt) |
| :--- | :--- | :--- |
| **Mises à jour des grilles tarifaires & de la logique** | **Reconstruire la logique à chaque cycle :** les formules doivent être copiées, collées et mises à jour manuellement dans plusieurs onglets chaque mois. | **Contrôles de paramètres centralisés :** change les tarifs de stockage ou les frais de transport une fois dans la couche de paramètres ; toutes les factures historiques et futures se mettent à jour automatiquement. |
| **Calculs de stockage palettisé** | **Comptage unitaire plat :** traite chaque palette comme une simple unité 1:1, manquant les revenus des accords d'espace de stockage par paliers. | **Paliers de facturation configurables :** applique automatiquement l'arrondi par paliers (par ex. facturer un bloc de 10 palettes) en fonction des contrats clients. |
| **Diagnostic des erreurs de facture** | **Dépannage à l'aveugle :** une facture vierge peut signifier un RECHERCHEV cassé, un client manquant ou une activité mensuelle nulle. | **Statut de santé de facture explicite :** les indicateurs de diagnostic indiquent explicitement si les données sont manquantes, non concordantes ou simplement inactives pour la période. |

---

## Tutoriel de démarrage rapide : workflow de facturation en 4 étapes

Arrête de copier et coller des formules. Suis cette séquence opérationnelle pour établir un cycle de facturation reproductible :

### Étape 1 : configure tes grilles tarifaires d'entrepôt
Ouvre l'onglet **System Settings & Assumptions** pour définir tes paramètres logistiques fondamentaux :
* Définis ta date d'ancrage du cycle (bimensuel ou mensuel).
* Définis les tarifs journaliers de stockage, les tarifs horaires de manutention et les frais d'activation du transport.
* Définis les heures de travail minimales facturables et les paliers de facturation palettisable.

### Étape 2 : consigne les opérations quotidiennes d'entrepôt
Saisis l'activité quotidienne dans le **Warehouse Operations & Billing Engine** :
* Colle les dates de réception, les dates d'expédition, les quantités de palettes physiques et les heures de manutention réelles.
* Le système signale automatiquement les données manquantes et calcule la durée de stockage au prorata et les totaux de manutention en temps réel.

### Étape 3 : audite les résumés de facturation bimensuels
Passe au tableau de bord **Biweekly Billing Summary** :
* Examine les totaux agrégés de stockage, de manutention et de transport, regroupés par compte client.
* Vérifie les contrôles Data Health pour t'assurer qu'aucune variable opérationnelle manquante ne fausse les revenus.

### Étape 4 : génère les relevés clients & sécurise tes données
Sélectionne un client et une période de facturation spécifiques pour générer un **relevé de facturation d'une seule page** propre et exportable. 

👉 **Prêt à standardiser ta facturation d'entrepôt ?**  
Teste tes tarifs dans la version navigateur gratuite, puis [télécharge le modèle Excel de facturation d'entrepôt réutilisable](https://www.theseusworkshop.com/l/liwdi?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=warehouse-billing-control) pour déployer un cadre de facturation sécurisé, hors ligne et accessible à vie pour ton entreprise.

---

## Comment ça fonctionne

### 01 — Configure tes règles de facturation

La couche de paramètres centralise les hypothèses utilisées dans tout le classeur.

Les paramètres pris en charge incluent :

* Tarif journalier de stockage
* Palier de facturation de stockage
* Tarif horaire de travail
* Heures de travail minimales
* Frais de base de transport
* Frais de palette supplémentaires
* Jours du cycle de facturation
* Date de base du cycle

Cela crée un seul endroit pour maintenir les règles commerciales au lieu d'intégrer les tarifs dans plusieurs feuilles de calcul.

---

### 02 — Consigne l'activité d'entrepôt une seule fois

La feuille opérationnelle est la **source de vérité unique** du classeur.

Chaque enregistrement capture :

* Code de suivi
* Nom du client
* Description de l'article
* Date de réception
* Date d'expédition
* Quantité de palettes
* Heures de travail
* Marqueur de transport

Le classeur en déduit ensuite :

* Jours de stockage
* Espaces palettisables facturés
* Coût de stockage
* Heures de travail facturées
* Coût de manutention
* Coût de transport
* Frais totaux
* Période de facturation
* Data Health

Le choix de conception important est que les faits opérationnels sont saisis une seule fois. Les vues de facturation en aval référencent cette source au lieu d'exiger une saisie en double.

---

### 03 — Laisse le classeur appliquer les règles de facturation

La couche de calcul applique la logique de facturation définie de manière cohérente.

Par exemple :

* Les jours de stockage continuent dynamiquement pour l'inventaire encore en stockage.
* L'inventaire expédié arrête d'accumuler des jours de stockage dès que la date d'expédition est saisie.
* Les quantités de palettes sont converties en espaces palettisables facturables selon le palier configuré.
* Les heures de travail positives sont soumises au seuil minimal facturable configuré.
* Les frais de transport ne s'appliquent que lorsque le transport est marqué comme actif.
* Les frais totaux combinent les composantes de stockage, de manutention et de transport.

Ces calculs sont basés sur les règles métier fournies plutôt que sur des hypothèses d'entrepôt génériques.

---

### 04 — Examine la facturation par client + période bimensuelle

La couche de résumé identifie automatiquement les combinaisons uniques de :

**Période de facturation + nom du client**

Pour chaque combinaison, elle fournit :

* Nombre total de tâches
* Revenus de stockage
* Revenus de manutention
* Revenus de transport
* Revenus totaux

Cela donne à la finance ou au management une vue compacte de ce qui doit être facturé à chaque client lors de chaque cycle de facturation.

---

### 05 — Génère le relevé client

Sélectionne :

**Client → Période de facturation**

La vue de facturation d'une seule page extrait ensuite les informations de facturation et les lignes opérationnelles correspondantes.

Avant l'impression, **Invoice Health** vérifie si la combinaison sélectionnée est valide.

Le relevé est conçu pour l'**impression paysage d'une seule page ou l'export PDF**, ce qui le rend adapté à l'envoi aux clients comme document de facturation.

---

## Workflow fondamental

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

Le résultat n'est pas un système général de gestion d'entrepôt.

C'est un **workflow ciblé de contrôle de la facturation**, construit autour d'un problème métier récurrent unique.

---

## Principes de conception

### Source de vérité unique

Les faits opérationnels sont saisis à un seul endroit. Les vues de résumé et de facturation tirent leurs informations de cette source.

Cela réduit la saisie en double et facilite la traçabilité d'un total de facturation jusqu'à l'enregistrement opérationnel sous-jacent.

### Paramètres en un seul endroit

Les hypothèses commerciales sont centralisées plutôt que dispersées dans les zones de calcul.

Cela facilite la gestion des changements de tarifs et réduit le risque de mettre à jour un calcul en oubliant un autre.

### Calcul + diagnostic

Le classeur sépare **« Quel est le montant facturé ? »** de **« Puis-je faire confiance à la saisie ? »**

Data Health traite les problèmes au niveau des données sources.

Invoice Health traite les problèmes au niveau des sorties de facturation.

Cette approche en deux étapes est particulièrement utile lorsqu'un classeur est utilisé par différentes personnes pour les opérations, la finance et la facturation client.

### Réutiliser au lieu de reconstruire

Une fois le classeur configuré, le processus récurrent consiste principalement en :

**saisir → examiner → résumer → facturer**

Le même cadre peut être réutilisé d'un cycle de facturation à l'autre plutôt que de reconstruire une nouvelle feuille de calcul à chaque fois.

---

## Prérequis

Ce classeur s'appuie sur la fonctionnalité moderne des tableaux dynamiques d'Excel.

**Requis :**

* Microsoft 365, ou
* Excel 2021 ou version ultérieure
* Fonctions de tableaux dynamiques incluant `MAP`, `LAMBDA`, `UNIQUE` et `FILTER`

**Non conçu pour :**

* Excel 2016
* Excel 2013
* les versions antérieures d'Excel sans le moteur de tableaux dynamiques requis
* les logiciels de tableur tiers sans prise en charge fonctionnelle équivalente

L'implémentation n'exige également **aucun VBA**.

---

## Cycle d'exploitation typique

### Configuration initiale

1. Ouvre le classeur.
2. Examine les paramètres système.
3. Saisis les hypothèses applicables de stockage, de main-d'œuvre, de transport et de cycle de facturation.

### Opérations quotidiennes

1. Ajoute la nouvelle activité d'entrepôt au journal opérationnel.
2. Saisis les informations de réception et d'expédition.
3. Enregistre la quantité de palettes, les heures de travail et le statut de transport.
4. Examine **Data Health** pour les exceptions.

### Facturation bimensuelle

1. Ouvre le résumé de facturation.
2. Examine les totaux client-période.
3. Sélectionne le client dans le relevé de facturation.
4. Sélectionne la période de facturation correspondante.
5. Confirme qu'**Invoice Health** affiche un état de facturation valide.
6. Examine les lignes.
7. Imprime le relevé ou exporte-le au format PDF.

L'expérience utilisateur visée est simple :

> **Définis les règles une fois. Enregistre le travail. Examine le résultat. Facture le client.**

---

## Maintenance

Le classeur est conçu autour d'une utilisation récurrente à faible maintenance.

L'exploitation normale devrait impliquer :

* la mise à jour de l'activité d'entrepôt
* le maintien à jour des dates d'expédition
* l'examen des avertissements Data Health
* le changement des hypothèses commerciales uniquement lorsque les règles de facturation sous-jacentes changent
* l'examen des totaux client-période avant l'émission des relevés

Les zones de calcul ne doivent pas être écrasées manuellement.

En particulier, la zone de formules à tableaux dynamiques de la feuille opérationnelle doit rester dégagée afin que les calculs puissent se propager automatiquement vers les nouveaux enregistrements.

---

## Limites

Cette trousse est intentionnellement ciblée.

Elle n'est **pas** destinée à remplacer :

* un système complet de gestion d'entrepôt
* un logiciel de gestion des stocks
* un logiciel de comptabilité
* un logiciel de gestion de la relation client
* des systèmes de recouvrement de paiements
* un ERP général

Elle calcule et organise les frais selon les règles métier configurées. Elle ne détermine pas de manière indépendante si ces règles commerciales sont appropriées pour un contrat particulier.

Pour les performances, l'implémentation recommande de garder un classeur en dessous d'environ **100 000 lignes opérationnelles** et d'archiver les données plus anciennes annuellement si nécessaire.

---

## À propos du créateur

Cette trousse est bâtie sur une prémisse simple :

**Les problèmes opérationnels récurrents méritent des workflows réutilisables.**

Un tableur devient beaucoup plus utile lorsqu'il fait plus que stocker des informations. Il devrait rendre le processus métier sous-jacent plus facile à répéter, à examiner et à expliquer.

L'objectif ici n'est pas de transformer Excel en logiciel d'entreprise.

Il s'agit de conditionner un workflow opérationnel spécifique en un outil pratique qui peut être ouvert, compris et réutilisé sans projet d'implémentation logicielle.

---

## Licence

Ce projet est publié sous la **Apache License 2.0**.

Voir le fichier `LICENSE` pour le texte de licence complet.

---

## Note finale

La facturation d'entrepôt n'a pas besoin de devenir un grand projet logiciel simplement parce que plusieurs règles de facturation sont impliquées.

Si ton processus est fondamentalement :

**activité d'entrepôt → frais de stockage + manutention + transport → facturation client bimensuelle**

alors un workflow Excel ciblé peut suffire.

Cette trousse est conçue pour garder ce workflow visible, reproductible et auditable — tout en laissant l'entreprise dans l'environnement Excel familier.
