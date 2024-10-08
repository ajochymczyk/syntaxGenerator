# SyntaxGenerator

**SyntaxGenerator** to narzędzie dydaktyczne służące do nauki języku, które pozwala na tworzenie poprawnych gramatycznie zdań. Program prowadzi użytkownika krok po kroku przez proces budowania zdania w formacie SVO (podmiot-orzeczenie-dopełnienie), zapewniając zgodność gramatyczną (rodzaj, liczba, osoba). Użytkownik ma możliwość wyboru podmiotu (zaimka lub frazy rzeczownikowej), czasownika oraz dopełnienia, a także opcjonalnych elementów, takich jak przymiotniki, zaimki dzierżawcze czy rodzajniki.

**Struktura Aplikacji**

Projekt składa się z frontendu napisanego w React, który zapewnia interfejs użytkownika, oraz backendu w Pythonie z wykorzystaniem frameworka Flask, który obsługuje logikę generowania zdań.

Plik **page.js** to aplikacja React, która pełni funkcję interfejsu użytkownika, umożliwiając użytkownikowi wybór elementów zdania.

Plik **routes.py** odpowiada za definicję endpointów API, które są wykorzystywane przez frontend do pobierania danych oraz generowania zdań.
- **endpointy GET** udostępniają listy czasowników, rzeczowników, zaimków, przymiotników i określników, które są zwracane do frontendu i używane do dynamicznego uzupełniania pól formularza
- **endpoint POST: /generate_sentence** - przyjmuje dane od użytkownika w formacie JSON i przekazuje je do funkcji generate_sentence w celu wygenerowania zdania

Funkcja **generate_sentence** w pliku senetence_generator.py buduje zdanie zgodne z gramatyką Interlingua na podstawie wybranych przez użytkownika komponentów.
Plik data.py zawiera dane lingwistyczne potrzebne do generowania zdań.
