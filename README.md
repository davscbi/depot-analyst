# Depot Analyst

Privates, passwortgeschütztes Depot-Dashboard als Web-App.

Die Inhalte sind clientseitig verschlüsselt (AES-256-GCM, Schlüssel per PBKDF2-SHA256 mit 600.000 Iterationen aus dem Passwort abgeleitet). Dieses Repository enthält keine lesbaren Daten – erst nach Eingabe des Passworts entschlüsselt der Browser die Seite lokal.

Aufruf: https://davscbi.github.io/depot-analyst/
