[ 🌐 عربي ](README.ar.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# 📦 Plantilla Excel de Gestión de Facturación de Almacén y Sistema de Facturación 3PL

[![Excel](https://img.shields.io/badge/Microsoft%20Excel-365%20%7C%202021%2B-217346?style=flat-square\&logo=microsoft-excel\&logoColor=white)](#requirements) [![No VBA](https://img.shields.io/badge/VBA-None-2251FF?style=flat-square)](#why-this-tool-exists) [![License](https://img.shields.io/badge/License-Apache%202.0-lightgrey?style=flat-square)](#license)

Una **plantilla Excel de facturación de almacén** automatizada y un **rastreador de facturación logística 3PL** diseñados para calcular sin fricción las tarifas de almacenamiento, las horas de mano de obra de manipulación y los cargos de transporte de mercancías. Sustituye las hojas de cálculo manuales y propensas a errores por un sistema unificado que agrupa al instante los registros operativos diarios en ciclos de facturación quincenales y genera facturas listas para el cliente, sin la sobrecarga de los complejos Sistemas de Gestión de Almacenes (WMS).

> 🌐 **Aplicación Web en Vivo**  
> [Abrir la Calculadora Web Gratuita de Facturación de Almacén (Sin Instalación)](https://hyvoid.github.io/Warehouse-Billing-Control-System-Excel-Toolkit/)
>
> 📥 **Archivo Excel Descargable**  
> [Descargar la Plantilla Excel Reutilizable de Facturación de Almacén (.xlsx)](https://www.theseusworkshop.com/l/liwdi?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=warehouse-billing-control)

---

## Puntos de Dolor Operativos Centrales y Soluciones de Facturación Integradas

Este kit asigna los cuellos de botella habituales de los centros de cumplimiento y de la facturación 3PL directamente a cálculos automatizados de hoja de cálculo, garantizando que cada dólar cobrado se remonte a un hecho operativo verificado.

| Cuello de Botella Operativo / Punto de Dolor | Solución Automatizada Integrada | Impacto Operativo y Objetivo LSI |
| :--- | :--- | :--- |
| **Precios Complejos con Múltiples Variables** | **Motor Dinámico de Tarifas** | Cruza automáticamente los días de almacenamiento, los tramos de capacidad de palés facturables y los umbrales mínimos de manipulación para generar **cargos de manipulación 3PL** precisos. |
| **Periodos de Facturación Desconectados** | **Agregador de Ciclos Quincenales** | Agrupa automáticamente registros dispares de recepción y salida en **ciclos de facturación logística** quincenales o mensuales fijos. |
| **Discrepancias Fantasma de Palés** | **Calculadora de Tramos de Espacio de Palés** | Convierte las cantidades físicas de palés en espacios de tramo facturados (p. ej., 12 físicos = 20 facturados) para captar los ingresos reales por **tarifa de almacenamiento**. |
| **Disparadores Operativos Faltantes** | **Capa de Validación de Salud de Datos** | Señala fechas de despacho faltantes o marcadores de transporte sin definir antes de que provoquen **errores de facturación de fletes** o pérdida de ingresos. |

---

## Público Objetivo y Casos de Uso Logísticos Reales

Diseñado específicamente para profesionales de la logística que necesitan una **hoja de cálculo de facturación de almacén** fiable, transparente y flexible sin invertir en software empresarial.

### 1. Operadores de 3PL y Centros de Cumplimiento
* **Intención de Búsqueda Principal:** *alternativa Excel al software de facturación 3PL*
* **Escenario Operativo:** Gestionar múltiples cuentas de clientes donde la recepción diaria, el picking de pedidos y el almacenamiento de palés deben registrarse y facturarse con precisión en un calendario quincenal.

### 2. Gerentes de Operaciones de Almacén
* **Intención de Búsqueda Principal:** *calculadora de tarifas de manipulación y almacenamiento*
* **Escenario Operativo:** Pasar de registros diarios sin estructura a un flujo de trabajo estandarizado que demuestre a los clientes exactamente cuántas horas de mano de obra y espacios de palé se utilizaron.

### 3. Equipos de Finanzas y Facturación Logística
* **Intención de Búsqueda Principal:** *plantilla Excel de factura de flete y almacenamiento*
* **Escenario Operativo:** Eliminar el pánico de la conciliación manual de fin de mes apoyándose en una única fuente de verdad que separa "sin datos de facturación" de los auténticos "errores de hoja de cálculo".

### 4. Propietarios de Instalaciones de Almacenamiento Independientes
* **Intención de Búsqueda Principal:** *hoja de cálculo de seguimiento de almacenamiento de palés*
* **Escenario Operativo:** Cobrar a los clientes estrictamente según la huella de inventario y la duración, necesitando una forma automatizada de rastrear los días en almacenamiento frente a umbrales mínimos dinámicos.

---

## Comparación de Facturación de Almacén: Seguimiento Manual vs. Kit Automatizado

Evita las tres trampas más comunes de la facturación de almacén mejorando tu flujo de trabajo operativo.

| Área del Flujo de Facturación | Hoja de Cálculo Manual Tradicional | Kit de Facturación Automatizado (Este Repo) |
| :--- | :--- | :--- |
| **Actualizaciones de Tarifas y Lógica** | **Reconstruir la Lógica Cada Ciclo:** Las fórmulas deben copiarse, pegarse y actualizarse manualmente en múltiples pestañas cada mes. | **Controles de Parámetros Centralizados:** Cambia las tarifas de almacenamiento o los cargos de transporte una vez en la capa de Configuración; todas las facturas históricas y futuras se actualizan automáticamente. |
| **Cálculos de Almacenamiento de Palés** | **Conteo Plano de Unidades:** Trata cada palé como una simple unidad 1:1, perdiendo ingresos de los acuerdos de espacio de almacenamiento por tramos. | **Tramos de Facturación Configurables:** Aplica automáticamente el redondeo por tramos (p. ej., cobrar por un bloque de 10 palés) según los contratos de los clientes. |
| **Diagnóstico de Errores de Factura** | **Solución de Problemas a Ciegas:** Una factura en blanco puede significar un VLOOKUP roto, un cliente faltante o cero actividad mensual. | **Estado Explícito de Salud de la Factura:** Los indicadores de diagnóstico declaran explícitamente si faltan datos, si no coinciden o si simplemente no hay actividad en el periodo. |

---

## Tutorial de Inicio Rápido: Flujo de Facturación en 4 Pasos

Deja de copiar y pegar fórmulas. Sigue esta secuencia operativa para establecer un ciclo de facturación repetible:

### Paso 1: Configura tus Tarifas de Almacén
Abre la pestaña **Configuración del Sistema y Supuestos** para definir tus parámetros logísticos centrales:
* Establece tu fecha ancla del ciclo (Quincenal o Mensual).
* Define las tarifas diarias de almacenamiento, las tarifas horarias de manipulación y las tarifas de activación de transporte.
* Establece las horas mínimas facturables de trabajo y los tramos de facturación de palés.

### Paso 2: Registra las Operaciones Diarias del Almacén
Introduce la actividad diaria en el **Motor de Operaciones y Facturación de Almacén**:
* Pega las fechas de recepción, las fechas de despacho, los conteos físicos de palés y las horas reales de manipulación.
* El sistema señala automáticamente los datos faltantes y calcula en tiempo real la duración prorrateada del almacenamiento y los totales de manipulación.

### Paso 3: Audita los Resúmenes de Facturación Quincenal
Cambia al panel de **Resumen de Facturación Quincenal**:
* Revisa los totales agregados de almacenamiento, manipulación y transporte agrupados por cuenta de cliente.
* Verifica las comprobaciones de Salud de Datos para asegurar que ninguna variable operativa faltante esté distorsionando los ingresos.

### Paso 4: Genera Estados de Cuenta de Clientes y Protege tus Datos
Selecciona un cliente concreto y un periodo de facturación para generar un **Estado de Facturación de Una Sola Página** limpio y exportable.

👉 **¿Listo para estandarizar tu facturación de almacén?**  
Prueba tus tarifas en la versión gratuita del navegador y luego [Descarga la Plantilla Excel Reutilizable de Facturación de Almacén](https://www.theseusworkshop.com/l/liwdi?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=warehouse-billing-control) para desplegar un marco de facturación seguro, sin conexión y de acceso de por vida para tu negocio.

---

## Cómo Funciona

### 01 — Configura tus Reglas de Facturación

La capa de configuración centraliza los supuestos utilizados en todo el libro de trabajo.

Los parámetros admitidos incluyen:

* Tarifa Diaria de Almacenamiento
* Tramo de Facturación de Almacenamiento
* Tarifa Horaria de Trabajo
* Horas Mínimas de Trabajo
* Tarifa Base de Transporte
* Tarifa Adicional por Palé
* Días del Ciclo de Facturación
* Fecha Base del Ciclo

Esto crea un único lugar para mantener las reglas comerciales en lugar de incrustar tarifas en múltiples hojas de cálculo.

---

### 02 — Registra la Actividad del Almacén Una Sola Vez

La hoja operativa es la **Única Fuente de Verdad** del libro de trabajo.

Cada registro captura:

* Código de Seguimiento
* Nombre del Cliente
* Descripción del Artículo
* Fecha de Recepción
* Fecha de Despacho
* Cantidad de Palés
* Horas de Trabajo
* Indicador de Transporte

El libro de trabajo deriva entonces:

* Días de Almacenamiento
* Espacios de Palé Facturados
* Costo de Almacenamiento
* Horas de Trabajo Facturadas
* Costo de Manipulación
* Costo de Transporte
* Cargos Totales
* Periodo de Facturación
* Salud de Datos

La decisión de diseño importante es que los hechos operativos se introducen una sola vez. Las vistas de facturación posteriores hacen referencia a esta fuente en lugar de exigir una entrada duplicada.

---

### 03 — Deja que el Libro Aplique las Reglas de Cobro

La capa de cálculo gestiona la lógica de facturación definida de forma coherente.

Por ejemplo:

* Los días de almacenamiento continúan dinámicamente para el inventario que sigue en almacén.
* El inventario despachado deja de acumular días de almacenamiento una vez introducida la fecha de despacho.
* Las cantidades de palés se convierten en espacios de palé facturables según el tramo configurado.
* Las horas de trabajo positivas quedan sujetas al umbral mínimo facturable configurado.
* Los cargos de transporte solo se aplican cuando el transporte está marcado como activo.
* Los cargos totales combinan los componentes de almacenamiento, manipulación y transporte.

Estos cálculos se basan en las reglas de negocio suministradas, no en supuestos genéricos de almacén.

---

### 04 — Revisa la Facturación por Cliente + Periodo Quincenal

La capa de resumen identifica automáticamente combinaciones únicas de:

**Periodo de Facturación + Nombre del Cliente**

Para cada combinación, proporciona:

* Recuento Total de Tareas
* Ingresos por Almacenamiento
* Ingresos por Manipulación
* Ingresos por Transporte
* Ingresos Totales

Esto ofrece a finanzas o a la dirección una vista compacta de lo que debe facturarse a cada cliente durante cada ciclo de facturación.

---

### 05 — Genera el Estado de Cuenta del Cliente

Selecciona:

**Cliente → Periodo de Facturación**

La vista de facturación de una sola página extrae entonces la información de facturación correspondiente y las líneas operativas.

Antes de imprimir, **Salud de la Factura** comprueba si la combinación seleccionada es válida.

El estado está diseñado para **impresión horizontal en una sola página o exportación a PDF**, lo que lo hace adecuado para enviarlo a los clientes como documento de facturación.

---

## Flujo de Trabajo Central

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

El resultado no es un sistema general de gestión de almacenes.

Es un **flujo de trabajo de control de facturación enfocado**, construido en torno a un único problema de negocio recurrente.

---

## Principios de Diseño

### Única Fuente de Verdad

Los hechos operativos se introducen en un solo lugar. Las vistas de resumen y facturación derivan su información de esa fuente.

Esto reduce la entrada duplicada y facilita rastrear un total de facturación hasta el registro operativo subyacente.

### Parámetros en Un Solo Lugar

Los supuestos comerciales están centralizados en lugar de dispersarse por las áreas de cálculo.

Esto hace que los cambios de tarifas sean más fáciles de gestionar y reduce el riesgo de actualizar un cálculo olvidando otro.

### Cálculo + Diagnóstico

El libro de trabajo separa **"¿Cuál es el cargo?"** de **"¿Puedo confiar en la entrada?"**

Salud de Datos aborda los problemas a nivel de origen.

Salud de la Factura aborda los problemas de salida de facturación.

Este enfoque de dos etapas es especialmente útil cuando distintas personas utilizan el libro para operaciones, finanzas y facturación a clientes.

### Reutilizar en Lugar de Reconstruir

Una vez configurado el libro de trabajo, el proceso recurrente es principalmente:

**introducir → revisar → resumir → facturar**

El mismo marco puede reutilizarse en sucesivos ciclos de facturación en lugar de reconstruir una nueva hoja de cálculo cada vez.

---

## Requisitos

Este libro de trabajo se apoya en la funcionalidad moderna de matrices dinámicas de Excel.

**Requerido:**

* Microsoft 365, o
* Excel 2021 o posterior
* Funciones de matrices dinámicas como `MAP`, `LAMBDA`, `UNIQUE` y `FILTER`

**No diseñado para:**

* Excel 2016
* Excel 2013
* versiones anteriores de Excel sin el motor de matrices dinámicas requerido
* software de hojas de cálculo de terceros sin soporte equivalente de funciones

La implementación tampoco **requiere VBA**.

---

## Ciclo Operativo Típico

### Configuración Inicial

1. Abre el libro de trabajo.
2. Revisa la configuración del sistema.
3. Introduce los supuestos aplicables de almacenamiento, mano de obra, transporte y ciclo de facturación.

### Operaciones Diarias

1. Añade nueva actividad de almacén al registro operativo.
2. Introduce la información de recepción y despacho.
3. Registra la cantidad de palés, las horas de trabajo y el estado del transporte.
4. Revisa **Salud de Datos** en busca de excepciones.

### Facturación Quincenal

1. Abre el resumen de facturación.
2. Revisa los totales por cliente-periodo.
3. Selecciona el cliente en el estado de facturación.
4. Selecciona el periodo de facturación correspondiente.
5. Confirma que **Salud de la Factura** muestra un estado de facturación válido.
6. Revisa las líneas de detalle.
7. Imprime o exporta el estado como PDF.

La experiencia de usuario prevista es sencilla:

> **Define las reglas una vez. Registra el trabajo. Revisa el resultado. Factura al cliente.**

---

## Mantenimiento

El libro de trabajo está diseñado para un uso recurrente de bajo mantenimiento.

El funcionamiento normal debería implicar:

* actualizar la actividad del almacén
* mantener al día las fechas de despacho
* revisar las advertencias de Salud de Datos
* cambiar los supuestos comerciales solo cuando cambien las reglas de facturación subyacentes
* revisar los totales por cliente-periodo antes de emitir los estados

Las áreas de cálculo no deben sobrescribirse manualmente.

En particular, el área de fórmulas de matriz dinámica de la hoja operativa debe permanecer despejada para que los cálculos puedan derramarse automáticamente en los nuevos registros.

---

## Limitaciones

Este kit está enfocado intencionadamente.

**No** está pensado para sustituir:

* un sistema completo de gestión de almacenes
* software de gestión de inventario
* software de contabilidad
* software de gestión de relaciones con clientes
* sistemas de cobro de pagos
* un ERP general

Calcula y organiza los cargos según las reglas de negocio configuradas. No determina por sí mismo si esas reglas comerciales son apropiadas para un contrato concreto.

Por rendimiento, la implementación recomienda mantener un libro de trabajo por debajo de aproximadamente **100,000 filas operativas** y archivar los datos más antiguos anualmente si es necesario.

---

## Sobre el Creador

Este kit se construye a partir de una premisa simple:

**Los problemas operativos recurrentes merecen flujos de trabajo reutilizables.**

Una hoja de cálculo se vuelve mucho más útil cuando hace más que almacenar información. Debería facilitar que el proceso de negocio subyacente se repita, se revise y se explique.

El objetivo aquí no es convertir Excel en software empresarial.

Es empaquetar un flujo de trabajo operativo específico en una herramienta práctica que pueda abrirse, entenderse y reutilizarse sin un proyecto de implementación de software.

---

## Licencia

Este proyecto se publica bajo la **Licencia Apache 2.0**.

Consulta el archivo `LICENSE` para el texto completo de la licencia.

---

## Nota Final

La facturación de almacén no necesita convertirse en un gran proyecto de software solo porque intervengan varias reglas de cobro.

Si tu proceso es fundamentalmente:

**actividad de almacén → cargos de almacenamiento + manipulación + transporte → facturación quincenal al cliente**

entonces un flujo de trabajo enfocado en Excel puede ser suficiente.

Este kit está diseñado para mantener ese flujo visible, repetible y auditable, dejando el negocio en el entorno familiar de Excel.

